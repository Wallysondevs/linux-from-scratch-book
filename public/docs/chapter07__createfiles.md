# 7.6. Criando Arquivos Essenciais e Symlinks

Historicamente, o Linux mantinha uma lista dos sistemas de arquivos montados no arquivo /etc/mtab. Kernels modernos mantêm esta lista internamente e a expõem ao usuário através do sistema de arquivos /proc. Para satisfazer utilitários que esperam encontrar /etc/mtab, crie o seguinte link simbólico:

```bash
ln -sv /proc/self/mounts /etc/mtab
```

Crie um arquivo /etc/hosts básico para ser referenciado em algumas suítes de teste, e também em um dos arquivos de configuração do Perl:

```bash
cat > /etc/hosts << EOF
127.0.0.1  localhost $(hostname)
::1        localhost
EOF
```

Para que o usuário root possa fazer login e para que o nome “root” seja reconhecido, deve haver entradas relevantes nos arquivos /etc/passwd e /etc/group.

Crie o arquivo /etc/passwd executando o seguinte comando:

```bash
cat > /etc/passwd << "EOF"
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/usr/bin/false
daemon:x:6:6:Daemon User:/dev/null:/usr/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/run/dbus:/usr/bin/false
systemd-journal-gateway:x:73:73:systemd Journal Gateway:/:/usr/bin/false
systemd-journal-remote:x:74:74:systemd Journal Remote:/:/usr/bin/false
systemd-journal-upload:x:75:75:systemd Journal Upload:/:/usr/bin/false
systemd-network:x:76:76:systemd Network Management:/:/usr/bin/false
systemd-resolve:x:77:77:systemd Resolver:/:/usr/bin/false
systemd-timesync:x:78:78:systemd Time Synchronization:/:/usr/bin/false
systemd-coredump:x:79:79:systemd Core Dumper:/:/usr/bin/false
uuidd:x:80:80:UUID Generation Daemon User:/dev/null:/usr/bin/false
systemd-oom:x:81:81:systemd Out Of Memory Daemon:/:/usr/bin/false
nobody:x:65534:65534:Unprivileged User:/dev/null:/usr/bin/false
EOF
```

A senha real para root será definida posteriormente.

Crie o arquivo /etc/group executando o seguinte comando:

```bash
cat > /etc/group << "EOF"
root:x:0:
bin:x:1:daemon
sys:x:2:
kmem:x:3:
tape:x:4:
tty:x:5:
daemon:x:6:
floppy:x:7:
disk:x:8:
lp:x:9:
dialout:x:10:
audio:x:11:
video:x:12:
utmp:x:13:
cdrom:x:15:
adm:x:16:
messagebus:x:18:
systemd-journal:x:23:
input:x:24:
mail:x:34:
kvm:x:61:
systemd-journal-gateway:x:73:
systemd-journal-remote:x:74:
systemd-journal-upload:x:75:
systemd-network:x:76:
systemd-resolve:x:77:
systemd-timesync:x:78:
systemd-coredump:x:79:
uuidd:x:80:
systemd-oom:x:81:
wheel:x:97:
users:x:999:
nogroup:x:65534:
EOF
```

Os grupos criados não fazem parte de nenhum padrão — são grupos decididos em parte pelos requisitos da configuração do Udev no Capítulo 9, e em parte por convenções comuns empregadas por várias distribuições Linux existentes. Além disso, algumas suítes de teste dependem de usuários ou grupos específicos. A Linux Standard Base (LSB, disponível em https://refspecs.linuxfoundation.org/lsb.shtml) apenas recomenda que, além do grupo root com um Group ID (GID) de 0, um grupo bin com um GID de 1 esteja presente. O GID de 5 é amplamente utilizado para o grupo tty, e o número 5 também é usado no systemd para o filesystem devpts. Todos os outros nomes de grupo e GIDs podem ser escolhidos livremente pelo administrador do sistema, uma vez que programas bem escritos não dependem de números de GID, mas sim usam o nome do grupo.

O ID 65534 é usado pelo kernel para NFS e namespaces de usuário separados para usuários e grupos não mapeados (aqueles existem no servidor NFS ou no namespace de usuário pai, mas “não existem” na máquina local ou no namespace separado). Atribuímos nobody e nogroup para evitar um ID sem nome. Mas outras distros podem tratar este ID de forma diferente, então qualquer programa portátil não deve depender desta atribuição.

Alguns testes no Capítulo 8 precisam de um usuário regular. Adicionamos este usuário aqui e excluímos esta conta no final daquele capítulo.

```bash
echo "tester:x:101:101::/home/tester:/bin/bash" >> /etc/passwd
echo "tester:x:101:" >> /etc/group
install -o tester -d /home/tester
```

Para remover o prompt “I have no name!”, inicie um novo shell. Como os arquivos /etc/passwd e /etc/group foram criados, a resolução de nomes de usuário e grupo agora funcionará:

```bash
exec /usr/bin/bash --login
```

Os programas login, agetty e init (e outros) usam vários arquivos de log para registrar informações como quem fez login no sistema e quando. No entanto, esses programas não gravarão nos arquivos de log se eles ainda não existirem. Inicialize os arquivos de log e conceda-lhes as permissões adequadas:

```bash
touch /var/log/{btmp,lastlog,faillog,wtmp}
chgrp -v utmp /var/log/lastlog
chmod -v 664  /var/log/lastlog
chmod -v 600  /var/log/btmp
```

O arquivo /var/log/wtmp registra todos os logins e logouts. O arquivo /var/log/lastlog registra quando cada usuário fez o último login. O arquivo /var/log/faillog registra as tentativas de login falhas. O arquivo /var/log/btmp registra as tentativas de login inválidas.

### Nota

Os arquivos wtmp, btmp e lastlog usam inteiros de 32 bits para timestamps e estarão fundamentalmente quebrados após o ano 2038. Muitos packages pararam de usá-los e outros packages vão parar de usá-los. É provavelmente melhor considerá-los obsoletos.
