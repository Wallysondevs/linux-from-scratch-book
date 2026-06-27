# 4.5. Sobre SBUs

Muitas pessoas gostariam de saber de antemão aproximadamente quanto tempo leva para compilar e instalar cada package. Como o Linux From Scratch pode ser build em muitos sistemas diferentes, é impossível fornecer estimativas de tempo absolutas. O maior package (gcc) levará aproximadamente 5 minutos nos sistemas mais rápidos, mas pode levar dias em sistemas mais lentos! Em vez de fornecer tempos reais, a medida Standard Build Unit (SBU) será usada.

A medida SBU funciona da seguinte forma. O primeiro package a ser compilado é o binutils no Capítulo 5. O tempo que leva para compilar usando um core é o que nos referiremos como Standard Build Unit ou SBU. Todos os outros tempos de compilação serão expressos em termos desta unidade de tempo.

Por exemplo, considere um package cujo tempo de compilação é de 4.5 SBUs. Isso significa que se o seu sistema levou 4 minutos para compilar e instalar o primeiro pass do binutils, levará aproximadamente 18 minutos para build o package de exemplo. Felizmente, a maioria dos tempos de build são menores que um SBU.

SBUs não são totalmente precisas porque dependem de muitos fatores, incluindo a versão do GCC do sistema host. Elas são fornecidas aqui para dar uma estimativa de quanto tempo pode levar para instalar um package, mas os números podem variar em até dezenas de minutos em alguns casos.

Em alguns sistemas mais novos, a placa-mãe é capaz de controlar a velocidade do clock do sistema. Isso pode ser controlado com um command como powerprofilesctl. Isso não está disponível no LFS, mas pode estar disponível na distro host. Após a conclusão do LFS, ele pode ser adicionado a um sistema com os procedimentos na página BLFS power-profiles-daemon. Antes de medir o tempo de build de qualquer package, é aconselhável usar um power profile do sistema configurado para desempenho máximo (e consumo máximo de energia). Caso contrário, o valor SBU medido pode ser impreciso porque o sistema pode reagir de forma diferente ao build binutils-pass1 ou outros packages. Esteja ciente de que uma imprecisão significativa ainda pode aparecer mesmo que o mesmo profile seja usado para ambos os packages, porque o sistema pode responder mais lentamente se estiver ocioso ao iniciar o procedimento de build. Definir o power profile para “performance” minimizará este problema. E, obviamente, fazer isso também fará com que o sistema build o LFS mais rápido.

Se powerprofilesctl estiver disponível, execute o command powerprofilesctl set performance para selecionar o profile de performance. Algumas distros fornecem o command tuned-adm para gerenciar os profiles em vez de powerprofilesctl; nessas distros, execute o command tuned-adm profile throughput-performance para selecionar o profile throughput-performance.

### Nota

Quando múltiplos processadores são usados desta forma, as unidades SBU no livro variarão ainda mais do que normalmente. Em alguns casos, o step make simplesmente falhará. Analisar a saída do processo de build também será mais difícil porque as linhas de diferentes processos serão intercaladas. Se você encontrar um problema com um step de build, reverta para um build de processador único para analisar corretamente as mensagens de erro.

Os tempos apresentados aqui para todos os packages (exceto binutils-pass1, que é baseado em um core) são baseados no uso de quatro cores (-j4). Os tempos no Capítulo 8 também incluem o tempo para executar os testes de regressão para o package, a menos que especificado de outra forma.
