# Correo: Navemar

Correo de contacto: **j08238920@gmail.com**

## 1. Configurar Gmail

1. **Nombre del remitente:** *Configuración (⚙️) → Ver toda la configuración → Cuentas e importación →
   Enviar como → editar información* → poner **Navemar - Ing. Jorge**.
   Así los clientes ven "Navemar - Ing. Jorge" en lugar de solo el correo.
2. **Firma:** abrir `firma-correo.html` en el navegador, seleccionar toda la firma (Ctrl+A), copiar (Ctrl+C) y
   pegar en *Configuración → General → Firma → Crear nueva*. Marcarla como predeterminada
   para correos nuevos y respuestas.
3. **Etiquetas** (para ordenar): `Navemar/Cotizaciones`, `Navemar/En proceso`, `Navemar/Entregados`.
4. **Filtro para la página web:** los mensajes del formulario llegan con el asunto
   *"Nueva solicitud desde la página web"*. Crear un filtro con ese asunto → aplicar etiqueta
   `Navemar/Cotizaciones` y marcar como importante.
5. **Activar el formulario de la página:** la primera vez llega un correo de **FormSubmit**
   pidiendo confirmar. Hacer clic en **Activate Form** (revisar también Spam).

> Más adelante se puede crear un correo con dominio propio (ej. `contacto@navemar.com`).
> Por ahora el Gmail funciona perfectamente.

## 2. Respuesta automática (opcional, para viajes o vacaciones)

*Configuración → General → Respuesta automática*

```
Asunto: Recibido - Navemar

Gracias por escribir a Navemar. He recibido su mensaje y le responderé a la brevedad.
Si es urgente, puede escribirme por WhatsApp al +58 412 101 1442.

Ing. Jorge
Navemar
```

## 3. Plantillas de respuesta

Para guardarlas en Gmail: *Configuración → Avanzada → Plantillas → Habilitar*. Luego, al redactar:
*⋮ → Plantillas → Guardar borrador como plantilla*.

### A. Acuse de recibo de una solicitud
```
Asunto: Re: Solicitud de cotización - [Proyecto]

Estimado(a) [Nombre]:

Gracias por contactar a Navemar. He recibido la información de su proyecto
"[Proyecto]" y la estoy revisando.

Para preparar una cotización precisa, le agradezco enviarme (si aún no lo ha hecho):
- Planos o descripción del alcance
- Cómputos métricos (si los tiene)
- Pliego o bases de la licitación
- Fecha límite de entrega de la oferta

Le enviaré la cotización a más tardar el [día].

Saludos cordiales,
```

### B. Envío de cotización
```
Asunto: Cotización Navemar - [Servicio] - [Proyecto]

Estimado(a) [Nombre]:

Adjunto la cotización para el servicio de [servicio] del proyecto "[Proyecto]".

Resumen:
- Alcance: [descripción breve]
- Tiempo de entrega: [X días hábiles] a partir de la confirmación
- Monto: [monto]
- Forma de pago: [ej. 50% al inicio y 50% a la entrega]

La cotización tiene una validez de [15] días. Quedo atento a sus comentarios.

Saludos cordiales,
```

### C. Seguimiento (si no responde en 3-5 días)
```
Asunto: Re: Cotización Navemar - [Proyecto]

Estimado(a) [Nombre]:

Le escribo para saber si tuvo oportunidad de revisar la cotización que le envié
el [fecha]. Con gusto aclaro cualquier duda o ajusto el alcance según lo que necesite.

Recuerde que la fecha límite de la licitación es el [fecha], por lo que le sugiero
confirmar con tiempo para entregarle el trabajo sin apuros.

Saludos cordiales,
```

### D. Entrega del trabajo
```
Asunto: Entrega - [Servicio] - [Proyecto]

Estimado(a) [Nombre]:

Adjunto el trabajo de [servicio] del proyecto "[Proyecto]":
- [Archivo 1: ej. APU en Excel]
- [Archivo 2: ej. Resumen del presupuesto en PDF]

Le agradezco revisarlo y avisarme si necesita algún ajuste antes de consignar.

Ha sido un gusto trabajar con usted. ¡Éxito en la licitación!

Saludos cordiales,
```

### E. Agradecimiento y recomendación
```
Asunto: Gracias por confiar en Navemar

Estimado(a) [Nombre]:

Muchas gracias por confiar en Navemar para su proyecto "[Proyecto]".
Si conoce a otra empresa o colega que necesite apoyo con costos, APU u ofertas
para licitaciones, le agradecería mucho que me recomiende.

Quedo a la orden para sus próximos proyectos.

Saludos cordiales,
```
