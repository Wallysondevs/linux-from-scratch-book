# 8.61. Gawk-5.3.2

O pacote Gawk contém programas para manipular arquivos de texto.

## 8.61.1. Instalação do Gawk

Primeiro, certifique-se de que alguns arquivos desnecessários não sejam instalados:

```bash
sed -i 's/extras//' Makefile.in
```

Prepare o Gawk para compilação:

```bash
./configure --prefix=/usr
```

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
chown -R tester .
su tester -c "PATH=$PATH make check"
```

Instale o pacote:

```bash
rm -f /usr/bin/gawk-5.3.2
make install
```

O significado do comando:

O sistema de build não recriará o hard link gawk-5.3.2 se ele já existir. Remova-o para garantir que o hard link anterior instalado em [Seção 6.9, “Gawk-5.3.2”](#/page/chapter06__gawk) seja atualizado aqui.

O processo de instalação já criou awk como um symlink para gawk, crie sua página de manual como um symlink também:

```bash
ln -sv gawk.1 /usr/share/man/man1/awk.1
```

Se desejado, instale a documentação:

```bash
install -vDm644 doc/{awkforai.txt,*.{eps,pdf,jpg}} -t /usr/share/doc/gawk-5.3.2
```

## 8.61.2. Conteúdo do Gawk

### Descrições Breves

awk

Um link para gawk

gawk

Um programa para manipular arquivos de texto; é a implementação GNU de awk

gawk-5.3.2

Um hard link para gawk
