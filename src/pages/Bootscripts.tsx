import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Bootscripts() {
  return (
    <PageContainer
      title="Bootscripts (SysV) ou Units (Systemd)"
      subtitle="Como o LFS inicializa serviços no boot, dependendo do init escolhido."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>SysVinit — instalando lfs-bootscripts</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf lfs-bootscripts-20240825.tar.xz && cd lfs-bootscripts-20240825
make install
cd .. && rm -rf lfs-bootscripts-20240825`}
      />

      <h2>Symlinks de runlevel padrão</h2>
      <CodeBlock
        language="bash"
        code={`# os runlevels usados pelo LFS:
# 0 - halt
# 1 - single
# 2-5 - multi-user
# 6 - reboot

ls /etc/rc.d/
# rc0.d  rc1.d  rc2.d  rc3.d  rc4.d  rc5.d  rc6.d  rcS.d  init.d`}
      />

      <h2>Systemd — habilitando units</h2>
      <CodeBlock
        language="bash"
        code={`# habilitar serviços essenciais
systemctl enable systemd-tmpfiles-setup
systemctl enable systemd-tmpfiles-clean.timer
systemctl enable systemd-journal-flush
systemctl enable systemd-udev-settle

# se quiser isolar um service ao boot:
systemctl set-default multi-user.target`}
      />

      <h2>/etc/inittab (apenas SysVinit)</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/inittab << "EOF"
id:3:initdefault:

si::sysinit:/etc/rc.d/init.d/rc S

l0:0:wait:/etc/rc.d/init.d/rc 0
l1:S1:wait:/etc/rc.d/init.d/rc 1
l2:2:wait:/etc/rc.d/init.d/rc 2
l3:3:wait:/etc/rc.d/init.d/rc 3
l4:4:wait:/etc/rc.d/init.d/rc 4
l5:5:wait:/etc/rc.d/init.d/rc 5
l6:6:wait:/etc/rc.d/init.d/rc 6

ca:12345:ctrlaltdel:/sbin/shutdown -t1 -a -r now

su:S016:once:/sbin/sulogin

1:2345:respawn:/sbin/agetty --noclear tty1 9600
2:2345:respawn:/sbin/agetty tty2 9600
3:2345:respawn:/sbin/agetty tty3 9600
4:2345:respawn:/sbin/agetty tty4 9600
5:2345:respawn:/sbin/agetty tty5 9600
6:2345:respawn:/sbin/agetty tty6 9600
EOF`}
      />

      <AlertBox type="info" title="Use só uma das duas">
        Se escolheu Systemd, ignore inittab e bootscripts — Systemd lê unit
        files. Se escolheu SysV, ignore os comandos systemctl.
      </AlertBox>
    </PageContainer>
  );
}
