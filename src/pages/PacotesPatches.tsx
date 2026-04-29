import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PacotesPatches() {
  return (
    <PageContainer
      title="Baixando Pacotes & Patches"
      subtitle="Cerca de 700 MB de código-fonte. Tudo vem de servidores oficiais — sem mistério."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>O arquivo <code>wget-list-sysv</code></h2>
      <p>
        O LFS publica uma lista pronta com URLs de TODOS os pacotes. Baixe a
        lista correspondente à sua versão (substitua 12.x pela versão real):
      </p>
      <CodeBlock
        language="bash"
        code={`mkdir -pv $LFS/sources
chmod -v a+wt $LFS/sources

cd $LFS/sources
wget https://www.linuxfromscratch.org/lfs/downloads/stable/wget-list-sysv
# para a edição systemd:
# wget https://www.linuxfromscratch.org/lfs/downloads/stable/wget-list-systemd`}
      />

      <h2>Baixando tudo de uma vez</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
wget --input-file=wget-list-sysv --continue --directory-prefix=$LFS/sources`}
      />
      <p>
        O <code>--continue</code> permite retomar downloads interrompidos. Tome
        um café — pode levar de 10 minutos a algumas horas, dependendo da banda.
      </p>

      <h2>Verificando os checksums</h2>
      <p>
        Sempre baixe o <code>md5sums</code> oficial e confira:
      </p>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
wget https://www.linuxfromscratch.org/lfs/downloads/stable/md5sums
md5sum -c md5sums | grep -v ': OK$'
# esperado: nenhuma linha de saída (todos OK)`}
      />

      <AlertBox type="warning" title="Algum FAILED?">
        Re-baixe somente o pacote afetado: apague o arquivo, rode{" "}
        <code>wget URL_DO_PACOTE</code> e refaça o <code>md5sum -c</code>.
      </AlertBox>

      <h2>Patches</h2>
      <p>
        Alguns pacotes precisam de patches publicados pela equipe LFS (correções
        de bugs, ajustes de paths). Eles já estão na <code>wget-list</code>.
        Confira que vieram:
      </p>
      <CodeBlock
        language="bash"
        code={`ls $LFS/sources/*.patch | head
# devem aparecer patches como bash-*-fixes-*.patch, gcc-*.patch etc.`}
      />

      <h2>Estrutura do diretório <code>/sources</code></h2>
      <CodeBlock
        language="bash"
        code={`ls $LFS/sources/ | head -20
# binutils-2.42.tar.xz
# gcc-14.2.0.tar.xz
# glibc-2.40.tar.xz
# kernel-6.10.x.tar.xz
# bash-5.2.tar.gz
# coreutils-9.5.tar.xz
# ... e dezenas de outros`}
      />

      <AlertBox type="success" title="Tudo certo?">
        Tem ~80 pacotes, ~700 MB? checksums todos OK? Pode ir para o capítulo de{" "}
        <a href="#/usuario-lfs">Usuário LFS</a>.
      </AlertBox>
    </PageContainer>
  );
}
