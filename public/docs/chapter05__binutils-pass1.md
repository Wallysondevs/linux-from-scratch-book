# 5.2. Binutils-2.45 - Passagem 1

O pacote Binutils contém um linker, um assembler e outras ferramentas para manipular arquivos objeto.

## 5.2.1. Instalação do Cross Binutils

### Nota

Volte e releia as notas na seção intitulada Instruções Gerais de Compilação. Compreender as notas marcadas como importantes pode poupar muitos problemas mais tarde.

É importante que o Binutils seja o primeiro pacote compilado porque tanto o Glibc quanto o GCC realizam vários testes no linker e assembler disponíveis para determinar quais de suas próprias funcionalidades habilitar.

A documentação do Binutils recomenda construir o Binutils em um diretório de build dedicado:

```bash
mkdir -v build
cd       build
```

### Nota

Para que os valores SBU listados no restante do livro sejam úteis, meça o tempo que leva para construir este pacote desde a configuração, até e incluindo a primeira instalação. Para conseguir isso facilmente, envolva os comandos em um comando time como este: time { ../configure ... && make && make install; }.

Agora prepare o Binutils para compilação:

```bash
../configure --prefix=$LFS/tools \
             --with-sysroot=$LFS \
             --target=$LFS_TGT   \
             --disable-nls       \
             --enable-gprofng=no \
             --disable-werror    \
             --enable-new-dtags  \
             --enable-default-hash-style=gnu
```

O significado das opções do configure:

### Nota

Ao contrário de outros pacotes, nem todas as opções listadas abaixo aparecem ao executar ./configure --help. Por exemplo, para encontrar a opção --with-sysroot, você precisa executar ld/configure --help. Todas as opções podem ser listadas de uma vez com ./configure --help=recursive.

Isso informa ao script configure para preparar a instalação dos programas Binutils no diretório $LFS/tools.

Para compilação cruzada, isso informa ao sistema de build para procurar em $LFS pelas bibliotecas do sistema target conforme necessário.

Como a descrição da máquina na variável LFS_TGT é ligeiramente diferente do valor retornado pelo script config.guess, este switch informará ao script configure para ajustar o sistema de build do binutil para construir um cross linker.

Isso desabilita a internacionalização já que i18n não é necessário para as ferramentas temporárias.

Isso desabilita a construção do gprofng que não é necessário para as ferramentas temporárias.

Isso impede que o build pare no caso de haver avisos do compilador do host.

Isso faz com que o linker use a tag “runpath” para incorporar caminhos de busca de bibliotecas em executáveis e bibliotecas compartilhadas, em vez da tag “rpath” tradicional. Isso facilita a depuração de executáveis dinamicamente linkados e contorna problemas potenciais na suíte de testes de alguns pacotes.

Por padrão, o linker geraria tanto a tabela hash no estilo GNU quanto a tabela hash ELF clássica para bibliotecas compartilhadas e executáveis dinamicamente linkados. As tabelas hash são destinadas apenas a um linker dinâmico para realizar a busca de símbolos. No LFS, o linker dinâmico (fornecido pelo pacote Glibc) sempre usará a tabela hash no estilo GNU que é mais rápida para consultar. Portanto, a tabela hash ELF clássica é completamente inútil. Isso faz com que o linker gere apenas a tabela hash no estilo GNU por padrão, para que possamos evitar o desperdício de tempo para gerar a tabela hash ELF clássica quando construímos os pacotes, ou o desperdício de espaço em disco para armazená-la.

Continue com a compilação do pacote:

```bash
make
```

Instale o pacote:

```bash
make install
```

Detalhes sobre este pacote estão localizados em [Seção 8.20.2, “Conteúdo do Binutils.”](#/page/chapter08__binutils)
