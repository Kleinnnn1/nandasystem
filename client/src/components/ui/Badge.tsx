interface BadgeProps {
  label: string;
  bg: string;
  color: string;
}

export default function Badge({ label, bg, color }: BadgeProps) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}
