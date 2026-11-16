import type { Metadata } from "next";
import { InformationPage } from "@/components/common/InformationPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "General website and ordering information for Ian Blackmore Designs.",
};

export default function TermsAndConditionsPage() {
  return (
    <InformationPage title="Terms & Conditions">
      <p>This page outlines general information about using the Ian Blackmore Designs website and making inquiries or purchases.</p>
      <section><h2>Product information</h2><p>Review the description, dimensions, price, and availability of a board before purchasing. Photographs and screen settings can affect how colors and finishes appear. Contact us if you need clarification about a particular board.</p></section>
      <section><h2>Orders and payments</h2><p>Payments are handled through Square checkout. Review the order details and any terms presented at checkout before completing payment. If you notice an issue with an order, contact us promptly.</p></section>
      <section><h2>Custom boards</h2><p>A custom-board inquiry begins a conversation about your requirements. Design specifications, pricing, deposits, and production timing should be confirmed directly with Ian Blackmore Designs before work begins.</p></section>
      <section><h2>Delivery, changes, and returns</h2><p>For delivery arrangements, order changes, cancellations, or return questions, contact us with your order details. Confirm the arrangements applicable to your board before purchasing.</p></section>
      <section><h2>Contact</h2><p>For questions about this website or an order, email <a href="mailto:ian@ibdesigns.us">ian@ibdesigns.us</a>.</p></section>
    </InformationPage>
  );
}
