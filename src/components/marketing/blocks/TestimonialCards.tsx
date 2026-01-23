type Testimonial = { quote: string; name: string; role: string };

type Props = {
  title?: string;
  items?: Testimonial[];
};

const defaultItems: Testimonial[] = [
  {
    quote: "We went from idea to a publishable site in one session. The SEO structure saved us hours.",
    name: "A. Builder",
    role: "Local Services",
  },
  {
    quote: "Pricing + FAQs + CTA sections were instantly usable. The conversion pass is the killer feature.",
    name: "J. Founder",
    role: "SaaS",
  },
  {
    quote: "Templates + automation = faster client delivery. This is exactly what agencies need.",
    name: "M. Studio",
    role: "Agency",
  },
];

export default function TestimonialCards({ title = "What people say", items = defaultItems }: Props) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.quote} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm opacity-80">“{t.quote}”</div>
            <div className="mt-4 text-sm font-semibold">{t.name}</div>
            <div className="text-xs opacity-60">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}