import { ImageResponse } from "next/og";

export const alt = "RutaTrámite: tus trámites en España, paso a paso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", marginRight: 24 }}>
            <svg width="96" height="96" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#1B4332" /><path d="M12 31V10h9a6 6 0 0 1 0 12h-4l11 9" fill="none" stroke="#FAF7F2" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.5 31H28.5V27" fill="none" stroke="#E9A23B" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>
            <div style={{ display: "flex", color: "#252B26" }}>Ruta</div>
            <div style={{ display: "flex", color: "#1B4332" }}>Trámite</div>
          </div>
        </div>
        <div style={{ color: "#252B26", fontSize: 64, fontWeight: 700, marginTop: 28, lineHeight: 1.1 }}>
          Guías para hacer tus trámites en España.
        </div>
        <div style={{ color: "#252B26", fontSize: 28, marginTop: 28, maxWidth: 900 }}>
          Guías claras, documentos y sedes oficiales. Sin registro. No somos Administración.
        </div>
      </div>
    ),
    size,
  );
}
