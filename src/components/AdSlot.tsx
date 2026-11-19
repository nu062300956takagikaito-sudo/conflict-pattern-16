/**
 * Soft display-ad placeholder for empty edges.
 *
 * TODO(AdSense): When publisher ID / ad unit IDs are ready, replace the
 * inner `.ad-slot-frame` content with the official AdSense snippet (or a
 * thin wrapper that injects it). Do not commit AdSense keys or client IDs
 * into source — load them from env / hosting secrets at that time.
 */

export type AdFormat = 'rectangle' | 'skyscraper'

const FORMAT_META: Record<
  AdFormat,
  { sizeLabel: string; width: number; height: number }
> = {
  rectangle: { sizeLabel: '300 × 250', width: 300, height: 250 },
  skyscraper: { sizeLabel: '160 × 600', width: 160, height: 600 },
}

interface AdSlotProps {
  format: AdFormat
  /** Distinguishes left/right slots for future AdSense unit mapping */
  slotId: string
}

export function AdSlot({ format, slotId }: AdSlotProps) {
  const meta = FORMAT_META[format]

  return (
    <div
      className={`ad-slot ad-slot-${format}`}
      data-ad-slot={slotId}
      data-ad-format={format}
      role="complementary"
      aria-label="広告"
    >
      {/* Review mode: solid black placement blocks (label/text visually hidden) */}
      <span className="ad-slot-label sr-only">広告</span>
      <div
        className="ad-slot-frame"
        style={{
          aspectRatio: `${meta.width} / ${meta.height}`,
          maxWidth: meta.width,
        }}
      >
        {/* TODO(AdSense): inject unit for data-ad-slot={slotId} here */}
        <span className="ad-slot-size sr-only">{meta.sizeLabel}</span>
        <span className="ad-slot-todo sr-only">広告枠（準備中）</span>
      </div>
    </div>
  )
}
