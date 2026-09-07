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
        <div style={{ color: "#1B4332", fontSize: 28, fontWeight: 600 }}>RutaTrámite</div>
        <div style={{ color: "#252B26", fontSize: 64, fontWeight: 700, marginTop: 16, lineHeight: 1.1 }}>
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
