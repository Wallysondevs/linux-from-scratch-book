import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SecurityBlfs() {
  return (
    <PageContainer
      title="Segurança & Hardening"
      subtitle="Práticas essenciais para tornar seu LFS resistente a ataques comuns."
      difficulty="avancado"
      timeToRead="6 min"
    >
      <h2>Hardening de boot e kernel</h2>
      <ul>
        <li>
          Compile o kernel com <code>CONFIG_HARDENED_USERCOPY</code>,{" "}
          <code>CONFIG_FORTIFY_SOURCE</code>, <code>CONFIG_SLUB_DEBUG</code>,{" "}
          <code>CONFIG_SECURITY_YAMA</code>.
        </li>
        <li>Habilite KASLR (já default em x86_64).</li>
        <li>Remova drivers não usados — superfície menor de ataque.</li>
      </ul>

      <h2>PAM (Pluggable Authentication Modules)</h2>
      <p>
        Instale o pacote <code>linux-pam</code> e configure módulos de senha
        forte (pam_cracklib/pam_pwquality), 2FA (pam_google_authenticator),
        bloqueio de tentativas (pam_faillock).
      </p>

      <h2>Sudo (em vez de su)</h2>
      <p>
        Instale <code>sudo</code> do BLFS. Edite <code>/etc/sudoers</code> com
        <code> visudo</code>. Crie um grupo <code>wheel</code> e libere para
        usuários administrativos:
      </p>
      <pre className="bg-card p-4 rounded-md overflow-x-auto text-sm font-mono">
{`%wheel  ALL=(ALL:ALL) ALL`}
      </pre>

      <h2>Firewall (nftables) — bloqueio padrão</h2>
      <p>
        Veja o capítulo <a href="#/networking-blfs">Rede Avançada</a> para
        configurar nftables com policy DROP no input.
      </p>

      <h2>SSH endurecido</h2>
      <ul>
        <li><code>PermitRootLogin no</code></li>
        <li><code>PasswordAuthentication no</code> (use chaves)</li>
        <li><code>AllowUsers seu_user</code></li>
        <li>Mude a porta padrão (segurança por obscuridade — ajuda contra bots)</li>
      </ul>

      <h2>Audit trail</h2>
      <ul>
        <li><code>auditd</code> — sistema oficial de auditoria do kernel.</li>
        <li><code>journalctl --vacuum-time=30d</code> — limpeza de logs.</li>
        <li>Encaminhar logs a um servidor remoto via syslog/rsyslog/journald-remote.</li>
      </ul>

      <h2>SELinux/AppArmor (opcional, avançado)</h2>
      <p>
        Para ambientes de produção, considere SELinux ou AppArmor (capítulos
        avançados do BLFS). Ambos exigem reconfigurar o kernel e demandam
        familiaridade.
      </p>

      <AlertBox type="info" title="Mantra">
        "Segurança não é uma feature, é um processo." Aplique pequenas medidas
        consistentemente, audite, corrija. Seu LFS pode ser tão seguro quanto
        qualquer distro mainstream — talvez mais, porque você sabe exatamente
        o que tem.
      </AlertBox>
    </PageContainer>
  );
}
