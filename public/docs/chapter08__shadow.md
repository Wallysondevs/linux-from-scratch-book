# 8.28. Shadow-4.18.0

O pacote Shadow contém programas para gerenciar senhas de forma segura.

## 8.28.1. Instalação do Shadow

### Importante

Se você instalou o Linux-PAM, você deve seguir [a instrução do BLFS](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/shadow.html) em vez desta página para buildar (ou, rebuildar ou atualizar) o shadow.

### Nota

Se você deseja impor o uso de senhas fortes, [instale e configure o Linux-PAM](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/linux-pam.html) primeiro. Em seguida, [instale e configure o shadow com suporte a PAM](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/shadow.html). Finalmente, [instale o libpwquality e configure o PAM para usá-lo](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/libpwquality.html).

Desabilite a instalação do programa groups e suas páginas man, já que o Coreutils fornece uma versão melhor. Além disso, evite a instalação de páginas de manual que já foram instaladas na [Seção 8.3, “Man-pages-6.15”](#/page/chapter08__man-pages):

```bash
sed -i 's/groups$(EXEEXT) //' src/Makefile.in
find man -name Makefile.in -exec sed -i 's/groups\.1 / /'   {} \;
find man -name Makefile.in -exec sed -i 's/getspnam\.3 / /' {} \;
find man -name Makefile.in -exec sed -i 's/passwd\.5 / /'   {} \;
```

Em vez de usar o método crypt padrão, use o método YESCRYPT muito mais seguro de criptografia de senha, que também permite senhas com mais de 8 caracteres. Também é necessário alterar o local obsoleto /var/spool/mail para caixas de correio de usuário que o Shadow usa por padrão para o local /var/mail usado atualmente. E, remova /bin e /sbin do PATH, já que são simplesmente symlinks para seus equivalentes em /usr.

### Aviso

Incluir /bin e/ou /sbin na variável PATH pode fazer com que alguns pacotes BLFS falhem ao buildar, então não faça isso no arquivo .bashrc ou em qualquer outro lugar.

```bash
sed -e 's:#ENCRYPT_METHOD DES:ENCRYPT_METHOD YESCRYPT:' \
    -e 's:/var/spool/mail:/var/mail:'                   \
    -e '/PATH=/{s@/sbin:@@;s@/bin:@@}'                  \
    -i etc/login.defs
```

Prepare o Shadow para compilação:

```bash
touch /usr/bin/passwd
./configure --sysconfdir=/etc   \
            --disable-static    \
            --with-{b,yes}crypt \
            --without-libbsd    \
            --with-group-name-max-length=32
```

O significado das novas opções de configuração:

O arquivo /usr/bin/passwd precisa existir porque sua localização é hardcoded em alguns programas; se ele ainda não existir, o script de instalação o criará no lugar errado.

O shell expande isso para duas chaves, --with-bcrypt e --with-yescrypt. Eles permitem que o shadow use os algoritmos Bcrypt e Yescrypt implementados pelo Libxcrypt para hashing de senhas. Esses algoritmos são mais seguros (em particular, muito mais resistentes a ataques baseados em GPU) do que os algoritmos SHA tradicionais.

O nome de usuário mais longo permitido é de 32 caracteres. Faça com que o comprimento máximo de um nome de grupo seja o mesmo.

Não use a função readpassphrase do libbsd que não está no LFS. Use a cópia interna em vez disso.

Compile o pacote:

```bash
make
```

Este pacote não vem com um conjunto de testes.

Instale o pacote:

```bash
make exec_prefix=/usr install
make -C man install-man
```

## 8.28.2. Configurando o Shadow

Este pacote contém utilitários para adicionar, modificar e excluir usuários e grupos; definir e alterar suas senhas; e realizar outras tarefas administrativas. Para uma explicação completa do que significa password shadowing, consulte o arquivo doc/HOWTO dentro da árvore de código-fonte descompactada. Se você usa o suporte do Shadow, tenha em mente que os programas que precisam verificar senhas (gerenciadores de exibição, programas FTP, daemons pop3, etc.) devem ser compatíveis com Shadow. Ou seja, eles devem ser capazes de trabalhar com senhas sombreadas.

Para habilitar senhas sombreadas, execute o seguinte comando:

```bash
pwconv
```

Para habilitar senhas de grupo sombreadas, execute:

```bash
grpconv
```

A configuração padrão do Shadow para o utilitário useradd precisa de alguma explicação. Primeiro, a ação padrão para o utilitário useradd é criar o usuário e um grupo com o mesmo nome do usuário. Por padrão, os números de ID de usuário (UID) e ID de grupo (GID) começarão em 1000. Isso significa que, se você não passar parâmetros extras para o useradd, cada usuário será membro de um grupo único no sistema. Se este comportamento for indesejável, você precisará passar o parâmetro -g ou -N para o useradd, ou então alterar a configuração de USERGROUPS_ENAB em /etc/login.defs. Consulte [useradd(8)](https://man.archlinux.org/man/useradd.8) para mais informações.

Segundo, para alterar os parâmetros padrão, o arquivo /etc/default/useradd deve ser criado e adaptado às suas necessidades específicas. Crie-o com:

```bash
mkdir -p /etc/default
useradd -D --gid 999
```

/etc/default/useradd explicações dos parâmetros

Este parâmetro define o início dos números de grupo usados no arquivo /etc/group. O valor particular 999 vem do parâmetro --gid acima. Você pode defini-lo para qualquer valor desejado. Observe que o useradd nunca reutilizará um UID ou GID. Se o número identificado neste parâmetro for usado, ele usará o próximo número disponível. Observe também que, se você não tiver um grupo com um ID igual a este número em seu sistema, na primeira vez que usar o useradd sem o parâmetro -g, uma mensagem de erro será gerada—useradd: unknown GID 999, mesmo que a conta tenha sido criada corretamente. É por isso que criamos o grupo users com este ID de grupo na [Seção 7.6, “Criando Arquivos Essenciais e Symlinks.”](#/page/chapter07__createfiles)

Este parâmetro faz com que o useradd crie um arquivo de caixa de correio para cada novo usuário. O useradd atribuirá a propriedade de grupo deste arquivo ao grupo mail com permissões 0660. Se você preferir não criar esses arquivos, execute o seguinte comando:

```bash
sed -i '/MAIL/s/yes/no/' /etc/default/useradd
```

## 8.28.3. Definindo a Senha do Root

Escolha uma senha para o usuário root e defina-a executando:

```bash
passwd root
```

## 8.28.4. Conteúdo do Shadow

### Descrições Breves

chage

Usado para alterar o número máximo de dias entre as mudanças obrigatórias de senha

chfn

Usado para alterar o nome completo de um usuário e outras informações

chgpasswd

Usado para atualizar senhas de grupo em modo batch

chpasswd

Usado para atualizar senhas de usuário em modo batch

chsh

Usado para alterar o shell de login padrão de um usuário

expiry

Verifica e aplica a política atual de expiração de senha

faillog

É usado para examinar o log de falhas de login, para definir um número máximo de falhas antes que uma conta seja bloqueada e para redefinir a contagem de falhas

getsubids

É usado para listar os intervalos de IDs subordinados para um usuário

gpasswd

É usado para adicionar e remover membros e administradores de grupos

groupadd

Cria um grupo com o nome fornecido

groupdel

Exclui o grupo com o nome fornecido

groupmems

Permite que um usuário administre sua própria lista de membros de grupo sem a necessidade de privilégios de superusuário.

groupmod

É usado para modificar o nome ou GID do grupo fornecido

grpck

Verifica a integridade dos arquivos de grupo /etc/group e /etc/gshadow

grpconv

Cria ou atualiza o arquivo de grupo shadow a partir do arquivo de grupo normal

grpunconv

Atualiza /etc/group a partir de /etc/gshadow e então exclui este último

login

É usado pelo sistema para permitir que os usuários façam login

logoutd

É um daemon usado para impor restrições de tempo e portas de login

newgidmap

É usado para definir o mapeamento de GID de um namespace de usuário

newgrp

É usado para alterar o GID atual durante uma sessão de login

newuidmap

É usado para definir o mapeamento de UID de um namespace de usuário

newusers

É usado para criar ou atualizar uma série inteira de contas de usuário

nologin

Exibe uma mensagem informando que uma conta não está disponível; ele é projetado para ser usado como o shell padrão para contas desabilitadas

passwd

É usado para alterar a senha de uma conta de usuário ou grupo

pwck

Verifica a integridade dos arquivos de senha /etc/passwd e /etc/shadow

pwconv

Cria ou atualiza o arquivo de senha shadow a partir do arquivo de senha normal

pwunconv

Atualiza /etc/passwd a partir de /etc/shadow e então exclui este último

sg

Executa um comando fornecido enquanto o GID do usuário é definido para o do grupo fornecido

su

Executa um shell com IDs de usuário e grupo substitutos

useradd

Cria um novo usuário com o nome fornecido, ou atualiza as informações padrão de novo usuário

userdel

Exclui a conta de usuário especificada

usermod

É usado para modificar o nome de login do usuário fornecido, identificação de usuário (UID), shell, grupo inicial, diretório home, etc.

vigr

Edita os arquivos /etc/group ou /etc/gshadow

vipw

Edita os arquivos /etc/passwd ou /etc/shadow

libsubid

biblioteca para gerenciar intervalos de IDs subordinados para usuários e grupos
