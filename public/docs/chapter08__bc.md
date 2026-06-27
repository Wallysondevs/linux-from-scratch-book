# 8.14. Bc-7.0.3

O pacote Bc contém uma linguagem de processamento numérico de precisão arbitrária.

## 8.14.1. Instalação do Bc

Prepare o Bc para compilação:

```bash
CC='gcc -std=c99' ./configure --prefix=/usr -G -O3 -r
```

O significado das opções de configure:

Este parâmetro especifica o compilador e o padrão C a serem usados.

Omite partes da suíte de testes que não funcionarão até que o programa bc tenha sido instalado.

Especifica a otimização a ser usada.

Habilita o uso do Readline para melhorar o recurso de edição de linha do bc.

Compile o pacote:

```bash
make
```

Para testar o bc, execute:

```bash
make test
```

Instale o pacote:

```bash
make install
```

## 8.14.2. Conteúdo do Bc

### Descrições Breves

bc

Uma calculadora de linha de comando

dc

Uma calculadora de linha de comando com notação polonesa inversa
