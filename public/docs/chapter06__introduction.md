# 6.1. Introdução

Este capítulo mostra como fazer a cross-compilação de utilitários básicos usando a cross-toolchain recém-construída. Esses utilitários são instalados em seu local final, mas ainda não podem ser usados. Tarefas básicas ainda dependem das ferramentas do host. No entanto, as bibliotecas instaladas são usadas durante a vinculação.

O uso dos utilitários será possível no próximo capítulo após entrar no ambiente “chroot”. Mas todos os packages construídos no capítulo atual precisam ser construídos antes que façamos isso. Portanto, ainda não podemos ser independentes do sistema host.

Mais uma vez, lembramos que a configuração inadequada do LFS, juntamente com a construção como root, pode tornar seu computador inutilizável. Este capítulo inteiro deve ser feito como usuário lfs, com o ambiente conforme descrito na Seção 4.4, “Configurando o Ambiente.”
