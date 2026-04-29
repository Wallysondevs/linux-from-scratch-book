import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ComeceAqui() {
  return (
    <PageContainer
      title="Do Zero Absoluto"
      subtitle="Você nunca compilou nada na vida? Sem problemas. Aqui o livro começa do começo."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>O que é "compilar"?</h2>
      <p>
        Programas como <code>bash</code>, <code>ls</code>, <code>cat</code> são
        escritos em uma linguagem de programação (geralmente C). Esse texto é o{" "}
        <strong>código-fonte</strong>. O computador não entende C diretamente —
        ele só executa instruções binárias da CPU.
      </p>
      <p>
        <strong>Compilar</strong> é o processo de traduzir o código-fonte em
        binário executável. O programa que faz essa tradução é chamado de{" "}
        <strong>compilador</strong>. No mundo Linux, o compilador padrão é o{" "}
        <code>gcc</code> (GNU Compiler Collection).
      </p>

      <h2>O ciclo "configure, make, make install"</h2>
      <p>
        Quase todo projeto C/C++ no Linux é compilado com três comandos. Veja
        um exemplo simples (não rode ainda — é só para conhecer o padrão):
      </p>
      <CodeBlock
        language="bash"
        code={`tar -xf programa-1.0.tar.xz       # extrair o tarball
cd programa-1.0                  # entrar no diretório

./configure --prefix=/usr        # detectar sistema e gerar Makefile
make                             # compilar (pode levar minutos/horas)
make install                     # copiar binários para /usr/bin etc.`}
      />
      <p>
        O LFS faz <strong>exatamente isso</strong> dezenas de vezes. A única
        diferença é que algumas opções de <code>./configure</code> mudam, e a
        ordem importa: você precisa do GCC para compilar a Glibc, mas o GCC
        precisa da Glibc para funcionar — daí os "passes".
      </p>

      <h2>O que é uma "toolchain"?</h2>
      <p>
        Toolchain é o conjunto de ferramentas necessárias para compilar
        software:
      </p>
      <ul>
        <li><strong>Compilador</strong> (<code>gcc</code>) — traduz C em assembly.</li>
        <li><strong>Assembler</strong> (<code>as</code>) — traduz assembly em código objeto.</li>
        <li><strong>Linker</strong> (<code>ld</code>) — junta vários objetos + bibliotecas em um executável.</li>
        <li><strong>Biblioteca C</strong> (<code>glibc</code>) — funções básicas como <code>printf</code>, <code>open</code>, <code>malloc</code>.</li>
        <li><strong>Headers do kernel</strong> — definem a interface entre programas e o kernel Linux.</li>
      </ul>

      <h2>Por que precisamos de uma toolchain "isolada"?</h2>
      <p>
        Se você compilasse os pacotes do LFS usando o GCC do seu Ubuntu (host),
        os binários ficariam <strong>amarrados às bibliotecas do Ubuntu</strong>:
        ao tentar dar boot no LFS sozinho, nada funcionaria.
      </p>
      <p>
        Por isso o livro constrói primeiro uma toolchain temporária dentro de{" "}
        <code>/mnt/lfs/tools</code>, isolada do host. Depois, dentro do{" "}
        <code>chroot</code>, essa toolchain é usada para compilar o sistema
        final, que será 100% independente.
      </p>

      <h2>Mapa mental rápido</h2>
      <CodeBlock
        language="text"
        code={`HOST (Ubuntu/Debian/Arch...)
   ↓ usa gcc do host para construir
TOOLCHAIN TEMPORÁRIA em /mnt/lfs/tools
   ↓ usa essa toolchain para construir
FERRAMENTAS BÁSICAS em /mnt/lfs/usr (chroot)
   ↓ entra no chroot e usa elas para construir
SISTEMA FINAL — Glibc, Bash, Coreutils, Vim, Kernel, GRUB...
   ↓ instala GRUB e reboota
SEU PRÓPRIO LINUX 🎉`}
      />

      <AlertBox type="info" title="Não decore — entenda">
        Você NÃO precisa decorar todos os passos. Precisa entender por que cada
        um existe. O livro vai repetir a explicação várias vezes — confie no
        processo e leia tudo.
      </AlertBox>

      <h2>Próximos passos</h2>
      <ol>
        <li>Leia <a href="#/pre-requisitos">Pré-requisitos</a> para conferir se sua máquina serve.</li>
        <li>Leia <a href="#/convencoes">Tipografia & Convenções</a> para entender as marcações do livro.</li>
        <li>Vá direto para <a href="#/requisitos-host">Requisitos do Host</a> para começar a parte prática.</li>
      </ol>
    </PageContainer>
  );
}
