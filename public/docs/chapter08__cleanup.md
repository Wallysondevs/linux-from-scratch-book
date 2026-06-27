# 8.84. Limpeza

Finalmente, limpe alguns arquivos extras restantes da execução dos testes:

```bash
rm -rf /tmp/{*,.*}
```

Existem também vários arquivos nos diretórios /usr/lib e /usr/libexec com a extensão de nome de arquivo .la. Estes são arquivos "libtool archive". Em um sistema Linux moderno, os arquivos .la do libtool são úteis apenas para libltdl. Nenhuma biblioteca no LFS é esperada para ser carregada por libltdl, e é sabido que alguns arquivos .la podem quebrar builds de pacotes BLFS. Remova esses arquivos agora:

```bash
find /usr/lib /usr/libexec -name \*.la -delete
```

Para mais informações sobre arquivos libtool archive, veja a seção BLFS "Sobre arquivos Libtool Archive (.la)".

O compilador construído no Capítulo 6 e Capítulo 7 ainda está parcialmente instalado e não é mais necessário. Remova-o com:

```bash
find /usr -depth -name $(uname -m)-lfs-linux-gnu\* | xargs rm -rf
```

Finalmente, remova a conta de usuário temporária 'tester' criada no início do capítulo anterior.

```bash
userdel -r tester
```
