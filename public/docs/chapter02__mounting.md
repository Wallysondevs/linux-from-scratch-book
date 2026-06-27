# 2.7. Montando a Nova Partição

Agora que um sistema de arquivos foi criado, a partição deve ser montada para que o sistema host possa acessá-la. Este livro assume que o sistema de arquivos está montado no diretório especificado pela variável de ambiente LFS descrita na seção anterior.

Estritamente falando, não se pode “montar uma partição.” Monta-se o sistema de arquivos embutido nessa partição. Mas como uma única partição não pode conter mais de um sistema de arquivos, as pessoas frequentemente se referem à partição e ao sistema de arquivos associado como se fossem a mesma coisa.

Crie o ponto de montagem e monte o sistema de arquivos LFS com estes comandos:

```bash
mkdir -pv $LFS
mount -v -t ext4 /dev/<xxx> $LFS
```

Substitua <xxx> pelo nome da partição LFS.

Se você estiver usando múltiplas partições para o LFS (por exemplo, uma para / e outra para /home), monte-as assim:

```bash
mkdir -pv $LFS
mount -v -t ext4 /dev/<xxx> $LFS
mkdir -v $LFS/home
mount -v -t ext4 /dev/<yyy> $LFS/home
```

Substitua <xxx> e <yyy> pelos nomes de partição apropriados.

Defina o proprietário e o modo de permissão do diretório $LFS (ou seja, o diretório raiz no sistema de arquivos recém-criado para o sistema LFS) para root e 755 caso a distro host tenha sido configurada para usar um padrão diferente para mkfs:

```bash
chown root:root $LFS
chmod 755 $LFS
```

Certifique-se de que esta nova partição não esteja montada com permissões muito restritivas (como as opções nosuid ou nodev). Execute o comando mount sem quaisquer parâmetros para ver quais opções estão definidas para a partição LFS montada. Se nosuid e/ou nodev estiverem definidos, a partição deve ser remontada.

### Aviso

As instruções acima assumem que você não reiniciará seu computador durante todo o processo LFS. Se você desligar seu sistema, você precisará remontar a partição LFS cada vez que reiniciar o processo de build, ou modificar o arquivo /etc/fstab do sistema host para remontá-la automaticamente ao reiniciar. Por exemplo, você pode adicionar esta linha ao seu arquivo /etc/fstab:

```
/dev/<xxx>  /mnt/lfs ext4   defaults      1     1
```

Se você usar partições opcionais adicionais, certifique-se de adicioná-las também.

Se você estiver usando uma partição swap, certifique-se de que ela esteja habilitada usando o comando swapon:

```bash
/sbin/swapon -v /dev/<zzz>
```

Substitua <zzz> pelo nome da partição swap.

Agora que a nova partição LFS está pronta para uso, é hora de baixar os packages.
