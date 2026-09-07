export function UnverifiedBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p
      className="border-l-2 border-moss pl-3 text-sm text-ink"
      data-unverified-badge=""
    >
      Pendiente de verificación local
    </p>
  );
}
