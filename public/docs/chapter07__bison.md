# 7.8. Bison-3.8.2

O pacote Bison contém um gerador de parser.

## 7.8.1. Instalação do Bison

Prepare o Bison para compilação:

```bash
./configure --prefix=/usr \
            --docdir=/usr/share/doc/bison-3.8.2
```

O significado da nova opção de configuração:

Isso informa ao sistema de build para instalar a documentação do bison em um diretório versionado.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make install
```

Detalhes sobre este pacote estão localizados em [Seção 8.34.2, “Conteúdo do Bison.”](#/page/chapter08__bison)
