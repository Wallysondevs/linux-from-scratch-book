# 2.4. Criando uma Nova Partição

Como a maioria dos outros sistemas operacionais, o LFS é geralmente instalado em uma partição dedicada. A abordagem recomendada para construir um sistema LFS é usar uma partição vazia disponível ou, se você tiver espaço não particionado suficiente, criar uma.

Um sistema mínimo requer uma partição de cerca de 10 gigabytes (GB). Isso é suficiente para armazenar todos os tarballs de código-fonte e compilar os packages. No entanto, se o sistema LFS for destinado a ser o sistema Linux principal, software adicional provavelmente será instalado, o que exigirá espaço adicional. Uma partição de 30 GB é um tamanho razoável para permitir o crescimento. O próprio sistema LFS não ocupará tanto espaço. Uma grande parte desse requisito é para fornecer armazenamento temporário livre suficiente, bem como para adicionar capacidades adicionais após a conclusão do LFS. Além disso, a compilação de packages pode exigir muito espaço em disco, que será recuperado após a instalação do package.

Como nem sempre há memória de acesso aleatório (RAM) suficiente disponível para processos de compilação, é uma boa ideia usar uma pequena partição de disco como espaço de swap. Isso é usado pelo kernel para armazenar dados pouco usados e deixar mais memória disponível para processos ativos. A partição de swap para um sistema LFS pode ser a mesma usada pelo sistema host, caso em que não é necessário criar outra.

Inicie um programa de particionamento de disco como cfdisk ou fdisk com uma opção de linha de comando nomeando o disco rígido no qual a nova partição será criada — por exemplo, /dev/sda para a unidade de disco primária. Crie uma partição nativa Linux e uma partição de swap, se necessário. Consulte cfdisk(8) ou fdisk(8) se você ainda não souber como usar os programas.

### Nota

Para usuários experientes, outros esquemas de particionamento são possíveis. O novo sistema LFS pode estar em um array RAID de software ou em um volume lógico LVM. No entanto, algumas dessas opções exigem um initramfs, que é um tópico avançado. Essas metodologias de particionamento não são recomendadas para usuários LFS iniciantes.

Lembre-se da designação da nova partição (por exemplo, sda5). Este livro se referirá a esta como a partição LFS. Lembre-se também da designação da partição de swap. Esses nomes serão necessários posteriormente para o arquivo /etc/fstab.

## 2.4.1. Outras Questões de Particionamento

Pedidos de conselhos sobre particionamento de sistema são frequentemente publicados nas LFS mailing lists. Este é um tópico altamente subjetivo. O padrão para a maioria das distribuições é usar o disco inteiro com exceção de uma pequena partição de swap. Isso não é ideal para o LFS por várias razões. Reduz a flexibilidade, torna o compartilhamento de dados entre múltiplas distribuições ou LFS builds mais difícil, torna os backups mais demorados e pode desperdiçar espaço em disco através da alocação ineficiente de estruturas de sistema de arquivos.

### 2.4.1.1. A Partição Raiz

Uma partição raiz LFS (não confundir com o diretório /root) de vinte gigabytes é um bom compromisso para a maioria dos sistemas. Ela fornece espaço suficiente para construir o LFS e a maior parte do BLFS, mas é pequena o suficiente para que múltiplas partições possam ser facilmente criadas para experimentação.

### 2.4.1.2. A Partição de Swap

A maioria das distribuições cria automaticamente uma partição de swap. Geralmente, o tamanho recomendado da partição de swap é cerca do dobro da quantidade de RAM física, no entanto, isso raramente é necessário. Se o espaço em disco for limitado, mantenha a partição de swap em dois gigabytes e monitore a quantidade de swapping de disco.

Se você quiser usar o recurso de hibernação (suspend-to-disk) do Linux, ele grava o conteúdo da RAM na partição de swap antes de desligar a máquina. Nesse caso, o tamanho da partição de swap deve ser pelo menos tão grande quanto a RAM instalada no sistema.

Swapping nunca é bom. Para discos rígidos mecânicos, você geralmente pode saber se um sistema está fazendo swapping apenas ouvindo a atividade do disco e observando como o sistema reage aos comandos. Com um SSD, você não conseguirá ouvir o swapping, mas pode saber quanto espaço de swap está sendo usado executando os programas top ou free. O uso de um SSD para uma partição de swap deve ser evitado, se possível. A primeira reação ao swapping deve ser verificar se há um comando irracional, como tentar editar um arquivo de cinco gigabytes. Se o swapping se tornar uma ocorrência normal, a melhor solução é comprar mais RAM para o seu sistema.

### 2.4.1.3. A Partição Grub BIOS

Se o disco de boot foi particionado com uma GUID Partition Table (GPT), então uma pequena partição, tipicamente de 1 MB, deve ser criada se ainda não existir. Esta partição não é formatada, mas deve estar disponível para o GRUB usar durante a instalação do boot loader. Esta partição será normalmente rotulada como 'BIOS Boot' se usar fdisk ou terá um código EF02 se usar o comando gdisk.

### Nota

A partição Grub BIOS deve estar na unidade que o BIOS usa para inicializar o sistema. Esta não é necessariamente a unidade que contém a partição raiz LFS. Os discos em um sistema podem usar diferentes tipos de tabela de partição. A necessidade da partição Grub BIOS depende apenas do tipo de tabela de partição do disco de boot.

### 2.4.1.4. Partições de Conveniência

Existem várias outras partições que não são obrigatórias, mas devem ser consideradas ao projetar um layout de disco. A lista a seguir não é exaustiva, mas serve como um guia.

- /boot – Altamente recomendado. Use esta partição para armazenar kernels e outras informações de boot. Para minimizar potenciais problemas de boot com discos maiores, torne esta a primeira partição física na sua primeira unidade de disco. Um tamanho de partição de 200 megabytes é adequado.

- /boot/efi – A Partição de Sistema EFI, que é necessária para inicializar o sistema com UEFI. Leia a página do BLFS para detalhes.

- /home – Altamente recomendado. Compartilhe seu diretório home e personalização de usuário entre múltiplas distribuições ou LFS builds. O tamanho é geralmente bastante grande e depende do espaço em disco disponível.

- /usr – No LFS, /bin, /lib e /sbin são symlinks para seus equivalentes em /usr. Assim, /usr contém todos os binários necessários para o sistema funcionar. Para o LFS, uma partição separada para /usr normalmente não é necessária. Se você a criar de qualquer forma, deve fazer uma partição grande o suficiente para caber todos os programas e bibliotecas no sistema. A partição raiz pode ser muito pequena (talvez apenas um gigabyte) nesta configuração, então é adequada para um thin client ou workstation sem disco (onde /usr é montado de um servidor remoto). No entanto, você deve estar ciente de que um initramfs (não abordado pelo LFS) será necessário para inicializar um sistema com uma partição /usr separada.

- /opt – Este diretório é mais útil para o BLFS, onde múltiplos packages grandes como KDE ou Texlive podem ser instalados sem incorporar os arquivos na hierarquia /usr. Se usado, 5 a 10 gigabytes é geralmente adequado.

- /tmp – Por padrão, o systemd monta um tmpfs aqui. Se você quiser substituir esse comportamento, siga a Seção 9.10.3, “Desabilitando tmpfs para /tmp” ao configurar o sistema LFS.

- /usr/src – Esta partição é muito útil para fornecer um local para armazenar arquivos-fonte do BLFS e compartilhá-los entre LFS builds. Também pode ser usada como um local para construir packages do BLFS. Uma partição razoavelmente grande de 30-50 gigabytes oferece bastante espaço.

Qualquer partição separada que você queira montar automaticamente quando o sistema iniciar deve ser especificada no arquivo /etc/fstab. Detalhes sobre como especificar partições serão discutidos na Seção 10.2, “Criando o arquivo /etc/fstab”.
