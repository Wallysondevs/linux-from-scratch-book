# 4.4. Setting Up the Environment

Configure um bom ambiente de trabalho criando dois novos arquivos de inicialização para o shell bash. Enquanto logado como usuário lfs, execute o seguinte comando para criar um novo .bash_profile:

```bash
cat > ~/.bash_profile << "EOF"
exec env -i HOME=$HOME TERM=$TERM PS1='\u:\w\$ ' /bin/bash
EOF
```

Ao fazer login como usuário lfs, ou ao mudar para o usuário lfs usando um comando su com a opção “-”, o shell inicial é um login shell que lê o /etc/profile do host (provavelmente contendo algumas configurações e variáveis de ambiente) e então o .bash_profile. O comando exec env -i.../bin/bash no arquivo .bash_profile substitui o shell em execução por um novo com um ambiente completamente vazio, exceto pelas variáveis HOME, TERM e PS1. Isso garante que nenhuma variável de ambiente indesejada e potencialmente perigosa do sistema host vaze para o ambiente de build.

A nova instância do shell é um non-login shell, que não lê nem executa o conteúdo dos arquivos /etc/profile ou .bash_profile, mas sim lê e executa o arquivo .bashrc. Crie o arquivo .bashrc agora:

```bash
cat > ~/.bashrc << "EOF"
set +h
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LFS/tools/bin:$PATH
CONFIG_SITE=$LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE
EOF
```

O significado das configurações em .bashrc

O comando set +h desativa a função hash do bash. O hashing é normalmente um recurso útil — o bash usa uma tabela hash para lembrar o caminho completo para arquivos executáveis para evitar pesquisar o PATH repetidamente para encontrar o mesmo executável. No entanto, as novas ferramentas devem ser usadas assim que forem instaladas. Desativar a função hash força o shell a pesquisar o PATH sempre que um programa for executado. Assim, o shell encontrará as ferramentas recém-compiladas em $LFS/tools/bin assim que estiverem disponíveis, sem lembrar uma versão anterior do mesmo programa fornecida pela distro host, em /usr/bin ou /bin.

Configurando o umask como já explicamos na [Seção 2.6, “Configurando a Variável $LFS e o Umask.”](#/page/chapter02__aboutlfs)

A variável LFS deve ser definida para o ponto de montagem escolhido.

A variável LC_ALL controla a localização de certos programas, fazendo com que suas mensagens sigam as convenções de um país especificado. Definir LC_ALL como “POSIX” ou “C” (os dois são equivalentes) garante que tudo funcionará como esperado no ambiente de cross-compilation.

A variável LFS_TGT define uma descrição de máquina não padrão, mas compatível, para uso ao construir nosso cross-compiler e linker e ao cross-compilar nossa toolchain temporária. Mais informações são fornecidas pelas Notas Técnicas da Toolchain.

Muitas distribuições Linux modernas unificaram /bin e /usr/bin. Quando este é o caso, a variável PATH padrão deve ser definida como /usr/bin/ para o ambiente do Capítulo 6. Quando este não é o caso, a linha a seguir adiciona /bin ao path.

Se /bin não for um link simbólico, ele deve ser adicionado à variável PATH.

Ao colocar $LFS/tools/bin antes do PATH padrão, o cross-compiler instalado no início do Capítulo 5 é detectado pelo shell imediatamente após sua instalação. Isso, combinado com a desativação do hashing, limita o risco de que o compiler do host seja usado em vez do cross-compiler.

Nos Capítulos 5 e 6, se esta variável não for definida, os scripts de configuração podem tentar carregar itens de configuração específicos de algumas distribuições de /usr/share/config.site no sistema host. Sobrescreva-a para evitar potencial contaminação do host.

Embora os comandos precedentes tenham definido algumas variáveis, para torná-las visíveis em quaisquer sub-shells, nós as exportamos.

### Importante

Várias distribuições comerciais adicionam uma instanciação não documentada de /etc/bash.bashrc à inicialização do bash. Este arquivo tem o potencial de modificar o ambiente do usuário lfs de maneiras que podem afetar a construção de pacotes LFS críticos. Para garantir que o ambiente do usuário lfs esteja limpo, verifique a presença de /etc/bash.bashrc e, se presente, remova-o. Como usuário root, execute:

```bash
[ ! -e /etc/bash.bashrc ] || mv -v /etc/bash.bashrc /etc/bash.bashrc.NOUSE
```

Quando o usuário lfs não for mais necessário (no início do Capítulo 7), você pode restaurar com segurança o /etc/bash.bashrc (se desejar).

Observe que o pacote LFS Bash que construiremos na [Seção 8.36, “Bash-5.3”](#/page/chapter08__bash) não está configurado para carregar ou executar /etc/bash.bashrc, então este arquivo é inútil em um sistema LFS completo.

Para muitos sistemas modernos com múltiplos processadores (ou núcleos), o tempo de compilação de um pacote pode ser reduzido realizando um "parallel make" informando ao programa make quantos processadores estão disponíveis via uma opção de linha de comando ou uma variável de ambiente. Por exemplo, um processador Intel Core i9-13900K possui 8 núcleos P (performance) e 16 núcleos E (eficiência), e um núcleo P pode executar simultaneamente duas threads, então cada núcleo P é modelado como dois núcleos lógicos pelo kernel Linux. Como resultado, há um total de 32 núcleos lógicos. Uma maneira óbvia de usar todos esses núcleos lógicos é permitir que o make crie até 32 build jobs. Isso pode ser feito passando a opção -j32 para o make:

```bash
make -j32
```

Ou defina a variável de ambiente MAKEFLAGS e seu conteúdo será automaticamente usado pelo make como opções de linha de comando:

```bash
export MAKEFLAGS=-j32
```

### Importante

Nunca passe uma opção -j sem um número para o make ou defina tal opção em MAKEFLAGS. Fazer isso permitirá que o make crie build jobs infinitos e cause problemas de estabilidade do sistema.

Para usar todos os núcleos lógicos disponíveis para a construção de pacotes nos Capítulos 5 e 6, defina MAKEFLAGS agora em .bashrc:

```bash
cat >> ~/.bashrc << "EOF"
export MAKEFLAGS=-j$(nproc)
EOF
```

Substitua $(nproc) pelo número de núcleos lógicos que você deseja usar se não quiser usar todos os núcleos lógicos.

Finalmente, para garantir que o ambiente esteja totalmente preparado para a construção das ferramentas temporárias, force o shell bash a ler o novo perfil de usuário:

```bash
source ~/.bash_profile
```
