# 8.7. Bzip2-1.0.8

O pacote Bzip2 contém programas para comprimir e descomprimir arquivos. Comprimir arquivos de texto com bzip2 resulta em uma porcentagem de compressão muito melhor do que com o gzip tradicional.

## 8.7.1. Instalação do Bzip2

Aplique um patch que instalará a documentação para este pacote:

```bash
patch -Np1 -i ../bzip2-1.0.8-install_docs-1.patch
```

O comando a seguir garante que a instalação de links simbólicos seja relativa:

```bash
sed -i 's@\(ln -s -f \)$(PREFIX)/bin/@\1@' Makefile
```

Garanta que as páginas man sejam instaladas no local correto:

```bash
sed -i "s@(PREFIX)/man@(PREFIX)/share/man@g" Makefile
```

Prepare o Bzip2 para compilação com:

```bash
make -f Makefile-libbz2_so
make clean
```

O significado do parâmetro make:

Isso fará com que o Bzip2 seja construído usando um arquivo Makefile diferente, neste caso o arquivo Makefile-libbz2_so, que cria uma biblioteca dinâmica libbz2.so e vincula os utilitários Bzip2 a ela.

Compile e teste o pacote:

```bash
make
```

Instale os programas:

```bash
make PREFIX=/usr install
```

Instale a biblioteca compartilhada:

```bash
cp -av libbz2.so.* /usr/lib
ln -sv libbz2.so.1.0.8 /usr/lib/libbz2.so
```

Instale o binário bzip2 compartilhado no diretório /usr/bin, e substitua duas cópias de bzip2 por symlinks:

```bash
cp -v bzip2-shared /usr/bin/bzip2
for i in /usr/bin/{bzcat,bunzip2}; do
  ln -sfv bzip2 $i
done
```

Remova uma biblioteca estática inútil:

```bash
rm -fv /usr/lib/libbz2.a
```

## 8.7.2. Conteúdo do Bzip2

### Descrições Breves

bunzip2

Descomprime arquivos bzipped

bzcat

Descomprime para a saída padrão

bzcmp

Executa cmp em arquivos bzipped

bzdiff

Executa diff em arquivos bzipped

bzegrep

Executa egrep em arquivos bzipped

bzfgrep

Executa fgrep em arquivos bzipped

bzgrep

Executa grep em arquivos bzipped

bzip2

Comprime arquivos usando o algoritmo de compressão de texto por ordenação de blocos Burrows-Wheeler com codificação Huffman; a taxa de compressão é melhor do que a alcançada por compressores mais convencionais que usam algoritmos “Lempel-Ziv”, como o gzip

bzip2recover

Tenta recuperar dados de arquivos bzipped danificados

bzless

Executa less em arquivos bzipped

bzmore

Executa more em arquivos bzipped

libbz2

A biblioteca que implementa compressão de dados sem perdas, por ordenação de blocos, usando o algoritmo Burrows-Wheeler
