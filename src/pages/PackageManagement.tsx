import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PackageManagement() {
  return (
    <PageContainer
      title="Gerenciamento de Pacotes"
      subtitle="LFS não vem com apt nem dnf. Veja as estratégias que a comunidade usa para gerenciar atualizações."
      difficulty="avancado"
      timeToRead="6 min"
    >
      <h2>Por que LFS não tem package manager?</h2>
      <p>
        O LFS é educacional — instalar um package manager mascararia o que
        cada pacote faz. Mas quando você terminar e quiser atualizar pacotes,
        vai precisar de algum método.
      </p>

      <h2>Estratégia 1 — Subir tudo pra DESTDIR</h2>
      <CodeBlock
        language="bash"
        code={`# Em vez de "make install":
PKG_DIR=/tmp/pkg/foo-1.0
make DESTDIR=$PKG_DIR install

# Empacotar:
tar -cJpf /var/cache/lfs-pkgs/foo-1.0.tar.xz -C $PKG_DIR .

# Listar arquivos:
tar -tf /var/cache/lfs-pkgs/foo-1.0.tar.xz > /var/lib/lfs-pkgs/foo-1.0.list

# Instalar:
cp -av $PKG_DIR/* /

# Remover (lendo a lista invertida):
xargs -d '\\n' rm -fv < /var/lib/lfs-pkgs/foo-1.0.list`}
      />

      <h2>Estratégia 2 — Symlinks (Stow / xstow)</h2>
      <CodeBlock
        language="bash"
        code={`# Cada pacote vai pra /usr/pkg/foo-1.0
make prefix=/usr/pkg/foo-1.0 install

# Stow gera symlinks em /usr para cada arquivo:
cd /usr/pkg
stow foo-1.0    # cria symlinks
stow -D foo-1.0 # desfaz`}
      />

      <h2>Estratégia 3 — Usar um package manager existente</h2>
      <ul>
        <li><strong>pacman</strong> (do Arch) — o LFS Hints tem guia.</li>
        <li><strong>rpm</strong> + <strong>dnf</strong> — possível, mas trabalhoso.</li>
        <li><strong>nix</strong> — rodando junto, sem mexer no LFS.</li>
        <li><strong>conary</strong> (rPath, descontinuado).</li>
      </ul>

      <AlertBox type="info" title="Para a primeira leitura">
        Não se preocupe com isso. Termine o livro, dê boot. Depois decida se
        quer atualizar manualmente ou implementar uma estratégia.
      </AlertBox>
    </PageContainer>
  );
}
