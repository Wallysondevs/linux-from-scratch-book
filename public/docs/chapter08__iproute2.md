# 8.66. IPRoute2-6.16.0

O pacote IPRoute2 contém programas para redes básicas e avançadas baseadas em IPV4.

## 8.66.1. Instalação do IPRoute2

O programa arpd incluído neste pacote não será construído, pois depende do Berkeley DB, que não está instalado no LFS. No entanto, um diretório e uma página de manual para arpd ainda serão instalados. Evite isso executando os comandos mostrados abaixo.

```bash
sed -i /ARPD/d Makefile
rm -fv man/man8/arpd.8
```

Compile o pacote:

```bash
make NETNS_RUN_DIR=/run/netns
```

Este pacote não possui uma suíte de testes funcional.

Instale o pacote:

```bash
make SBINDIR=/usr/sbin install
```

Se desejar, instale a documentação:

```bash
install -vDm644 COPYING README* -t /usr/share/doc/iproute2-6.16.0
```

## 8.66.2. Conteúdo do IPRoute2

### Descrições Breves

bridge

Configura bridges de rede

ctstat

Utilitário de status de conexão

genl

Front-end de utilitário netlink genérico

ifstat

Mostra estatísticas da interface, incluindo o número de pacotes transmitidos e recebidos, por interface

ip

O executável principal. Possui diversas funções diferentes, incluindo estas:

ip link <device> permite aos usuários visualizar o estado dos dispositivos e fazer alterações

ip addr permite aos usuários visualizar endereços e suas propriedades, adicionar novos endereços e excluir os antigos

ip neighbor permite aos usuários visualizar associações de vizinhos e suas propriedades, adicionar novas entradas de vizinhos e excluir as antigas

ip rule permite aos usuários visualizar as políticas de roteamento e alterá-las

ip route permite aos usuários visualizar a tabela de roteamento e alterar as regras da tabela de roteamento

ip tunnel permite aos usuários visualizar os túneis IP e suas propriedades, e alterá-los

ip maddr permite aos usuários visualizar os endereços multicast e suas propriedades, e alterá-los

ip mroute permite aos usuários definir, alterar ou excluir o roteamento multicast

ip monitor permite aos usuários monitorar continuamente o estado de dispositivos, endereços e rotas

lnstat

Fornece estatísticas de rede Linux; é um substituto generalizado e mais completo em recursos para o antigo programa rtstat

nstat

Exibe estatísticas de rede

routel

Um componente de ip route, para listar as tabelas de roteamento

rtacct

Exibe o conteúdo de /proc/net/rt_acct

rtmon

Utilitário de monitoramento de rota

rtpr

Converte a saída de ip -o para um formato legível

rtstat

Utilitário de status de rota

ss

Similar ao comando netstat; mostra conexões ativas

tc

Controle de tráfego para implementações de Qualidade de Serviço (QoS) e Classe de Serviço (CoS)

tc qdisc permite aos usuários configurar a disciplina de enfileiramento

tc class permite aos usuários configurar classes com base no agendamento da disciplina de enfileiramento

tc filter permite aos usuários configurar a filtragem de pacotes QoS/CoS

tc monitor pode ser usado para visualizar alterações feitas no Controle de Tráfego no kernel.
