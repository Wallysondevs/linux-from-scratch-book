# Linux From Scratch — Livro Completo em Português

Guia interativo do **Linux From Scratch (LFS)** traduzido e explicado em **português brasileiro**, cobrindo a versão LFS 12.x do início ao fim: requisitos do host, partição, toolchain temporária, chroot, build do sistema final, configuração, kernel, GRUB e primeiro boot. Inclui uma introdução prática ao **BLFS** (Beyond Linux From Scratch) com Xorg, ambientes desktop, rede, segurança e gerenciamento de pacotes.

> Construa sua própria distribuição Linux a partir do código-fonte. Sem instalador, sem gerenciador de pacotes, sem mágica — só você, um host de boot, um compilador e o livro inteiro em português.

## Stack

- **React 19** + **Vite 7** + **TypeScript**
- **Tailwind CSS 4** + tema escuro (laranja/âmbar)
- **wouter** (hash routing)
- **framer-motion** para transições e barra de progresso
- **react-syntax-highlighter** para os blocos de comandos shell
- **Radix UI** + **lucide-react**

## Conteúdo

Mais de 75 páginas cobrindo:

- **Comece Aqui** — aviso legal, o que é o LFS, pré-requisitos, convenções, versão coberta
- **Preparando o Hospedeiro** — `version-check`, particionamento, sistema de arquivos, `/mnt/lfs`, `/sources`, usuário e ambiente do LFS, SBUs e test suites
- **Toolchain Temporária** — Binutils Pass 1, GCC Pass 1, Linux API Headers, Glibc temp, Libstdc++ Pass 1
- **Ferramentas Cross-Compiladas** — M4, Ncurses, Bash, Coreutils, Diffutils, Grep, Patch (todos temporários), Binutils Pass 2, GCC Pass 2
- **Entrando no Chroot** — `chown`, sistemas virtuais (`/proc`, `/sys`, `/dev`, `/run`), entrada no chroot, criação de diretórios, arquivos essenciais, Gettext/Bison/Perl, limpeza
- **Sistema Final (Capítulo 8)** — Man-pages, Glibc final, Zlib, Bzip2, Xz, File, Readline, Flex, Tcl, Expect, Binutils final, GMP/MPFR/MPC, Attr/Acl/Libcap, GCC final, Ncurses final, Bison/Grep/Bash, Gdbm/Gperf/Expat, Perl, Autoconf/Automake, Kmod/Elfutils, Python, Coreutils, Diffutils, Groff/GRUB, Gzip/Iproute2/Kbd, Make/Patch/Tar, Texinfo/Vim, MarkupSafe/Jinja2, Systemd, D-Bus/Man-DB, Util-linux/E2fsprogs, strip & cleanup
- **Configuração do Sistema** — rede, bootscripts, locale, inputrc/shells, relógio, fstab
- **Kernel & Boot** — compilação do kernel Linux, instalação e configuração do GRUB, primeiro boot
- **BLFS** — introdução, gerenciamento de pacotes, Xorg, ambientes desktop, rede e segurança
- **Apêndices** — comandos essenciais, troubleshooting, referências

Cada página traz blocos de comandos prontos para copiar, badges de dificuldade, tempo estimado de leitura, alertas (info/warning/danger/success/tip) e caixas de prática.

## Como rodar localmente

```bash
git clone https://github.com/Wallysondevs/linux-from-scratch-book.git
cd linux-from-scratch-book
npm install
npm run dev
```

O servidor de desenvolvimento sobe em <http://localhost:5173>.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos estáticos vão para `dist/` e podem ser servidos por qualquer host estático (Netlify, Vercel, GitHub Pages, Nginx, etc.).

## Aviso

LFS é um projeto **educacional**. Não compile no seu sistema principal — use sempre uma VM dedicada ou uma partição separada de pelo menos 30 GB. O conteúdo deste livro é uma **tradução e adaptação didática** do material oficial do projeto LFS (<https://www.linuxfromscratch.org/>) para fins de estudo em língua portuguesa.

## Licença

Conteúdo educacional sob licença MIT — veja [LICENSE](LICENSE). Os comandos, scripts e versões dos pacotes referenciam o projeto oficial **Linux From Scratch**, que possui sua própria licença ([Creative Commons / MIT — ver site oficial](https://www.linuxfromscratch.org/lfs/copyright.html)).

---

Feito com ☕ por **Wallysondevs** — siga os outros livros desta coleção:

- [kali-guide](https://github.com/Wallysondevs/kali-guide)
- [debian-book](https://github.com/Wallysondevs/debian-book)
- [ubuntu-book](https://github.com/Wallysondevs/ubuntu-book)
- [arch-linux-book](https://github.com/Wallysondevs/arch-linux-book)
- [fedora-linux-guide](https://github.com/Wallysondevs/fedora-linux-guide)
