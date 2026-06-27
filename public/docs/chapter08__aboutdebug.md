# 8.82. Sobre Símbolos de Depuração

A maioria dos programas e bibliotecas são, por padrão, compilados com símbolos de depuração incluídos (com a opção -g do gcc). Isso significa que, ao depurar um programa ou biblioteca que foi compilado com informações de depuração, o depurador pode fornecer não apenas endereços de memória, mas também os nomes das rotinas e variáveis.

A inclusão desses símbolos de depuração aumenta significativamente o tamanho de um programa ou biblioteca. Aqui estão dois exemplos da quantidade de espaço que esses símbolos ocupam:

- Um binário bash com símbolos de depuração: 1200 KB

- Um binário bash sem símbolos de depuração: 480 KB (60% menor)

- Arquivos Glibc e GCC (/lib e /usr/lib) com símbolos de depuração: 87 MB

- Arquivos Glibc e GCC sem símbolos de depuração: 16 MB (82% menor)

Os tamanhos variarão dependendo do compilador e da biblioteca C utilizados, mas um programa que teve seus símbolos de depuração removidos é geralmente de 50% a 80% menor que sua contraparte não despojada. Como a maioria dos usuários nunca usará um depurador em seu software de sistema, muito espaço em disco pode ser recuperado removendo esses símbolos. A próxima seção mostra como remover todos os símbolos de depuração dos programas e bibliotecas.
