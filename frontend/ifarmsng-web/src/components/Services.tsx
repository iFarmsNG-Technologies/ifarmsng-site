import Link from "next/link";
import SectionTop from "./SectionTop";
import { services } from "@/data/content";

export default function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="container">
        <SectionTop eyebrow="WHAT WE DO" kicker="02 — OUR CAPABILITIES" />
        <div className="section-heading-row">
          <h2>Building value across<br />the <em>agricultural value chain.</em></h2>
          <p>From the first seed to the final destination, we work across connected activities that move agriculture forward.</p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <article className="service-card" key={s.title}>
              <div className="service-icon" aria-hidden="true">{s.icon}</div>
              <span className="card-index">{String(i + 1).padStart(2, "0")} / {s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link href="/#contact" aria-label={`Enquire about ${s.label}`}>↗</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
