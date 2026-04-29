import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BinutilsPass1() {
  return (
    <PageContainer
      title="Binutils — Pass 1"
      subtitle="O assembler e linker para o alvo. É o primeiro pacote da toolchain — e o que define seu SBU."
      difficulty="avancado"
      timeToRead="6 min"
    >
      <h2>O que tem no Binutils?</h2>
      <ul>
        <li><code>as</code> — assembler.</li>
        <li><code>ld</code> — linker.</li>
        <li><code>objdump</code>, <code>nm</code>, <code>strip</code>, <code>ar</code>, etc.</li>
      </ul>

      <h2>Build em diretório separado</h2>
      <p>
        Binutils <strong>exige</strong> ser construído em diretório separado dos
        fontes. Sempre crie <code>build/</code>:
      </p>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf binutils-2.42.tar.xz
cd binutils-2.42
mkdir -v build
cd build`}
      />

      <h2>Configurando</h2>
      <CodeBlock
        language="bash"
        code={`../configure --prefix=$LFS/tools \\
             --with-sysroot=$LFS \\
             --target=$LFS_TGT   \\
             --disable-nls       \\
             --enable-gprofng=no \\
             --disable-werror    \\
             --enable-new-dtags  \\
             --enable-default-hash-style=gnu`}
      />

      <h3>O que cada flag faz?</h3>
      <ul>
        <li><code>--prefix=$LFS/tools</code> — instala dentro de <code>/mnt/lfs/tools</code>, isolado.</li>
        <li><code>--with-sysroot=$LFS</code> — define <code>/mnt/lfs</code> como "raiz" lógica para o linker (ele só vai procurar libs ali).</li>
        <li><code>--target=$LFS_TGT</code> — alvo de cross. Aqui surge <code>x86_64-lfs-linux-gnu</code>.</li>
        <li><code>--disable-nls</code> — sem internacionalização (não precisamos por enquanto).</li>
        <li><code>--disable-werror</code> — não trata warnings como erro.</li>
        <li><code>--enable-default-hash-style=gnu</code> — bins menores e mais rápidos no link.</li>
      </ul>

      <h2>Compilando</h2>
      <CodeBlock
        language="bash"
        code={`make
# isto leva 1 SBU. Cronometre:
# time make
# anote esse tempo — ele será sua referência.`}
      />

      <h2>Instalando</h2>
      <CodeBlock
        language="bash"
        code={`make install`}
      />

      <h2>Limpando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
rm -rf binutils-2.42`}
      />

      <AlertBox type="success" title="Concluído!">
        Sua toolchain agora tem assembler e linker para o alvo. Próximo passo:
        construir o GCC Pass 1 que vai usar esse linker.
      </AlertBox>

      <AlertBox type="warning" title="Erro 'cannot create regular file'?">
        Provavelmente <code>$LFS/tools</code> não tem permissão de escrita para
        o usuário <code>lfs</code>. Saia, vire root, faça{" "}
        <code>chown -v lfs $LFS/tools</code> e volte.
      </AlertBox>
    </PageContainer>
  );
}
