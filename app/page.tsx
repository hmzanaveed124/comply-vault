import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Homepage } from "@/components/homepage/Homepage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ComplyVault | Client Conversations, Follow-Through & Evidence",
  description:
    "Source-linked records for RIA advisers and CCOs. Inspect transcript evidence, record sign-off and export documentation.",
  openGraph: {
    title: "ComplyVault | Better Conversations. Reviewable Evidence.",
    description:
      "The context behind the advice. The record behind the decision. Source-linked records for RIA teams.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "ComplyVault | Better Conversations. Reviewable Evidence.",
    description:
      "Connect client conversations, transcript evidence and CCO sign-off in one record.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "en-GB": `${SITE_URL}/uk`,
      "x-default": SITE_URL,
    },
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Homepage />
      <Footer />
    </main>
  );
}
