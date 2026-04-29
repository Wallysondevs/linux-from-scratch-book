import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function InputrcShells() {
  return (
    <PageContainer
      title="/etc/inputrc & /etc/shells"
      subtitle="Configurações do readline (setas/home/end no terminal) e lista de shells válidos."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>/etc/inputrc</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/inputrc << "EOF"
# /etc/inputrc - global readline config

set horizontal-scroll-mode Off
set meta-flag On
set input-meta On
set convert-meta Off
set output-meta On
set bell-style none

"\\eOd": backward-word
"\\eOc": forward-word

# setas/home/end/pgup/pgdown
"\\e[1~": beginning-of-line
"\\e[4~": end-of-line
"\\e[5~": beginning-of-history
"\\e[6~": end-of-history
"\\e[3~": delete-char
"\\e[2~": quoted-insert

"\\eOH": beginning-of-line
"\\eOF": end-of-line
"\\e[H": beginning-of-line
"\\e[F": end-of-line
EOF`}
      />

      <h2>/etc/shells</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/shells << "EOF"
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
EOF`}
      />

      <p className="text-sm text-muted-foreground mt-4">
        Programas como <code>chsh</code>, <code>useradd</code> e alguns servidores FTP
        validam o shell do usuário contra <code>/etc/shells</code>.
      </p>
    </PageContainer>
  );
}
