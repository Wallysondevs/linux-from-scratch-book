import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function CoreutilsTemp() {
  return (
    <PageContainer
      title="Coreutils — Pacote temporário"
      subtitle="ls, cp, mv, mkdir, cat, chmod, dd, df... os ~100 utilitários básicos do GNU. Sem eles, nem o ./configure roda."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>O que tem dentro?</h2>
      <p>
        Coreutils é a coleção de comandos POSIX essenciais do GNU:
        manipulação de arquivos (<code>cp, mv, ln, rm, install</code>),
        texto (<code>cat, head, tail, sort, uniq, wc, cut, tr</code>),
        shell (<code>echo, printf, test, true, false, env, sleep</code>),
        sistema (<code>id, who, whoami, uname, date, df, du</code>) e
        numerais (<code>seq, factor, expr</code>). Aqui montamos a
        versão temporária para que o resto do build tenha esses
        binários disponíveis.
      </p>

      <AlertBox type="info" title="Coreutils ≠ BusyBox">
        BusyBox é uma reimplementação minimalista (1 binário, ~1 MB).
        Coreutils é a referência GNU completa (~100 binários, ~7 MB),
        compatível com tudo que <code>autoconf</code> espera. LFS usa
        Coreutils para máxima compatibilidade.
      </AlertBox>

      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf coreutils-9.7.tar.xz
cd coreutils-9.7

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --enable-install-program=hostname \\
            --enable-no-install-program=kill,uptime

make
make DESTDIR=$LFS install

# Mover hostname para o lugar correto
mv -v $LFS/usr/bin/chroot              $LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                    $LFS/usr/share/man/man8/chroot.8

cd $LFS/sources
rm -rf coreutils-9.7`}
      />

      <h2>Anatomia das flags</h2>
      <ul>
        <li><code>--enable-install-program=hostname</code> — instala <code>hostname</code> (que é parte de <code>inetutils</code> tradicionalmente, mas o LFS prefere a versão GNU).</li>
        <li><code>--enable-no-install-program=kill,uptime</code> — não instala <code>kill</code> (vem do <code>util-linux</code>) nem <code>uptime</code> (vem do <code>procps-ng</code>). Evita conflitos no install final.</li>
        <li><code>mv chroot ... /usr/sbin</code> — chroot é comando administrativo; LFS o coloca em <code>/sbin</code>. Idem para a página de manual: seção 1 → 8.</li>
      </ul>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Listar quantos binários foram instalados:
ls $LFS/usr/bin/ | wc -l

# Confirmar versão:
$LFS/usr/bin/ls --version | head -1
# ls (GNU coreutils) 9.7

# Verificar que kill e uptime NÃO foram instalados:
ls $LFS/usr/bin/{kill,uptime} 2>/dev/null
# (saída vazia)

# Conferir o move do chroot:
ls -l $LFS/usr/sbin/chroot
ls -l $LFS/usr/share/man/man8/chroot.8`}
      />

      <PracticeBox title="Validar Coreutils cross-compilado">
        <ol className="list-decimal ml-5 space-y-1">
          <li><code>file $LFS/usr/bin/ls</code> mostra <code>x86-64</code> e dynamically linked.</li>
          <li><code>$LFS_TGT-readelf -d $LFS/usr/bin/ls | grep NEEDED</code> deve listar apenas <code>libc.so.6</code> (e talvez <code>libpcre2</code>, <code>libacl</code>, <code>libattr</code> se já instaladas).</li>
          <li>Conte 100+ executáveis: <code>ls $LFS/usr/bin/ | wc -l</code> &gt;= 100.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Pular o move do chroot">
        Se você não mover <code>chroot</code> para <code>/usr/sbin</code>,
        scripts de manutenção do sistema final falham porque
        <code> /usr/sbin</code> está no PATH do root mas
        <code> /usr/bin</code> talvez não esteja em scripts cron.
      </AlertBox>

      <AlertBox type="danger" title="Esquecer --enable-no-install-program">
        Sem essa flag, o Coreutils instala <code>kill</code> e
        <code> uptime</code> em <code>/usr/bin</code>. Quando
        <code> util-linux</code> e <code>procps</code> tentarem
        instalar suas próprias versões depois, eles sobrescrevem —
        mas as páginas de manual ficam com referências cruzadas
        erradas e o sistema fica inconsistente.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo: ~0.6 SBU
# Tarball: coreutils-9.7.tar.xz (~6 MB)
# Pós-install obrigatório: mv chroot → /usr/sbin
# Validação: count em /usr/bin >= 100, ls --version OK
# Conflitos evitados: kill (util-linux), uptime (procps-ng)`}
      />
    </PageContainer>
  );
}
