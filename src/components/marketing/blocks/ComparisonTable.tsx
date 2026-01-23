type Row = { feature: string; free: string; pro: string };

type Props = {
  title?: string;
  rows?: Row[];
};

const defaultRows: Row[] = [
  { feature: "Website generation", free: "✓", pro: "✓" },
  { feature: "Templates library", free: "✓", pro: "✓" },
  { feature: "Basic SEO outputs", free: "Limited", pro: "Full" },
  { feature: "Conversion pass", free: "—", pro: "✓" },
  { feature: "Custom domain publishing", free: "—", pro: "✓" },
  { feature: "Automation / pipeline runs", free: "—", pro: "✓" },
];

export default function ComparisonTable({ title = "Free vs Pro", rows = defaultRows }: Props) {
  return (
    <section className="mt-14 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[560px] w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="border-b border-black/10 px-4 py-3 text-left text-sm font-semibold">Feature</th>
              <th className="border-b border-black/10 px-4 py-3 text-left text-sm font-semibold">Free</th>
              <th className="border-b border-black/10 px-4 py-3 text-left text-sm font-semibold">Pro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <td className="border-b border-black/5 px-4 py-3 text-sm opacity-80">{r.feature}</td>
                <td className="border-b border-black/5 px-4 py-3 text-sm opacity-80">{r.free}</td>
                <td className="border-b border-black/5 px-4 py-3 text-sm opacity-80">{r.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs opacity-60">
        Note: Update these rows to match your exact billing + feature gating.
      </div>
    </section>
  );
}