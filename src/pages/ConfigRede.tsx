import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ConfigRede() {
  return (
    <PageContainer
      title="Configuração de Rede"
      subtitle="Configurando hostname, /etc/hosts e a interface de rede para systemd ou SysV."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>Hostname</h2>
      <CodeBlock
        language="bash"
        code={`echo "lfs" > /etc/hostname
# ou: hostnamectl set-hostname lfs (em sistema com systemd em runtime)`}
      />

      <h2>/etc/hosts</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/hosts << "EOF"
127.0.0.1  localhost.localdomain localhost lfs
::1        localhost ip6-localhost ip6-loopback
ff02::1    ip6-allnodes
ff02::2    ip6-allrouters
EOF`}
      />

      <h2>Caminho A — Systemd-networkd</h2>
      <CodeBlock
        language="bash"
        code={`# DHCP em todas as interfaces ethernet:
cat > /etc/systemd/network/10-eth-dhcp.network << "EOF"
[Match]
Name=en*

[Network]
DHCP=yes
EOF

systemctl enable systemd-networkd
systemctl enable systemd-resolved
ln -sfv /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf`}
      />

      <h2>Caminho B — SysVinit (lfs-bootscripts)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf blfs-bootscripts-20240825.tar.xz && cd blfs-bootscripts-20240825
make install-service-ipv4-static
cd .. && rm -rf blfs-bootscripts-20240825

cat > /etc/sysconfig/ifconfig.eth0 << "EOF"
ONBOOT=yes
IFACE=eth0
SERVICE=ipv4-static
IP=192.168.1.50
GATEWAY=192.168.1.1
PREFIX=24
BROADCAST=192.168.1.255
EOF

cat > /etc/resolv.conf << "EOF"
domain lfs.local
nameserver 1.1.1.1
nameserver 8.8.8.8
EOF`}
      />

      <p>
        Adapte os IPs ao seu ambiente. Se for VM, ajuste o adaptador para{" "}
        <em>bridged</em> ou <em>NAT</em> conforme a topologia.
      </p>
    </PageContainer>
  );
}
