import Link from "next/link";
import Brand from "./Brand";
import { footerExplore, footerServices } from "@/data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>Connecting farms, markets, and opportunities through agriculture, innovation, and technology.</p>
            <strong>Everyone Eats.</strong>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {footerExplore.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </div>
          <div className="footer-column">
            <h3>Our services</h3>
            {footerServices.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <Link href="/#contact">Contact our team</Link>
            <Link href="/#contact">Become a partner</Link>
            <Link href="/privacy/">Privacy policy</Link>
            <Link href="/terms/">Terms of use</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} iFARMSNG Agro Business Technology Ltd. All Rights Reserved.</span>
          <span>GRASSROOTS TO GLOBAL <i>✳</i></span>
        </div>
      </div>
    </footer>
  );
}
