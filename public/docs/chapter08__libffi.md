# 8.50. Libffi-3.5.2

A biblioteca Libffi fornece uma interface de programação portátil e de alto nível para várias convenções de chamada. Isso permite que um programador chame qualquer função especificada por uma descrição de interface de chamada em tempo de execução.

FFI significa Foreign Function Interface. Uma FFI permite que um programa escrito em uma linguagem chame um programa escrito em outra linguagem. Especificamente, Libffi pode fornecer uma ponte entre um interpretador como Perl ou Python, e sub-rotinas de biblioteca compartilhada escritas em C ou C++.

## 8.50.1. Instalação do Libffi

### Nota

Assim como o GMP, o Libffi é construído com otimizações específicas para o processador em uso. Se estiver construindo para outro sistema, altere o valor do parâmetro --with-gcc-arch= no comando a seguir para um nome de arquitetura totalmente implementado tanto pela CPU host quanto pela CPU nesse sistema. Se isso não for feito, todos os aplicativos que se vinculam ao libffi acionarão Erros de Operação Ilegal. Se você não conseguir encontrar um valor seguro para ambas as CPUs, substitua o parâmetro por --without-gcc-arch para produzir uma biblioteca genérica.

Prepare o Libffi para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --with-gcc-arch=native
```

O significado da opção configure:

Garanta que o GCC otimize para o sistema atual. Se isso não for especificado, o sistema é adivinhado e o código gerado pode não estar correto. Se o código gerado for copiado do sistema nativo para um sistema menos capaz, use o sistema menos capaz como parâmetro. Para detalhes sobre tipos de sistema alternativos, consulte as opções x86 no manual do GCC.

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

## 8.50.2. Conteúdo do Libffi

### Descrições Breves

libffi

Contém as funções da API de interface de função estrangeira
