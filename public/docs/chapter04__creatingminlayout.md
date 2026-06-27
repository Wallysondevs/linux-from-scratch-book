# 4.2. Criando um Layout de Diretório Limitado no Sistema de Arquivos LFS

Nesta seção, começamos a popular o sistema de arquivos LFS com as peças que constituirão o sistema Linux final. O primeiro passo é criar uma hierarquia de diretórios limitada, para que os programas compilados no Capítulo 6 (assim como glibc e libstdc++ no Capítulo 5) possam ser instalados em seu local final. Fazemos isso para que esses programas temporários sejam sobrescritos quando as versões finais forem construídas no Capítulo 8.

Crie o layout de diretórios necessário executando os seguintes comandos como root:

```bash
mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}

for i in bin lib sbin; do
  ln -sv usr/$i $LFS/$i
done

case $(uname -m) in
  x86_64) mkdir -pv $LFS/lib64 ;;
esac
```

Os programas no Capítulo 6 serão compilados com um cross-compiler (mais detalhes podem ser encontrados na seção Notas Técnicas da Toolchain). Este cross-compiler será instalado em um diretório especial, para separá-lo dos outros programas. Ainda agindo como root, crie esse diretório com este comando:

```bash
mkdir -pv $LFS/tools
```

### Nota

Os editores do LFS decidiram deliberadamente não usar um diretório /usr/lib64. Várias etapas são tomadas para garantir que a toolchain não o utilize. Se por algum motivo este diretório aparecer (seja porque você cometeu um erro ao seguir as instruções, ou porque você instalou um binary package que o criou após finalizar o LFS), isso pode quebrar seu sistema. Você deve sempre ter certeza de que este diretório não existe.
