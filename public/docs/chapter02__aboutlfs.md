# 2.6. Definindo a Variável $LFS e o Umask

Ao longo deste livro, a variável de ambiente LFS será usada várias vezes. Você deve garantir que esta variável esteja sempre definida durante todo o processo de build do LFS. Ela deve ser definida para o nome do diretório onde você estará construindo seu sistema LFS - usaremos /mnt/lfs como exemplo, mas você pode escolher qualquer nome de diretório que desejar. Se você estiver construindo o LFS em uma partição separada, este diretório será o ponto de montagem para a partição. Escolha um local de diretório e defina a variável com o seguinte comando:

```bash
export LFS=/mnt/lfs
```

Ter esta variável definida é benéfico, pois comandos como mkdir -v $LFS/tools podem ser digitados literalmente. O shell substituirá automaticamente “$LFS” por “/mnt/lfs” (ou qualquer valor para o qual a variável foi definida) quando processar a linha de comando.

Agora defina a máscara de criação de modo de arquivo (umask) para 022 caso a distro host use um padrão diferente:

```bash
umask 022
```

Definir o umask para 022 garante que arquivos e diretórios recém-criados sejam graváveis apenas por seu proprietário, mas sejam legíveis e pesquisáveis (apenas para diretórios) por qualquer pessoa (assumindo que modos padrão sejam usados pela chamada de sistema open(2), novos arquivos terão o modo de permissão 644 e diretórios com modo 755). Um padrão excessivamente permissivo pode deixar falhas de segurança no sistema LFS, e um padrão excessivamente restritivo pode causar problemas estranhos na construção ou uso do sistema LFS.

### Cuidado

Não se esqueça de verificar se LFS está definido e o umask está definido para 022 sempre que você sair e reentrar no ambiente de trabalho atual (como ao fazer um su para root ou outro usuário). Verifique se a variável LFS está configurada corretamente com:

```bash
echo $LFS
```

Certifique-se de que a saída mostre o path para o local de build do seu sistema LFS, que é /mnt/lfs se o exemplo fornecido foi seguido.

Verifique se o umask está configurado corretamente com:

```bash
umask
```

A saída pode ser 0022 ou 022 (o número de zeros à esquerda depende da distro host).

Se qualquer saída desses dois comandos estiver incorreta, use o comando fornecido anteriormente nesta página para definir $LFS para o nome de diretório correto e definir umask para 022.

### Nota

Uma maneira de garantir que a variável LFS e o umask estejam sempre definidos corretamente é editar o arquivo .bash_profile tanto no seu diretório home pessoal quanto em /root/.bash_profile e inserir os comandos export e umask acima. Além disso, o shell especificado no arquivo /etc/passwd para todos os usuários que precisam da variável LFS deve ser bash para garantir que o arquivo .bash_profile seja incorporado como parte do processo de login.

Outra consideração é o método usado para fazer login no sistema host. Se o login for feito através de um gerenciador de exibição gráfico, o .bash_profile do usuário normalmente não é usado quando um terminal virtual é iniciado. Neste caso, adicione os comandos ao arquivo .bashrc para o usuário e root. Além disso, algumas distribuições usam um teste "if" e não executam as instruções restantes do .bashrc para uma invocação bash não interativa. Certifique-se de colocar os comandos antes do teste para uso não interativo.
