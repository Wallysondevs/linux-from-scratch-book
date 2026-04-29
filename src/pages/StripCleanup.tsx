import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function StripCleanup() {
  return (
    <PageContainer
      title="Strip & Cleanup do Sistema"
      subtitle="Reduza o tamanho do sistema final removendo símbolos de debug e arquivos desnecessários."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Removendo /tools</h2>
      <p>
        A toolchain temporária em <code>/tools</code> não é mais necessária —
        tudo já foi recompilado no sistema final. Hora de limpar:
      </p>
      <CodeBlock
        language="bash"
        code={`rm -rf /tools`}
      />

      <h2>Removendo arquivos de teste</h2>
      <CodeBlock
        language="bash"
        code={`find /usr/lib /usr/libexec -name \\*.la -delete
find /usr -depth -name $(uname -m)-lfs-linux-gnu\\* | xargs rm -rf

userdel -r tester  # se ainda existir`}
      />

      <h2>Strip de binários</h2>
      <p>
        Salve o estado dos arquivos antes — strip pode quebrar se feito errado:
      </p>
      <CodeBlock
        language="bash"
        code={`save_usrlib="$(cd /usr/lib; ls ld-linux*.so* libc.so* libthread_db.so* libquadmath.so.* \\
                            libstdc++.so* libitm.so* libatomic.so*)"

cd /usr/lib
for LIB in $save_usrlib; do
    objcopy --only-keep-debug --compress-debug-sections=zlib $LIB $LIB.dbg
    cp $LIB /tmp/$LIB
    strip --strip-unneeded /tmp/$LIB
    objcopy --add-gnu-debuglink=$LIB.dbg /tmp/$LIB
    install -vm755 /tmp/$LIB /usr/lib
    rm /tmp/$LIB
done

# Strip de tudo o que não está marcado
find /usr/lib -type f -name \\*.so* ! -name \\*dbg \\
    -exec strip --strip-unneeded {} ';'
find /usr/{bin,sbin,libexec} -type f \\
    -exec strip --strip-all {} ';'

unset LIB save_usrlib`}
      />

      <AlertBox type="success" title="Sistema enxuto">
        Após o strip, você economiza centenas de MB. Próxima fase: configuração
        do sistema (rede, locale, fstab) e finalmente o kernel + GRUB.
      </AlertBox>
    </PageContainer>
  );
}
