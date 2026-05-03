import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function MakePatchTar() {
  return (
    <PageContainer
      title="Make, Patch e Tar — Trio essencial"
      subtitle="Os três utilitários que tornam todo o LFS possível: orquestrar builds, aplicar correções e desempacotar fontes."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>Por que esses três juntos?</h2>
      <p>
        São pequenos, rápidos e completamente independentes — perfeitos
        para serem construídos em sequência. Sem qualquer um deles,
        nenhum outro pacote do LFS sequer começa a ser construído:
        <code> tar </code> extrai os fontes, <code>patch</code> aplica
        correções pontuais e <code>make</code> orquestra a compilação.
      </p>

      <AlertBox type="info" title="GNU make vs BSD make">
        Os <code>Makefile</code>s do GNU usam extensões (<code>$(shell)</code>,
        <code> ifeq</code>, padrões com <code>%</code>) que o
        <code> bmake </code> do BSD não entende. LFS exige
        <code> GNU make</code>.
      </AlertBox>

      <h2>Make</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf make-4.4.1.tar.gz
cd make-4.4.1

./configure --prefix=/usr   \\
            --without-guile \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf make-4.4.1`}
      />

      <ul>
        <li><code>--without-guile</code> — desabilita extensões em Guile (Scheme). LFS não usa, e Guile não está disponível ainda.</li>
      </ul>

      <h2>Patch</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf patch-2.8.tar.xz
cd patch-2.8

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf patch-2.8`}
      />

      <h2>Tar</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf tar-1.35.tar.xz
cd tar-1.35

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf tar-1.35`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Verificar versões cruzadas:
$LFS/usr/bin/make --version | head -1
$LFS/usr/bin/patch --version | head -1
$LFS/usr/bin/tar --version | head -1

# Smoke test do tar:
echo "ola" > /tmp/lfs.txt
$LFS/usr/bin/tar -czf /tmp/lfs.tar.gz -C /tmp lfs.txt
$LFS/usr/bin/tar -tzf /tmp/lfs.tar.gz   # → lfs.txt

# Smoke test do patch:
cat > /tmp/a <<EOF
linha 1
linha 2
EOF
cp /tmp/a /tmp/b && sed -i 's/linha 2/LINHA 2/' /tmp/b
diff -u /tmp/a /tmp/b > /tmp/p.diff
$LFS/usr/bin/patch /tmp/a < /tmp/p.diff
cat /tmp/a   # → linha 1 / LINHA 2`}
      />

      <PracticeBox title="Validar o trio antes de prosseguir">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Os três binários devem ser ELF 64-bit linkados à Glibc temporária.</li>
          <li><code>make -j$(nproc) --version</code> roda sem erros.</li>
          <li><code>tar --help | head</code> mostra opções <code>-c -x -t -z -j -J --xz</code>.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Tar sem suporte a XZ/Zstd">
        Se a libxz não estava presente no host quando você compilou o
        tar, ele não consegue extrair <code>.tar.xz</code> nem
        <code> .tar.zst</code>. Sintoma:
        <code> tar: Cannot use compressed or remote archives </code>
        no próximo pacote. Solução: instale <code>xz-utils</code> no
        host antes do build.
      </AlertBox>

      <AlertBox type="danger" title='"Hunk #1 FAILED at 23"'>
        Patches do BLFS frequentemente falham se você baixou o
        tarball de uma versão diferente. Sempre confira o checksum
        SHA256 dos sources contra o livro antes de aplicar patches.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo total dos três: ~0.7 SBU
# Tarballs: make-4.4.1.tar.gz, patch-2.8.tar.xz, tar-1.35.tar.xz
# Validação: make/patch/tar --version, todos linkados a Glibc temp
# Próximo passo: Xz e Binutils Pass 2`}
      />
    </PageContainer>
  );
}
