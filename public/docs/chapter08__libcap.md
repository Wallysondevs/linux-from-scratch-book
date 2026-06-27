# 8.26. Libcap-2.76

O pacote Libcap implementa a interface de userspace para as capacidades POSIX 1003.1e disponíveis nos kernels Linux. Essas capacidades dividem o privilégio de root todo-poderoso em um conjunto de privilégios distintos.

## 8.26.1. Instalação do Libcap

Impeça que as bibliotecas estáticas sejam instaladas:

```bash
sed -i '/install -m.*STA/d' libcap/Makefile
```

Compile o pacote:

```bash
make prefix=/usr lib=lib
```

O significado da opção make:

Este parâmetro define o diretório da biblioteca para /usr/lib em vez de /usr/lib64 em x86_64. Não tem efeito em x86.

Para testar os resultados, execute:

```bash
make test
```

Instale o pacote:

```bash
make prefix=/usr lib=lib install
```

## 8.26.2. Conteúdo do Libcap

### Descrições Breves

capsh

Um wrapper de shell para explorar e restringir o suporte a capacidades

getcap

Examina capacidades de arquivo

getpcaps

Exibe as capacidades do(s) processo(s) consultado(s)

setcap

Define capacidades de arquivo

libcap

Contém as funções da biblioteca para manipular capacidades POSIX 1003.1e

libpsx

Contém funções para suportar semânticas POSIX para syscalls associadas à biblioteca pthread
