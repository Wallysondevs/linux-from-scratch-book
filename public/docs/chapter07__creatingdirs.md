# 7.5. Criando Diretórios

É hora de criar a estrutura completa de diretórios no sistema de arquivos LFS.

### Nota

Alguns dos diretórios mencionados nesta seção podem já ter sido criados anteriormente com instruções explícitas, ou ao instalar alguns packages. Eles são repetidos abaixo para fins de completude.

Crie alguns diretórios de nível raiz que não estão no conjunto limitado exigido nos capítulos anteriores, emitindo o seguinte comando:

```bash
mkdir -pv /{boot,home,mnt,opt,srv}
```

Crie o conjunto necessário de subdiretórios abaixo do nível raiz, emitindo os seguintes comandos:

```bash
mkdir -pv /etc/{opt,sysconfig}
mkdir -pv /lib/firmware
mkdir -pv /media/{floppy,cdrom}
mkdir -pv /usr/{,local/}{include,src}
mkdir -pv /usr/lib/locale
mkdir -pv /usr/local/{bin,lib,sbin}
mkdir -pv /usr/{,local/}share/{color,dict,doc,info,locale,man}
mkdir -pv /usr/{,local/}share/{misc,terminfo,zoneinfo}
mkdir -pv /usr/{,local/}share/man/man{1..8}
mkdir -pv /var/{cache,local,log,mail,opt,spool}
mkdir -pv /var/lib/{color,misc,locate}

ln -sfv /run /var/run
ln -sfv /run/lock /var/lock

install -dv -m 0750 /root
install -dv -m 1777 /tmp /var/tmp
```

Os diretórios são, por padrão, criados com o modo de permissão 755, mas isso não é desejável em todos os lugares. Nos comandos acima, duas alterações são feitas — uma para o diretório home do usuário root, e outra para os diretórios de arquivos temporários.

A primeira mudança de modo garante que nem qualquer um possa entrar no diretório /root — assim como um usuário normal faria com seu próprio diretório home. A segunda mudança de modo garante que qualquer usuário possa escrever nos diretórios /tmp e /var/tmp, mas não possa remover arquivos de outro usuário deles. Este último é proibido pelo chamado “sticky bit,” o bit mais alto (1) na máscara de bits 1777.

## 7.5.1. Nota de Conformidade FHS

Esta árvore de diretórios é baseada no Filesystem Hierarchy Standard (FHS) (disponível em https://refspecs.linuxfoundation.org/fhs.shtml). O FHS também especifica a existência opcional de diretórios adicionais como /usr/local/games e /usr/share/games. No LFS, criamos apenas os diretórios que são realmente necessários. No entanto, sinta-se à vontade para criar mais diretórios, se desejar.

### Aviso

O FHS não exige a existência do diretório /usr/lib64, e os editores do LFS decidiram não usá-lo. Para que as instruções no LFS e BLFS funcionem corretamente, é imperativo que este diretório não exista. De tempos em tempos, você deve verificar se ele não existe, porque é fácil criá-lo inadvertidamente, e isso provavelmente quebrará seu sistema.
