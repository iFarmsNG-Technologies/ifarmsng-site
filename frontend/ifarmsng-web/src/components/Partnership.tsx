import Link from "next/link";

export default function Partnership() {
  return (
    <section className="partnership">
      <div className="partnership-pattern" aria-hidden="true"></div>
      <div className="container partnership-inner">
        <p className="eyebrow eyebrow-light"><span></span> PARTNER WITH IFARMSNG</p>
        <h2>Let&apos;s build the future<br />of <em>agriculture together.</em></h2>
        <p>
          We welcome strategic partnerships with investors, farmers, agribusinesses, development
          organizations, government agencies, and commodity buyers seeking sustainable agricultural opportunities.
        </p>
        <div className="hero-actions">
          <Link className="button button-gold" href="/#contact">Become a Partner <span>↗</span></Link>
          <Link className="text-link light-link" href="/#contact">Contact our team <span>→</span></Link>
        </div>
      </div>
      <div className="partnership-side">EVERYONE EATS.</div>
    </section>
  );
}
