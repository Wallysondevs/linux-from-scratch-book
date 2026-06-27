# 10.2. Criando o arquivo /etc/fstab

O arquivo /etc/fstab é usado por alguns programas para determinar onde os sistemas de arquivos devem ser montados por padrão, em que ordem, e quais devem ser verificados (quanto a erros de integridade) antes da montagem. Crie uma nova tabela de sistemas de arquivos assim:

```bash
cat > /etc/fstab << "EOF"
# Begin /etc/fstab

# file system  mount-point  type     options             dump  fsck
#                                                              order

/dev/<xxx>     /            <fff>    defaults            1     1
/dev/<yyy>     swap         swap     pri=1               0     0

# End /etc/fstab
EOF
```

Substitua <xxx>, <yyy> e <fff> pelos valores apropriados para o sistema, por exemplo, sda2, sda5 e ext4. Para detalhes sobre os seis campos neste arquivo, consulte fstab(5).

Sistemas de arquivos com origem MS-DOS ou Windows (ou seja, vfat, ntfs, smbfs, cifs, iso9660, udf) precisam de uma opção especial, utf8, para que caracteres não-ASCII em nomes de arquivos sejam interpretados corretamente. Para locais não-UTF-8, o valor de iocharset deve ser definido para ser o mesmo que o conjunto de caracteres do local, ajustado de tal forma que o kernel o entenda. Isso funciona se a definição de conjunto de caracteres relevante (encontrada em Sistemas de arquivos -> Suporte a Idioma Nativo ao configurar o kernel) tiver sido compilada no kernel ou construída como um módulo. No entanto, se o conjunto de caracteres do local for UTF-8, a opção correspondente iocharset=utf8 tornaria o sistema de arquivos sensível a maiúsculas e minúsculas. Para corrigir isso, use a opção especial utf8 em vez de iocharset=utf8, para locais UTF-8. A opção “codepage” também é necessária para sistemas de arquivos vfat e smbfs. Ela deve ser definida para o número da codepage usado no MS-DOS em seu país. Por exemplo, para montar pen drives USB, um usuário ru_RU.KOI8-R precisaria do seguinte na porção de opções de sua linha de montagem em /etc/fstab:

```
noauto,user,quiet,showexec,codepage=866,iocharset=koi8r
```

O fragmento de opções correspondente para usuários ru_RU.UTF-8 é:

```
noauto,user,quiet,showexec,codepage=866,utf8
```

Observe que usar iocharset é o padrão para iso8859-1 (o que mantém o sistema de arquivos insensível a maiúsculas e minúsculas), e a opção utf8 informa ao kernel para converter os nomes de arquivos usando UTF-8 para que possam ser interpretados no local UTF-8.

Também é possível especificar valores padrão de codepage e iocharset para alguns sistemas de arquivos durante a configuração do kernel. Os parâmetros relevantes são nomeados “Default NLS Option” (CONFIG_NLS_DEFAULT), “Default Remote NLS Option” (CONFIG_SMB_NLS_DEFAULT), “Default codepage for FAT” (CONFIG_FAT_DEFAULT_CODEPAGE) e “Default iocharset for FAT” (CONFIG_FAT_DEFAULT_IOCHARSET). Não há como especificar essas configurações para o sistema de arquivos ntfs no momento da compilação do kernel.
