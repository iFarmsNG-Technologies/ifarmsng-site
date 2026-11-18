import Header from "./Header";
import Footer from "./Footer";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="legal">
        <div className="container legal-inner">
          <h1>{title}</h1>
          <p className="legal-note">
            <strong>Draft for review.</strong> Have a qualified legal adviser review this page, including
            against the Nigeria Data Protection Act 2023, before the site goes live.
          </p>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
