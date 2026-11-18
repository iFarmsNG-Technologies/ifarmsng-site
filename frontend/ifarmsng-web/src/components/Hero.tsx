import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-image" role="img" aria-label="Aerial view of lush agricultural fields"></div>
      <div className="hero-shade"></div>
      <div className="hero-content container">
        <p className="eyebrow eyebrow-light"><span></span> AGRICULTURE, REIMAGINED</p>
        <h1>Growing Africa&apos;s future,<br /><em>from the ground up.</em></h1>
        <p className="hero-copy">
          We combine agricultural expertise, innovation, and technology to create sustainable value
          across the agricultural value chain — connecting farms, markets, and opportunities.
        </p>
        <div className="hero-actions">
          <Link className="button button-gold" href="/#services">Explore Our Operations <span>↗</span></Link>
          <Link className="text-link light-link" href="/#contact">Partner with iFarmsNG <span>→</span></Link>
        </div>
        <div className="hero-note"><span className="note-line"></span><span>GRASSROOTS TO GLOBAL</span></div>
      </div>
      <div className="hero-index"><span>01</span> / 05</div>
      <div className="hero-bottom container">
        <span>BUILT FOR THE VALUE CHAIN</span>
        <span className="hero-bottom-line"></span>
        <span>EVERYONE EATS.</span>
      </div>
    </section>
  );
}
