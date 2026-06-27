# 8.51. Python-3.13.7

O pacote Python 3 contém o ambiente de desenvolvimento Python. É útil para programação orientada a objetos, escrever scripts, prototipar programas grandes e desenvolver aplicações completas. Python é uma linguagem de computador interpretada.

## 8.51.1. Instalação do Python 3

Prepare o Python para compilação:

```bash
./configure --prefix=/usr          \
            --enable-shared        \
            --with-system-expat    \
            --enable-optimizations \
            --without-static-libpython
```

O significado das opções do configure:

Esta opção permite a vinculação com a versão do sistema do Expat.

Esta opção permite etapas de otimização extensas, mas demoradas. O interpretador é construído duas vezes; testes realizados na primeira build são usados para melhorar a versão final otimizada.

Compile o pacote:

```bash
make
```

Sabe-se que alguns testes ocasionalmente travam indefinidamente. Então, para testar os resultados, execute o conjunto de testes, mas defina um limite de tempo de 2 minutos para cada caso de teste:

```bash
make test TESTOPTS="--timeout 120"
```

Para um sistema relativamente lento, pode ser necessário aumentar o limite de tempo e 1 SBU (medido ao construir o Binutils pass 1 com um núcleo de CPU) deve ser suficiente. Alguns testes são instáveis, então o conjunto de testes irá reexecutar automaticamente os testes falhos. Se um teste falhou, mas depois passou ao ser reexecutado, ele deve ser considerado como aprovado. Um teste, test_ssl, é conhecido por falhar no ambiente chroot.

Instale o pacote:

```bash
make install
```

Usamos o comando pip3 para instalar programas e módulos Python 3 para todos os usuários como root em vários locais neste livro. Isso conflita com a recomendação dos desenvolvedores Python: instalar pacotes em um ambiente virtual, ou no diretório home de um usuário comum (executando pip3 como este usuário). Um aviso de várias linhas é acionado sempre que o pip3 é executado pelo usuário root.

A principal razão para a recomendação é evitar conflitos com o gerenciador de pacotes do sistema (dpkg, por exemplo). O LFS não possui um gerenciador de pacotes em todo o sistema, então isso não é um problema. Além disso, o pip3 verificará se há uma nova versão de si mesmo sempre que for executado. Como a resolução de nomes de domínio ainda não está configurada no ambiente chroot do LFS, o pip3 não pode verificar se há uma nova versão de si mesmo e produzirá um aviso.

Depois de inicializarmos o sistema LFS e configurarmos uma conexão de rede, um aviso diferente será emitido, informando ao usuário para atualizar o pip3 a partir de um wheel pré-construído no PyPI (sempre que uma nova versão estiver disponível). Mas o LFS considera o pip3 como parte do Python 3, então ele não deve ser atualizado separadamente. Além disso, uma atualização de um wheel pré-construído se desviaria do nosso objetivo: construir um sistema Linux a partir do código-fonte. Portanto, o aviso sobre uma nova versão do pip3 também deve ser ignorado. Se desejar, você pode suprimir todos esses avisos executando o seguinte comando, que cria um arquivo de configuração:

```bash
cat > /etc/pip.conf << EOF
[global]
root-user-action = ignore
disable-pip-version-check = true
EOF
```

### Importante

No LFS e BLFS, normalmente construímos e instalamos módulos Python com o comando pip3. Certifique-se de que os comandos pip3 install em ambos os livros sejam executados como o usuário root (a menos que seja para um ambiente virtual Python). Executar pip3 install como um usuário não-root pode parecer funcionar, mas fará com que o módulo instalado fique inacessível para outros usuários.

pip3 install não reinstalará um módulo já instalado automaticamente. Ao usar o comando pip3 install para atualizar um módulo (por exemplo, de meson-0.61.3 para meson-0.62.0), insira a opção --upgrade na linha de comando. Se for realmente necessário fazer o downgrade de um módulo, ou reinstalar a mesma versão por algum motivo, insira --force-reinstall --no-deps na linha de comando.

Se desejado, instale a documentação pré-formatada:

```bash
install -v -dm755 /usr/share/doc/python-3.13.7/html

tar --strip-components=1  \
    --no-same-owner       \
    --no-same-permissions \
    -C /usr/share/doc/python-3.13.7/html \
    -xvf ../python-3.13.7-docs-html.tar.bz2
```

O significado dos comandos de instalação da documentação:

Garanta que os arquivos instalados tenham a propriedade e as permissões corretas. Sem essas opções, o tar instalará os arquivos do pacote com os valores do criador upstream.

## 8.51.2. Conteúdo do Python 3

### Descrições Breves

2to3

é um programa Python que lê código-fonte Python 2.x e aplica uma série de correções para transformá-lo em código Python 3.x válido

idle3

é um script wrapper que abre um editor GUI compatível com Python. Para que este script seja executado, você deve ter instalado o Tk antes do Python, para que o módulo Tkinter Python seja construído.

pip3

O instalador de pacotes para Python. Você pode usar o pip para instalar pacotes do Python Package Index e de outros índices.

pydoc3

é a ferramenta de documentação Python

python3

é o interpretador para Python, uma linguagem de programação interpretada, interativa e orientada a objetos
