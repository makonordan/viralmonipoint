import { Icon } from "@/components/Icon";

/** Use on any tool touching money, watch time, views or timelines. */
export function DisclaimerBox({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-2xl border-2 border-yellow-deep bg-yellow-soft p-4 text-sm leading-relaxed text-[#4d3900]">
      <Icon name="alert" className="mt-0.5 size-5 flex-none" />
      <div>
        {children ?? (
          <>
            <strong className="text-ink">This is an estimate, not a guarantee.</strong> Real results depend on your
            content, audience and niche. YouTube, not ViralMoniPoint, decides who is approved for monetization.
          </>
        )}
      </div>
    </aside>
  );
}
