import SectionTop from "./SectionTop";
import { process } from "@/data/content";

export default function Approach() {
  return (
    <section className="approach section-pad" id="approach">
      <div className="container">
        <SectionTop eyebrow="HOW WE WORK" kicker="03 — THE VALUE CHAIN" light />
        <div className="approach-heading">
          <h2>From the farm<br /><em>to the future.</em></h2>
          <p>We coordinate connected agricultural activities to improve efficiency, reduce losses, and create value from farm to market.</p>
        </div>
        <div className="process">
          {process.map((p, i) => (
            <article key={p.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div className="process-symbol" aria-hidden="true">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <div className="approach-foot">
          <span>ONE CONNECTED SYSTEM</span><span className="approach-rule"></span><span>GRASSROOTS TO GLOBAL</span>
        </div>
      </div>
    </section>
  );
}
