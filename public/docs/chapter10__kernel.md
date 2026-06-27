# 10.3. Linux-6.16.1

O pacote Linux contém o kernel Linux.

## 10.3.1. Instalação do kernel

A construção do kernel envolve algumas etapas—configuração, compilação e instalação. Leia o arquivo README na árvore de código-fonte do kernel para métodos alternativos à forma como este livro configura o kernel.

### Importante

Construir o kernel Linux pela primeira vez é uma das tarefas mais desafiadoras no LFS. Acertar depende do hardware específico para o sistema target e das suas necessidades específicas. Existem quase 12.000 itens de configuração disponíveis para o kernel, embora apenas cerca de um terço deles seja necessário para a maioria dos computadores. Os editores do LFS recomendam que usuários não familiarizados com este processo sigam os procedimentos abaixo de forma bastante rigorosa. O objetivo é obter um sistema inicial a um ponto onde você possa fazer login na linha de comando ao reiniciar mais tarde na [Seção 11.3, “Reiniciando o Sistema.”](#/page/chapter11__reboot) Neste ponto, otimização e personalização não são um objetivo.

Para informações gerais sobre configuração do kernel, consulte [ https://www.linuxfromscratch.org/hints/downloads/files/kernel-configuration.txt](https://www.linuxfromscratch.org/hints/downloads/files/kernel-configuration.txt). Informações adicionais sobre como configurar e construir o kernel podem ser encontradas em [https://anduin.linuxfromscratch.org/LFS/kernel-nutshell/](https://anduin.linuxfromscratch.org/LFS/kernel-nutshell/). Essas referências estão um pouco desatualizadas, mas ainda fornecem uma visão geral razoável do processo.

Se tudo mais falhar, você pode pedir ajuda na lista de e-mails [lfs-support](https://www.linuxfromscratch.org/mail.html). Observe que a inscrição é necessária para que a lista evite spam.

Prepare-se para a compilação executando o seguinte comando:

```bash
make mrproper
```

Isso garante que a árvore do kernel esteja absolutamente limpa. A equipe do kernel recomenda que este comando seja emitido antes de cada compilação do kernel. Não confie que a árvore de código-fonte esteja limpa após descompactar.

Existem várias maneiras de configurar as opções do kernel. Geralmente, isso é feito através de uma interface orientada por menu, por exemplo:

```bash
make menuconfig
```

O significado das variáveis de ambiente opcionais do make:

Isso estabelece a configuração de locale para a usada no host. Isso pode ser necessário para um desenho de linha adequado da interface ncurses do menuconfig em um console de texto Linux UTF-8.

Se usado, certifique-se de substituir <host_LANG_value> pelo valor da variável $LANG do seu host. Você pode, alternativamente, usar o valor do host de $LC_ALL ou $LC_CTYPE.

Isso inicia uma interface ncurses orientada por menu. Para outras interfaces (gráficas), digite make help.

### Nota

Um bom ponto de partida para configurar o kernel é executar make defconfig. Isso definirá a configuração base para um bom estado que leva em consideração a arquitetura atual do seu sistema.

Certifique-se de habilitar/desabilitar/definir os seguintes recursos ou o sistema pode não funcionar corretamente ou não inicializar de forma alguma:

```
General setup --->
  [ ] Compile the kernel with warnings as errors                        [WERROR]
  CPU/Task time and stats accounting --->
    [*] Pressure stall information tracking                                [PSI]
    [ ]   Require boot parameter to enable pressure stall information tracking
                                                     ...  [PSI_DEFAULT_DISABLED]
  < > Enable kernel headers through /sys/kernel/kheaders.tar.xz      [IKHEADERS]
  [*] Control Group support --->                                       [CGROUPS]
    [*]   Memory controller                                              [MEMCG]
    [ /*] CPU controller --->                                     [CGROUP_SCHED]
      # This may cause some systemd features malfunction:
      [ ] Group scheduling for SCHED_RR/FIFO                    [RT_GROUP_SCHED]
  [ ] Configure standard kernel features (expert users) --->            [EXPERT]

Processor type and features --->
  [*] Build a relocatable kernel                                   [RELOCATABLE]
  [*]   Randomize the address of the kernel image (KASLR)       [RANDOMIZE_BASE]

General architecture-dependent options --->
  [*] Stack Protector buffer overflow detection                 [STACKPROTECTOR]
  [*]   Strong Stack Protector                           [STACKPROTECTOR_STRONG]

[*] Networking support --->                                                [NET]
  Networking options --->
    [*] TCP/IP networking                                                 [INET]
    <*>   The IPv6 protocol --->                                          [IPV6]

Device Drivers --->
  Generic Driver Options --->
    [ ] Support for uevent helper                                [UEVENT_HELPER]
    [*] Maintain a devtmpfs filesystem to mount at /dev               [DEVTMPFS]
    [*]   Automount devtmpfs at /dev, after the kernel mounted the rootfs
                                                           ...  [DEVTMPFS_MOUNT]
    Firmware loader --->
      < /*> Firmware loading facility                                [FW_LOADER]
      [ ]     Enable the firmware sysfs fallback mechanism
                                                    ...  [FW_LOADER_USER_HELPER]
  Firmware Drivers --->
    [*] Export DMI identification via sysfs to userspace                 [DMIID]
    [*] Mark VGA/VBE/EFI FB as generic system framebuffer       [SYSFB_SIMPLEFB]
  Graphics support --->
    <*>    Direct Rendering Manager (XFree86 4.1.0 and higher DRI support) --->
                                                                      ...  [DRM]
    [*]    Display a user-friendly message when a kernel panic occurs
                                                                ...  [DRM_PANIC]
    (kmsg)   Panic screen formatter                           [DRM_PANIC_SCREEN]
    Supported DRM clients --->
      [*] Enable legacy fbdev support for your modesetting driver
                                                      ...  [DRM_FBDEV_EMULATION]
    Drivers for system framebuffers --->
      <*> Simple framebuffer driver                              [DRM_SIMPLEDRM]
    Console display driver support --->
      [*] Framebuffer Console support                      [FRAMEBUFFER_CONSOLE]

File systems --->
  [*] Inotify support for userspace                               [INOTIFY_USER]
  Pseudo filesystems --->
    [*] Tmpfs virtual memory file system support (former shm fs)         [TMPFS]
    [*]   Tmpfs POSIX Access Control Lists                     [TMPFS_POSIX_ACL]
```

Habilite alguns recursos adicionais se você estiver construindo um sistema de 64 bits. Se você estiver usando menuconfig, habilite-os na ordem de CONFIG_PCI_MSI primeiro, depois CONFIG_IRQ_REMAP, e por último CONFIG_X86_X2APIC, porque uma opção só aparece depois que suas dependências são selecionadas.

```
Processor type and features --->
  [*] x2APIC interrupt controller architecture support              [X86_X2APIC]

Device Drivers --->
  [*] PCI support --->                                                     [PCI]
    [*] Message Signaled Interrupts (MSI and MSI-X)                    [PCI_MSI]
  [*] IOMMU Hardware Support --->                                [IOMMU_SUPPORT]
    [*] Support for Interrupt Remapping                              [IRQ_REMAP]
```

Se a partição para o sistema LFS estiver em um SSD NVME (ou seja, o nó do dispositivo para a partição é /dev/nvme* em vez de /dev/sd*), habilite o suporte a NVME ou o sistema LFS não inicializará:

```
Device Drivers --->
  NVME Support --->
    <*> NVM Express block device                                  [BLK_DEV_NVME]
```

### Nota

Embora "O Protocolo IPv6" não seja estritamente necessário, ele é altamente recomendado pelos desenvolvedores do systemd.

Existem várias outras opções que podem ser desejadas dependendo dos requisitos para o sistema. Para uma lista de opções necessárias para pacotes BLFS, consulte o [ Índice BLFS de Configurações do Kernel](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/longindex.html#kernel-config-index).

### Nota

Se o hardware do seu host estiver usando UEFI e você desejar inicializar o sistema LFS com ele, você deve ajustar algumas configurações do kernel seguindo [ a página BLFS](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/grub-setup.html#uefi-kernel) mesmo que você use o bootloader UEFI da distro host.

A justificativa para os itens de configuração acima:

Habilita ASLR para a imagem do kernel, para mitigar alguns ataques baseados em endereços fixos de dados sensíveis ou código no kernel.

Isso pode causar falha na build se o compilador e/ou a configuração forem diferentes daqueles dos desenvolvedores do kernel.

Isso exigirá que o cpio construa o kernel. cpio não é instalado pelo LFS.

Isso fará com que algumas opções apareçam na interface de configuração, mas alterar essas opções pode ser perigoso. Não use isso a menos que você saiba o que está fazendo.

Habilita SSP para o kernel. Nós o habilitamos para todo o userspace com --enable-default-ssp configurando o GCC, mas o kernel não usa a configuração padrão do GCC para SSP. Nós o habilitamos explicitamente aqui.

Ter esta opção definida pode interferir no gerenciamento de dispositivos ao usar o Udev.

Isso criará nós de dispositivo automatizados que são preenchidos pelo kernel, mesmo sem o Udev em execução. O Udev então é executado sobre isso, gerenciando permissões e adicionando symlinks. Este item de configuração é necessário para todos os usuários do Udev.

Isso montará a visão do kernel dos dispositivos em /dev ao alternar para o sistema de arquivos raiz, pouco antes de iniciar o init.

Isso fará com que o kernel exiba corretamente a mensagem caso ocorra um kernel panic e um driver DRM em execução suporte isso. Sem isso, seria mais difícil diagnosticar um panic: se nenhum driver DRM estiver em execução, estaríamos no console VGA que só pode conter 24 linhas e a mensagem relevante do kernel é frequentemente descartada; se um driver DRM estiver em execução, a exibição é frequentemente completamente bagunçada em caso de panic. A partir do Linux-6.12, nenhum dos drivers dedicados para modelos de GPU mainstream realmente suporta isso, mas é suportado pelo “Simple framebuffer driver” que é executado no framebuffer VESA (ou EFI) antes que o driver de GPU dedicado seja carregado. Se o driver de GPU dedicado for construído como um módulo (em vez de uma parte da imagem do kernel) e nenhum initramfs for usado, essa funcionalidade funcionará perfeitamente antes que o sistema de arquivos raiz seja montado e já é suficiente para fornecer informações sobre a maioria dos erros de configuração do LFS que causam um panic (por exemplo, uma configuração root= incorreta na [Seção 10.4, “Usando GRUB para Configurar o Processo de Inicialização”](#/page/chapter10__grub)).

Defina este kmsg para garantir que as últimas linhas de mensagens do kernel sejam exibidas quando um kernel panic ocorrer. O padrão, user, faria o kernel mostrar apenas uma mensagem de panic “amigável ao usuário” que não é útil para diagnóstico. A terceira opção, qr_code, faria o kernel compactar as últimas linhas de mensagem do kernel em um código QR e exibi-lo. O código QR pode conter mais linhas de mensagem do que texto simples e pode ser decodificado com um dispositivo externo (como um smartphone). Mas ele requer um compilador Rust que o LFS não fornece.

Isso permite usar o framebuffer VESA (ou o framebuffer EFI se inicializar o sistema LFS via UEFI) como um dispositivo DRM. O framebuffer VESA será configurado pelo GRUB (ou o framebuffer EFI será configurado pelo firmware UEFI), para que o manipulador de panic do DRM possa funcionar antes que o driver DRM específico da GPU seja carregado.

Isso é necessário para exibir o console Linux em uma GPU acionada por um driver DRI (Direct Rendering Infrastructure). Como CONFIG_DRM (Direct Rendering Manager) está habilitado, devemos habilitar essas duas opções também ou veremos uma tela em branco assim que o driver DRI for carregado.

Suporte para executar o controlador de interrupção de processadores x86 de 64 bits no modo x2APIC. O x2APIC pode ser habilitado pelo firmware em sistemas x86 de 64 bits, e um kernel sem esta opção habilitada entrará em panic na inicialização se o x2APIC for habilitado pelo firmware. Esta opção não tem efeito, mas também não causa danos se o x2APIC for desabilitado pelo firmware.

Alternativamente, make oldconfig pode ser mais apropriado em algumas situações. Consulte o arquivo README para mais informações.

Se desejado, pule a configuração do kernel copiando o arquivo de configuração do kernel, .config, do sistema host (assumindo que esteja disponível) para o diretório linux-6.16.1 descompactado. No entanto, não recomendamos esta opção. Geralmente é melhor explorar todos os menus de configuração e criar a configuração do kernel do zero.

Compile a imagem do kernel e os módulos:

```bash
make
```

Se estiver usando módulos do kernel, a configuração de módulos em /etc/modprobe.d pode ser necessária. Informações referentes a módulos e configuração do kernel estão localizadas em [Seção 9.3, “Visão Geral do Manuseio de Dispositivos e Módulos”](#/page/chapter09__udev) e na documentação do kernel no diretório linux-6.16.1/Documentation. Além disso, [modprobe.d(5)](https://man.archlinux.org/man/modprobe.d.5) pode ser de interesse.

A menos que o suporte a módulos tenha sido desabilitado na configuração do kernel, instale os módulos com:

```bash
make modules_install
```

Após a compilação do kernel ser concluída, etapas adicionais são necessárias para completar a instalação. Alguns arquivos precisam ser copiados para o diretório /boot.

### Cuidado

Se você decidiu usar uma partição /boot separada para o sistema LFS (talvez compartilhando uma partição /boot com a distro host), os arquivos copiados abaixo devem ir para lá. A maneira mais fácil de fazer isso é criar a entrada para /boot em /etc/fstab primeiro (leia a seção anterior para detalhes), então execute o seguinte comando como usuário root no ambiente chroot:

```bash
mount /boot
```

O caminho para o nó do dispositivo é omitido no comando porque mount pode lê-lo de /etc/fstab.

O caminho para a imagem do kernel pode variar dependendo da plataforma em uso. O nome do arquivo abaixo pode ser alterado para se adequar ao seu gosto, mas o tronco do nome do arquivo deve ser vmlinuz para ser compatível com a configuração automática do processo de boot descrita na próxima seção. O comando a seguir assume uma arquitetura x86:

```bash
cp -iv arch/x86/boot/bzImage /boot/vmlinuz-6.16.1-lfs-12.4-systemd
```

System.map é um arquivo de símbolos para o kernel. Ele mapeia os pontos de entrada de cada função na API do kernel, bem como os endereços das estruturas de dados do kernel para o kernel em execução. É usado como um recurso ao investigar problemas do kernel. Execute o seguinte comando para instalar o arquivo de mapa:

```bash
cp -iv System.map /boot/System.map-6.16.1
```

O arquivo de configuração do kernel .config produzido pela etapa make menuconfig acima contém todas as seleções de configuração para o kernel que acabou de ser compilado. É uma boa ideia manter este arquivo para referência futura:

```bash
cp -iv .config /boot/config-6.16.1
```

Instale a documentação para o kernel Linux:

```bash
cp -r Documentation -T /usr/share/doc/linux-6.16.1
```

É importante notar que os arquivos no diretório de código-fonte do kernel não pertencem ao root. Sempre que um package é descompactado como usuário root (como fizemos dentro do chroot), os arquivos têm os IDs de usuário e grupo que tinham no computador do empacotador. Isso geralmente não é um problema para qualquer outro package a ser instalado porque a árvore de código-fonte é removida após a instalação. No entanto, a árvore de código-fonte do Linux é frequentemente mantida por um longo tempo. Por causa disso, há uma chance de que qualquer ID de usuário que o empacotador usou seja atribuído a alguém na máquina. Essa pessoa teria então acesso de escrita ao código-fonte do kernel.

### Nota

Em muitos casos, a configuração do kernel precisará ser atualizada para packages que serão instalados posteriormente no BLFS. Ao contrário de outros packages, não é necessário remover a árvore de código-fonte do kernel após a instalação do kernel recém-construído.

Se a árvore de código-fonte do kernel for mantida, execute chown -R 0:0 no diretório linux-6.16.1 para garantir que todos os arquivos pertençam ao usuário root.

Se você estiver atualizando a configuração e reconstruindo o kernel a partir de uma árvore de código-fonte do kernel retida, normalmente você não deve executar o comando make mrproper. O comando purgaria o arquivo .config e todos os arquivos .o da build anterior. Apesar de ser fácil restaurar .config da cópia em /boot, purgar todos os arquivos .o ainda é um desperdício: para uma simples mudança de configuração, muitas vezes apenas alguns arquivos .o precisam ser (re)construídos e o sistema de build do kernel pulará corretamente outros arquivos .o se eles não forem purgados.

Por outro lado, se você atualizou o GCC, você deve executar make clean para purgar todos os arquivos .o da build anterior, ou a nova build pode falhar.

### Aviso

Alguma documentação do kernel recomenda criar um symlink de /usr/src/linux apontando para o diretório de código-fonte do kernel. Isso é específico para kernels anteriores à série 2.6 e não deve ser criado em um sistema LFS pois pode causar problemas para packages que você possa querer construir uma vez que seu sistema LFS base esteja completo.

## 10.3.2. Configurando a Ordem de Carregamento de Módulos Linux

Na maioria das vezes, os módulos Linux são carregados automaticamente, mas às vezes precisa de alguma direção específica. O programa que carrega módulos, modprobe ou insmod, usa /etc/modprobe.d/usb.conf para este propósito. Este arquivo precisa ser criado para que, se os drivers USB (ehci_hcd, ohci_hcd e uhci_hcd) tiverem sido construídos como módulos, eles sejam carregados na ordem correta; ehci_hcd precisa ser carregado antes de ohci_hcd e uhci_hcd para evitar que um aviso seja exibido no momento do boot.

Crie um novo arquivo /etc/modprobe.d/usb.conf executando o seguinte:

```bash
install -v -m755 -d /etc/modprobe.d
cat > /etc/modprobe.d/usb.conf << "EOF"
# Begin /etc/modprobe.d/usb.conf

install ohci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i ohci_hcd ; true
install uhci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i uhci_hcd ; true

# End /etc/modprobe.d/usb.conf
EOF
```

## 10.3.3. Conteúdo do Linux

### Descrições Breves

config-6.16.1

Contém todas as seleções de configuração para o kernel

vmlinuz-6.16.1-lfs-12.4-systemd

O motor do sistema Linux. Ao ligar o computador, o kernel é a primeira parte do sistema operacional que é carregada. Ele detecta e inicializa todos os componentes do hardware do computador, então torna esses componentes disponíveis como uma árvore de arquivos para o software e transforma uma única CPU em uma máquina multitarefa capaz de executar dezenas de programas aparentemente ao mesmo tempo

System.map-6.16.1

Uma lista de endereços e símbolos; ele mapeia os pontos de entrada e endereços de todas as funções e estruturas de dados no kernel
