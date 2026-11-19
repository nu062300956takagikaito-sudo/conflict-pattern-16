import type { ReactNode } from 'react'
import { AdSlot } from './AdSlot'

interface AdEdgeRailsProps {
  children: ReactNode
  /** Prefix for data-ad-slot ids (landing | result) */
  page: 'landing' | 'result'
}

/**
 * Desktop: calm side rails (skyscraper + medium rectangle).
 * Phone: same slots stack under the main content.
 *
 * TODO(AdSense): swap AdSlot placeholders for live units; keep layout.
 */
export function AdEdgeRails({ children, page }: AdEdgeRailsProps) {
  return (
    <div className="ad-rails-layout">
      <aside className="ad-rail ad-rail-start" aria-label="広告">
        <AdSlot format="skyscraper" slotId={`${page}-left-sky`} />
        <div className="ad-rail-mobile-only">
          <AdSlot format="rectangle" slotId={`${page}-left-rect`} />
        </div>
      </aside>

      <div className="ad-rails-main">{children}</div>

      <aside className="ad-rail ad-rail-end" aria-label="広告">
        <AdSlot format="rectangle" slotId={`${page}-right-rect`} />
        <div className="ad-rail-desktop-only ad-rail-stack">
          <AdSlot format="rectangle" slotId={`${page}-right-rect-2`} />
        </div>
      </aside>
    </div>
  )
}
