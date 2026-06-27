# 9.9. Criando o Arquivo /etc/shells

O arquivo shells contém uma lista de shells de login no sistema. Aplicações usam este arquivo para determinar se um shell é válido. Para cada shell, uma única linha deve estar presente, consistindo no caminho do shell relativo à raiz da estrutura de diretórios (/).

Por exemplo, este arquivo é consultado por chsh para determinar se um usuário não privilegiado pode mudar o shell de login para sua própria conta. Se o nome do comando não estiver listado, o usuário terá a capacidade de mudar shells negada.

É um requisito para aplicações como GDM que não preenche o navegador de faces se não conseguir encontrar /etc/shells, ou daemons FTP que tradicionalmente negam acesso a usuários com shells não incluídos neste arquivo.

```
cat > /etc/shells << "EOF"
# Begin /etc/shells

/bin/sh
/bin/bash

# End /etc/shells
EOF
```
