"""Pure SEO-fit, priority, evidence, and registry checks for the operating plan.

No network, no clock, and no file writes. The entry point in seo_operating_plan
imports these functions and renders only what they accept.
"""

FIT_WEIGHTS = {
    "search_demand": 20,
    "commercial_value": 20,
    "ability_to_produce_better_result": 20,
    "chance_of_ranking": 15,
    "path_to_authority": 10,
    "maintenance_burden": 10,
    "asset_value_over_time": 5,
}

# Positive weights sum to 100. Effort is subtracted and is not part of that 100.
PRIORITY_WEIGHTS = {
    "business_value": 25,
    "closeness_to_conversion": 20,
    "new_information": 15,
    "chance_of_ranking": 15,
    "demand": 10,
    "reuse": 10,
    "distribution": 5,
}
EFFORT_PERCENT = 20

EVIDENCE_KINDS = {
    "measurement",
    "practitioner hypothesis",
    "own inference",
    "project data",
}

REGISTRY_ACTIONS = {"keep", "improve", "merge", "redirect", "remove", "exclude"}

REQUIRED_REGISTRY_FIELDS = (
    "canonical_url",
    "page_status",
    "index_status",
    "primary_task",
    "query_group",
    "page_type",
    "parent_pages",
    "child_pages",
    "primary_conversion",
    "new_information_or_utility",
    "internal_link_sources",
    "owner",
    "last_verification_date",
    "update_schedule",
    "action",
)

FOUNDATION_RATINGS = {"ESTABLISHED", "PARTIAL", "UNKNOWN"}

HEADINGS = (
    "1. Foundation status and gaps, with an owner for each missing input.",
    "2. Business and conversion summary.",
    "3. SEO fit score and verdict.",
    "4. Assumptions and missing evidence.",
    "5. Customer decision path.",
    "6. Demand groups and search intent.",
    "7. Priority table with value ranges, rankability, cost, and reason.",
    "8. Recommended site structure.",
    "9. URL registry for the first release.",
    "10. Briefs for the highest-priority pages.",
    "11. Technical problems that could block the plan.",
    "12. Authority and distribution plan, including the proof asset.",
    "13. AI visibility question set, observation conditions, and citation and accuracy checks.",
    "14. Conversion and measurement plan.",
    "15. First experiments with decision rules.",
    "16. Work for the next 30, 60, and 90 days.",
    "17. What to postpone, merge, or reject.",
)

RECOMMENDATION_FIELDS = (
    "statement",
    "evidence",
    "evidence_kind",
    "change",
    "measure",
    "owner",
    "stop_when",
)


def _score_1_to_5(value, label):
    if type(value) is not int or not 1 <= value <= 5:
        raise ValueError(f"{label} must be an integer from 1 to 5, got {value!r}")
    return value


def weighted_fit(scores):
    """Return the weighted SEO-fit score. Factor scores outside 1–5 are rejected."""
    missing = [key for key in FIT_WEIGHTS if key not in scores]
    if missing:
        raise ValueError("missing fit factors: " + ", ".join(missing))
    extra = [key for key in scores if key not in FIT_WEIGHTS]
    if extra:
        raise ValueError("unknown fit factors: " + ", ".join(extra))
    total = 0
    for key, weight in FIT_WEIGHTS.items():
        total += _score_1_to_5(scores[key], key) * weight
    return {"hundredths": total, "score": f"{total // 100}.{total % 100:02d}"}


def fit_band(score):
    """Map a weighted score to exactly one po.md band. Edges: 4.0, 3.9, 2.0."""
    value = float(score)
    if value >= 4.0:
        return "main acquisition channel"
    if value >= 3.0:
        return "serious but limited pilot"
    if value >= 2.0:
        return "cheap and obvious opportunities only"
    return "spend the resources elsewhere"


def expected_monthly_contribution(demand, attainable_click_share, conversion_rate, contribution_per_conversion):
    """Multiply the four inputs. A missing input stays UNKNOWN and is not coerced to 0."""
    inputs = {
        "demand": demand,
        "attainable_click_share": attainable_click_share,
        "conversion_rate": conversion_rate,
        "contribution_per_conversion": contribution_per_conversion,
    }
    if any(value is None or value == "UNKNOWN" for value in inputs.values()):
        return {"status": "UNKNOWN", "value": None, "inputs": inputs}

    def bounds(value):
        if isinstance(value, tuple):
            if len(value) != 2:
                raise ValueError("a range must be a low, high pair")
            return value
        return (value, value)

    low = 1
    high = 1
    for value in inputs.values():
        pair = bounds(value)
        low *= pair[0]
        high *= pair[1]
    return {"status": "estimated", "value": (low, high), "inputs": inputs}


def value_adjusted_for_rankability(contribution, rank_probability, *, click_share_assumes_target_position):
    """Do not apply rank probability again when click share already assumes the target position."""
    if click_share_assumes_target_position and rank_probability is not None:
        raise ValueError(
            "attainable click share already assumes the target position; do not apply rank probability again"
        )
    if not isinstance(contribution, dict) or contribution.get("status") == "UNKNOWN" or contribution.get("value") is None:
        return {"status": "UNKNOWN", "value": None, "rank_probability_applied": False}
    if click_share_assumes_target_position:
        return {
            "status": contribution["status"],
            "value": contribution["value"],
            "rank_probability_applied": False,
        }
    if rank_probability is None or rank_probability == "UNKNOWN":
        return {"status": "UNKNOWN", "value": None, "rank_probability_applied": False}
    low, high = contribution["value"]
    return {
        "status": "estimated",
        "value": (low * rank_probability, high * rank_probability),
        "rank_probability_applied": True,
    }


def combine_money_and_scores(money, strategic_or_learning_score):
    """Money and strategic or learning scores are different currencies."""
    if money is not None and strategic_or_learning_score is not None:
        raise ValueError("do not add money and strategic or learning scores as one currency")
    return {"money": money, "strategic_or_learning_score": strategic_or_learning_score}


def priority_from_scores(scores, effort):
    """1–5 priority. Missing demand or effort stays UNKNOWN and is not coerced to 0."""
    if effort is None or any(scores.get(key) is None for key in PRIORITY_WEIGHTS):
        return {"status": "UNKNOWN", "score": None, "hundredths": None, "currency": "not euros"}
    positive = 0
    for key, weight in PRIORITY_WEIGHTS.items():
        positive += _score_1_to_5(scores[key], key) * weight
    net = positive - _score_1_to_5(effort, "effort") * EFFORT_PERCENT
    sign = "-" if net < 0 else ""
    absolute = abs(net)
    return {
        "status": "scored",
        "hundredths": net,
        "score": f"{sign}{absolute // 100}.{absolute % 100:02d}",
        "currency": "1-5 scores, not euros",
    }


def demand_score_from_disclosed_impressions(impressions):
    """Relative score for disclosed rows only. None stays unknown. Zero rows are not a market zero."""
    if impressions is None:
        return None
    if type(impressions) is not int or impressions < 0:
        raise ValueError("disclosed impressions must be a non-negative integer or None")
    if impressions == 0:
        return None
    if impressions < 10:
        return 1
    if impressions < 50:
        return 2
    if impressions < 200:
        return 3
    if impressions < 500:
        return 4
    return 5


def ranking_score_from_position(position):
    """Position is not a second rank-probability discount. None stays unknown."""
    if position is None:
        return None
    if position <= 10:
        return 3
    if position <= 20:
        return 2
    return 1


def validate_recommendation(recommendation):
    if not isinstance(recommendation, dict):
        raise ValueError("recommendation must be an object")
    for field in RECOMMENDATION_FIELDS:
        if recommendation.get(field) in (None, ""):
            raise ValueError(f"recommendation missing {field}")
    if recommendation["evidence_kind"] not in EVIDENCE_KINDS:
        raise ValueError(
            "evidence kind must be measurement, practitioner hypothesis, own inference, or project data"
        )
    return True


def validate_registry(rows):
    if not isinstance(rows, list):
        raise ValueError("registry must be a list")
    seen = {}
    for index, row in enumerate(rows):
        if not isinstance(row, dict):
            raise ValueError(f"registry row {index} is not an object")
        for field in REQUIRED_REGISTRY_FIELDS:
            if field not in row or row[field] in (None, ""):
                raise ValueError(f"registry row {index} missing {field}")
        if row["action"] not in REGISTRY_ACTIONS:
            raise ValueError(f"registry action {row['action']!r} is outside the allowed set")
        if not isinstance(row["parent_pages"], list) or not isinstance(row["child_pages"], list):
            raise ValueError("parent_pages and child_pages must be lists")
        task = row["primary_task"]
        if task in seen:
            previous = seen[task]
            if not row.get("task_split") or not previous.get("task_split"):
                raise ValueError("two URLs for one task without a stated split")
        seen[task] = row
    return True


def validate_foundation(items):
    if not items:
        raise ValueError("foundation is empty")
    for item in items:
        if item.get("rating") not in FOUNDATION_RATINGS:
            raise ValueError("foundation rating must be ESTABLISHED, PARTIAL, or UNKNOWN")
        if not item.get("owner"):
            raise ValueError("foundation item missing owner")
        if not item.get("item"):
            raise ValueError("foundation item missing name")
    return True
