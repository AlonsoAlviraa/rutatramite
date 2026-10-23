import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Logo 3a (23-10-2026): R-flecha crema + acento ámbar sobre círculo #1B4332.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <svg width="32" height="32" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#1B4332" /><path d="M12 31V10h9a6 6 0 0 1 0 12h-4l11 9" fill="none" stroke="#FAF7F2" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.5 31H28.5V27" fill="none" stroke="#E9A23B" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
    size,
  );
}
