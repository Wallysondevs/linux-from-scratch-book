# 10.4. Usando o GRUB para Configurar o Processo de Inicialização

### Nota

Se o seu sistema tiver suporte a UEFI e você deseja inicializar o LFS com UEFI, você deve pular as instruções desta página, mas ainda assim aprender a sintaxe de grub.cfg e o método para especificar uma partição no arquivo desta página, e configurar o GRUB com suporte a UEFI usando as instruções fornecidas na página do BLFS.

## 10.4.1. Introdução

### Aviso

Configurar o GRUB incorretamente pode tornar seu sistema inoperável sem um dispositivo de inicialização alternativo, como um CD-ROM ou um drive USB inicializável. Esta seção não é necessária para inicializar seu sistema LFS. Você pode apenas querer modificar seu carregador de inicialização atual, por exemplo, Grub-Legacy, GRUB2 ou LILO.

Certifique-se de que um disco de inicialização de emergência esteja pronto para “resgatar” o computador se ele se tornar inutilizável (não inicializável). Se você ainda não tiver um dispositivo de inicialização, pode criar um. Para que o procedimento abaixo funcione, você precisa avançar para o BLFS e instalar xorriso do pacote libisoburn.

```bash
cd /tmp
grub-mkrescue --output=grub-img.iso
xorriso -as cdrecord -v dev=/dev/cdrw blank=as_needed grub-img.iso
```

## 10.4.2. Convenções de Nomenclatura do GRUB

O GRUB usa sua própria estrutura de nomenclatura para drives e partições na forma de (hdn,m), onde n é o número do disco rígido e m é o número da partição. Os números dos discos rígidos começam do zero, mas os números das partições começam do um para partições normais (do cinco para partições estendidas). Observe que isso é diferente das versões anteriores, onde ambos os números começavam do zero. Por exemplo, a partição sda1 é (hd0,1) para o GRUB e sdb3 é (hd1,3). Em contraste com o Linux, o GRUB não considera drives de CD-ROM como discos rígidos. Por exemplo, se estiver usando um CD em hdb e um segundo disco rígido em hdc, esse segundo disco rígido ainda seria (hd1).

## 10.4.3. Configurando o GRUB

O GRUB funciona escrevendo dados no primeiro trilho físico do disco rígido. Esta área não faz parte de nenhum sistema de arquivos. Os programas ali acessam módulos do GRUB na partição de inicialização. O local padrão é /boot/grub/.

A localização da partição de inicialização é uma escolha do usuário que afeta a configuração. Uma recomendação é ter uma partição pequena e separada (tamanho sugerido é 200 MB) apenas para informações de inicialização. Dessa forma, cada build, seja LFS ou alguma distro comercial, pode acessar os mesmos arquivos de inicialização e o acesso pode ser feito a partir de qualquer sistema inicializado. Se você optar por fazer isso, precisará montar a partição separada, mover todos os arquivos no diretório /boot atual (por exemplo, o kernel Linux que você acabou de construir na seção anterior) para a nova partição. Você precisará então desmontar a partição e remontá-la como /boot. Se você fizer isso, certifique-se de atualizar /etc/fstab.

Deixar /boot na partição LFS atual também funcionará, mas a configuração para múltiplos sistemas é mais difícil.

Usando as informações acima, determine o designador apropriado para a partição raiz (ou partição de inicialização, se uma separada for usada). Para o exemplo a seguir, assume-se que a partição raiz (ou de inicialização separada) é sda2.

Instale os arquivos do GRUB em /boot/grub e configure o trilho de inicialização:

### Aviso

O comando a seguir sobrescreverá o carregador de inicialização atual. Não execute o comando se isso não for desejado, por exemplo, se estiver usando um gerenciador de inicialização de terceiros para gerenciar o Master Boot Record (MBR).

```bash
grub-install /dev/sda
```

### Nota

Se o sistema foi inicializado usando UEFI, grub-install tentará instalar arquivos para o target x86_64-efi, mas esses arquivos não foram instalados no Capítulo 8. Se este for o caso, adicione --target i386-pc ao comando acima.

## 10.4.4. Criando o Arquivo de Configuração do GRUB

Gerar /boot/grub/grub.cfg:

```bash
cat > /boot/grub/grub.cfg << "EOF"
# Begin /boot/grub/grub.cfg
set default=0
set timeout=5

insmod part_gpt
insmod ext2
set root=(hd0,2)
set gfxpayload=1024x768x32

menuentry "GNU/Linux, Linux 6.16.1-lfs-12.4-systemd" {
        linux   /boot/vmlinuz-6.16.1-lfs-12.4-systemd root=/dev/sda2 ro
}
EOF
```

Os comandos insmod carregam os módulos do GRUB chamados part_gpt e ext2. Apesar do nome, ext2 na verdade suporta os filesystems ext2, ext3 e ext4. O comando grub-install incorporou alguns módulos na imagem principal do GRUB (instalada no MBR ou na partição GRUB BIOS) para acessar os outros módulos (em /boot/grub/i386-pc) sem um problema de "ovo ou galinha", então, com uma configuração típica, esses dois módulos já estão incorporados e esses dois comandos insmod não farão nada. Mas eles não causam nenhum dano de qualquer forma, e podem ser necessários em algumas configurações raras.

O comando set gfxpayload=1024x768x32 define a resolução e a profundidade de cor do VESA framebuffer a serem passadas para o kernel. É necessário para o driver SimpleDRM do kernel usar o VESA framebuffer. Você pode usar um valor de resolução ou profundidade de cor diferente que melhor se adapte ao seu monitor.

### Nota

Da perspectiva do GRUB, os arquivos do kernel são relativos à partição usada. Se você usou uma partição /boot separada, remova /boot da linha linux acima. Você também precisará alterar a linha set root para apontar para a partição de inicialização.

### Nota

O designador do GRUB para uma partição pode mudar se você adicionou ou removeu alguns discos (incluindo discos removíveis como dispositivos USB thumb). A mudança pode causar falha na inicialização porque grub.cfg se refere a alguns designadores “antigos”. Se você deseja evitar tal problema, você pode usar o UUID de uma partição e o UUID de um filesystem em vez de um designador GRUB para especificar um dispositivo. Execute lsblk -o UUID,PARTUUID,PATH,MOUNTPOINT para mostrar os UUIDs dos seus filesystems (na coluna UUID) e partições (na coluna PARTUUID). Então substitua set root=(hdx,y) por search --set=root --fs-uuid <UUID do filesystem onde o kernel está instalado>, e substitua root=/dev/sda2 por root=PARTUUID=<UUID da partição onde o LFS é construído>.

Observe que o UUID de uma partição é completamente diferente do UUID do filesystem nesta partição. Alguns recursos online podem instruí-lo a usar root=UUID=<filesystem UUID> em vez de root=PARTUUID=<partition UUID>, mas fazer isso exigirá um initramfs, o que está além do escopo do LFS.

O nome do device node para uma partição em /dev também pode mudar (isso é menos provável do que uma mudança de designador GRUB). Você também pode substituir paths para device nodes como /dev/sda1 por PARTUUID=<partition UUID>, em /etc/fstab, para evitar uma potencial falha de inicialização caso o nome do device node tenha mudado.

O GRUB é um programa extremamente poderoso e oferece um número tremendo de opções para inicialização a partir de uma ampla variedade de dispositivos, sistemas operacionais e tipos de partição. Existem também muitas opções de personalização, como telas de splash gráficas, reprodução de sons, entrada de mouse, etc. Os detalhes dessas opções estão além do escopo desta introdução.

### Cuidado

Existe um comando, grub-mkconfig, que pode escrever um arquivo de configuração automaticamente. Ele usa um conjunto de scripts em /etc/grub.d/ e destruirá quaisquer personalizações que você fizer. Esses scripts são projetados principalmente para distribuições não baseadas em código-fonte e não são recomendados para LFS. Se você instalar uma distribuição Linux comercial, há uma boa chance de que este programa seja executado. Certifique-se de fazer backup do seu arquivo grub.cfg.
