import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PreRequisitos() {
  return (
    <PageContainer
      title="Pré-requisitos"
      subtitle="O que você precisa saber, ter e estar disposto a investir antes de começar."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>Conhecimento mínimo</h2>
      <ul>
        <li>Saber abrir um terminal e usar <code>cd</code>, <code>ls</code>, <code>cat</code>, <code>nano</code>/<code>vim</code>.</li>
        <li>Entender o que são arquivos, diretórios, permissões, root vs usuário comum.</li>
        <li>Saber editar arquivos de texto e seguir instruções com calma.</li>
        <li><strong>Não é necessário</strong> saber programar em C — você só vai compilar, não codar.</li>
      </ul>

      <h2>Hardware mínimo</h2>
      <ul>
        <li><strong>CPU:</strong> qualquer x86_64 dos últimos 10 anos (Intel ou AMD). ARM funciona via CLFS, mas este livro foca em x86_64.</li>
        <li><strong>RAM:</strong> 4 GB mínimo, 8+ GB recomendado (compilar GCC consome bastante).</li>
        <li><strong>Disco:</strong> partição/disco virtual de pelo menos <strong>30 GB</strong>. Recomendo 60 GB para sobrar espaço.</li>
        <li><strong>Internet:</strong> banda larga para baixar ~700 MB de pacotes-fonte.</li>
        <li><strong>Tempo de máquina:</strong> 8 a 40 horas de compilação (não precisa ficar olhando).</li>
      </ul>

      <h2>Software no host</h2>
      <p>
        Você precisa de uma distribuição Linux já instalada (host) com versões
        relativamente recentes de Bash, GCC, Make, Binutils. Distros que
        funcionam bem:
      </p>
      <ul>
        <li>Ubuntu 22.04+ / 24.04 (recomendado para iniciantes)</li>
        <li>Debian 12+</li>
        <li>Fedora 39+</li>
        <li>Arch Linux (rolling)</li>
        <li>openSUSE Tumbleweed / Leap 15.5+</li>
      </ul>

      <AlertBox type="info" title="Não tem Linux instalado?">
        Use o <strong>VirtualBox</strong> (gratuito) ou <strong>VMware Workstation
        Player</strong> (gratuito uso pessoal) e instale o Ubuntu 24.04 numa VM
        com 8 GB RAM e 60 GB de disco. A partir <em>dela</em>, você constrói o
        LFS dentro de outra partição/disco virtual.
      </AlertBox>

      <h2>Pacotes que você precisa no host</h2>
      <p>
        O LFS exige que o host tenha algumas ferramentas instaladas. Em
        Debian/Ubuntu, instale tudo de uma vez:
      </p>
      <CodeBlock
        language="bash"
        code={`sudo apt update
sudo apt install -y \\
  build-essential bison gawk texinfo \\
  m4 wget curl git tar xz-utils gzip bzip2 \\
  patch perl python3 sudo \\
  binutils gcc g++ make`}
      />

      <p>
        Em Fedora:
      </p>
      <CodeBlock
        language="bash"
        code={`sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y bison gawk texinfo m4 wget curl git tar xz \\
                    gzip bzip2 patch perl python3 binutils gcc gcc-c++ make`}
      />

      <h2>Estado mental</h2>
      <ul>
        <li><strong>Paciência.</strong> Você vai esperar muito. Use o tempo para ler o capítulo seguinte.</li>
        <li><strong>Atenção.</strong> Copie e cole comandos com cuidado. Um <code>rm -rf /</code> trocado é fim de festa.</li>
        <li><strong>Anotação.</strong> Anote tudo que você fez. Quando der erro daqui a 5 capítulos, você vai querer saber o que tocou.</li>
        <li><strong>Sem pressa.</strong> Se não entender, pare e releia. Não passe ao próximo capítulo no automático.</li>
      </ul>

      <AlertBox type="success" title="Está pronto?">
        Se você marcou tudo acima, está pronto. Vá para{" "}
        <a href="#/requisitos-host">Requisitos do Host</a> e comece a parte prática.
      </AlertBox>
    </PageContainer>
  );
}
