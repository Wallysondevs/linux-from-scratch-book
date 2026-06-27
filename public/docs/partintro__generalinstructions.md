# iii. Instruções Gerais de Compilação

### Atenção

Durante um ciclo de desenvolvimento do LFS, as instruções no livro são frequentemente modificadas para se adaptar a uma atualização de package ou aproveitar novos recursos de packages atualizados. Misturar as instruções de diferentes versões do livro LFS pode causar quebras sutis. Este tipo de problema é geralmente resultado da reutilização de algum script criado para uma versão anterior do LFS. Tal reutilização é fortemente desencorajada. Se você estiver reutilizando scripts de uma versão anterior do LFS por qualquer motivo, precisará ter muito cuidado para atualizar os scripts para corresponder à versão atual do livro LFS.

Aqui estão algumas coisas que você deve saber sobre a build de cada package:

- Vários packages são patched antes da compilação, mas apenas quando o patch é necessário para contornar um problema. Um patch é frequentemente necessário tanto no capítulo atual quanto nos seguintes, mas às vezes, quando o mesmo package é built mais de uma vez, o patch não é necessário imediatamente. Portanto, não se preocupe se as instruções para um patch baixado parecerem estar faltando. Mensagens de aviso sobre offset ou fuzz também podem ser encontradas ao aplicar um patch. Não se preocupe com esses avisos; o patch ainda foi aplicado com sucesso.

- Durante a compilação da maioria dos packages, alguns avisos aparecerão na tela. Estes são normais e podem ser ignorados com segurança. Esses avisos geralmente são sobre o uso obsoleto, mas não inválido, da sintaxe C ou C++. Os padrões C mudam com bastante frequência, e alguns packages ainda não foram atualizados. Este não é um problema sério, mas faz com que os avisos apareçam.

- Verifique uma última vez se a variável de ambiente LFS está configurada corretamente: echo $LFS Certifique-se de que a saída mostre o path para o ponto de montagem da partição LFS, que é /mnt/lfs, usando nosso exemplo.

```bash
echo $LFS
```

- Finalmente, dois itens importantes devem ser enfatizados: Importante As instruções de build assumem que os [Requisitos do Sistema Host](#/page/chapter02__hostreqs), incluindo links simbólicos, foram configurados corretamente: bash é o shell em uso. sh é um link simbólico para bash. /usr/bin/awk é um link simbólico para gawk. /usr/bin/yacc é um link simbólico para bison, ou para um pequeno script que executa bison. Importante Aqui está uma sinopse do processo de build. Coloque todos os sources e patches em um diretório que será acessível a partir do ambiente chroot, como /mnt/lfs/sources/. Mude para o diretório /mnt/lfs/sources/. Para cada package: Usando o programa tar, extraia o package a ser built. Em [ Capítulo 5](#/page/chapter05__chapter05) e [ Capítulo 6](#/page/chapter06__chapter06), certifique-se de ser o usuário lfs ao extrair o package. Não use nenhum método, exceto o comando tar, para extrair o código-fonte. Notavelmente, usar o comando cp -R para copiar a árvore de código-fonte para outro lugar pode destruir os timestamps na árvore de source e fazer com que a build falhe. Mude para o diretório criado quando o package foi extraído. Siga as instruções para a build do package. Volte para o diretório sources quando a build estiver completa. Exclua o diretório source extraído, a menos que instruído de outra forma.

### Importante

- bash é o shell em uso.

- sh é um link simbólico para bash.

- /usr/bin/awk é um link simbólico para gawk.

- /usr/bin/yacc é um link simbólico para bison, ou para um pequeno script que executa bison.

### Importante

- Coloque todos os sources e patches em um diretório que será acessível a partir do ambiente chroot, como /mnt/lfs/sources/.

- Mude para o diretório /mnt/lfs/sources/.

- Para cada package: Usando o programa tar, extraia o package a ser built. Em [ Capítulo 5](#/page/chapter05__chapter05) e [ Capítulo 6](#/page/chapter06__chapter06), certifique-se de ser o usuário lfs ao extrair o package. Não use nenhum método, exceto o comando tar, para extrair o código-fonte. Notavelmente, usar o comando cp -R para copiar a árvore de código-fonte para outro lugar pode destruir os timestamps na árvore de source e fazer com que a build falhe. Mude para o diretório criado quando o package foi extraído. Siga as instruções para a build do package. Volte para o diretório sources quando a build estiver completa. Exclua o diretório source extraído, a menos que instruído de outra forma.

- Usando o programa tar, extraia o package a ser built. Em [ Capítulo 5](#/page/chapter05__chapter05) e [ Capítulo 6](#/page/chapter06__chapter06), certifique-se de ser o usuário lfs ao extrair o package. Não use nenhum método, exceto o comando tar, para extrair o código-fonte. Notavelmente, usar o comando cp -R para copiar a árvore de código-fonte para outro lugar pode destruir os timestamps na árvore de source e fazer com que a build falhe.

- Mude para o diretório criado quando o package foi extraído.

- Siga as instruções para a build do package.

- Volte para o diretório sources quando a build estiver completa.

- Exclua o diretório source extraído, a menos que instruído de outra forma.
