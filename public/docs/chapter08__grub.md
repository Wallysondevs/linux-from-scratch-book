# 8.64. GRUB-2.12

O pacote GRUB contém o GRand Unified Bootloader.

## 8.64.1. Instalação do GRUB

### Nota

Se o seu sistema possui suporte a UEFI e você deseja inicializar o LFS com UEFI, você precisa instalar o GRUB com suporte a UEFI (e suas dependências) seguindo as instruções na [ página do BLFS](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/grub-efi.html). Você pode pular este pacote, ou instalar este pacote e o pacote BLFS GRUB para UEFI sem conflito (a página do BLFS fornece instruções para ambos os casos).

### Aviso

Desdefina quaisquer variáveis de ambiente que possam afetar a build:

```bash
unset {C,CPP,CXX,LD}FLAGS
```

Não tente “otimizar” este pacote com flags de compilação personalizadas. Este pacote é um bootloader. As operações de baixo nível no código-fonte podem ser quebradas por otimização agressiva.

Adicione um arquivo ausente do tarball de lançamento:

```bash
echo depends bli part_gpt > grub-core/extra_deps.lst
```

Prepare o GRUB para compilação:

```bash
./configure --prefix=/usr     \
            --sysconfdir=/etc \
            --disable-efiemu  \
            --disable-werror
```

O significado das novas opções de configuração:

Isso permite que a build seja concluída com avisos introduzidos por versões mais recentes do Flex.

Esta opção minimiza o que é construído desabilitando um recurso e eliminando alguns programas de teste não necessários para o LFS.

Compile o pacote:

```bash
make
```

A suíte de testes para este pacote não é recomendada. A maioria dos testes depende de pacotes que não estão disponíveis no ambiente LFS limitado. Para executar os testes de qualquer forma, execute make check.

Instale o pacote, e mova o arquivo de suporte de autocompletar do Bash para o local recomendado pelos mantenedores de autocompletar do Bash:

```bash
make install
mv -v /etc/bash_completion.d/grub /usr/share/bash-completion/completions
```

Tornar seu sistema LFS inicializável com GRUB será discutido na [Seção 10.4, “Usando o GRUB para Configurar o Processo de Inicialização.”](#/page/chapter10__grub)

## 8.64.2. Conteúdo do GRUB

### Descrições Breves

grub-bios-setup

É um programa auxiliar para grub-install

grub-editenv

É uma ferramenta para editar o bloco de ambiente

grub-file

Verifica se o arquivo fornecido é do tipo especificado

grub-fstest

É uma ferramenta para depurar o driver do sistema de arquivos

grub-glue-efi

Cola binários de 32 e 64 bits em um único arquivo (para máquinas Apple)

grub-install

Instala o GRUB em sua unidade

grub-kbdcomp

É um script que converte um layout xkb em um reconhecido pelo GRUB

grub-macbless

É o bless estilo Mac para sistemas de arquivos HFS ou HFS+ (bless é peculiar a máquinas Apple; ele torna um dispositivo inicializável)

grub-menulst2cfg

Converte um menu.lst do GRUB Legacy em um grub.cfg para uso com o GRUB 2

grub-mkconfig

Gera um arquivo grub.cfg

grub-mkimage

Cria uma imagem inicializável do GRUB

grub-mklayout

Gera um arquivo de layout de teclado GRUB

grub-mknetdir

Prepara um diretório de netboot GRUB

grub-mkpasswd-pbkdf2

Gera uma senha PBKDF2 criptografada para uso no menu de boot

grub-mkrelpath

Torna um pathname de sistema relativo à sua raiz

grub-mkrescue

Cria uma imagem bootável do GRUB adequada para um disquete, CDROM/DVD, ou uma unidade USB

grub-mkstandalone

Gera uma imagem standalone

grub-ofpathname

É um programa auxiliar que imprime o path para um dispositivo GRUB

grub-probe

Sonda informações de dispositivo para um dado path ou dispositivo

grub-reboot

Define a entrada de boot padrão para o GRUB apenas para o próximo boot

grub-render-label

Renderiza o .disk_label da Apple para Macs Apple

grub-script-check

Verifica o script de configuração do GRUB quanto a erros de sintaxe

grub-set-default

Define a entrada de boot padrão para o GRUB

grub-sparc64-setup

É um programa auxiliar para grub-setup

grub-syslinux2cfg

Transforma um arquivo de configuração syslinux no formato grub.cfg
