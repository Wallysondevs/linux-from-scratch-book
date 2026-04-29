import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AvisoLegal() {
  return (
    <PageContainer
      title="Aviso Legal & Cuidados"
      subtitle="LFS é educacional, mas mexe com partições, bootloaders e código que executa antes do kernel. Leia tudo."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>Você está modificando seu hardware</h2>
      <p>
        O LFS instala um bootloader (GRUB) e usa partições reais do seu disco. Um
        comando errado de <code>parted</code>, <code>mkfs</code>, <code>dd</code>,{" "}
        <code>grub-install</code> ou <code>chown</code> pode <strong>apagar
        completamente</strong> o seu sistema atual. Não há "desfazer".
      </p>

      <AlertBox type="danger" title="Use uma máquina virtual ou disco separado">
        Para a primeira leitura do livro, recomendamos fortemente que você use o
        VirtualBox, VMware ou QEMU/KVM com um disco virtual de 30 a 60 GB.
        Construir LFS dentro de uma VM evita absolutamente todos os riscos de
        perda de dados — e ainda permite usar snapshots para voltar quando algo
        quebra.
      </AlertBox>

      <h2>O LFS não vem com gerenciador de pacotes</h2>
      <p>
        Quando terminar o livro padrão, você terá um sistema Linux mínimo, sem{" "}
        <code>apt</code>, <code>pacman</code>, <code>dnf</code> ou{" "}
        <code>zypper</code>. Cada atualização futura é uma recompilação manual
        (ou você implementa um gerenciador de pacotes — o BLFS ensina como).
      </p>

      <h2>Não é uma alternativa ao Ubuntu/Arch/Fedora</h2>
      <p>
        Se você quer um Linux <strong>para usar no dia a dia</strong>, instale
        Debian, Ubuntu, Fedora ou Arch. O LFS não compete com elas — ele
        <strong> ensina como elas funcionam por dentro</strong>. É um exercício
        de profundidade, não de produtividade.
      </p>

      <h2>Tempo e paciência</h2>
      <ul>
        <li>
          <strong>Toolchain (Pass 1 + Pass 2):</strong> 4 a 8 horas em máquina
          moderna; até 24 horas em hardware antigo.
        </li>
        <li>
          <strong>Software do sistema (Cap. 8):</strong> 8 a 20 horas. É a parte
          mais longa — são mais de 80 pacotes compilados.
        </li>
        <li>
          <strong>Kernel:</strong> 30 minutos a 2 horas, dependendo da
          configuração escolhida.
        </li>
      </ul>

      <h2>Backup obrigatório</h2>
      <AlertBox type="warning" title="Faça backup ANTES de particionar">
        Se você for dual-boot ou usar disco real, <strong>faça backup completo</strong>{" "}
        do que importa antes de tocar em <code>parted</code>. Imagine que a partição
        errada vai ser apagada — porque uma hora vai. Backups são baratos; choro
        e ranger de dentes não.
      </AlertBox>

      <h2>Licença & créditos</h2>
      <p>
        O Linux From Scratch original é mantido por Gerard Beekmans e a equipe LFS,
        publicado sob{" "}
        <a href="https://www.linuxfromscratch.org/cdrom/license.html" target="_blank" rel="noopener noreferrer">
          Creative Commons BY-NC-SA 2.0
        </a>
        . Este livro é uma adaptação <strong>educacional</strong> em português,
        baseada na versão LFS 12.x estável. Sempre consulte também o livro oficial
        em <a href="https://www.linuxfromscratch.org/" target="_blank" rel="noopener noreferrer">linuxfromscratch.org</a> —
        ele é a fonte canônica e tem versões atualizadas frequentemente.
      </p>

      <AlertBox type="info" title="Resumo: 4 regras de ouro">
        <ul className="m-0">
          <li>Use VM ou disco separado.</li>
          <li>Faça backup antes de qualquer particionamento.</li>
          <li>Nunca rode comandos do livro como <code>root</code> no host quando o livro pedir o usuário <code>lfs</code>.</li>
          <li>Leia cada capítulo inteiro <em>antes</em> de digitar nada.</li>
        </ul>
      </AlertBox>
    </PageContainer>
  );
}
