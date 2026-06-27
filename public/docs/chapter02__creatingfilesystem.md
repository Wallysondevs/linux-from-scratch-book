# 2.5. Criando um Sistema de Arquivos na Partição

Uma partição é apenas um intervalo de setores em um disco rígido, delimitado por limites definidos em uma tabela de partição. Antes que o sistema operacional possa usar uma partição para armazenar quaisquer arquivos, a partição deve ser formatada para conter um sistema de arquivos, tipicamente consistindo de um rótulo, blocos de diretório, blocos de dados e um esquema de indexação para localizar um arquivo específico sob demanda. O sistema de arquivos também ajuda o SO a rastrear o espaço livre na partição, reservar os setores necessários quando um novo arquivo é criado ou um arquivo existente é estendido, e reciclar os segmentos de dados livres criados quando arquivos são excluídos. Ele também pode fornecer suporte para redundância de dados e para recuperação de erros.

O LFS pode usar qualquer sistema de arquivos reconhecido pelo kernel Linux, mas os tipos mais comuns são ext3 e ext4. A escolha do sistema de arquivos correto pode ser complexa; depende das características dos arquivos e do tamanho da partição. Por exemplo:

é adequado para partições pequenas que são atualizadas com pouca frequência, como /boot.

é uma atualização para ext2 que inclui um journal para ajudar a recuperar o status da partição em caso de desligamento incorreto. É comumente usado como um sistema de arquivos de propósito geral.

é a versão mais recente da família de sistemas de arquivos ext. Ele oferece várias novas capacidades, incluindo timestamps de nanossegundos, criação e uso de arquivos muito grandes (até 16 TB), e melhorias de velocidade.

Outros sistemas de arquivos, incluindo FAT32, NTFS, JFS e XFS, são úteis para propósitos especializados. Mais informações sobre esses sistemas de arquivos, e muitos outros, podem ser encontradas em https://en.wikipedia.org/wiki/Comparison_of_file_systems.

O LFS assume que o sistema de arquivos raiz (/) é do tipo ext4. Para criar um sistema de arquivos ext4 na partição LFS, execute o seguinte comando:

```bash
mkfs -v -t ext4 /dev/<xxx>
```

Substitua <xxx> pelo nome da partição LFS.

Se você estiver usando uma partição swap existente, não há necessidade de formatá-la. Se uma nova partição swap foi criada, ela precisará ser inicializada com este comando:

```bash
mkswap /dev/<yyy>
```

Substitua <yyy> pelo nome da partição swap.
