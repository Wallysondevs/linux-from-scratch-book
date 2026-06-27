# 7.12. Util-linux-2.41.1

O pacote Util-linux contém programas utilitários diversos.

## 7.12.1. Instalação do Util-linux

O FHS recomenda usar o diretório /var/lib/hwclock em vez do diretório /etc usual como o local para o arquivo adjtime. Crie este diretório com:

```bash
mkdir -pv /var/lib/hwclock
```

Prepare o Util-linux para compilação:

```bash
./configure --libdir=/usr/lib     \
            --runstatedir=/run    \
            --disable-chfn-chsh   \
            --disable-login       \
            --disable-nologin     \
            --disable-su          \
            --disable-setpriv     \
            --disable-runuser     \
            --disable-pylibmount  \
            --disable-static      \
            --disable-liblastlog2 \
            --without-python      \
            ADJTIME_PATH=/var/lib/hwclock/adjtime \
            --docdir=/usr/share/doc/util-linux-2.41.1
```

O significado das opções de configure:

Isso define o local do arquivo que registra informações sobre o relógio de hardware de acordo com o FHS. Isso não é estritamente necessário para esta ferramenta temporária, mas evita a criação de um arquivo em outro local, que não seria sobrescrito ou removido ao construir o pacote util-linux final.

Este switch garante que os symlinks .so apontem para o arquivo da biblioteca compartilhada diretamente no mesmo diretório (/usr/lib).

Estes switches evitam avisos sobre a construção de componentes que exigem pacotes que não estão no LFS ou ainda não foram instalados.

Este switch desabilita o uso de Python. Ele evita tentar construir bindings desnecessários.

Este switch define o local do socket usado por uuidd e libuuid corretamente.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make install
```

Detalhes sobre este pacote estão localizados em [Seção 8.80.2, “Conteúdo do Util-linux.”](#/page/chapter08__util-linux)
