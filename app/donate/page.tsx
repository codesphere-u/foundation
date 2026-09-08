import { CheckoutForm } from "@/components/CheckoutForm";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/donate",
  title: "Sponsor & Donate | Elderly Outreach Masaka | Hafisa Magezi Foundation",
  description:
    "Securely sponsor an elderly person in Kiyimbwe Village, Masaka with Hafisa Magezi Foundation Limited via Pesapal (MTN, Airtel, Visa, Mastercard). Sip. Support. Empower.",
});

export default function DonatePage() {
  return (
    <>
      <PageJsonLd path="/donate" />
      <PageHero
        eyebrow="Elderly Outreach Sponsorship"
        title="Sip. Support. Empower."
        subtitle="19 September 2026 · Kiyimbwe Village, Masaka. Join Hafisa Magezi Foundation Limited in restoring health, nutrition, and dignity for elderly community members."
        image="/images/community-solidarity.jpg"
        imageAlt="Community members gathered together in Uganda"
      />

      <section className="section-pad bg-paper relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <CheckoutForm defaultTierId="1-elderly" />

          <div className="mt-16 text-center text-xs text-muted max-w-lg mx-auto">
            <p className="font-semibold text-purple-deep">{site.legalName}</p>
            <p className="mt-1">
              Registered in Kampala, Uganda · Official Charity Campaign · All contributions verified directly by Pesapal API 3.0.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
