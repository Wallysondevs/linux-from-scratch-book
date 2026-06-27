# 9.2. Configuração Geral de Rede

Esta seção se aplica apenas se uma placa de rede for configurada.

## 9.2.1. Arquivos de Configuração da Interface de Rede

A partir da versão 209, o systemd inclui um daemon de configuração de rede chamado systemd-networkd que pode ser usado para configuração básica de rede. Além disso, desde a versão 213, a resolução de nomes DNS pode ser tratada pelo systemd-resolved em vez de um arquivo /etc/resolv.conf estático. Ambos os serviços são habilitados por padrão.

### Nota

Se você não for usar o systemd-networkd para configuração de rede (por exemplo, quando o sistema não estiver conectado à rede, ou se você quiser usar outro utilitário como o NetworkManager para configuração de rede), desabilite um serviço para evitar uma mensagem de erro durante a inicialização:

```bash
systemctl disable systemd-networkd-wait-online
```

Os arquivos de configuração para systemd-networkd (e systemd-resolved) podem ser colocados em /usr/lib/systemd/network ou /etc/systemd/network. Os arquivos em /etc/systemd/network têm uma prioridade maior do que os em /usr/lib/systemd/network. Existem três tipos de arquivos de configuração: arquivos .link, .netdev e .network. Para descrições detalhadas e exemplos de conteúdo desses arquivos de configuração, consulte as páginas de manual [systemd.link(5)](https://man.archlinux.org/man/systemd.link.5), [systemd.netdev(5)](https://man.archlinux.org/man/systemd.netdev.5) e [systemd.network(5)](https://man.archlinux.org/man/systemd.network.5).

### 9.2.1.1. Nomenclatura de Dispositivos de Rede

O Udev normalmente atribui nomes de interface de placa de rede com base nas características físicas do sistema, como enp2s1. Se você não tem certeza de qual é o nome da sua interface, você sempre pode executar ip link depois de inicializar seu sistema.

### Nota

Os nomes das interfaces dependem da implementação e configuração do daemon udev em execução no sistema. O daemon udev para LFS (systemd-udevd, instalado na [Seção 8.76, “Systemd-257.8”](#/page/chapter08__systemd)) não será executado a menos que o sistema LFS seja inicializado. Portanto, não é confiável determinar os nomes das interfaces sendo usados no sistema LFS executando esses comandos na distro host, mesmo que você esteja no ambiente chroot.

Para a maioria dos sistemas, há apenas uma interface de rede para cada tipo de conexão. Por exemplo, o nome clássico da interface para uma conexão com fio é eth0. Uma conexão sem fio geralmente terá o nome wifi0 ou wlan0.

Se você preferir usar os nomes de interface de rede clássicos ou personalizados, existem três maneiras alternativas de fazer isso:

- Mascare o arquivo .link do udev para a política padrão: ln -s /dev/null /etc/systemd/network/99-default.link

```bash
ln -s /dev/null /etc/systemd/network/99-default.link
```

- Crie um esquema de nomenclatura manual, por exemplo, nomeando as interfaces como internet0, dmz0 ou lan0. Para fazer isso, crie arquivos .link em /etc/systemd/network/ que selecionem um nome explícito ou um esquema de nomenclatura melhor para suas interfaces de rede. Por exemplo: cat > /etc/systemd/network/10-ether0.link << "EOF" [Match] # Altere o endereço MAC conforme apropriado para seu dispositivo de rede MACAddress=12:34:45:78:90:AB [Link] Name=ether0 EOF Veja [systemd.link(5)](https://man.archlinux.org/man/systemd.link.5) para mais informações.

```bash
cat > /etc/systemd/network/10-ether0.link << "EOF"
[Match]
# Change the MAC address as appropriate for your network device
MACAddress=12:34:45:78:90:AB

[Link]
Name=ether0
EOF
```

- Em /boot/grub/grub.cfg, passe a opção net.ifnames=0 na linha de comando do kernel.

### 9.2.1.2. Configuração de IP Estático

O comando abaixo cria um arquivo de configuração básico para uma configuração de IP Estático (usando systemd-networkd e systemd-resolved):

```bash
cat > /etc/systemd/network/10-eth-static.network << "EOF"
[Match]
Name=<network-device-name>

[Network]
Address=192.168.0.2/24
Gateway=192.168.0.1
DNS=192.168.0.1
Domains=<Your Domain Name>
EOF
```

Múltiplas entradas DNS podem ser adicionadas se você tiver mais de um servidor DNS. Não inclua entradas DNS ou Domains se você pretende usar um arquivo /etc/resolv.conf estático.

### 9.2.1.3. Configuração DHCP

O comando abaixo cria um arquivo de configuração básico para uma configuração DHCP IPv4:

```bash
cat > /etc/systemd/network/10-eth-dhcp.network << "EOF"
[Match]
Name=<network-device-name>

[Network]
DHCP=ipv4

[DHCPv4]
UseDomains=true
EOF
```

## 9.2.2. Criando o Arquivo /etc/resolv.conf

Se o sistema for conectado à Internet, ele precisará de algum meio de resolução de nomes do Serviço de Nomes de Domínio (DNS) para resolver nomes de domínio da Internet para endereços IP, e vice-versa. Isso é melhor alcançado colocando o endereço IP do servidor DNS, disponível no ISP ou administrador de rede, em /etc/resolv.conf.

### 9.2.2.1. Configuração do systemd-resolved

### Nota

Se estiver usando métodos incompatíveis com systemd-resolved para configurar suas interfaces de rede (ex: ppp, etc.), ou se estiver usando qualquer tipo de resolvedor local (ex: bind, dnsmasq, unbound, etc.), ou qualquer outro software que gere um /etc/resolv.conf (ex: um programa resolvconf diferente do fornecido pelo systemd), o serviço systemd-resolved não deve ser usado.

Para desabilitar o systemd-resolved, execute o seguinte comando:

```bash
systemctl disable systemd-resolved
```

Ao usar systemd-resolved para configuração de DNS, ele cria o arquivo /run/systemd/resolve/stub-resolv.conf. E, se /etc/resolv.conf não existir, ele será criado pelo systemd-resolved como um symlink para /run/systemd/resolve/stub-resolv.conf. Portanto, é desnecessário criar um /etc/resolv.conf manualmente.

### Nota

Se você deseja usar systemd-resolved para o sistema LFS, mas precisa acessar a Internet no ambiente chroot (por exemplo, para construir um package BLFS cujo processo de build requer uma conexão com a Internet), crie o arquivo /etc/resolv.conf seguindo a configuração estática abaixo para o ambiente chroot para que a resolução de nomes funcione no ambiente chroot. Ao sair do ambiente chroot, remova-o para que o systemd-resolved crie o symlink na inicialização.

### 9.2.2.2. Configuração Estática do resolv.conf

Se um /etc/resolv.conf estático for desejado, crie-o executando o seguinte comando:

```bash
cat > /etc/resolv.conf << "EOF"
# Begin /etc/resolv.conf

domain <Your Domain Name>
nameserver <IP address of your primary nameserver>
nameserver <IP address of your secondary nameserver>

# End /etc/resolv.conf
EOF
```

A declaração domain pode ser omitida ou substituída por uma declaração search. Consulte a página man para resolv.conf para mais detalhes.

Substitua <IP address of the nameserver> pelo endereço IP do servidor DNS mais apropriado para sua configuração. Frequentemente haverá mais de uma entrada (os requisitos exigem servidores secundários para capacidade de fallback). Se você precisar ou quiser apenas um servidor DNS, remova a segunda linha nameserver do arquivo. O endereço IP também pode ser um roteador na rede local. Outra opção é usar o serviço Google Public DNS usando os endereços IP abaixo como nameservers.

### Nota

Os endereços DNS IPv4 Públicos do Google são 8.8.8.8 e 8.8.4.4 para IPv4, e 2001:4860:4860::8888 e 2001:4860:4860::8844 para IPv6.

## 9.2.3. Configurando o hostname do sistema

Durante o processo de boot, o arquivo /etc/hostname é usado para estabelecer o hostname do sistema.

Crie o arquivo /etc/hostname e insira um hostname executando:

```bash
echo "<lfs>" > /etc/hostname
```

<lfs> precisa ser substituído pelo nome dado ao computador. Não insira o Nome de Domínio Totalmente Qualificado (FQDN) aqui. Essa informação é colocada no arquivo /etc/hosts.

## 9.2.4. Personalizando o Arquivo /etc/hosts

Decida sobre um nome de domínio totalmente qualificado (FQDN) e possíveis aliases para uso no arquivo /etc/hosts. Se estiver usando endereços IP estáticos, você também precisará decidir sobre um endereço IP. A sintaxe para uma entrada no arquivo hosts é:

```
IP_address myhost.example.org aliases
```

A menos que o computador seja visível para a Internet (ou seja, haja um domínio registrado e um bloco válido de endereços IP atribuídos — a maioria dos usuários não possui isso), certifique-se de que o endereço IP esteja no intervalo de endereços IP de rede privada. Os intervalos válidos são:

```
Private Network Address Range      Normal Prefix
10.0.0.1 - 10.255.255.254           8
172.x.0.1 - 172.x.255.254           16
192.168.y.1 - 192.168.y.254         24
```

x pode ser qualquer número no intervalo 16-31. y pode ser qualquer número no intervalo 0-255.

Um endereço IP privado válido pode ser 192.168.1.1.

Se o computador for visível para a Internet, um FQDN válido pode ser o próprio nome de domínio, ou uma string resultante da concatenação de um prefixo (geralmente o hostname) e o nome de domínio com um caractere “.”. E, você precisa entrar em contato com o provedor de domínio para resolver o FQDN para o seu endereço IP público.

Mesmo que o computador não seja visível para a Internet, um FQDN ainda é necessário para que certos programas, como MTAs, operem corretamente. Um FQDN especial, localhost.localdomain, pode ser usado para este propósito.

Crie o arquivo /etc/hosts usando o seguinte comando:

```bash
cat > /etc/hosts << "EOF"
# Begin /etc/hosts

<192.168.0.2> <FQDN> [alias1] [alias2] ...
::1       ip6-localhost ip6-loopback
ff02::1   ip6-allnodes
ff02::2   ip6-allrouters

# End /etc/hosts
EOF
```

Os valores <192.168.0.2> e <FQDN> precisam ser alterados para usos ou requisitos específicos (se um endereço IP for atribuído por um administrador de rede/sistema e a máquina for conectada a uma rede existente). O(s) nome(s) de alias opcional(is) pode(m) ser omitido(s), e a linha <192.168.0.2> pode ser omitida se você estiver usando uma conexão configurada com DHCP ou Autoconfiguração IPv6, ou usando localhost.localdomain como o FQDN.

O /etc/hostname não contém entradas para localhost, localhost.localdomain, ou o hostname (sem um domínio) porque são tratados pelo módulo NSS myhostname, leia a página man [nss-myhostname(8)](https://man.archlinux.org/man/nss-myhostname.8) para detalhes.

A entrada ::1 é a contraparte IPv6 de 127.0.0.1 e representa a interface de loopback IPv6.
