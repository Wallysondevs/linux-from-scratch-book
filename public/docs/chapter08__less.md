# 8.42. Less-679

O pacote Less contém um visualizador de arquivos de texto.

## 8.42.1. Instalação do Less

Prepare o Less para compilação:

```bash
./configure --prefix=/usr --sysconfdir=/etc
```

O significado das opções de configuração:

Esta opção informa aos programas criados pelo pacote para procurar em /etc pelos arquivos de configuração.

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote:

```bash
make install
```

## 8.42.2. Conteúdo do Less

### Descrições Breves

less

Um visualizador de arquivos ou paginador; ele exibe o conteúdo do arquivo fornecido, permitindo ao usuário rolar, encontrar strings e pular para marcadores

lessecho

Necessário para expandir meta-caracteres, como * e ?, em nomes de arquivos em sistemas Unix

lesskey

Usado para especificar as associações de teclas para o less
