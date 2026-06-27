# 7.10. Python-3.13.7

O pacote Python 3 contém o ambiente de desenvolvimento Python. É útil para programação orientada a objetos, escrever scripts, prototipar programas grandes e desenvolver aplicações inteiras. Python é uma linguagem de computador interpretada.

## 7.10.1. Instalação do Python

### Nota

Existem dois arquivos de pacote cujo nome começa com o prefixo “python”. O que deve ser extraído é Python-3.13.7.tar.xz (observe a primeira letra maiúscula).

Prepare o Python para compilação:

```bash
./configure --prefix=/usr       \
            --enable-shared     \
            --without-ensurepip \
            --without-static-libpython
```

O significado da opção configure:

Este switch impede a instalação de bibliotecas estáticas.

Este switch desabilita o instalador de packages Python, que não é necessário nesta etapa.

Este switch impede a build de uma biblioteca estática grande, mas desnecessária.

Compile o package:

```bash
make
```

### Nota

Alguns módulos Python 3 não podem ser built agora porque as dependências ainda não estão instaladas. Para o módulo ssl, uma mensagem Python requires a OpenSSL 1.1.1 or newer é exibida. A mensagem deve ser ignorada. Apenas certifique-se de que o comando make de nível superior não falhou. Os módulos opcionais não são necessários agora e eles serão built no Capítulo 8.

Instale o package:

```bash
make install
```

Detalhes sobre este package estão localizados na Seção 8.51.2, “Conteúdo do Python 3.”
