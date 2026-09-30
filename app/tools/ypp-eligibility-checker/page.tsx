import { ToolLayout, toolMetadata } from "@/components/ToolLayout";
import { EligibilityChecker } from "./EligibilityChecker";

export const metadata = toolMetadata({
  title: "YouTube Partner Program Eligibility Checker",
  description:
    "Free YPP eligibility checker: enter your subscribers, watch hours and Shorts views to see if you meet YouTube's Tier 1 or Tier 2 monetization thresholds, and what's holding you back.",
  path: "/tools/ypp-eligibility-checker",
});

export default function Page() {
  return (
    <ToolLayout
      h1="Are You Eligible for the YouTube Partner Program?"
      eyebrow="YPP Eligibility Checker"
      intro="Enter your channel's numbers to see which YouTube Partner Program tier you meet, how close you are to full monetization, and which metric is holding you back."
    >
      <EligibilityChecker />
    </ToolLayout>
  );
}
