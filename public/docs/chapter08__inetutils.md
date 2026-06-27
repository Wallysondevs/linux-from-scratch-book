# 8.41. Inetutils-2.6

O pacote Inetutils contém programas para rede básica.

## 8.41.1. Instalação do Inetutils

Primeiro, faça o package build com gcc-14.1 ou posterior:

```bash
sed -i 's/def HAVE_TERMCAP_TGETENT/ 1/' telnet/telnet.c
```

Prepare o Inetutils para compilação:

```bash
./configure --prefix=/usr        \
            --bindir=/usr/bin    \
            --localstatedir=/var \
            --disable-logger     \
            --disable-whois      \
            --disable-rcp        \
            --disable-rexec      \
            --disable-rlogin     \
            --disable-rsh        \
            --disable-servers
```

O significado das opções do configure:

Esta opção impede que o Inetutils instale o programa logger, que é usado por scripts para passar mensagens para o System Log Daemon. Não o instale porque o Util-linux instala uma versão mais recente.

Esta opção desabilita o build do cliente whois do Inetutils, que está desatualizado. As instruções para um cliente whois melhor estão no livro BLFS.

Esses parâmetros desabilitam o build de programas obsoletos que não devem ser usados devido a problemas de segurança. As funções fornecidas por esses programas podem ser fornecidas pelo package openssh no livro BLFS.

Isso desabilita a instalação dos vários servidores de rede incluídos como parte do pacote Inetutils. Esses servidores não são considerados apropriados em um sistema LFS básico. Alguns são inseguros por natureza e são considerados seguros apenas em redes confiáveis. Observe que substituições melhores estão disponíveis para muitos desses servidores.

Compile o package:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Um test chamado libls.sh é conhecido por falhar às vezes.

Instale o package:

```bash
make install
```

Mova um programa para o local adequado:

```bash
mv -v /usr/{,s}bin/ifconfig
```

## 8.41.2. Conteúdo do Inetutils

### Descrições Breves

dnsdomainname

Mostra o nome de domínio DNS do sistema

ftp

É o programa de protocolo de transferência de arquivos

hostname

Reporta ou define o nome do host

ifconfig

Gerencia interfaces de rede

ping

Envia pacotes echo-request e reporta quanto tempo as respostas levam

ping6

Uma versão do ping para redes IPv6

talk

É usado para conversar com outro usuário

telnet

Uma interface para o protocolo TELNET

tftp

Um programa trivial de transferência de arquivos

traceroute

Rastreia a rota que seus pacotes percorrem do host em que você está trabalhando para outro host em uma rede, mostrando todos os saltos intermediários (gateways) ao longo do caminho
