/*
 * Aplica los datos de config.js a la página.
 * No es necesario editar este archivo para cambiar datos de contacto.
 */
(function () {
  var S = window.SITE || {};
  var has = function (k) { return typeof S[k] === "string" && S[k].trim() !== ""; };

  var ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.3l5.7-1.5a11.3 11.3 0 0 0 5.78 1.47h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    telefono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.76 0-4 1.79-4 4.5V11H7v4h3v9h4v-9h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4 0-3.2-1.95-3.2s-2.25 1.5-2.25 3.1V21H9z"/></svg>'
  };

  var fullName = [S.nombre, S.apellido].filter(Boolean).join(" ").trim() || "Ing. Jorge";
  var waLink = has("whatsapp")
    ? "https://wa.me/" + S.whatsapp.replace(/\D/g, "") + (has("mensajeWhatsapp") ? "?text=" + encodeURIComponent(S.mensajeWhatsapp) : "")
    : "";

  // Textos
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var value = key === "nombreCompleto" ? fullName : S[key];
    if (value) el.textContent = value;
  });
  document.title = (S.empresa || fullName) + " · Costos, APU y Licitaciones";
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mostrar u ocultar según el dato exista (data-requires="whatsapp" o "!whatsapp")
  document.querySelectorAll("[data-requires]").forEach(function (el) {
    var req = el.getAttribute("data-requires");
    var negate = req.charAt(0) === "!";
    var ok = has(negate ? req.slice(1) : req);
    el.hidden = negate ? ok : !ok;
  });

  // Enlaces de WhatsApp
  document.querySelectorAll("[data-wa]").forEach(function (el) { if (waLink) el.href = waLink; });

  // Logo
  if (has("logo")) {
    document.querySelectorAll(".brand-mark").forEach(function (el) {
      var img = document.createElement("img");
      img.src = S.logo; img.alt = fullName; img.className = "brand-logo";
      el.replaceWith(img);
    });
  }

  // Foto o iniciales
  document.querySelectorAll(".avatar").forEach(function (el) {
    if (has("foto")) {
      var img = document.createElement("img");
      img.src = S.foto; img.alt = fullName; img.className = "avatar";
      el.replaceWith(img);
    } else {
      var words = fullName.replace(/^Ing\.?\s*/i, "").split(/\s+/).filter(Boolean);
      el.textContent = words.slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("") || "J";
    }
  });

  // Canales de contacto
  var channels = [
    { key: "whatsapp", title: "WhatsApp / Teléfono", text: S.telefono || "Escríbeme directamente", href: waLink },
    { key: "email", title: "Correo", text: S.email, href: "mailto:" + S.email },
    { key: "telefono", title: "Teléfono", text: S.telefono, href: "tel:" + (S.telefono || "").replace(/[^\d+]/g, "") },
    { key: "instagram", title: "Instagram", text: "Ver perfil", href: S.instagram },
    { key: "facebook", title: "Facebook", text: "Ver página", href: S.facebook },
    { key: "linkedin", title: "LinkedIn", text: "Ver perfil", href: S.linkedin }
  ].filter(function (c) {
    // Si el teléfono es el mismo número de WhatsApp, se muestra una sola tarjeta
    if (c.key === "telefono" && has("whatsapp") && S.telefono.replace(/\D/g, "") === S.whatsapp.replace(/\D/g, "")) return false;
    return has(c.key);
  });

  var list = document.getElementById("channels");
  if (list) {
    channels.forEach(function (c) {
      var a = document.createElement("a");
      a.className = "channel"; a.href = c.href;
      if (/^https?:/.test(c.href)) { a.target = "_blank"; a.rel = "noopener"; }
      a.innerHTML = '<div class="icon">' + ICONS[c.key] + "</div><div><strong></strong><span></span></div>";
      a.querySelector("strong").textContent = c.title;
      a.querySelector("span").textContent = c.text;
      list.appendChild(a);
    });
    var empty = document.getElementById("channels-empty");
    if (empty) empty.hidden = channels.length > 0;
  }

  // Redes en el pie de página
  var social = document.getElementById("social");
  if (social) {
    channels.filter(function (c) { return c.key !== "telefono"; }).forEach(function (c) {
      var a = document.createElement("a");
      a.href = c.href; a.setAttribute("aria-label", c.title); a.innerHTML = ICONS[c.key];
      if (/^https?:/.test(c.href)) { a.target = "_blank"; a.rel = "noopener"; }
      social.appendChild(a);
    });
  }

  // Formulario de contacto (envío por FormSubmit al correo configurado)
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var button = form.querySelector("button[type=submit]");
    var show = function (type, msg) { status.className = "form-status " + type; status.textContent = msg; status.hidden = false; };

    if (!has("email")) {
      button.disabled = true;
      show("info", "El formulario estará activo muy pronto.");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!has("email")) return;
      if (form.elements._honey.value) return;

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data._subject = "Nueva solicitud desde la página web - " + (data.nombre || "");
      data._template = "table";

      button.disabled = true;
      var label = button.textContent;
      button.textContent = "Enviando…";

      fetch("https://formsubmit.co/ajax/" + S.email.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.body.success) !== "true") throw new Error(res.body.message || "Error");
          form.reset();
          show("ok", "¡Gracias! Tu mensaje fue enviado. Te responderé a la brevedad.");
        })
        .catch(function () {
          show("error", "No se pudo enviar el mensaje. Intenta de nuevo" + (has("email") ? " o escribe a " + S.email : "") + ".");
        })
        .then(function () { button.disabled = false; button.textContent = label; });
    });
  }
})();
