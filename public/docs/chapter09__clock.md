# 9.5. Configurando o Relógio do Sistema

Esta seção discute como configurar o serviço de sistema systemd-timedated, que configura o relógio do sistema e o fuso horário.

Se você não consegue se lembrar se o relógio de hardware está configurado para UTC, descubra executando o comando hwclock --localtime --show. Isso exibirá qual é a hora atual de acordo com o relógio de hardware. Se esta hora corresponder ao que seu relógio de pulso diz, então o relógio de hardware está configurado para a hora local. Se a saída do hwclock não for a hora local, é provável que esteja configurado para a hora UTC. Verifique isso adicionando ou subtraindo a quantidade correta de horas para o fuso horário da hora mostrada pelo hwclock. Por exemplo, se você está atualmente no fuso horário MST, que também é conhecido como GMT -0700, adicione sete horas à hora local.

O systemd-timedated lê /etc/adjtime e, dependendo do conteúdo do arquivo, define o relógio para UTC ou hora local.

Crie o arquivo /etc/adjtime com o seguinte conteúdo se o seu relógio de hardware estiver configurado para a hora local:

```bash
cat > /etc/adjtime << "EOF"
0.0 0 0.0
0
LOCAL
EOF
```

Se /etc/adjtime não estiver presente no primeiro boot, o systemd-timedated assumirá que o relógio de hardware está configurado para UTC e ajustará o arquivo de acordo.

Você também pode usar o utilitário timedatectl para informar ao systemd-timedated se o seu relógio de hardware está configurado para UTC ou hora local:

```bash
timedatectl set-local-rtc 1
```

O timedatectl também pode ser usado para alterar a hora do sistema e o fuso horário.

Para alterar a hora atual do seu sistema, execute:

```bash
timedatectl set-time YYYY-MM-DD HH:MM:SS
```

O relógio de hardware também será atualizado de acordo.

Para alterar seu fuso horário atual, execute:

```bash
timedatectl set-timezone TIMEZONE
```

Você pode obter uma lista de fusos horários disponíveis executando:

```bash
timedatectl list-timezones
```

### Nota

Observe que o comando timedatectl não funciona no ambiente chroot. Ele só pode ser usado depois que o sistema LFS é inicializado com systemd.

## 9.5.1. Sincronização de Hora da Rede

A partir da versão 213, o systemd inclui um daemon chamado systemd-timesyncd que pode ser usado para sincronizar a hora do sistema com servidores NTP remotos.

O daemon não se destina a ser um substituto para o bem estabelecido daemon NTP, mas sim uma implementação apenas de cliente do protocolo SNTP que pode ser usada para tarefas menos avançadas e em sistemas com recursos limitados.

A partir da versão 216 do systemd, o daemon systemd-timesyncd é habilitado por padrão. Se você quiser desativá-lo, execute o seguinte comando:

```bash
systemctl disable systemd-timesyncd
```

O arquivo /etc/systemd/timesyncd.conf pode ser usado para alterar os servidores NTP com os quais o systemd-timesyncd sincroniza.

Observe que quando o relógio do sistema está configurado para Hora Local, o systemd-timesyncd não atualizará o relógio de hardware.
