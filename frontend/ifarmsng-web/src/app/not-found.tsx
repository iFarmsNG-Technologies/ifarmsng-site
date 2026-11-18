import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="legal">
        <div className="container legal-inner">
          <p className="eyebrow"><span></span> 404</p>
          <h1>We couldn&apos;t find that page.</h1>
          <p>The page may have moved or the address may be mistyped.</p>
          <Link className="button button-dark" href="/">Back to home <span>↗</span></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
