# 8.70. Patch-2.8

O pacote Patch contém um programa para modificar ou criar arquivos aplicando um arquivo 'patch' tipicamente criado pelo programa diff.

## 8.70.1. Instalação do Patch

Prepare o Patch para compilação:

```bash
./configure --prefix=/usr
```

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

## 8.70.2. Conteúdo do Patch

### Descrições Breves

patch

Modifica arquivos de acordo com um arquivo patch (Um arquivo patch é normalmente uma listagem de diferenças criada com o programa diff. Ao aplicar essas diferenças aos arquivos originais, patch cria as versões corrigidas.)
