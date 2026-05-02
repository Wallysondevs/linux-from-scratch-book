import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function GccPass1() {
  return (
    <PageContainer
      title="GCC — Pass 1"
      subtitle="O compilador cross. Agora o host consegue gerar binários para o alvo LFS."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <h2>Dependências internas: GMP, MPFR, MPC, ISL</h2>
      <p>
        O GCC precisa de bibliotecas matemáticas (GMP, MPFR, MPC) e ISL.
        Em vez de instalá-las separadamente, copiamos para dentro da árvore do
        GCC e ele compila tudo junto:
      </p>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf gcc-15.2.0.tar.xz
cd gcc-15.2.0

tar -xf ../mpfr-4.2.2.tar.xz
mv -v mpfr-4.2.2 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc`}
      />

      <h2>Ajuste para multilib em x86_64</h2>
      <CodeBlock
        language="bash"
        code={`case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \\
        -i.orig gcc/config/i386/t-linux64
  ;;
esac`}
      />

      <h2>Build em diretório separado</h2>
      <CodeBlock
        language="bash"
        code={`mkdir -v build
cd build`}
      />

      <h2>Configurando</h2>
      <CodeBlock
        language="bash"
        code={`../configure                  \\
    --target=$LFS_TGT         \\
    --prefix=$LFS/tools       \\
    --with-glibc-version=2.40 \\
    --with-sysroot=$LFS       \\
    --with-newlib             \\
    --without-headers         \\
    --enable-default-pie      \\
    --enable-default-ssp      \\
    --disable-nls             \\
    --disable-shared          \\
    --disable-multilib        \\
    --disable-threads         \\
    --disable-libatomic       \\
    --disable-libgomp         \\
    --disable-libquadmath     \\
    --disable-libssp          \\
    --disable-libvtv          \\
    --disable-libstdcxx       \\
    --enable-languages=c,c++`}
      />

      <h3>Por que tantos --disable?</h3>
      <ul>
        <li><code>--without-headers</code> — Glibc ainda não existe no alvo.</li>
        <li><code>--with-newlib</code> — usa "stubs" no lugar da libc (que não existe).</li>
        <li><code>--disable-shared</code> — só libs estáticas; shared libs precisam de Glibc.</li>
        <li><code>--disable-threads/multilib/libatomic/...</code> — features que dependem de Glibc, ainda não disponíveis.</li>
        <li><code>--enable-default-pie/ssp</code> — flags de segurança modernas.</li>
      </ul>

      <h2>Compilando</h2>
      <CodeBlock
        language="bash"
        code={`make
# Aproximadamente 4-5 SBU.`}
      />

      <h2>Instalando</h2>
      <CodeBlock
        language="bash"
        code={`make install`}
      />

      <h2>Gerando o limits.h temporário</h2>
      <p>
        Sem Glibc, o GCC não consegue gerar um <code>limits.h</code> definitivo.
        O LFS pede para construir um intermediário:
      </p>
      <CodeBlock
        language="bash"
        code={`cd ..
cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \\
  $(dirname $($LFS_TGT-gcc -print-libgcc-file-name))/include/limits.h`}
      />

      <h2>Limpando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
rm -rf gcc-15.2.0`}
      />

      <AlertBox type="success" title="Cross-compiler pronto!">
        Agora você tem <code>x86_64-lfs-linux-gnu-gcc</code> em{" "}
        <code>$LFS/tools/bin</code>. Ele gera binários para o alvo, mas ainda
        não consegue linkar nada útil (sem Glibc). Vamos resolver isso.
      </AlertBox>
    </PageContainer>
  );
}
