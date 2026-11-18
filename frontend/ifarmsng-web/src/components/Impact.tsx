import SectionTop from "./SectionTop";
import { impact } from "@/data/content";

export default function Impact() {
  return (
    <section className="impact section-pad" id="impact">
      <div className="container">
        <SectionTop eyebrow="OUR IMPACT" kicker="05 — WHAT MATTERS" />
        <div className="impact-heading">
          <h2>Growing more than crops.<br /><em>Creating lasting impact.</em></h2>
          <p>
            Our ambition is measured not only in what we produce, but in the value agriculture creates
            for communities and the wider economy.
          </p>
        </div>
        <div className="impact-grid">
          {impact.map((it, i) => (
            <article key={it.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div className="impact-icon" aria-hidden="true">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
