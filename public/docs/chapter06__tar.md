# 6.15. Tar-1.35

O pacote Tar oferece a capacidade de criar arquivos tar, bem como realizar vários outros tipos de manipulação de arquivo. O Tar pode ser usado em arquivos criados anteriormente para extrair arquivos, para armazenar arquivos adicionais ou para atualizar ou listar arquivos que já foram armazenados.

## 6.15.1. Instalação do Tar

Prepare o Tar para compilação:

```bash
./configure --prefix=/usr   \
            --host=$LFS_TGT \
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

Detalhes sobre este pacote estão localizados na Seção 8.71.2, “Conteúdo do Tar.”
