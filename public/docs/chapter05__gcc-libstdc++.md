# 5.6. Libstdc++ from GCC-15.2.0

Libstdc++ é a biblioteca padrão C++. É necessária para compilar código C++ (parte do GCC é escrita em C++), mas tivemos que adiar sua instalação quando construímos [gcc-pass1](#/page/chapter05__gcc-pass1) porque Libstdc++ depende do Glibc, que ainda não estava disponível no diretório target.

## 5.6.1. Instalação do Libstdc++ target

### Nota

Libstdc++ faz parte dos fontes do GCC. Você deve primeiro descompactar o tarball do GCC e mudar para o diretório gcc-15.2.0.

Crie um diretório de build separado para Libstdc++ e entre nele:

```bash
mkdir -v build
cd       build
```

Prepare o Libstdc++ para compilação:

```bash
../libstdc++-v3/configure      \
    --host=$LFS_TGT            \
    --build=$(../config.guess) \
    --prefix=/usr              \
    --disable-multilib         \
    --disable-nls              \
    --disable-libstdcxx-pch    \
    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/15.2.0
```

O significado das opções de configure:

Especifica que o cross-compiler que acabamos de construir deve ser usado em vez do que está em /usr/bin.

Este switch impede a instalação de arquivos de inclusão pré-compilados, que não são necessários nesta etapa.

Isso especifica o diretório de instalação para arquivos de inclusão. Como Libstdc++ é a biblioteca padrão C++ para LFS, este diretório deve corresponder ao local onde o compilador C++ ($LFS_TGT-g++) procuraria pelos arquivos de inclusão padrão C++. Em um build normal, esta informação é automaticamente passada para as opções de configure do Libstdc++ a partir do diretório de nível superior. No nosso caso, esta informação deve ser explicitamente fornecida. O compilador C++ irá prepor o path sysroot $LFS (especificado ao construir GCC-pass1) ao path de busca de arquivos de inclusão, então ele realmente buscará em $LFS/tools/$LFS_TGT/include/c++/15.2.0. A combinação da variável DESTDIR (no comando make install abaixo) e deste switch faz com que os headers sejam instalados lá.

Compile o Libstdc++ executando:

```bash
make
```

Instale a biblioteca:

```bash
make DESTDIR=$LFS install
```

Remova os arquivos de archive do libtool porque são prejudiciais para a cross-compilation:

```bash
rm -v $LFS/usr/lib/lib{stdc++{,exp,fs},supc++}.la
```

Detalhes sobre este package estão localizados em [Seção 8.29.2, “Conteúdo do GCC.”](#/page/chapter08__gcc)
