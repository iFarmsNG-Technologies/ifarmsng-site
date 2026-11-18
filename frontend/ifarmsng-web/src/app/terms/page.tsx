import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use | iFarmsNG" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <h2>Use of this website</h2>
      <p>This website is provided by iFARMSNG Agro Business Technology Ltd to share information about our business and to receive inquiries. By using it you agree to use it lawfully and not to attempt to disrupt it, gain unauthorised access, or submit unlawful, misleading or automated content.</p>
      <h2>Information only</h2>
      <p>Content on this website is general information about our business. It is not an offer, a financial promise or investment advice, and nothing here guarantees any return, outcome or commercial arrangement. Any commercial relationship is subject to separate written agreement.</p>
      <h2>Inquiries</h2>
      <p>Sending an inquiry does not create a contract or an obligation for either party to respond in a particular way or time. Please do not include sensitive personal information such as passwords or financial account details in your message.</p>
      <h2>Intellectual property</h2>
      <p>The iFarmsNG name, logo, text and design belong to iFARMSNG Agro Business Technology Ltd or its licensors and may not be reused without permission.</p>
      <h2>Liability</h2>
      <p>We take reasonable care to keep this website accurate and available but provide it &ldquo;as is&rdquo;, to the extent permitted by law.</p>
      <h2>Changes and contact</h2>
      <p>We may update these terms at any time; the current version is on this page. Questions can be sent through the <a href="/#contact">inquiry form</a>.</p>
    </LegalPage>
  );
}
