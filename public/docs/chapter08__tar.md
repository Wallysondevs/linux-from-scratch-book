# 8.71. Tar-1.35

O pacote Tar oferece a capacidade de criar arquivos tar, bem como realizar vários outros tipos de manipulação de arquivo. O Tar pode ser usado em arquivos criados anteriormente para extrair arquivos, para armazenar arquivos adicionais ou para atualizar ou listar arquivos que já foram armazenados.

## 8.71.1. Instalação do Tar

Prepare o Tar para compilação:

```bash
FORCE_UNSAFE_CONFIGURE=1  \
./configure --prefix=/usr
```

O significado da opção configure:

Isso força o teste para mknod a ser executado como root. É geralmente considerado perigoso executar este teste como o usuário root, mas como está sendo executado em um sistema que foi apenas parcialmente construído, ignorá-lo está OK.

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Um teste, capabilities: binary store/restore, é conhecido por falhar se for executado porque o LFS não possui selinux, mas será ignorado se o kernel host não suportar atributos estendidos ou rótulos de segurança no sistema de arquivos usado para construir o LFS.

Instale o pacote:

```bash
make install
make -C doc install-html docdir=/usr/share/doc/tar-1.35
```

## 8.71.2. Conteúdo do Tar

### Descrições Breves

tar

Cria, extrai arquivos de e lista o conteúdo de arquivos, também conhecidos como tarballs
