import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ChangingOwnership() {
  return (
    <PageContainer
      title="Mudando o Dono dos Arquivos"
      subtitle="Antes do chroot, todos os arquivos do LFS precisam pertencer ao root."
      difficulty="intermediario"
      timeToRead="3 min"
    >
      <h2>Por quê?</h2>
      <p>
        Até agora, tudo em <code>$LFS</code> pertence ao usuário <code>lfs</code>{" "}
        (UID 1001 ou similar). Dentro do chroot, esse UID não existe — vai dar
        erros e arquivos órfãos. Convertemos tudo para <code>root:root</code>.
      </p>

      <h2>Comando</h2>
      <CodeBlock
        language="bash"
        code={`# saia do shell do usuário lfs:
exit

# como root no host:
chown -R root:root $LFS/{usr,lib,var,etc,bin,sbin,tools}
case $(uname -m) in
  x86_64) chown -R root:root $LFS/lib64 ;;
esac`}
      />

      <AlertBox type="warning" title="Use o usuário lfs apenas para a toolchain">
        Após este chown, NÃO faça mais nada como <code>lfs</code>. Todo o
        trabalho subsequente é como root (no host) ou no chroot (também como
        root, mas isolado).
      </AlertBox>
    </PageContainer>
  );
}
