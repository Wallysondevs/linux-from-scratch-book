# 11.3. Reiniciando o Sistema

Agora que todo o software foi instalado, é hora de reiniciar seu computador. No entanto, ainda há algumas coisas a verificar. Aqui estão algumas sugestões:

- Instale qualquer firmware necessário se o driver do kernel para seu hardware exigir alguns arquivos de firmware para funcionar corretamente.

- Certifique-se de que uma senha esteja definida para o usuário root.

- Uma revisão dos seguintes arquivos de configuração também é apropriada neste ponto. /etc/fstab /etc/hosts /etc/inputrc /etc/profile /etc/resolv.conf (opcional) /etc/vimrc

- /etc/fstab

- /etc/hosts

- /etc/inputrc

- /etc/profile

- /etc/resolv.conf (opcional)

- /etc/vimrc

Dito isso, vamos prosseguir para inicializar nossa nova instalação LFS pela primeira vez! Primeiro, saia do ambiente chroot:

```bash
logout
```

Em seguida, desmonte os sistemas de arquivos virtuais:

```bash
umount -v $LFS/dev/pts
mountpoint -q $LFS/dev/shm && umount -v $LFS/dev/shm
umount -v $LFS/dev
umount -v $LFS/run
umount -v $LFS/proc
umount -v $LFS/sys
```

Se várias partições foram criadas, desmonte as outras partições antes de desmontar a principal, assim:

```bash
umount -v $LFS/home
umount -v $LFS
```

Desmonte o sistema de arquivos LFS em si:

```bash
umount -v $LFS
```

Agora, reinicie o sistema.

Assumindo que o boot loader GRUB foi configurado conforme descrito anteriormente, o menu está configurado para inicializar o LFS 12.4-systemd automaticamente.

Quando a reinicialização estiver completa, o sistema LFS estará pronto para uso. O que você verá é um simples prompt “login: ”. Neste ponto, você pode prosseguir para o Livro BLFS onde pode adicionar mais software para atender às suas necessidades.

Se a sua reinicialização não for bem-sucedida, é hora de solucionar problemas. Para dicas sobre como resolver problemas iniciais de inicialização, consulte https://www.linuxfromscratch.org/lfs/troubleshooting.html.
