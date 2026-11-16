import type { Metadata } from "next";
import { InformationPage } from "@/components/common/InformationPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Information about privacy and contacting Ian Blackmore Designs.",
};

export default function PrivacyPolicyPage() {
  return (
    <InformationPage title="Privacy Policy">
      <p>This page provides general information about personal information shared with Ian Blackmore Designs through inquiries and orders.</p>
      <section><h2>Information you share</h2><p>When you contact us or request a custom board, you may provide your name, email address, contact details, and information about your request. Order information may include billing and shipping details.</p></section>
      <section><h2>How information is used</h2><p>Information provided in an inquiry or order is used to respond to you, discuss board requirements, arrange fulfillment, and provide customer support.</p></section>
      <section><h2>Payments and third-party services</h2><p>Checkout is provided through Square. Information submitted during checkout is also subject to the payment provider’s privacy policies. Links to other websites may lead to services with their own privacy practices.</p></section>
      <section><h2>Questions and requests</h2><p>For questions about your information, or to request an update or deletion, contact <a href="mailto:ian@ibdesigns.us">ian@ibdesigns.us</a>. Please avoid including payment card details in email.</p></section>
    </InformationPage>
  );
}
