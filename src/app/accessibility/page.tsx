import type { Metadata } from "next";
import { InformationPage } from "@/components/common/InformationPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility assistance and feedback for Ian Blackmore Designs.",
};

export default function AccessibilityPage() {
  return (
    <InformationPage title="Accessibility">
      <p>We want everyone to be able to explore Ian Blackmore Designs and learn about our surfboards. Your feedback helps us identify barriers and improve the website.</p>
      <section><h2>Need assistance?</h2><p>If you have difficulty browsing boards, using the menu or cart, or completing an inquiry, email <a href="mailto:ian@ibdesigns.us">ian@ibdesigns.us</a>. We can help you find product information and discuss your order.</p></section>
      <section><h2>Report an accessibility issue</h2><p>Please include the page address, a description of the problem, and, if you are comfortable sharing them, the browser or assistive technology you were using. Do not include passwords or payment details.</p></section>
      <section><h2>Third-party services</h2><p>Some features, including Square checkout and linked social platforms, are provided by third parties. If an issue with one of these services prevents you from completing a task, please contact us for assistance.</p></section>
    </InformationPage>
  );
}
