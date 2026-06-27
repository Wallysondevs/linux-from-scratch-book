# 6.8. Findutils-4.10.0

O pacote Findutils contém programas para encontrar arquivos. Programas são fornecidos para pesquisar todos os arquivos em uma árvore de diretórios e para criar, manter e pesquisar um banco de dados (geralmente mais rápido que o `find` recursivo, mas não confiável a menos que o banco de dados tenha sido atualizado recentemente). Findutils também fornece o programa `xargs`, que pode ser usado para executar um comando especificado em cada arquivo selecionado por uma pesquisa.

## 6.8.1. Instalação do Findutils

Prepare o Findutils para compilação:

```bash
./configure --prefix=/usr                   \
            --localstatedir=/var/lib/locate \
            --host=$LFS_TGT                 \
            --build=$(build-aux/config.guess)
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Detalhes sobre este pacote estão localizados em [Seção 8.62.2, “Conteúdo do Findutils.”](#/page/chapter08__findutils)
