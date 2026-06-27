# iii. Arquiteturas Alvo do LFS

As arquiteturas alvo primárias do LFS são as CPUs AMD/Intel x86 (32-bit) e x86_64 (64-bit). Por outro lado, as instruções neste livro também são conhecidas por funcionar, com algumas modificações, com as CPUs Power PC e ARM. Para buildar um sistema que utiliza uma dessas CPUs alternativas, o principal pré-requisito, além daqueles na próxima página, é um sistema Linux existente, como uma instalação LFS anterior, Ubuntu, Red Hat/Fedora, SuSE, ou alguma outra distribuição que tenha como target essa arquitetura. (Note que uma distribuição 32-bit pode ser instalada e usada como um sistema host em um computador AMD/Intel 64-bit.)

O ganho de buildar em um sistema 64-bit, em comparação com um sistema 32-bit, é mínimo. Por exemplo, em um test build do LFS-9.1 em um sistema baseado em CPU Core i7-4790, usando 4 cores, as seguintes estatísticas foram medidas:

```
Architecture Build Time     Build Size
32-bit       239.9 minutes  3.6 GB
64-bit       233.2 minutes  4.4 GB
```

Como você pode ver, no mesmo hardware, o build 64-bit é apenas 3% mais rápido (e 22% maior) do que o build 32-bit. Se você planeja usar o LFS como um servidor LAMP, ou um firewall, uma CPU 32-bit pode ser suficiente. Por outro lado, vários packages no BLFS agora precisam de mais de 4 GB de RAM para serem builtados e/ou executados; se você planeja usar o LFS como um desktop, os autores do LFS recomendam buildar um sistema 64-bit.

O build 64-bit padrão que resulta do LFS é um sistema 64-bit “puro”. Ou seja, ele suporta apenas executáveis 64-bit. Buildar um sistema “multi-lib” requer compilar muitas aplicações duas vezes, uma para um sistema 32-bit e outra para um sistema 64-bit. Isso não é diretamente suportado no LFS porque interferiria com o objetivo educacional de fornecer as instruções mínimas necessárias para um sistema Linux básico. Alguns dos editores do LFS/BLFS mantêm um fork multilib do LFS, acessível em https://www.linuxfromscratch.org/~thomas/multilib/index.html. Mas esse é um tópico avançado.
