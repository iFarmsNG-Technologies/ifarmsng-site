import Link from "next/link";
import SectionTop from "./SectionTop";
import { pillars } from "@/data/content";

export default function Intro() {
  return (
    <section className="intro section-pad" id="about">
      <div className="container">
        <SectionTop eyebrow="WHO WE ARE" kicker="01 — OUR PURPOSE" />
        <div className="intro-grid">
          <h2>Agriculture.<br /><em>Innovation.</em><br />Opportunity.</h2>
          <div className="intro-copy">
            <p className="lead">
              We see agriculture as more than production. It is an interconnected system of people,
              resources, technology, and opportunity.
            </p>
            <p>
              iFarmsNG Agro Business Technology Ltd is an integrated agribusiness and agricultural
              technology company focused on transforming agricultural productivity and profitability
              through innovation, sustainable farming practices, strategic partnerships, and value addition.
            </p>
            <Link className="text-link dark-link" href="/#approach">Discover our approach <span>→</span></Link>
          </div>
        </div>
        <div className="pillar-grid">
          {pillars.map((p, i) => (
            <article className="pillar" key={p.title}>
              <span className="pillar-number">{String(i + 1).padStart(2, "0")}</span>
              <div className="line-icon" aria-hidden="true">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
