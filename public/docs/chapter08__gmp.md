# 8.21. GMP-6.3.0

O pacote GMP contém bibliotecas matemáticas. Estas possuem funções úteis para aritmética de precisão arbitrária.

## 8.21.1. Instalação do GMP

### Nota

Se você está compilando para x86 de 32 bits, mas possui uma CPU capaz de executar código de 64 bits e especificou CFLAGS no ambiente, o script configure tentará configurar para 64 bits e falhará. Evite isso invocando o comando configure abaixo com

```bash
ABI=32 ./configure ...
```

### Nota

As configurações padrão do GMP produzem bibliotecas otimizadas para o processador host. Se bibliotecas adequadas para processadores menos capazes que a CPU do host forem desejadas, bibliotecas genéricas podem ser criadas anexando a opção --host=none-linux-gnu ao comando configure.

Primeiro, faça um ajuste para compatibilidade com gcc-15 e posterior:

```bash
sed -i '/long long t1;/,+1s/()/(...)/' configure
```

Prepare o GMP para compilação:

```bash
./configure --prefix=/usr    \
            --enable-cxx     \
            --disable-static \
            --docdir=/usr/share/doc/gmp-6.3.0
```

O significado das novas opções de configure:

Este parâmetro habilita o suporte a C++

Esta variável especifica o local correto para a documentação.

Compile o pacote e gere a documentação HTML:

```bash
make
make html
```

### Importante

A suíte de testes para o GMP nesta seção é considerada crítica. Não a pule sob nenhuma circunstância.

Teste os resultados:

```bash
make check 2>&1 | tee gmp-check-log
```

### Cuidado

O código no gmp é altamente otimizado para o processador onde é construído. Ocasionalmente, o código que detecta o processador identifica erroneamente as capacidades do sistema e haverá erros nos testes ou em outras aplicações que usam as bibliotecas gmp com a mensagem Illegal instruction. Neste caso, o gmp deve ser reconfigurado com a opção --host=none-linux-gnu e reconstruído.

Certifique-se de que pelo menos 199 testes na suíte de testes foram aprovados. Verifique os resultados executando o seguinte comando:

```bash
awk '/# PASS:/{total+=$3} ; END{print total}' gmp-check-log
```

Instale o pacote e sua documentação:

```bash
make install
make install-html
```

## 8.21.2. Conteúdo do GMP

### Descrições Breves

libgmp

Contém funções matemáticas de precisão

libgmpxx

Contém funções matemáticas de precisão C++
