# 6.4. Bash-5.3

O pacote Bash contém o Bourne-Again Shell.

## 6.4.1. Instalação do Bash

Prepare o Bash para compilação:

```bash
./configure --prefix=/usr                      \
            --build=$(sh support/config.guess) \
            --host=$LFS_TGT                    \
            --without-bash-malloc
```

O significado das opções de configuração:

Esta opção desativa o uso da função de alocação de memória (malloc) do Bash, que é conhecida por causar falhas de segmentação. Ao desativar esta opção, o Bash usará as funções malloc do Glibc, que são mais estáveis.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Crie um link para os programas que usam sh como um shell:

```bash
ln -sv bash $LFS/bin/sh
```

Detalhes sobre este pacote estão localizados em [Seção 8.36.2, “Conteúdo do Bash.”](#/page/chapter08__bash)
