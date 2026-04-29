import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function LocaleConfig() {
  return (
    <PageContainer
      title="Configurando Locale"
      subtitle="Defina pt_BR.UTF-8 como locale padrão para mensagens, datas e formatação."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>/etc/locale.conf (Systemd)</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/locale.conf << "EOF"
LANG=pt_BR.UTF-8
LC_ALL=pt_BR.UTF-8
EOF

# para gerar o locale (caso ainda não esteja):
localedef -i pt_BR -f UTF-8 pt_BR.UTF-8`}
      />

      <h2>/etc/profile (SysV)</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/profile << "EOF"
export LANG=pt_BR.UTF-8
export LC_ALL=pt_BR.UTF-8
export LANGUAGE=pt_BR:en
EOF`}
      />

      <h2>Verificando depois do reboot</h2>
      <CodeBlock
        language="bash"
        code={`locale
# LANG=pt_BR.UTF-8
# LC_ALL=pt_BR.UTF-8
# ...

date
# qua 23 abr 2025 10:35:42 -03`}
      />
    </PageContainer>
  );
}
