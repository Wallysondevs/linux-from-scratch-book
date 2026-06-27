# 8.81. E2fsprogs-1.47.3

O pacote E2fsprogs contém as utilidades para manipular o sistema de arquivos ext2. Ele também suporta os sistemas de arquivos com journaling ext3 e ext4.

## 8.81.1. Instalação do E2fsprogs

A documentação do E2fsprogs recomenda que o package seja buildado em um subdiretório da source tree:

```bash
mkdir -v build
cd       build
```

Prepare o E2fsprogs para compilação:

```bash
../configure --prefix=/usr       \
             --sysconfdir=/etc   \
             --enable-elf-shlibs \
             --disable-libblkid  \
             --disable-libuuid   \
             --disable-uuidd     \
             --disable-fsck
```

O significado das configure options:

Isso cria as shared libraries que alguns programas neste package usam.

Isso impede o build e a instalação das libraries libuuid e libblkid, do daemon uuidd e do fsck wrapper; o util-linux instala versões mais recentes.

Compile o package:

```bash
make
```

Para executar os testes, digite:

```bash
make check
```

Um teste chamado m_assume_storage_prezeroed é conhecido por falhar. Outro teste chamado m_rootdir_acl é conhecido por falhar se o file system usado para o sistema LFS não for ext4.

Instale o package:

```bash
make install
```

Remova static libraries inúteis:

```bash
rm -fv /usr/lib/{libcom_err,libe2p,libext2fs,libss}.a
```

Este package instala um arquivo .info gzipped, mas não atualiza o arquivo dir de todo o sistema. Descompacte este arquivo e, em seguida, atualize o arquivo dir do sistema usando os seguintes comandos:

```bash
gunzip -v /usr/share/info/libext2fs.info.gz
install-info --dir-file=/usr/share/info/dir /usr/share/info/libext2fs.info
```

Se desejar, crie e instale alguma documentação adicional digitando os seguintes comandos:

```bash
makeinfo -o      doc/com_err.info ../lib/et/com_err.texinfo
install -v -m644 doc/com_err.info /usr/share/info
install-info --dir-file=/usr/share/info/dir /usr/share/info/com_err.info
```

## 8.81.2. Configurando o E2fsprogs

O /etc/mke2fs.conf contém o default value de várias command line options do mke2fs. Você pode editar o arquivo para tornar os default values adequados às suas necessidades. Por exemplo, algumas utilidades (não no LFS ou BLFS) não conseguem reconhecer um file system ext4 com a feature metadata_csum_seed habilitada. Se você precisar de tal utilidade, você pode remover a feature da default ext4 feature list com o comando:

```bash
sed 's/metadata_csum_seed,//' -i /etc/mke2fs.conf
```

Leia a man page mke2fs.conf(5) para detalhes.

## 8.81.3. Conteúdo do E2fsprogs

### Descrições Breves

badblocks

Procura por bad blocks em um device (geralmente uma disk partition)

chattr

Altera os attributes de arquivos em file systems ext{234}

compile_et

Um error table compiler; ele converte uma tabela de error-code names e messages em um C source file adequado para uso com a com_err library

debugfs

Um file system debugger; ele pode ser usado para examinar e alterar o estado de file systems ext{234}

dumpe2fs

Imprime o super block e as blocks group information para o file system presente em um dado device

e2freefrag

Reporta informações de fragmentation de espaço livre

e2fsck

É usado para verificar e, opcionalmente, reparar file systems ext{234}

e2image

É usado para salvar dados críticos de file system ext{234} em um arquivo

e2label

Exibe ou altera o file system label no file system ext{234} em um dado device

e2mmpstatus

Verifica o status de MMP (Multiple Mount Protection) de um file system ext4

e2scrub

Verifica o conteúdo de um sistema de arquivos ext{234} montado

e2scrub_all

Verifica todos os sistemas de arquivos ext{234} montados em busca de erros

e2undo

Reproduz o log de desfazer para um sistema de arquivos ext{234} encontrado em um dispositivo. [Isso pode ser usado para desfazer uma operação falha por um programa E2fsprogs.]

e4crypt

Utilitário de criptografia de sistema de arquivos Ext4

e4defrag

Desfragmentador online para sistemas de arquivos ext4

filefrag

Informa o quão fragmentado um arquivo específico pode estar

fsck.ext2

Por padrão, verifica sistemas de arquivos ext2 e é um hard link para e2fsck

fsck.ext3

Por padrão, verifica sistemas de arquivos ext3 e é um hard link para e2fsck

fsck.ext4

Por padrão, verifica sistemas de arquivos ext4 e é um hard link para e2fsck

logsave

Salva a saída de um comando em um arquivo de log

lsattr

Lista os atributos de arquivos em um segundo sistema de arquivos estendido

mk_cmds

Converte uma tabela de nomes de comandos e mensagens de ajuda em um arquivo fonte C adequado para uso com a biblioteca de subsistema libss

mke2fs

Cria um sistema de arquivos ext{234} no dispositivo especificado

mkfs.ext2

Por padrão, cria sistemas de arquivos ext2 e é um hard link para mke2fs

mkfs.ext3

Por padrão, cria sistemas de arquivos ext3 e é um hard link para mke2fs

mkfs.ext4

Por padrão, cria sistemas de arquivos ext4 e é um hard link para mke2fs

mklost+found

Cria um diretório lost+found em um sistema de arquivos ext{234}; ele pré-aloca blocos de disco para este diretório para aliviar a tarefa do e2fsck

resize2fs

Pode ser usado para aumentar ou diminuir sistemas de arquivos ext{234}

tune2fs

Ajusta parâmetros configuráveis do sistema de arquivos em sistemas de arquivos ext{234}

libcom_err

A rotina comum de exibição de erros

libe2p

Usado por dumpe2fs, chattr e lsattr

libext2fs

Contém rotinas para permitir que programas de nível de usuário manipulem sistemas de arquivos ext{234}

libss

Usado por debugfs
