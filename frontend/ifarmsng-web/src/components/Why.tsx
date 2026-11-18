import SectionTop from "./SectionTop";
import { whyList } from "@/data/content";

export default function Why() {
  return (
    <section className="why section-pad">
      <div className="container why-grid">
        <div className="why-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
            alt="Green agricultural fields stretching across a rural landscape"
            loading="lazy"
          />
          <div className="photo-caption"><span>GROWING WITH PURPOSE</span><span>iFARMSNG / 01</span></div>
        </div>
        <div className="why-copy">
          <SectionTop eyebrow="WHY IFARMSNG" kicker="04 — OUR DIFFERENCE" />
          <h2>Creating solutions to <em>real agricultural challenges.</em></h2>
          <p className="why-lead">Agriculture works best when every part of the system works together.</p>
          <p>
            We focus on practical solutions that connect producers, businesses, markets, and institutions —
            with an approach shaped by local realities and wider opportunities.
          </p>
          <ul className="check-list">
            {whyList.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
