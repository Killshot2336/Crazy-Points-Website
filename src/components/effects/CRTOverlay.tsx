export default function CRTOverlay() {
  return (
    <div className="crt-overlay pointer-events-none fixed inset-0 z-[9998]" aria-hidden="true">
      <div className="crt-scanlines absolute inset-0" />
      <div className="crt-vignette absolute inset-0" />
      <div className="crt-curvature absolute inset-0" />
    </div>
  );
}
