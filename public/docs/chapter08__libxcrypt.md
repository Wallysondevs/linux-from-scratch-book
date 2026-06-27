# 8.27. Libxcrypt-4.4.38

O package Libxcrypt contém uma biblioteca moderna para hash unidirecional de senhas.

## 8.27.1. Instalação do Libxcrypt

Prepare o Libxcrypt para compilação:

```bash
./configure --prefix=/usr                \
            --enable-hashes=strong,glibc \
            --enable-obsolete-api=no     \
            --disable-static             \
            --disable-failure-tokens
```

O significado das novas opções de configure:

Construa algoritmos de hash fortes recomendados para casos de uso de segurança, e os algoritmos de hash fornecidos pela libcrypt tradicional do Glibc para compatibilidade.

Desabilite funções de API obsoletas. Elas não são necessárias para um sistema Linux moderno construído a partir do código-fonte.

Desabilite o recurso de token de falha. Ele é necessário para compatibilidade com as bibliotecas de hash tradicionais de algumas plataformas, mas um sistema Linux baseado no Glibc não precisa dele.

Compile o package:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Instale o package:

```bash
make install
```

### Nota

As instruções acima desabilitaram funções de API obsoletas, uma vez que nenhum package instalado compilando a partir do código-fonte se vincularia a elas em tempo de execução. No entanto, as únicas aplicações somente binárias conhecidas que se vinculam a essas funções exigem a versão 1 da ABI. Se você precisar de tais funções devido a alguma aplicação somente binária ou para estar em conformidade com o LSB, construa o package novamente com os seguintes comandos:

```bash
make distclean
./configure --prefix=/usr                \
            --enable-hashes=strong,glibc \
            --enable-obsolete-api=glibc  \
            --disable-static             \
            --disable-failure-tokens
make
cp -av --remove-destination .libs/libcrypt.so.1* /usr/lib
```

## 8.27.2. Conteúdo do Libxcrypt

### Descrições Curtas

libcrypt

Contém funções para fazer hash de senhas
