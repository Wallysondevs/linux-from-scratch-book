# 8.58. Kmod-34.2

O pacote Kmod contém bibliotecas e utilitários para carregar módulos do kernel

## 8.58.1. Instalação do Kmod

Prepare o Kmod para compilação:

```bash
mkdir -p build
cd       build

meson setup --prefix=/usr ..    \
            --buildtype=release \
            -D manpages=false
```

O significado das opções de configuração:

Esta opção desabilita a geração das páginas de manual, que requer um programa externo.

Compile o pacote:

```bash
ninja
```

A suíte de testes deste pacote requer cabeçalhos de kernel brutos (não os cabeçalhos de kernel “sanitizados” instalados anteriormente), que estão além do escopo do LFS.

Agora instale o pacote:

```bash
ninja install
```

## 8.58.2. Conteúdo do Kmod

### Descrições Breves

depmod

Cria um arquivo de dependência com base nos símbolos que encontra no conjunto existente de módulos; este arquivo de dependência é usado por modprobe para carregar automaticamente os módulos necessários

insmod

Instala um módulo carregável no kernel em execução

kmod

Carrega e descarrega módulos do kernel

lsmod

Lista os módulos atualmente carregados

modinfo

Examina um arquivo objeto associado a um módulo do kernel e exibe qualquer informação que possa coletar

modprobe

Usa um arquivo de dependência, criado por depmod, para carregar automaticamente os módulos relevantes

rmmod

Descarrega módulos do kernel em execução

libkmod

Esta biblioteca é usada por outros programas para carregar e descarregar módulos do kernel
