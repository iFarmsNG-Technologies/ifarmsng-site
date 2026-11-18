import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy | iFarmsNG" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Who we are</h2>
      <p>This website is operated by iFARMSNG Agro Business Technology Ltd (&ldquo;iFarmsNG&rdquo;, &ldquo;we&rdquo;).</p>
      <h2>What we collect</h2>
      <p>When you use the inquiry form we collect the details you enter: your full name, email address, inquiry type, subject and message, and, if you choose to provide them, your company or organisation and phone number. We also record the time you agreed to this policy. Our servers keep standard technical logs for security and reliability.</p>
      <h2>Why we use it</h2>
      <p>We use this information to read and respond to your inquiry and to keep a record of it. We do not use it for unrelated purposes.</p>
      <h2>Who can see it</h2>
      <p>Your inquiry is stored in our database and sent by email to our team. It may be handled by service providers that host the site or deliver email on our behalf, who may only use it to provide those services.</p>
      <h2>How long we keep it</h2>
      <p>We keep inquiries for as long as needed to respond and maintain a reasonable business record, then delete them.</p>
      <h2>Your rights</h2>
      <p>You may ask us to access, correct or delete the personal data we hold about you, or to withdraw your consent, by contacting us through the <a href="/#contact">inquiry form</a>.</p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The current version is always available on this page.</p>
    </LegalPage>
  );
}
