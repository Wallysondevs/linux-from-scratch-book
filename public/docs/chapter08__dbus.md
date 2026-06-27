# 8.77. D-Bus-1.16.2

D-Bus é um sistema de barramento de mensagens, uma maneira simples para aplicações se comunicarem umas com as outras. O D-Bus fornece tanto um daemon de sistema (para eventos como "novo dispositivo de hardware adicionado" ou "fila de impressão alterada") quanto um daemon por sessão de login de usuário (para necessidades gerais de IPC entre aplicações de usuário). Além disso, o barramento de mensagens é construído sobre uma estrutura geral de passagem de mensagens um-para-um, que pode ser usada por quaisquer duas aplicações para se comunicarem diretamente (sem passar pelo daemon do barramento de mensagens).

## 8.77.1. Instalação do D-Bus

Prepare o D-Bus para compilação:

```bash
mkdir build
cd    build

meson setup --prefix=/usr --buildtype=release --wrap-mode=nofallback ..
```

O significado das opções do meson:

Esta opção impede o meson de tentar baixar uma cópia do pacote Glib para os testes.

Compile o pacote:

```bash
ninja
```

Para testar os resultados, execute:

```bash
ninja test
```

Muitos testes estão desabilitados porque eles requerem pacotes adicionais que não estão incluídos no LFS. Instruções para executar o conjunto de testes abrangente podem ser encontradas no livro BLFS.

Instale o pacote:

```bash
ninja install
```

Crie um symlink para que o D-Bus e o systemd possam usar o mesmo arquivo machine-id:

```bash
ln -sfv /etc/machine-id /var/lib/dbus
```

## 8.77.2. Conteúdo do D-Bus

### Descrições Breves

dbus-cleanup-sockets

é usado para remover sockets remanescentes em um diretório

dbus-daemon

é o daemon do barramento de mensagens D-Bus

dbus-launch

inicia o dbus-daemon a partir de um script shell

dbus-monitor

monitora mensagens passando por um barramento de mensagens D-Bus

dbus-run-session

inicia uma instância de barramento de sessão do dbus-daemon a partir de um script shell e inicia um programa especificado nessa sessão

dbus-send

envia uma mensagem para um barramento de mensagens D-Bus

dbus-test-tool

é uma ferramenta para ajudar pacotes a testar o D-Bus

dbus-update-activation-environment

atualiza variáveis de ambiente que serão definidas para serviços de sessão D-Bus

dbus-uuidgen

Gera um ID universalmente único

libdbus-1

Contém funções de API usadas para se comunicar com o barramento de mensagens D-Bus
