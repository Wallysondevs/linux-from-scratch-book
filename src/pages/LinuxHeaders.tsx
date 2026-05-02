import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function LinuxHeaders() {
  return (
    <PageContainer
      title="Linux API Headers"
      subtitle="Os headers que a Glibc usa para conversar com o kernel. Não é o kernel inteiro — só as 'interfaces'."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>O que estamos instalando?</h2>
      <p>
        A Glibc precisa saber a interface de syscalls do kernel (números de
        syscall, structs como <code>stat</code>, ioctls, flags). Isso vem de
        arquivos <code>.h</code> no kernel — que extraímos sem compilar nada.
      </p>

      <h2>Extraindo e limpando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf linux-6.16.1.tar.xz
cd linux-6.16.1

make mrproper        # limpa qualquer resíduo`}
      />

      <h2>Instalando os headers</h2>
      <CodeBlock
        language="bash"
        code={`make headers
find usr/include -type f ! -name '*.h' -delete
cp -rv usr/include $LFS/usr`}
      />

      <h2>Limpando</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
rm -rf linux-6.16.1`}
      />

      <AlertBox type="info" title="O kernel real virá depois">
        Estes são só os <em>headers</em>. O kernel real (vmlinuz) vai ser
        compilado bem mais para frente, dentro do chroot, no capítulo de
        <a href="#/kernel"> Kernel</a>.
      </AlertBox>
    </PageContainer>
  );
}
