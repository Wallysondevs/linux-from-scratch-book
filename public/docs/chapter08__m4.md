# 8.13. M4-1.4.20

O pacote M4 contém um processador de macros.

## 8.13.1. Instalação do M4

Prepare o M4 para compilação:

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

## 8.13.2. Conteúdo do M4

### Descrições Breves

m4

Copia os arquivos fornecidos enquanto expande as macros que eles contêm. Essas macros são embutidas ou definidas pelo usuário e podem aceitar qualquer número de argumentos. Além de realizar a expansão de macros, o m4 possui funções embutidas para incluir arquivos nomeados, executar comandos Unix, realizar aritmética de inteiros, manipular texto, recursão, etc. O programa m4 pode ser usado tanto como um front-end para um compilador quanto como um processador de macros por si só.
