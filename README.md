# Linux From Scratch 12.4 — Manual em Português

Tradução completa e fiel do **manual oficial do Linux From Scratch (LFS) versão 12.4** (variante systemd) para o **português brasileiro**.

> Construa sua própria distribuição Linux a partir do código-fonte. Sem instalador, sem gerenciador de pacotes, sem mágica — só você, um host de boot, um compilador e o livro inteiro em português.

## Sobre

Este conteúdo foi **extraído diretamente da fonte oficial** (`linuxfromscratch.org/lfs/view/12.4-systemd/`) e traduzido preservando **todos os comandos, paths e nomes de pacotes exatamente como no original**. Nada foi inventado ou parafraseado: cada comando é literal ao manual oficial.

- **176 páginas** cobrindo do prefácio ao primeiro boot
- **676 blocos de comando/saída** preservados intactos
- Cobre: requisitos do host, partição, toolchain temporária, chroot, build do sistema final (Glibc, GCC, Binutils, Coreutils…), configuração do sistema, kernel Linux, GRUB e primeiro boot

## Stack

- **React 18** + **Vite 6** + **TypeScript**
- **Tailwind CSS 4** + tema escuro (laranja/âmbar)
- **wouter** (hash routing, compatível com GitHub Pages)
- **react-markdown** + remark-gfm para renderização do conteúdo

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O deploy para GitHub Pages é automático via GitHub Actions a cada push na branch `main`.

## Licença

O conteúdo do manual segue a licença do projeto Linux From Scratch (MIT / Creative Commons CC BY-NC-SA). Esta é uma tradução não-oficial mantida pela comunidade.
