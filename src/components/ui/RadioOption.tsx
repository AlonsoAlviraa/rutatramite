export function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className={`rt-radio ${checked ? "is-selected" : ""}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="rt-radio-label">{label}</span>
    </label>
  );
}
