import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BusinessBARN — Buy, Sell & Start Businesses in B.C.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1f14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>Business</span>
          <span style={{ fontSize: 48, fontWeight: 700, color: '#f59e0b' }}>BARN</span>
        </div>
        <p style={{ fontSize: 28, color: '#94a3b8', maxWidth: 700, lineHeight: 1.4 }}>
          Buy, Sell &amp; Start Businesses in British Columbia
        </p>
      </div>
    ),
    size,
  )
}
