# Navemar — Página web + pacote WhatsApp e e-mail

Página de apresentação dos serviços da Navemar (Ing. Jorge), em espanhol. O contato é só por **WhatsApp** e **e-mail**.
Não precisa de servidor nem de programação: são arquivos estáticos.

## Estrutura

```
public/                        → tudo o que vai para a internet
  index.html                   → a página
  404.html                     → página de "não encontrada"
  _headers                     → cabeçalhos de segurança/cache (Cloudflare)
  assets/css/styles.css        → cores, fontes e layout
  assets/js/config.js          → ⭐ DADOS (WhatsApp, e-mail, foto, logo) — editar só aqui
  assets/js/main.js            → aplica os dados na página (não precisa mexer)
  assets/img/                  → fotos e logo
wrangler.jsonc                 → configuração do Cloudflare
paquete/                       → pacote WhatsApp Business + e-mail + imagens (ver paquete/LEEME.md)
```

## Como colocar os dados quando estiverem prontos

Abra `public/assets/js/config.js` e preencha entre as aspas. O que ficar vazio (`""`) não aparece.

| Campo | O que aparece na página |
|---|---|
| `apellido` | Nome completo no topo, no "Sobre mí" e no rodapé |
| `empresa` | Nome da empresa (Navemar) no topo, título e rodapé |
| `email` | Ativa o formulário de contato (as mensagens chegam nesse e-mail) e mostra o e-mail |
| `whatsapp` | Botão verde flutuante e cartão de WhatsApp (só números, com código do país, ex.: `584141234567`) |
| `telefono` | Telefone visível, para ligar |
| `ciudad` | "Atención en … y a distancia" |
| `foto`, `logo` | Foto no "Sobre mí" e logo no topo (subir os arquivos em `public/assets/img/`) |

**Formulário:** usa o serviço gratuito [FormSubmit](https://formsubmit.co).
Depois de colocar o `email`, envie uma mensagem de teste pela página: vai chegar
um e-mail do FormSubmit pedindo para ativar — clique em "Activate" uma única vez.

## Publicar grátis no Cloudflare

A página roda no **Cloudflare Workers** (plano gratuito) e se atualiza sozinha
a cada alteração enviada ao GitHub.

**Configuração (uma única vez):**

1. Entre em [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** (Criar).
2. Escolha **Import a repository** (Importar um repositório) → conecte o GitHub, se pedir,
   e selecione `judilsong01-cell/paginaweb-sogro`.
3. Confira os campos:
   - **Project name:** `paginaweb-sogro` (tem que ser igual ao `name` do `wrangler.jsonc`)
   - **Build command:** deixar vazio
   - **Deploy command:** `npx wrangler deploy`
   - **Branch:** a branch onde está a página
4. **Deploy**. Em 1–2 minutos a página fica em
   `https://paginaweb-sogro.<sua-conta>.workers.dev`.

**Domínio próprio (opcional):** depois de comprar um domínio (ex.: `ingjorge.com`,
também dá para comprar no próprio Cloudflare), vá no Worker → **Settings → Domains & Routes → Add → Custom domain**.

**Testar no computador (opcional):** `npx wrangler dev` e abrir `http://localhost:8787`.
