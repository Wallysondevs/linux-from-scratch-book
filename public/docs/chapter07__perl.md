# 7.9. Perl-5.42.0

O pacote Perl contém a Practical Extraction and Report Language.

## 7.9.1. Instalação do Perl

Prepare o Perl para compilação:

```bash
sh Configure -des                                         \
             -D prefix=/usr                               \
             -D vendorprefix=/usr                         \
             -D useshrplib                                \
             -D privlib=/usr/lib/perl5/5.42/core_perl     \
             -D archlib=/usr/lib/perl5/5.42/core_perl     \
             -D sitelib=/usr/lib/perl5/5.42/site_perl     \
             -D sitearch=/usr/lib/perl5/5.42/site_perl    \
             -D vendorlib=/usr/lib/perl5/5.42/vendor_perl \
             -D vendorarch=/usr/lib/perl5/5.42/vendor_perl
```

O significado das opções do Configure:

Esta é uma combinação de três opções: -d usa os padrões para todos os itens; -e garante a conclusão de todas as tarefas; -s silencia a saída não essencial.

Isso garante que o perl saiba como informar aos packages onde eles devem instalar seus módulos Perl.

Construa a libperl necessária por alguns módulos Perl como uma biblioteca compartilhada, em vez de uma biblioteca estática.

Estas configurações definem onde o Perl procura por módulos instalados. Os editores do LFS escolheram colocá-los em uma estrutura de diretórios baseada na versão MAJOR.MINOR do Perl (5.42), o que permite atualizar o Perl para níveis de patch mais recentes (o nível de patch é a última parte separada por ponto na string de versão completa como 5.42.0) sem reinstalar todos os módulos.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make install
```

Detalhes sobre este pacote estão localizados na Seção 8.43.2, “Conteúdo do Perl.”
