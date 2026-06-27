# 9.8. Criando o arquivo /etc/inputrc

O arquivo inputrc é o arquivo de configuração para a biblioteca readline, que fornece recursos de edição enquanto o usuário está digitando uma linha no terminal. Ele funciona traduzindo entradas de teclado em ações específicas. Readline é usado pelo bash e pela maioria dos outros shells, bem como por muitas outras aplicações.

A maioria das pessoas não precisa de funcionalidade específica do usuário, então o comando abaixo cria um /etc/inputrc global usado por todos que fazem login. Se você decidir mais tarde que precisa sobrescrever os padrões por usuário, você pode criar um arquivo .inputrc no diretório home do usuário com os mapeamentos modificados.

Para mais informações sobre como editar o arquivo inputrc, consulte info bash na seção Readline Init File. info readline também é uma boa fonte de informação.

Abaixo está um inputrc global genérico, juntamente com comentários para explicar o que as várias opções fazem. Observe que os comentários não podem estar na mesma linha que os comandos. Crie o arquivo usando o seguinte comando:

```bash
cat > /etc/inputrc << "EOF"
# Begin /etc/inputrc
# Modified by Chris Lynn <roryo@roryo.dynup.net>

# Allow the command prompt to wrap to the next line
set horizontal-scroll-mode Off

# Enable 8-bit input
set meta-flag On
set input-meta On

# Turns off 8th bit stripping
set convert-meta Off

# Keep the 8th bit for display
set output-meta On

# none, visible or audible
set bell-style none

# All of the following map the escape sequence of the value
# contained in the 1st argument to the readline specific functions
"\eOd": backward-word
"\eOc": forward-word

# for linux console
"\e[1~": beginning-of-line
"\e[4~": end-of-line
"\e[5~": beginning-of-history
"\e[6~": end-of-history
"\e[3~": delete-char
"\e[2~": quoted-insert

# for xterm
"\eOH": beginning-of-line
"\eOF": end-of-line

# for Konsole
"\e[H": beginning-of-line
"\e[F": end-of-line

# End /etc/inputrc
EOF
```
