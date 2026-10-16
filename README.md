# Página web — Ing. Jorge (Presupuestos, APU e Licitações)

Página de apresentação dos serviços, em espanhol, com formulário de contato.
Não precisa de servidor nem de programação: são arquivos estáticos.

## Estrutura

```
index.html              → a página
assets/css/styles.css   → cores, fontes e layout
assets/js/config.js     → ⭐ DADOS (contato, redes, foto, logo) — editar só aqui
assets/js/main.js       → aplica os dados na página (não precisa mexer)
assets/img/             → fotos e logo
redes-sociales.md       → textos para Instagram, Facebook e WhatsApp Business
```

## Como colocar os dados quando estiverem prontos

Abra `assets/js/config.js` e preencha entre as aspas. O que ficar vazio (`""`) não aparece.

| Campo | O que aparece na página |
|---|---|
| `apellido` | Nome completo no topo, no "Sobre mí" e no rodapé |
| `email` | Ativa o formulário de contato (as mensagens chegam nesse e-mail) e mostra o e-mail |
| `whatsapp` | Botão verde flutuante e cartão de WhatsApp (só números, com código do país, ex.: `584141234567`) |
| `telefono` | Telefone visível, para ligar |
| `instagram`, `facebook`, `linkedin` | Cartões na seção de contato e ícones no rodapé |
| `ciudad` | "Atención en … y a distancia" |
| `foto`, `logo` | Foto no "Sobre mí" e logo no topo (subir os arquivos em `assets/img/`) |

**Formulário:** usa o serviço gratuito [FormSubmit](https://formsubmit.co).
Depois de colocar o `email`, envie uma mensagem de teste pela página: vai chegar
um e-mail do FormSubmit pedindo para ativar — clique em "Activate" uma única vez.

## Publicar grátis (GitHub Pages)

1. No GitHub, abra o repositório → **Settings → Pages**.
2. Em *Branch*, escolha a branch com a página e a pasta `/ (root)` → **Save**.
3. Em alguns minutos fica disponível em `https://judilsong01-cell.github.io/paginaweb-sogro/`.

Depois é possível usar um domínio próprio (ex.: `ingjorge.com`) em *Settings → Pages → Custom domain*.
