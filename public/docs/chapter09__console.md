# 9.6. Configurando o Console Linux

Esta seção discute como configurar o serviço de sistema systemd-vconsole-setup, que configura a fonte do console virtual e o keymap do console.

O serviço systemd-vconsole-setup lê o arquivo /etc/vconsole.conf para obter informações de configuração. Decida qual keymap e fonte de tela serão usados. Vários HOWTOs específicos de idioma também podem ajudar com isso, veja [https://tldp.org/HOWTO/HOWTO-INDEX/other-lang.html](https://tldp.org/HOWTO/HOWTO-INDEX/other-lang.html). Examine a saída de localectl list-keymaps para uma lista de keymaps de console válidos. Procure no diretório /usr/share/consolefonts por fontes de tela válidas.

O arquivo /etc/vconsole.conf deve conter linhas no formato: VARIABLE=value. As seguintes variáveis são reconhecidas:

Esta variável especifica a tabela de mapeamento de teclas para o teclado. Se não definida, o padrão é us.

Esta variável pode ser usada para configurar um segundo keymap de alternância e não é definida por padrão.

Esta variável especifica a fonte usada pelo console virtual.

Esta variável especifica o mapa de console a ser usado.

Esta variável especifica o mapa de fonte Unicode.

Usaremos C.UTF-8 como o locale para sessões interativas no console Linux na [Seção 9.7, “Configurando o Locale do Sistema.”](#/page/chapter09__locale) As fontes de console fornecidas pelo pacote Kbd contendo os glifos para todos os caracteres das mensagens do programa no locale C.UTF-8 são LatArCyrHeb*.psfu.gz, LatGrkCyr*.psfu.gz, Lat2-Terminus16.psfu.gz e pancyrillic.f16.psfu.gz em /usr/share/consolefonts (as outras fontes de console fornecidas não possuem glifos de alguns caracteres como as aspas Unicode esquerda/direita e o travessão Unicode inglês). Então defina uma delas, por exemplo Lat2-Terminus16.psfu.gz como a fonte de console padrão:

```bash
echo FONT=Lat2-Terminus16 > /etc/vconsole.conf
```

Um exemplo para um teclado e console alemão é dado abaixo:

```bash
cat > /etc/vconsole.conf << "EOF"
KEYMAP=de-latin1
FONT=Lat2-Terminus16
EOF
```

Você pode alterar o valor de KEYMAP em tempo de execução usando o utilitário localectl:

```bash
localectl set-keymap MAP
```

### Nota

Observe que o comando localectl não funciona no ambiente chroot. Ele só pode ser usado depois que o sistema LFS é inicializado com systemd.

Você também pode usar o utilitário localectl com os parâmetros correspondentes para alterar o layout, modelo, variante e opções do teclado X11:

```bash
localectl set-x11-keymap LAYOUT [MODEL] [VARIANT] [OPTIONS]
```

Para listar os valores possíveis para os parâmetros localectl set-x11-keymap, execute localectl com os parâmetros listados abaixo:

Mostra modelos de mapeamento de teclado X11 conhecidos.

Mostra layouts de mapeamento de teclado X11 conhecidos.

Mostra variantes de mapeamento de teclado X11 conhecidas.

Mostra opções de mapeamento de teclado X11 conhecidas.

### Nota

O uso de qualquer um dos parâmetros listados acima requer o pacote XKeyboard-Config do BLFS.
