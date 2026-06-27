# 7.2. Alterando a Propriedade

### Nota

Os comandos no restante deste livro devem ser executados enquanto logado como usuário root e não mais como usuário lfs. Além disso, verifique novamente se $LFS está definido no ambiente do root.

Atualmente, toda a hierarquia de diretórios em $LFS pertence ao usuário lfs, um usuário que existe apenas no sistema host. Se os diretórios e arquivos sob $LFS forem mantidos como estão, eles pertencerão a um ID de usuário sem uma conta correspondente. Isso é perigoso porque uma conta de usuário criada posteriormente poderia obter o mesmo ID de usuário e seria proprietária de todos os arquivos sob $LFS, expondo assim esses arquivos a uma possível manipulação maliciosa.

Para resolver este problema, altere a propriedade dos diretórios $LFS/* para o usuário root executando o seguinte comando:

```bash
chown --from lfs -R root:root $LFS/{usr,var,etc,tools}
case $(uname -m) in
  x86_64) chown --from lfs -R root:root $LFS/lib64 ;;
esac
```
