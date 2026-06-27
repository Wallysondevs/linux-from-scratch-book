# 4.3. Adicionando o Usuário LFS

Quando logado como usuário root, cometer um único erro pode danificar ou destruir um sistema. Portanto, os packages nos próximos dois capítulos são construídos como um usuário sem privilégios. Você poderia usar seu próprio nome de usuário, mas para facilitar a configuração de um ambiente de trabalho limpo, criaremos um novo usuário chamado lfs como membro de um novo grupo (também chamado lfs) e executaremos comandos como lfs durante o processo de instalação. Como root, execute os seguintes comandos para adicionar o novo usuário:

```bash
groupadd lfs
useradd -s /bin/bash -g lfs -m -k /dev/null lfs
```

Isto é o que as opções da linha de comando significam:

Isso torna o bash o shell padrão para o usuário lfs.

Esta opção adiciona o usuário lfs ao grupo lfs.

Isso cria um diretório home para lfs.

Este parâmetro impede a possível cópia de arquivos de um diretório skeleton (o padrão é /etc/skel) alterando o local de entrada para o dispositivo nulo especial.

Este é o nome do novo usuário.

Se você quiser fazer login como lfs ou alternar para lfs a partir de um usuário não-root (em oposição a alternar para o usuário lfs quando logado como root, o que não exige que o usuário lfs tenha uma senha), você precisa definir uma senha para lfs. Execute o seguinte comando como usuário root para definir a senha:

```bash
passwd lfs
```

Conceda ao lfs acesso total a todos os diretórios sob $LFS tornando lfs o proprietário:

```bash
chown -v lfs $LFS/{usr{,/*},var,etc,tools}
case $(uname -m) in
  x86_64) chown -v lfs $LFS/lib64 ;;
esac
```

### Nota

Em alguns sistemas host, o seguinte comando su não é concluído corretamente e suspende o login para o usuário lfs para o segundo plano. Se o prompt "lfs:~$" não aparecer imediatamente, digitar o comando fg resolverá o problema.

Em seguida, inicie um shell executando como usuário lfs. Isso pode ser feito fazendo login como lfs em um console virtual, ou com o seguinte comando de substituição/troca de usuário:

```bash
su - lfs
```

O “-” instrui o su a iniciar um login shell em vez de um non-login shell. A diferença entre esses dois tipos de shells é descrita em detalhes em bash(1) e info bash.
