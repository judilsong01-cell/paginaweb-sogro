# Paquete Navemar: WhatsApp + correo + página web

Todo lo necesario para atender clientes por **WhatsApp** y **correo**, con la página web como vitrina.

| Pieza | Archivo | Para qué sirve |
|---|---|---|
| Página web | `../public/` | Vitrina con servicios, botón de WhatsApp y formulario que llega al correo |
| WhatsApp Business | `1-whatsapp-business.md` | Perfil, bienvenida, ausencia, respuestas rápidas, catálogo, etiquetas, estados y mensaje para avisar a los contactos |
| Correo | `2-correo.md` | Configuración de Gmail, respuesta automática y 5 plantillas (acuse, cotización, seguimiento, entrega, agradecimiento) |
| Firma de correo | `firma-correo.html` | Abrir en el navegador, copiar y pegar en Gmail |
| Imágenes | `imagenes/` | Tarjeta digital, presentación, 5 servicios y QR (1080×1080, listas para WhatsApp) |

## Imágenes

| Archivo | Uso |
|---|---|
| `01-tarjeta-digital.png` | Foto de perfil provisional, enviar a nuevos contactos, estado de WhatsApp |
| `02-presentacion.png` | Primer estado, mensaje de difusión |
| `03` a `07-servicio-N.png` | Catálogo de WhatsApp Business y estados |
| `08-qr-whatsapp.png` | Para imprimir o poner en presentaciones y cursos |
| `qr-whatsapp-solo.png` | Solo el código QR, para insertar en otros diseños |

Los QR abren un chat con el **+58 412 101 1442** y el mensaje
*"Hola Ing. Jorge, quisiera información sobre los servicios de Navemar"*.

Para cambiar textos o datos de las imágenes: editar `fuentes/generar-imagenes.js` y volver a ejecutarlo.

## Orden sugerido para empezar

1. Instalar WhatsApp Business y completar el perfil (sección 1-2 de `1-whatsapp-business.md`).
2. Configurar bienvenida, ausencia, respuestas rápidas y catálogo (secciones 3-5).
3. Configurar Gmail: nombre del remitente, firma y etiquetas (`2-correo.md`).
4. Publicar la página web en Cloudflare (ver `../README.md`) y probar el formulario.
5. Enviar el mensaje de difusión a los contactos con la tarjeta digital.
6. Publicar estados 2-3 veces por semana.
