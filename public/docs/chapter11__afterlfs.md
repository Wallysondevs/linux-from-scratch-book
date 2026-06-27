# 11.5. Primeiros Passos Após o LFS

## 11.5.1. Decidindo o que fazer em seguida

Agora que o LFS está completo e você tem um sistema inicializável, o que você faz? O próximo passo é decidir como usá-lo. Geralmente, há duas grandes categorias a considerar: estação de trabalho ou servidor. De fato, essas categorias não são mutuamente exclusivas. Os aplicativos necessários para cada categoria podem ser combinados em um único sistema, mas vamos analisá-los separadamente por enquanto.

Um servidor é a categoria mais simples. Geralmente, consiste em um web server como o Apache HTTP Server e um database server como o MariaDB. No entanto, outros serviços são possíveis. O sistema operacional embarcado em um dispositivo de uso único se enquadra nesta categoria.

Por outro lado, uma estação de trabalho é muito mais complexa. Geralmente, requer um ambiente gráfico de usuário como LXDE, XFCE, KDE ou Gnome, baseado em um ambiente gráfico básico e vários aplicativos gráficos como o navegador web Firefox, o cliente de e-mail Thunderbird ou a suíte de escritório LibreOffice. Esses aplicativos exigem muitos (várias centenas, dependendo das capacidades desejadas) mais packages de aplicativos de suporte e libraries.

Além do exposto, há um conjunto de aplicativos para gerenciamento de sistema para todos os tipos de sistemas. Esses aplicativos estão todos no livro BLFS. Nem todos os packages são necessários em todos os ambientes. Por exemplo, dhcpcd não é normalmente apropriado para um server e wireless_tools são normalmente úteis apenas para um sistema laptop.

## 11.5.2. Trabalhando em um ambiente LFS básico

Quando você inicializa no LFS, você tem todas as ferramentas internas para construir packages adicionais. Infelizmente, o ambiente de usuário é bastante espartano. Existem algumas maneiras de melhorar isso:

### 11.5.2.1. Trabalhar a partir do host LFS em chroot

Este método fornece um ambiente gráfico completo onde um navegador completo e capacidades de copiar/colar estão disponíveis. Este método permite usar aplicativos como a versão do wget do host para baixar fontes de package para um local disponível ao trabalhar no ambiente chroot.

Para construir packages corretamente em chroot, você também precisará lembrar de montar os sistemas de arquivos virtuais se eles ainda não estiverem montados. Uma maneira de fazer isso é criar um script no sistema HOST:

```
cat > ~/mount-virt.sh << "EOF"
#!/bin/bash

function mountbind
{
   if ! mountpoint $LFS/$1 >/dev/null; then
     $SUDO mount --bind /$1 $LFS/$1
     echo $LFS/$1 mounted
   else
     echo $LFS/$1 already mounted
   fi
}

function mounttype
{
   if ! mountpoint $LFS/$1 >/dev/null; then
     $SUDO mount -t $2 $3 $4 $5 $LFS/$1
     echo $LFS/$1 mounted
   else
     echo $LFS/$1 already mounted
   fi
}

if [ $EUID -ne 0 ]; then
  SUDO=sudo
else
  SUDO=""
fi

if [ x$LFS == x ]; then
  echo "LFS not set"
  exit 1
fi

mountbind dev
mounttype dev/pts devpts devpts -o gid=5,mode=620
mounttype proc    proc   proc
mounttype sys     sysfs  sysfs
mounttype run     tmpfs  run
if [ -h $LFS/dev/shm ]; then
  install -v -d -m 1777 $LFS$(realpath /dev/shm)
else
  mounttype dev/shm tmpfs tmpfs -o nosuid,nodev
fi 

#mountbind usr/src
#mountbind boot
#mountbind home
EOF
```

Observe que os últimos três comandos no script estão comentados. Eles são úteis se esses diretórios estiverem montados como partições separadas no sistema host e serão montados ao inicializar o sistema LFS/BLFS completo.

O script pode ser executado com bash ~/mount-virt.sh como um usuário comum (recomendado) ou como root. Se executado como um usuário comum, sudo é necessário no sistema host.

Outra questão apontada pelo script é onde armazenar os arquivos de package baixados. Este local é arbitrário. Pode ser no diretório home de um usuário comum, como ~/sources, ou em um local global como /usr/src. Nossa recomendação é não misturar fontes BLFS e fontes LFS em (a partir do ambiente chroot) /sources. Em qualquer caso, os packages devem estar acessíveis dentro do ambiente chroot.

Um último recurso de conveniência apresentado aqui é simplificar o processo de entrada no ambiente chroot. Isso pode ser feito com um alias colocado no arquivo ~/.bashrc de um usuário no sistema host:

```
alias lfs='sudo /usr/sbin/chroot /mnt/lfs /usr/bin/env -i HOME=/root TERM="$TERM" PS1="\u:\w\\\\$ "
PATH=/usr/bin:/usr/sbin /bin/bash --login'
```

Este alias é um pouco complicado por causa das aspas e dos níveis de caracteres de barra invertida. Ele deve estar todo em uma única linha. O comando acima foi dividido em dois para fins de apresentação.

### 11.5.2.2. Trabalhar remotamente via ssh

Este método também fornece um ambiente gráfico completo, mas primeiro requer a instalação do sshd no sistema LFS, geralmente em chroot. Também requer um segundo computador. Este método tem a vantagem de ser simples por não exigir a complexidade do ambiente chroot. Ele também usa o seu kernel construído no LFS para todos os packages adicionais e ainda fornece um sistema completo para instalar packages.

Você pode usar o comando scp para fazer upload das fontes de package a serem construídas no sistema LFS. Se você quiser baixar as fontes diretamente no sistema LFS, instale libtasn1, p11-kit, make-ca e wget em chroot (ou faça upload de suas fontes usando scp após inicializar o sistema LFS).

### 11.5.2.3. Trabalhar a partir da linha de comando LFS

Este método requer a instalação de libtasn1, p11-kit, make-ca, wget, gpm e links (ou lynx) em chroot e, em seguida, reinicializar no novo sistema LFS. Neste ponto, o sistema padrão tem seis consoles virtuais. Trocar de console é tão fácil quanto usar as combinações de teclas Alt+Fx, onde Fx está entre F1 e F6. As combinações Alt+← e Alt+→ também mudarão o console.

Neste ponto, você pode fazer login em dois consoles virtuais diferentes e executar o navegador links ou lynx em um console e bash no outro. O GPM então permite copiar comandos do navegador com o botão esquerdo do mouse, trocar de consoles e colar no outro console.

### Nota

Como observação lateral, a troca de consoles virtuais também pode ser feita a partir de uma instância X Window com a combinação de teclas Ctrl+Alt+Fx, mas a operação de cópia do mouse não funciona entre a interface gráfica e um console virtual. Você pode retornar à exibição X Window com a combinação Ctrl+Alt+Fx, onde Fx é geralmente F1, mas pode ser F7.
