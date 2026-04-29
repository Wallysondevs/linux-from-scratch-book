import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PrimeiroBoot() {
  return (
    <PageContainer
      title="O Primeiro Boot"
      subtitle="O grande momento. Saia do chroot, desmonte tudo, e dê boot no SEU Linux."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Saindo limpo do chroot</h2>
      <CodeBlock
        language="bash"
        code={`# dentro do chroot:
exit

# como root no host:
umount -v $LFS/dev/pts
mountpoint -q $LFS/dev/shm && umount -v $LFS/dev/shm
umount -v $LFS/{sys,proc,run,dev}
umount -v $LFS`}
      />

      <h2>Reiniciando para o LFS</h2>
      <p>
        Se for VM, mude o boot para o disco do LFS no setup. Se for hardware
        real, entre na BIOS/UEFI e selecione o disco do LFS como primário.
      </p>
      <CodeBlock
        language="bash"
        code={`shutdown -h now
# ou: poweroff
# ou: reboot, e ajuste a ordem de boot na BIOS`}
      />

      <h2>O que esperar no primeiro boot</h2>
      <ol>
        <li>BIOS/UEFI passa para o GRUB.</li>
        <li>GRUB mostra o menu (5 segundos timeout).</li>
        <li>Kernel inicia, descompacta, monta <code>/</code> ext4.</li>
        <li>Init (systemd ou SysV) toma controle.</li>
        <li>Mensagens de "Started ..." piscam.</li>
        <li>Prompt de login: <code>lfs login:</code></li>
      </ol>

      <CodeBlock
        language="text"
        code={`lfs login: root
Password: ********

[root@lfs ~]# uname -a
Linux lfs 6.10.5-lfs #1 SMP ... x86_64 GNU/Linux

[root@lfs ~]# echo "É MEU PRÓPRIO LINUX!!!"
É MEU PRÓPRIO LINUX!!!`}
      />

      <AlertBox type="success" title="Parabéns!">
        Você acabou de bootar uma distribuição Linux que VOCÊ construiu. Cada
        binário, cada lib, cada syscall — você sabe de onde veio. Esse é o
        verdadeiro propósito do LFS.
      </AlertBox>

      <h2>Próximos passos</h2>
      <ul>
        <li>Compile e instale software adicional via <a href="#/intro-blfs">BLFS</a> (Xorg, browsers, ferramentas de desenvolvimento).</li>
        <li>Estude o <a href="#/package-management">gerenciamento de pacotes</a> manual.</li>
        <li>Refaça o livro com versões mais novas conforme elas saírem.</li>
        <li>Compartilhe seu tarball de build com a comunidade!</li>
      </ul>
    </PageContainer>
  );
}
