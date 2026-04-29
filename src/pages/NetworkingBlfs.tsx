import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function NetworkingBlfs() {
  return (
    <PageContainer
      title="Rede Avançada (BLFS)"
      subtitle="Wi-Fi, OpenSSH, NetworkManager, firewall — o que adicionar para sair do 'cabo + IP estático'."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Wi-Fi</h2>
      <ul>
        <li><code>wpa_supplicant</code> — autenticação WPA2/WPA3.</li>
        <li><code>iw</code> + <code>iwd</code> — substituto moderno do wpa_supplicant em algumas distros.</li>
        <li>Drivers: kernel-tree (firmware vem em <code>/lib/firmware</code>).</li>
      </ul>

      <h2>OpenSSH</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf openssh-9.8p1.tar.gz && cd openssh-9.8p1

install -v -m700 -d /var/lib/sshd
chown -v root:sys /var/lib/sshd
groupadd -g 50 sshd
useradd -c 'sshd PrivSep' -d /var/lib/sshd -g sshd \\
        -s /bin/false -u 50 sshd

./configure --prefix=/usr                            \\
            --sysconfdir=/etc/ssh                    \\
            --with-pam                               \\
            --with-privsep-path=/var/lib/sshd

make && make install
install -v -m755    contrib/ssh-copy-id /usr/bin
install -v -m644    contrib/ssh-copy-id.1 /usr/share/man/man1`}
      />

      <h2>NetworkManager (substitui networkd)</h2>
      <p>
        Para laptops e ambientes desktop, NetworkManager é mais conveniente
        que systemd-networkd. Tem GUIs (nm-applet, plasma-nm, gnome-control-center).
      </p>

      <h2>Firewall — nftables</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf nftables-1.1.0.tar.xz && cd nftables-1.1.0
./configure --prefix=/usr --sysconfdir=/etc --disable-static
make && make install`}
      />
      <p>Regras básicas em <code>/etc/nftables.conf</code>:</p>
      <CodeBlock
        language="bash"
        code={`#!/usr/sbin/nft -f
flush ruleset

table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept
    iif lo accept
    ip protocol icmp accept
    tcp dport ssh accept
  }
  chain forward {
    type filter hook forward priority 0; policy drop;
  }
  chain output {
    type filter hook output priority 0; policy accept;
  }
}`}
      />
    </PageContainer>
  );
}
