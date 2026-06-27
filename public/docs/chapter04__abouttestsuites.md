# 4.6. Sobre as Suítes de Teste

A maioria dos packages fornece uma test suite. Executar a test suite para um package recém-construído é uma boa ideia porque pode fornecer uma 'verificação de sanidade' indicando que tudo compilou corretamente. Uma test suite que passa seu conjunto de verificações geralmente prova que o package está funcionando conforme o desenvolvedor pretendia. No entanto, isso não garante que o package esteja totalmente livre de bugs.

Algumas test suites são mais importantes que outras. Por exemplo, as test suites para os packages da toolchain principal—GCC, binutils e glibc—são de suma importância devido ao seu papel central em um sistema que funciona corretamente. As test suites para GCC e glibc podem levar muito tempo para serem concluídas, especialmente em hardware mais lento, mas são fortemente recomendadas.

### Nota

Executar as test suites no Capítulo 5 e Capítulo 6 é inútil; já que os programas de teste são compilados com um cross-compiler, eles provavelmente não podem ser executados no build host.

Um problema comum ao executar as test suites para binutils e GCC é a falta de pseudo terminais (PTYs). Isso pode resultar em um grande número de testes falhando. Isso pode acontecer por várias razões, mas a causa mais provável é que o sistema host não tenha o file system devpts configurado corretamente. Este problema é discutido em mais detalhes em https://www.linuxfromscratch.org/lfs/faq.html#no-ptys.

Às vezes, as test suites de packages falharão por razões das quais os desenvolvedores estão cientes e consideraram não-críticas. Consulte os logs localizados em https://www.linuxfromscratch.org/lfs/build-logs/12.4/ para verificar se essas falhas são esperadas ou não. Este site é válido para todas as test suites ao longo deste livro.
