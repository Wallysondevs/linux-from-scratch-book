# 2.2. Requisitos do Sistema Host

## 2.2.1. Hardware

Os editores do LFS recomendam que a CPU do sistema tenha pelo menos quatro núcleos e que o sistema tenha pelo menos 8 GB de memória. Sistemas mais antigos que não atendem a esses requisitos ainda funcionarão, mas o tempo para buildar packages será significativamente maior do que o documentado.

## 2.2.2. Software

Seu sistema host deve ter o seguinte software com as versões mínimas indicadas. Isso não deve ser um problema para a maioria das distribuições Linux modernas. Observe também que muitas distribuições colocarão os headers do software em packages separados, frequentemente na forma de <package-name>-devel ou <package-name>-dev. Certifique-se de instalá-los se sua distribuição os fornecer.

Versões anteriores dos packages de software listados podem funcionar, mas não foram testadas.

- Bash-3.2 (/bin/sh deve ser um link simbólico ou hard link para bash)

- Binutils-2.13.1 (Versões maiores que 2.45 não são recomendadas, pois não foram testadas)

- Bison-2.7 (/usr/bin/yacc deve ser um link para bison ou um pequeno script que executa bison)

- Coreutils-8.1

- Diffutils-2.8.1

- Findutils-4.2.31

- Gawk-4.0.1 (/usr/bin/awk deve ser um link para gawk)

- GCC-5.4 incluindo o compilador C++, g++ (Versões maiores que 15.2.0 não são recomendadas, pois não foram testadas). As bibliotecas padrão C e C++ (com headers) também devem estar presentes para que o compilador C++ possa buildar programas host

- Grep-2.5.1a

- Gzip-1.3.12

- Linux Kernel-5.4 A razão para o requisito da versão do kernel é que especificamos essa versão ao buildar glibc no Capítulo 5 e Capítulo 8, de modo que as soluções alternativas para kernels mais antigos não são habilitadas e o glibc compilado é ligeiramente mais rápido e menor. Em dezembro de 2024, 5.4 é a versão de kernel mais antiga ainda suportada pelos desenvolvedores do kernel. Algumas versões de kernel mais antigas que 5.4 ainda podem ser suportadas por equipes de terceiros, mas não são consideradas versões oficiais de kernel upstream; leia https://kernel.org/category/releases.html para os detalhes. Se o kernel host for anterior a 5.4, você precisará substituir o kernel por uma versão mais atualizada. Existem duas maneiras de fazer isso. Primeiro, veja se seu fornecedor Linux oferece um package de kernel 5.4 ou posterior. Se sim, você pode querer instalá-lo. Se seu fornecedor não oferecer um package de kernel aceitável, ou se você preferir não instalá-lo, você pode compilar um kernel por conta própria. As instruções para compilar o kernel e configurar o boot loader (assumindo que o host usa GRUB) estão localizadas no Capítulo 10. Exigimos que o kernel host suporte o pseudo terminal (PTY) UNIX 98. Ele deve estar habilitado em todas as distros de desktop ou servidor que distribuem Linux 5.4 ou um kernel mais recente. Se você estiver buildando um kernel host customizado, certifique-se de que CONFIG_UNIX98_PTYS esteja definido como y na configuração do kernel.

- M4-1.4.10

- Make-4.0

- Patch-2.5.4

- Perl-5.8.8

- Python-3.4

- Sed-4.1.5

- Tar-1.22

- Texinfo-5.0

- Xz-5.0.0

### Importante

Observe que os symlinks mencionados acima são necessários para buildar um sistema LFS usando as instruções contidas neste livro. Symlinks que apontam para outros softwares (como dash, mawk, etc.) podem funcionar, mas não são testados ou suportados pela equipe de desenvolvimento do LFS, e podem exigir desvio das instruções ou patches adicionais para alguns packages.

Para verificar se seu sistema host possui todas as versões apropriadas e a capacidade de compilar programas, execute os seguintes comandos:

```bash
cat > version-check.sh << "EOF"
#!/bin/bash
# A script to list version numbers of critical development tools

# If you have tools installed in other directories, adjust PATH here AND
# in ~lfs/.bashrc (section 4.4) as well.

LC_ALL=C 
PATH=/usr/bin:/bin

bail() { echo "FATAL: $1"; exit 1; }
grep --version > /dev/null 2> /dev/null || bail "grep does not work"
sed '' /dev/null || bail "sed does not work"
sort   /dev/null || bail "sort does not work"

ver_check()
{
   if ! type -p $2 &>/dev/null
   then 
     echo "ERROR: Cannot find $2 ($1)"; return 1; 
   fi
   v=$($2 --version 2>&1 | grep -E -o '[0-9]+\.[0-9\.]+[a-z]*' | head -n1)
   if printf '%s\n' $3 $v | sort --version-sort --check &>/dev/null
   then 
     printf "OK:    %-9s %-6s >= $3\n" "$1" "$v"; return 0;
   else 
     printf "ERROR: %-9s is TOO OLD ($3 or later required)\n" "$1"; 
     return 1; 
   fi
}

ver_kernel()
{
   kver=$(uname -r | grep -E -o '^[0-9\.]+')
   if printf '%s\n' $1 $kver | sort --version-sort --check &>/dev/null
   then 
     printf "OK:    Linux Kernel $kver >= $1\n"; return 0;
   else 
     printf "ERROR: Linux Kernel ($kver) is TOO OLD ($1 or later required)\n" "$kver"; 
     return 1; 
   fi
}

# Coreutils first because --version-sort needs Coreutils >= 7.0
ver_check Coreutils      sort     8.1 || bail "Coreutils too old, stop"
ver_check Bash           bash     3.2
ver_check Binutils       ld       2.13.1
ver_check Bison          bison    2.7
ver_check Diffutils      diff     2.8.1
ver_check Findutils      find     4.2.31
ver_check Gawk           gawk     4.0.1
ver_check GCC            gcc      5.4
ver_check "GCC (C++)"    g++      5.4
ver_check Grep           grep     2.5.1a
ver_check Gzip           gzip     1.3.12
ver_check M4             m4       1.4.10
ver_check Make           make     4.0
ver_check Patch          patch    2.5.4
ver_check Perl           perl     5.8.8
ver_check Python         python3  3.4
ver_check Sed            sed      4.1.5
ver_check Tar            tar      1.22
ver_check Texinfo        texi2any 5.0
ver_check Xz             xz       5.0.0
ver_kernel 5.4

if mount | grep -q 'devpts on /dev/pts' && [ -e /dev/ptmx ]
then echo "OK:    Linux Kernel supports UNIX 98 PTY";
else echo "ERROR: Linux Kernel does NOT support UNIX 98 PTY"; fi

alias_check() {
   if $1 --version 2>&1 | grep -qi $2
   then printf "OK:    %-4s is $2\n" "$1";
   else printf "ERROR: %-4s is NOT $2\n" "$1"; fi
}
echo "Aliases:"
alias_check awk GNU
alias_check yacc Bison
alias_check sh Bash

echo "Compiler check:"
if printf "int main(){}" | g++ -x c++ -
then echo "OK:    g++ works";
else echo "ERROR: g++ does NOT work"; fi
rm -f a.out

if [ "$(nproc)" = "" ]; then
   echo "ERROR: nproc is not available or it produces empty output"
else
   echo "OK: nproc reports $(nproc) logical cores are available"
fi
EOF

bash version-check.sh
```
