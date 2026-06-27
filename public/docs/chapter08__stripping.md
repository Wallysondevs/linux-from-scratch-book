# 8.83. Remoção de Símbolos

Esta seção é opcional. Se o usuário pretendido não for um programador e não planeja fazer nenhuma depuração do software do sistema, o tamanho do sistema pode ser diminuído em cerca de 2 GB removendo os símbolos de depuração e algumas entradas desnecessárias da tabela de símbolos, de binários e bibliotecas. Isso não causa nenhum inconveniente real para um usuário Linux típico.

A maioria das pessoas que usa os comandos mencionados abaixo não encontra dificuldades. No entanto, é fácil cometer um erro e tornar o novo sistema inutilizável. Portanto, antes de executar os comandos strip, é uma boa ideia fazer um backup do sistema LFS em seu estado atual.

Um comando strip com a opção --strip-unneeded remove todos os símbolos de depuração de um binário ou biblioteca. Ele também remove todas as entradas da tabela de símbolos que não são normalmente necessárias pelo linker (para bibliotecas estáticas) ou linker dinâmico (para binários e bibliotecas compartilhadas dinamicamente linkados). Usar --strip-debug não remove entradas da tabela de símbolos que podem ser necessárias para algumas aplicações. A diferença entre unneeded e debug é muito pequena. Por exemplo, um libc.a sem strip tem 22.4 MB. Após o stripping com --strip-debug, ele tem 5.9 MB. Usar --strip-unneeded apenas reduz o tamanho para 5.8 MB.

Os símbolos de depuração de bibliotecas selecionadas são compactados com Zstd e preservados em arquivos separados. Essa informação de depuração é necessária para executar testes de regressão com valgrind ou gdb mais tarde, no BLFS.

Observe que strip irá sobrescrever o arquivo binário ou de biblioteca que está processando. Isso pode travar os processos que usam código ou dados do arquivo. Se o processo que executa strip for afetado, o binário ou biblioteca sendo submetido ao strip pode ser destruído; isso pode tornar o sistema completamente inutilizável. Para evitar esse problema, copiamos algumas bibliotecas e binários para /tmp, os submetemos ao strip lá e depois os reinstalamos com o comando install. (A entrada relacionada na Seção 8.2.1, “Upgrade Issues” fornece a justificativa para usar o comando install aqui.)

### Nota

O nome do carregador ELF é ld-linux-x86-64.so.2 em sistemas de 64 bits e ld-linux.so.2 em sistemas de 32 bits. A construção abaixo seleciona o nome correto para a arquitetura atual, excluindo qualquer coisa que termine com g, caso os comandos abaixo já tenham sido executados.

### Importante

Se houver algum package cuja versão seja diferente da versão especificada pelo livro (seja seguindo um aviso de segurança ou satisfazendo uma preferência pessoal), pode ser necessário atualizar o nome do arquivo da biblioteca em save_usrlib ou online_usrlib. Não fazer isso pode tornar o sistema completamente inutilizável.

```bash
save_usrlib="$(cd /usr/lib; ls ld-linux*[^g])
             libc.so.6
             libthread_db.so.1
             libquadmath.so.0.0.0
             libstdc++.so.6.0.34
             libitm.so.1.0.0
             libatomic.so.1.2.0"

cd /usr/lib

for LIB in $save_usrlib; do
    objcopy --only-keep-debug --compress-debug-sections=zstd $LIB $LIB.dbg
    cp $LIB /tmp/$LIB
    strip --strip-debug /tmp/$LIB
    objcopy --add-gnu-debuglink=$LIB.dbg /tmp/$LIB
    install -vm755 /tmp/$LIB /usr/lib
    rm /tmp/$LIB
done

online_usrbin="bash find strip"
online_usrlib="libbfd-2.45.so
               libsframe.so.2.0.0
               libhistory.so.8.3
               libncursesw.so.6.5
               libm.so.6
               libreadline.so.8.3
               libz.so.1.3.1
               libzstd.so.1.5.7
               $(cd /usr/lib; find libnss*.so* -type f)"

for BIN in $online_usrbin; do
    cp /usr/bin/$BIN /tmp/$BIN
    strip --strip-debug /tmp/$BIN
    install -vm755 /tmp/$BIN /usr/bin
    rm /tmp/$BIN
done

for LIB in $online_usrlib; do
    cp /usr/lib/$LIB /tmp/$LIB
    strip --strip-debug /tmp/$LIB
    install -vm755 /tmp/$LIB /usr/lib
    rm /tmp/$LIB
done

for i in $(find /usr/lib -type f -name \*.so* ! -name \*dbg) \
         $(find /usr/lib -type f -name \*.a)                 \
         $(find /usr/{bin,sbin,libexec} -type f); do
    case "$online_usrbin $online_usrlib $save_usrlib" in
        *$(basename $i)* )
            ;;
        * ) strip --strip-debug $i
            ;;
    esac
done

unset BIN LIB save_usrlib online_usrbin online_usrlib
```

Um grande número de arquivos será sinalizado como erro porque seu formato de arquivo não é reconhecido. Esses avisos podem ser ignorados com segurança. Eles indicam que esses arquivos são scripts, não binários.
