# 6.6. Diffutils-3.12

O pacote Diffutils contém programas que mostram as diferenças entre arquivos ou diretórios.

## 6.6.1. Instalação do Diffutils

Prepare o Diffutils para compilação:

```bash
./configure --prefix=/usr   \
            --host=$LFS_TGT \
            gl_cv_func_strcasecmp_works=y \
            --build=$(./build-aux/config.guess)
```

O significado das opções do configure:

Esta opção especifica o resultado de uma verificação para o strcasecmp. A verificação requer a execução de um programa C compilado, e isso é impossível durante a cross-compilação porque, em geral, um programa cross-compilado não pode ser executado na distro host. Normalmente, para tal verificação, o script configure usaria um valor de fallback para cross-compilação, mas o valor de fallback para esta verificação está ausente e o script configure não teria valor para usar e falharia. O upstream já corrigiu o problema, mas para aplicar a correção precisaríamos executar o autoconf que a distro host pode não ter. Então, nós apenas especificamos o resultado da verificação (y, pois sabemos que a função strcasecmp no Glibc-2.42 funciona bem) em vez disso, então o configure simplesmente usará o valor especificado e pulará a verificação.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Detalhes sobre este pacote estão localizados em [Seção 8.60.2, “Conteúdo do Diffutils.”](#/page/chapter08__diffutils)
