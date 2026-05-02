import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Systemd() {
  return (
    <PageContainer
      title="Systemd (ou SysV-Init)"
      subtitle="Sistema de init. Escolha um dos dois — não use os dois ao mesmo tempo."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <AlertBox type="warning" title="Decisão importante">
        Você está construindo a edição <strong>LFS-systemd</strong> ou{" "}
        <strong>LFS-SysV</strong>? A escolha foi feita lá no início (capítulo{" "}
        <a href="#/versao-lfs">Versão LFS</a>). Cada caminho usa um sistema de
        init diferente.
      </AlertBox>

      <h2>Caminho A — Systemd (recomendado para uso moderno)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf systemd-257.8.tar.gz && cd systemd-257.8

sed -i -e 's/GROUP="render"/GROUP="video"/' \\
       -e 's/GROUP="sgx", //' rules.d/50-udev-default.rules.in

mkdir -p build && cd build

meson setup ..                              \\
      --prefix=/usr                         \\
      --buildtype=release                   \\
      -D default-dnssec=no                  \\
      -D firstboot=false                    \\
      -D install-tests=false                \\
      -D ldconfig=false                     \\
      -D mode=release                       \\
      -D pamconfdir=no                      \\
      -D rpmmacrosdir=no                    \\
      -D sysusers=false                     \\
      -D man=disabled                       \\
      -D nss-systemd=true

ninja
ninja install

tar -xf ../../systemd-man-pages-6.15.tar.xz \\
  --no-same-owner --strip-components=1 \\
  -C /usr/share/man

systemd-machine-id-setup
systemctl preset-all

cd ../.. && rm -rf systemd-257.8`}
      />

      <h2>Caminho B — SysV-Init (didático e minimalista)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf sysvinit-3.14.tar.xz && cd sysvinit-3.14
patch -Np1 -i ../sysvinit-3.14-consolidated-1.patch
make
make install
cd .. && rm -rf sysvinit-3.14`}
      />

      <p>
        Para a edição SysV, os bootscripts oficiais do LFS (<code>lfs-bootscripts</code>) entrarão
        no capítulo <a href="#/bootscripts">Bootscripts</a>.
      </p>

      <AlertBox type="info" title="Resumindo">
        <ul className="m-0">
          <li><strong>Systemd</strong> — moderno, padrão das distros, usa unit files.</li>
          <li><strong>SysVinit</strong> — clássico, scripts shell em <code>/etc/rc.d/</code>, fácil de inspecionar.</li>
        </ul>
      </AlertBox>
    </PageContainer>
  );
}
