# 8.22. MPFR-4.2.2

O pacote MPFR contém funções para matemática de precisão múltipla.

## 8.22.1. Instalação do MPFR

Prepare o MPFR para compilação:

```bash
./configure --prefix=/usr        \
            --disable-static     \
            --enable-thread-safe \
            --docdir=/usr/share/doc/mpfr-4.2.2
```

Compile o pacote e gere a documentação HTML:

```bash
make
make html
```

### Importante

A suíte de testes para MPFR nesta seção é considerada crítica. Não a pule sob nenhuma circunstância.

Teste os resultados e certifique-se de que todos os 198 testes foram aprovados:

```bash
make check
```

Instale o pacote e sua documentação:

```bash
make install
make install-html
```

## 8.22.2. Conteúdo do MPFR

### Descrições Breves

libmpfr

Contém funções matemáticas de precisão múltipla
