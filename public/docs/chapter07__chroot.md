# 7.4. Entrando no Ambiente Chroot

Agora que todos os packages necessários para buildar o restante das ferramentas necessárias estão no sistema, é hora de entrar no ambiente chroot e finalizar a instalação das ferramentas temporárias. Este ambiente também será usado para instalar o sistema final. Como usuário root, execute o seguinte comando para entrar no ambiente que está, no momento, populado apenas com ferramentas temporárias:

```bash
chroot "$LFS" /usr/bin/env -i   \
    HOME=/root                  \
    TERM="$TERM"                \
    PS1='(lfs chroot) \u:\w\$ ' \
    PATH=/usr/bin:/usr/sbin     \
    MAKEFLAGS="-j$(nproc)"      \
    TESTSUITEFLAGS="-j$(nproc)" \
    /bin/bash --login
```

Se você não quiser usar todos os núcleos lógicos disponíveis, substitua $(nproc) pelo número de núcleos lógicos que deseja usar para buildar packages neste capítulo e nos capítulos seguintes. As suítes de teste de alguns packages (notavelmente Autoconf, Libtool e Tar) no Capítulo 8 não são afetadas por MAKEFLAGS; elas usam uma variável de ambiente TESTSUITEFLAGS em vez disso. Nós a configuramos aqui também para executar essas suítes de teste com múltiplos núcleos.

A opção -i dada ao comando env limpará todas as variáveis no ambiente chroot. Depois disso, apenas as variáveis HOME, TERM, PS1 e PATH são definidas novamente. A construção TERM=$TERM define a variável TERM dentro do chroot para o mesmo valor que fora do chroot. Esta variável é necessária para que programas como vim e less possam operar corretamente. Se outras variáveis forem desejadas, como CFLAGS ou CXXFLAGS, este é um bom lugar para defini-las.

A partir deste ponto, não há mais necessidade de usar a variável LFS porque todo o trabalho será restrito ao sistema de arquivos LFS; o comando chroot executa o shell Bash com o diretório raiz (/) definido para $LFS.

Observe que /tools/bin não está no PATH. Isso significa que a cross toolchain não será mais usada.

Observe também que o prompt do bash dirá I have no name! Isso é normal porque o arquivo /etc/passwd ainda não foi criado.

### Nota

É importante que todos os comandos ao longo do restante deste capítulo e dos capítulos seguintes sejam executados de dentro do ambiente chroot. Se você sair deste ambiente por qualquer motivo (reiniciar, por exemplo), certifique-se de que os sistemas de arquivos virtuais do kernel estejam montados conforme explicado na [Seção 7.3.1, “Montando e Populando /dev”](#/page/chapter07__kernfs) e na [Seção 7.3.2, “Montando Sistemas de Arquivos Virtuais do Kernel”](#/page/chapter07__kernfs) e entre novamente no chroot antes de continuar com a instalação.
