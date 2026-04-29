import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ClockConfig() {
  return (
    <PageContainer
      title="Configurando o Relógio"
      subtitle="UTC ou horário local? E como o LFS sincroniza com o relógio do hardware."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>UTC (recomendado)</h2>
      <p>
        Sistemas Linux modernos usam o relógio de hardware em UTC. Programas
        convertem para o fuso local conforme <code>/etc/localtime</code>.
      </p>
      <CodeBlock
        language="bash"
        code={`# /etc/sysconfig/clock (SysV)
cat > /etc/sysconfig/clock << "EOF"
UTC=1
CLOCKPARAMS=
EOF

# Systemd (alternativa via ferramenta):
# timedatectl set-local-rtc 0  (UTC)
# timedatectl set-timezone America/Sao_Paulo`}
      />

      <h2>Horário local (apenas dual-boot Windows)</h2>
      <p>
        Se você dual-boot com Windows e não quer mexer nele:
      </p>
      <CodeBlock
        language="bash"
        code={`# /etc/sysconfig/clock
UTC=0`}
      />

      <AlertBox type="warning" title="Não misture os dois">
        Se um SO escreve o RTC em local e outro lê como UTC, o relógio dança
        entre boots. Padronize.
      </AlertBox>
    </PageContainer>
  );
}
