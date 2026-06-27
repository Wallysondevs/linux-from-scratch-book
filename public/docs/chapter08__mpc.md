# 8.23. MPC-1.3.1

O pacote MPC contém uma biblioteca para a aritmética de números complexos com precisão arbitrariamente alta e arredondamento correto do resultado.

## 8.23.1. Instalação do MPC

Prepare o MPC para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/mpc-1.3.1
```

Compile o pacote e gere a documentação HTML:

```bash
make
make html
```

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote e sua documentação:

```bash
make install
make install-html
```

## 8.23.2. Conteúdo do MPC

### Descrições Breves

libmpc

Contém funções matemáticas complexas
