# 8.1. Introdução

Neste capítulo, começamos a construir o sistema LFS para valer.

A instalação deste software é direta. Embora em muitos casos as instruções de instalação pudessem ser mais curtas e genéricas, optamos por fornecer as instruções completas para cada package para minimizar as possibilidades de erros. A chave para aprender o que faz um sistema Linux funcionar é saber para que cada package é usado e por que você (ou o sistema) pode precisar dele.

Não recomendamos o uso de otimizações personalizadas. Elas podem fazer um programa rodar um pouco mais rápido, mas também podem causar dificuldades de compilação e problemas ao executar o programa. Se um package se recusar a compilar com uma otimização personalizada, tente compilá-lo sem otimização e veja se isso resolve o problema. Mesmo que o package compile usando uma otimização personalizada, existe o risco de ele ter sido compilado incorretamente devido às interações complexas entre o código e as build tools. Observe também que as opções -march e -mtune, usando valores não especificados no livro, não foram testadas. Isso pode causar problemas com os packages da toolchain (Binutils, GCC e Glibc). Os pequenos ganhos potenciais alcançados pela personalização das otimizações do compilador são frequentemente superados pelos riscos. Builders de primeira viagem do LFS são encorajados a buildar sem otimizações personalizadas.

Por outro lado, mantemos as otimizações habilitadas pela configuração padrão dos packages. Além disso, às vezes habilitamos explicitamente uma configuração otimizada fornecida por um package, mas não habilitada por padrão. Os mantenedores do package já testaram essas configurações e as consideram seguras, então não é provável que elas quebrem o build. Geralmente, a configuração padrão já habilita -O2 ou -O3, então o sistema resultante ainda rodará muito rápido sem qualquer otimização personalizada e será estável ao mesmo tempo.

Antes das instruções de instalação, cada página de instalação fornece informações sobre o package, incluindo uma descrição concisa do que ele contém, aproximadamente quanto tempo levará para buildar e quanto espaço em disco é necessário durante este processo de building. Após as instruções de instalação, há uma lista de programas e bibliotecas (juntamente com breves descrições) que o package instala.

### Nota

Os valores SBU e o espaço em disco necessário incluem dados da suíte de testes para todos os packages aplicáveis no Capítulo 8. Os valores SBU foram calculados usando quatro núcleos de CPU (-j4) para todas as operações, a menos que especificado de outra forma.

## 8.1.1. Sobre Bibliotecas

Em geral, os editores do LFS desencorajam o building e a instalação de bibliotecas estáticas. A maioria das bibliotecas estáticas tornou-se obsoleta em um sistema Linux moderno. Além disso, vincular uma biblioteca estática a um programa pode ser prejudicial. Se uma atualização da biblioteca for necessária para remover um problema de segurança, todo programa que usa a biblioteca estática precisará ser religado com a nova biblioteca. Como o uso de bibliotecas estáticas nem sempre é óbvio, os programas relevantes (e os procedimentos necessários para fazer a ligação) podem nem ser conhecidos.

Os procedimentos neste capítulo removem ou desabilitam a instalação da maioria das bibliotecas estáticas. Geralmente, isso é feito passando a opção --disable-static para o configure. Em outros casos, são necessários meios alternativos. Em alguns casos, especialmente Glibc e GCC, o uso de bibliotecas estáticas permanece uma característica essencial do processo de building do package.

Para uma discussão mais completa sobre bibliotecas, consulte Bibliotecas: Estáticas ou compartilhadas? no livro BLFS.
