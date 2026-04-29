import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function CreatingDirs() {
  return (
    <PageContainer
      title="Criando os Diretórios do FHS"
      subtitle="Estrutura de diretórios padrão Linux (Filesystem Hierarchy Standard)."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Comando único</h2>
      <CodeBlock
        language="bash"
        code={`mkdir -pv /{boot,home,mnt,opt,srv}
mkdir -pv /etc/{opt,sysconfig}
mkdir -pv /lib/firmware
mkdir -pv /media/{floppy,cdrom}
mkdir -pv /usr/{,local/}{include,src}
mkdir -pv /usr/lib/locale
mkdir -pv /usr/local/{bin,lib,sbin}
mkdir -pv /usr/{,local/}share/{color,dict,doc,info,locale,man}
mkdir -pv /usr/{,local/}share/{misc,terminfo,zoneinfo}
mkdir -pv /usr/{,local/}share/man/man{1..8}
mkdir -pv /var/{cache,local,log,mail,opt,spool}
mkdir -pv /var/lib/{color,misc,locate}

ln -sfv /run /var/run
ln -sfv /run/lock /var/lock

install -dv -m 0750 /root
install -dv -m 1777 /tmp /var/tmp`}
      />

      <h2>O que está acontecendo?</h2>
      <ul>
        <li><code>/boot</code> — kernel e GRUB.</li>
        <li><code>/etc</code> — configurações.</li>
        <li><code>/home</code> — diretórios de usuários.</li>
        <li><code>/var</code> — dados variáveis (logs, caches, mail).</li>
        <li><code>/tmp</code>, <code>/var/tmp</code> — temporários (sticky bit).</li>
        <li><code>/root</code> — home do root, modo 0750.</li>
      </ul>
    </PageContainer>
  );
}
