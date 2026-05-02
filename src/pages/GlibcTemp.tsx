import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function GlibcTemp() {
  return (
    <PageContainer
      title="Glibc (na Toolchain)"
      subtitle="A biblioteca C do GNU. Esta versão sobrevive até o sistema final — não é descartada."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <h2>Por que a Glibc é tão importante?</h2>
      <p>
        Praticamente todo programa em C/C++ no Linux depende dela. Define{" "}
        <code>printf</code>, <code>open</code>, <code>malloc</code>, e implementa
        as syscalls de forma portável. É o coração do espaço de usuário.
      </p>

      <h2>Preparando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf glibc-2.42.tar.xz
cd glibc-2.42

# Symlinks para LSB compliance:
case $(uname -m) in
    i?86)   ln -sfv ld-linux.so.2 $LFS/lib/ld-lsb.so.3
    ;;
    x86_64) ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64
            ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64/ld-lsb-x86-64.so.3
    ;;
esac

patch -Np1 -i ../glibc-2.42-fhs-1.patch

mkdir -v build
cd build

echo "rootsbindir=/usr/sbin" > configparms`}
      />

      <h2>Configurando</h2>
      <CodeBlock
        language="bash"
        code={`../configure                             \\
      --prefix=/usr                      \\
      --host=$LFS_TGT                    \\
      --build=$(../scripts/config.guess) \\
      --enable-kernel=4.19               \\
      --with-headers=$LFS/usr/include    \\
      --disable-nscd                     \\
      libc_cv_slibdir=/usr/lib`}
      />

      <h3>Flags-chave</h3>
      <ul>
        <li><code>--prefix=/usr</code> — vai para <code>/usr/lib</code> dentro do <code>$LFS</code> via DESTDIR.</li>
        <li><code>--host=$LFS_TGT</code> — alvo cross.</li>
        <li><code>--with-headers=$LFS/usr/include</code> — usa os headers do kernel que acabamos de instalar.</li>
        <li><code>--enable-kernel=4.19</code> — versão mínima de kernel que esta Glibc suporta.</li>
      </ul>

      <h2>Compilando e instalando</h2>
      <CodeBlock
        language="bash"
        code={`make
make DESTDIR=$LFS install`}
      />

      <h2>Correção do path do interpretador</h2>
      <CodeBlock
        language="bash"
        code={`sed '/RTLDLIST=/s@/usr@@g' -i $LFS/usr/bin/ldd`}
      />

      <h2>Teste de sanidade</h2>
      <p>
        Depois de instalar, vamos verificar que o cross-compiler está realmente
        produzindo binários ligados à <em>Glibc nova</em>, não à do host:
      </p>
      <CodeBlock
        language="bash"
        code={`echo 'int main(){}' | $LFS_TGT-gcc -xc -
readelf -l a.out | grep ld-linux

# saída esperada:
# [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

rm -v a.out`}
      />

      <AlertBox type="warning" title="Saída diferente?">
        Se aparecer <code>/lib/ld-linux.so</code> apontando para o host, algo
        está errado. Pare. Releia os passos de Binutils Pass 1 e GCC Pass 1.
      </AlertBox>

      <h2>Limpando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
rm -rf glibc-2.42`}
      />
    </PageContainer>
  );
}
