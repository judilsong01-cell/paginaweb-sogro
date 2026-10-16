/*
 * Genera las imágenes del paquete (tarjeta digital, servicios, QR) en paquete/imagenes/.
 *
 * Requisitos: Node.js con los paquetes "playwright" y "qrcode".
 *   npm i playwright qrcode && npx playwright install chromium
 *   node paquete/fuentes/generar-imagenes.js
 *
 * Para cambiar textos o datos, edita el objeto DATOS de abajo y vuelve a ejecutar.
 */
const path = require("path");
const { chromium } = require("playwright");
const QRCode = require("qrcode");

const DATOS = {
  empresa: "Navemar",
  nombre: "Ing. Jorge",
  cargo: "Ingeniero de costos y presupuestos",
  whatsapp: "584121011442",
  telefono: "+58 412 101 1442",
  email: "j08238920@gmail.com",
  mensajeWhatsapp: "Hola Ing. Jorge, quisiera información sobre los servicios de Navemar",
};

const SERVICIOS = [
  { titulo: "Estimación y control de costos", texto: "Estimamos el costo real de tu proyecto y lo controlamos durante la ejecución para que la obra no se salga del presupuesto.", icono: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>' },
  { titulo: "Análisis de Precios Unitarios (APU)", texto: "APU por partida con materiales, equipos, mano de obra, rendimientos y costos indirectos.", icono: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M8 14h2M12 14h2M8 18h2M12 18h4"/>' },
  { titulo: "Ofertas económicas para licitaciones", texto: "Preparamos tu oferta económica según el pliego, competitiva y lista para consignar.", icono: '<path d="M4 4h6l2 2h8v14H4z"/><path d="M9 13l2 2 4-4"/>' },
  { titulo: "Asesoría en análisis de costos", texto: "Revisamos tus presupuestos y costos para detectar pérdidas y proteger el margen de tu empresa.", icono: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>' },
  { titulo: "Material para cursos", texto: "Preparación de material didáctico para dictar cursos de costos, APU y presupuestos.", icono: '<path d="M2 7l10-4 10 4-10 4z"/><path d="M6 9v5c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/>' },
];

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.3l5.7-1.5a11.3 11.3 0 0 0 5.78 1.47h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04"/><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35"/></svg>';
const MAIL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1080px; height: 1080px; font-family: "Open Sans", sans-serif; overflow: hidden; }
  h1, h2, h3, .brand { font-family: "Montserrat", sans-serif; line-height: 1.15; }
  .navy { background:
      linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 54px 54px,
      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 54px 54px,
      linear-gradient(135deg, #0B2545 0%, #13315C 100%); color: #fff; }
  .page { width: 1080px; height: 1080px; padding: 80px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 20px; font-weight: 800; font-size: 44px; }
  .mark { width: 76px; height: 76px; border-radius: 18px; background: #F28C28; color: #0B2545; display: grid; place-items: center; font-size: 44px; }
  .brand small { display: block; font: 400 24px "Open Sans", sans-serif; color: #BFD0E6; margin-top: 4px; }
  .orange { color: #F28C28; }
  .eyebrow { font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #F28C28; font-size: 24px; }
  .contact { display: flex; flex-direction: column; gap: 14px; font-size: 30px; font-weight: 600; }
  .contact div { display: flex; align-items: center; gap: 16px; }
  .contact svg { width: 38px; height: 38px; color: #F28C28; flex-shrink: 0; }
  .spacer { flex: 1; }
`;

const marca = () => `<div class="brand"><span class="mark">N</span><span>${DATOS.empresa}<small>${DATOS.nombre} · ${DATOS.cargo}</small></span></div>`;
const contacto = () => `<div class="contact"><div>${WA_ICON}${DATOS.telefono}</div><div>${MAIL_ICON}${DATOS.email}</div></div>`;

function tarjeta(qr) {
  return `<div class="page navy">
    ${marca()}
    <div style="margin-top:64px" class="eyebrow">Servicios</div>
    <ul style="list-style:none;margin-top:22px;display:grid;gap:16px;font-size:31px">
      ${SERVICIOS.map(s => `<li style="display:flex;gap:18px;align-items:center"><span style="width:14px;height:14px;border-radius:50%;background:#F28C28;flex-shrink:0"></span>${s.titulo}</li>`).join("")}
    </ul>
    <div class="spacer"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:40px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:28px;padding:36px 40px">
      ${contacto()}
      <div style="text-align:center"><div style="background:#fff;padding:12px;border-radius:16px;width:200px;height:200px">${qr}</div><div style="font-size:19px;color:#BFD0E6;margin-top:10px">Escanea y escríbeme</div></div>
    </div>
  </div>`;
}

function presentacion() {
  return `<div class="page navy">
    ${marca()}
    <div class="spacer"></div>
    <div class="eyebrow">Estimación y control de costos</div>
    <h1 style="font-size:84px;font-weight:800;margin-top:24px">Presupuestos ajustados a la realidad. <span class="orange">Ofertas que ganan</span> y dejan ganancia.</h1>
    <p style="font-size:32px;color:#D9E2EC;margin-top:32px;line-height:1.45">¿Vas a presentar una oferta en una licitación? Te ayudo con los costos, los APU y la oferta económica.</p>
    <div class="spacer"></div>
    <div style="display:flex;align-items:center;gap:18px;background:#25D366;color:#fff;border-radius:999px;padding:24px 40px;font-size:34px;font-weight:700;align-self:flex-start"><span style="width:44px;height:44px;display:block">${WA_ICON}</span>Escríbeme: ${DATOS.telefono}</div>
  </div>`;
}

function servicio(s, i) {
  return `<div class="page" style="background:#F4F6F9;color:#1F2933;padding:0">
    <div class="navy" style="padding:64px 80px">${marca()}</div>
    <div style="flex:1;padding:72px 80px;display:flex;flex-direction:column">
      <div class="eyebrow" style="color:#D9741A">Servicio ${String(i + 1).padStart(2, "0")}</div>
      <div style="width:150px;height:150px;border-radius:32px;background:#FDF0E3;color:#D9741A;display:grid;place-items:center;margin:36px 0">
        <svg viewBox="0 0 24 24" style="width:84px;height:84px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.icono}</svg>
      </div>
      <h2 style="font-size:66px;color:#0B2545;font-weight:800">${s.titulo}</h2>
      <p style="font-size:34px;color:#52606D;margin-top:28px;line-height:1.45">${s.texto}</p>
    </div>
    <div style="background:#F28C28;color:#0B2545;padding:30px 80px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:700">
      <span>Cotiza por WhatsApp</span>
      <span style="display:flex;align-items:center;gap:14px"><span style="width:38px;height:38px;display:block">${WA_ICON}</span>${DATOS.telefono}</span>
    </div>
  </div>`;
}

function qrPagina(qr) {
  return `<div class="page" style="background:#fff;align-items:center;justify-content:center;text-align:center;color:#0B2545">
    <div class="brand" style="color:#0B2545"><span class="mark">N</span><span>${DATOS.empresa}<small style="color:#52606D">${DATOS.nombre}</small></span></div>
    <div style="width:560px;height:560px;margin:56px 0 40px">${qr}</div>
    <h2 style="font-size:52px;font-weight:800">Escanea y escríbeme por WhatsApp</h2>
    <p style="font-size:36px;color:#52606D;margin-top:16px;font-weight:600">${DATOS.telefono}</p>
  </div>`;
}

(async () => {
  const salida = path.join(__dirname, "..", "imagenes");
  require("fs").mkdirSync(salida, { recursive: true });
  const enlace = `https://wa.me/${DATOS.whatsapp}?text=${encodeURIComponent(DATOS.mensajeWhatsapp)}`;
  const qr = await QRCode.toString(enlace, { type: "svg", margin: 0, color: { dark: "#0B2545", light: "#FFFFFF" } });
  const qrPng = path.join(salida, "qr-whatsapp-solo.png");
  await QRCode.toFile(qrPng, enlace, { width: 1000, margin: 2, color: { dark: "#0B2545", light: "#FFFFFF" } });

  const piezas = [
    ["01-tarjeta-digital", tarjeta(qr)],
    ["02-presentacion", presentacion()],
    ...SERVICIOS.map((s, i) => [`${String(i + 3).padStart(2, "0")}-servicio-${i + 1}`, servicio(s, i)]),
    ["08-qr-whatsapp", qrPagina(qr)],
  ];

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [nombre, cuerpo] of piezas) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
      <style>${CSS} svg { width: 100%; height: 100%; display: block; }</style></head><body>${cuerpo}</body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(salida, `${nombre}.png`) });
    console.log("✓", nombre);
  }
  await browser.close();
})();
