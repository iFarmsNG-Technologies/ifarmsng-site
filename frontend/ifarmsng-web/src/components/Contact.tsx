import SectionTop from "./SectionTop";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <SectionTop eyebrow="GET IN TOUCH" kicker="06 — START A CONVERSATION" />
        <div className="contact-grid">
          <div className="contact-copy">
            <h2>Let&apos;s talk<br /><em>agriculture.</em></h2>
            <p className="lead">Good things grow through conversation.</p>
            <p>
              Whether you&apos;re looking to source agricultural commodities, explore partnerships, access our
              services, or discuss an agribusiness opportunity, we&apos;d love to hear from you.
            </p>
            <div className="contact-note">
              <span className="note-icon" aria-hidden="true">↗</span>
              <div>
                <strong>Have a specific opportunity?</strong>
                <p>Tell us what you have in mind. Our team will review your inquiry.</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
