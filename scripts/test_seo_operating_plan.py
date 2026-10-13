import json
import unittest
from pathlib import Path

from seo_plan_core import (
    EFFORT_PERCENT,
    FIT_WEIGHTS,
    HEADINGS,
    PRIORITY_WEIGHTS,
    combine_money_and_scores,
    demand_score_from_disclosed_impressions,
    expected_monthly_contribution,
    fit_band,
    priority_from_scores,
    validate_recommendation,
    validate_registry,
    value_adjusted_for_rankability,
    weighted_fit,
)
from seo_operating_plan import assign_query, build_record, render_plan

ROOT = Path(__file__).resolve().parents[1]


class FitAndPriorityTests(unittest.TestCase):
    def test_weights_sum_to_100(self):
        self.assertEqual(sum(FIT_WEIGHTS.values()), 100)
        self.assertEqual(sum(PRIORITY_WEIGHTS.values()), 100)
        self.assertNotIn("effort", PRIORITY_WEIGHTS)
        self.assertEqual(EFFORT_PERCENT, 20)

    def test_factor_scores_outside_1_to_5_are_rejected(self):
        scores = {key: 3 for key in FIT_WEIGHTS}
        for bad in (0, 6, -1, True, 3.5):
            broken = dict(scores)
            broken["search_demand"] = bad
            with self.assertRaises(ValueError):
                weighted_fit(broken)
        self.assertEqual(weighted_fit(scores)["score"], "3.00")

    def test_band_edges_match_po_md(self):
        self.assertEqual(fit_band(4.0), "main acquisition channel")
        self.assertEqual(fit_band(5.0), "main acquisition channel")
        self.assertEqual(fit_band(3.9), "serious but limited pilot")
        self.assertEqual(fit_band(3.0), "serious but limited pilot")
        self.assertEqual(fit_band(2.9), "cheap and obvious opportunities only")
        self.assertEqual(fit_band(2.0), "cheap and obvious opportunities only")
        self.assertEqual(fit_band(1.999), "spend the resources elsewhere")
        self.assertNotEqual(fit_band(3.9), fit_band(4.0))

    def test_missing_demand_or_revenue_stays_unknown(self):
        missing = expected_monthly_contribution(None, 0.1, 0.2, 30)
        self.assertEqual(missing["status"], "UNKNOWN")
        self.assertIsNone(missing["value"])
        self.assertNotEqual(missing["value"], 0)
        unknown_token = expected_monthly_contribution("UNKNOWN", 0.1, 0.2, 30)
        self.assertEqual(unknown_token["status"], "UNKNOWN")
        self.assertIsNone(unknown_token["value"])
        self.assertIsNone(demand_score_from_disclosed_impressions(None))
        scored = priority_from_scores({key: None if key == "demand" else 3 for key in PRIORITY_WEIGHTS}, 3)
        self.assertEqual(scored["status"], "UNKNOWN")
        self.assertIsNone(scored["score"])

    def test_rank_probability_is_not_applied_twice(self):
        contribution = expected_monthly_contribution(100, 0.2, 0.1, 5)
        with self.assertRaises(ValueError):
            value_adjusted_for_rankability(
                contribution,
                0.4,
                click_share_assumes_target_position=True,
            )
        once = value_adjusted_for_rankability(
            contribution,
            None,
            click_share_assumes_target_position=True,
        )
        self.assertFalse(once["rank_probability_applied"])
        self.assertEqual(once["value"], contribution["value"])

    def test_money_and_scores_are_not_one_currency(self):
        with self.assertRaises(ValueError):
            combine_money_and_scores(10, 3)
        self.assertEqual(combine_money_and_scores(None, 3)["money"], None)

    def test_recommendation_without_evidence_kind_fails(self):
        with self.assertRaises(ValueError):
            validate_recommendation({
                "statement": "Do the work",
                "evidence": "A receipt",
                "evidence_kind": "guess",
                "change": "Update the page",
                "measure": "The next receipt",
                "owner": "operador del sitio",
                "stop_when": "When the receipt arrives",
            })
        with self.assertRaises(ValueError):
            validate_recommendation({
                "statement": "Do the work",
                "evidence": "A receipt",
                "change": "Update the page",
                "measure": "The next receipt",
                "owner": "operador del sitio",
                "stop_when": "When the receipt arrives",
            })

    def test_registry_field_action_and_task_rules(self):
        def row(url, task, action="keep", split=None):
            item = {
                "canonical_url": url,
                "page_status": "HTTP 200",
                "index_status": "UNKNOWN",
                "primary_task": task,
                "query_group": task,
                "page_type": "guide",
                "parent_pages": [],
                "child_pages": [],
                "primary_conversion": "Open the official source.",
                "new_information_or_utility": "The official route.",
                "internal_link_sources": "UNKNOWN",
                "owner": "operador del sitio",
                "last_verification_date": "2026-10-06",
                "update_schedule": "When the official source changes.",
                "action": action,
            }
            if split:
                item["task_split"] = split
            return item

        valid = row("https://rutatramite.com/a", "Task A")
        self.assertTrue(validate_registry([valid]))
        incomplete = dict(valid)
        del incomplete["owner"]
        with self.assertRaises(ValueError):
            validate_registry([incomplete])
        bad_action = row("https://rutatramite.com/a", "Task A", action="delete")
        with self.assertRaises(ValueError):
            validate_registry([bad_action])
        with self.assertRaises(ValueError):
            validate_registry([
                row("https://rutatramite.com/a", "Same task"),
                row("https://rutatramite.com/b", "Same task"),
            ])
        self.assertTrue(validate_registry([
            row("https://rutatramite.com/a", "Same task", split="Place A differs."),
            row("https://rutatramite.com/b", "Same task", split="Place B differs."),
        ]))


class OperatingPlanTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.record = build_record(ROOT)
        cls.plan = render_plan(cls.record)
        cls.growth = json.loads((ROOT / "docs/seo-workflow/20261006-measurement/growth-latest.json").read_text(encoding="utf-8"))

    def test_record_uses_the_same_validators_and_receipt(self):
        record = self.record
        self.assertEqual(record["fit"]["score"], weighted_fit(record["fit"]["scores"])["score"])
        self.assertEqual(record["fit"]["score"], "3.00")
        self.assertEqual(record["fit"]["band"], fit_band(record["fit"]["score"]))
        self.assertEqual(record["fit"]["band"], "serious but limited pilot")
        self.assertFalse(record["gsc"]["goal_evidenced"])
        self.assertIsNone(record["revenue"])
        self.assertEqual(record["contribution"]["status"], "UNKNOWN")
        self.assertIsNone(record["contribution"]["value"])
        self.assertFalse(record["rank_probability_applied"])
        self.assertEqual(record["headings"], list(HEADINGS))
        self.assertEqual(len(record["registry"]), record["sitemap_comparison"]["file_count"])
        self.assertTrue(record["sitemap_comparison"]["live_matches_file"])
        summary = json.loads((ROOT / "docs/seo-workflow/20261006-audit/summary.json").read_text(encoding="utf-8"))
        self.assertEqual(record["sitemap_comparison"]["summary_count"], summary["sitemap_live"]["urls"])
        validate_registry(record["registry"])
        self.assertEqual(len({row["canonical_url"] for row in record["registry"]}), len(record["registry"]))
        self.assertEqual(record["approved_briefs"], [])
        self.assertEqual(record["candidate_urls"], [])
        final = {row["keys"][0]: row["impressions"] for row in self.growth["final_daily"]["rows"]}
        rendered_dates = {row["date"]: row["impressions"] for row in record["gsc"]["final_daily"]}
        self.assertEqual(rendered_dates, final)
        self.assertEqual(record["gsc"]["property"], "sc-domain:rutatramite.com")
        self.assertEqual(record["gsc"]["latest_final_date"], self.growth["latest_final_date"])
        self.assertNotEqual(record["gsc"]["final_impressions_sum"], record["gsc"]["query_impressions_sum_disclosed"])
        self.assertTrue(record["withheld_briefs"])
        for brief in record["withheld_briefs"]:
            self.assertFalse(brief["passes_seven"])
            self.assertTrue(brief["expected_answer"])
            self.assertTrue(brief["addition"])

    def test_rendered_plan_carries_the_record(self):
        plan = self.plan
        cursor = 0
        for heading in HEADINGS:
            found = plan.find("## " + heading, cursor)
            self.assertGreaterEqual(found, 0, heading)
            cursor = found
        self.assertIn("The cheapest falsifying test:", plan)
        self.assertIn("sc-domain:rutatramite.com", plan)
        self.assertIn("Revenue is unmeasured", plan)
        self.assertIn("is not met", plan)
        self.assertIn("That snapshot is historical and is not the current result.", plan)
        october_4 = next(row for row in self.record["gsc"]["final_daily"] if row["date"] == "2026-10-04")
        self.assertIn(f"| 2026-10-04 | {october_4['impressions']} |", plan)
        self.assertNotIn("## Article ideas", plan)
        self.assertLess(plan.find("## " + HEADINGS[0]), plan.find("## " + HEADINGS[1]))

    def test_query_assignment_is_one_url_per_task(self):
        paths = {
            "/",
            "/dni",
            "/dni/cita-previa",
            "/dni/misma-cita-pasaporte",
            "/pasaporte",
            "/pasaporte/cita-previa",
            "/extranjeria",
            "/becas",
            "/descargas",
            "/empadronarse",
            "/empadronarse/andalucia/cordoba/cordoba",
            "/alquiler",
            "/alquiler/ayudas-por-comunidad",
        }
        self.assertEqual(assign_query("citapreviadnie", paths)["owner"], "/dni/cita-previa")
        self.assertEqual(assign_query("tasas dni y pasaporte 2026", paths)["owner"], "/dni")
        self.assertEqual(assign_query("cuanto cuesta hacer un pasaporte", paths)["owner"], "/pasaporte")
        self.assertEqual(assign_query("cuanto sale renovar el pasaporte", paths)["owner"], "/pasaporte")
        self.assertEqual(assign_query("pasaporte sin cita previa", paths)["owner"], "/pasaporte")
        self.assertEqual(assign_query("modelo 60 444 padron cordoba", paths)["query_group"], "empadron-cordoba")
        self.assertEqual(assign_query("cita previa dni y pasaporte juntos", paths)["owner"], "/dni/misma-cita-pasaporte")
        self.assertIsNone(assign_query("tu trámite fácil", paths)["query_group"])
        for query in (
            "cuanto vale dni y pasaporte",
            "cuanto se paga por el dni y pasaporte español",
            "cuanto cuesta dni y pasaporte",
        ):
            self.assertEqual(assign_query(query, paths)["owner"], "/dni", query)
        self.assertEqual(assign_query("citaprevianie", paths)["owner"], "/extranjeria")
        self.assertEqual(assign_query("cita previa pasaporte urgente", paths)["owner"], "/pasaporte/cita-previa")
        stored = {row["query"]: row["owner"] for row in self.record["queries"]}
        for query in (
            "cuanto vale dni y pasaporte",
            "cuanto se paga por el dni y pasaporte español",
            "cuanto cuesta dni y pasaporte",
        ):
            self.assertEqual(stored[query], "/dni", query)
        self.assertEqual(stored["citaprevianie"], "/extranjeria")
        self.assertEqual(stored["cita previa pasaporte urgente"], "/pasaporte/cita-previa")
        self.assertEqual(stored["citapreviadnie"], "/dni/cita-previa")
        owners = {group["query_group"]: group["owner"] for group in self.record["groups"]}
        self.assertEqual(len(owners), len(self.record["groups"]))
        self.assertEqual(owners["cita-pasaporte"], "/pasaporte/cita-previa")


if __name__ == "__main__":
    unittest.main()
