# 3.1. Introdução

Este capítulo inclui uma lista de packages que precisam ser baixados para construir um sistema Linux básico. Os números de versão listados correspondem às versões do software que comprovadamente funcionam, e este livro é baseado no uso delas. Recomendamos fortemente não usar versões diferentes, pois os comandos de build para uma versão podem não funcionar com uma versão diferente, a menos que a versão diferente seja especificada por uma errata LFS ou aviso de segurança. As versões mais recentes dos packages também podem apresentar problemas que exigem work-arounds. Esses work-arounds serão desenvolvidos e estabilizados na versão de desenvolvimento do livro.

Para alguns packages, o tarball de release e o tarball de snapshot do repositório (Git ou SVN) para aquela release podem ser publicados com nomes de arquivo semelhantes ou até idênticos. Mas o tarball de release pode conter alguns arquivos que são essenciais apesar de não estarem armazenados no repositório (por exemplo, um script configure gerado pelo autoconf), além do conteúdo do snapshot do repositório correspondente. O livro usa tarballs de release sempre que possível. Usar um snapshot do repositório em vez de um tarball de release especificado pelo livro causará problemas.

Os locais de download podem nem sempre estar acessíveis. Se um local de download mudou desde que este livro foi publicado, o Google (https://www.google.com/) fornece um motor de busca útil para a maioria dos packages. Se esta busca não for bem-sucedida, tente um dos meios alternativos de download em https://www.linuxfromscratch.org/lfs/mirrors.html#files.

packages e patches baixados precisarão ser armazenados em algum lugar que esteja convenientemente disponível durante todo o build. Um diretório de trabalho também é necessário para descompactar as sources e construí-las. $LFS/sources pode ser usado tanto como o local para armazenar os tarballs e patches quanto como um diretório de trabalho. Ao usar este diretório, os elementos necessários estarão localizados na partição LFS e estarão disponíveis durante todas as etapas do processo de building.

Para criar este diretório, execute o seguinte comando, como usuário root, antes de iniciar a sessão de download:

```bash
mkdir -v $LFS/sources
```

Torne este diretório gravável e sticky. “Sticky” significa que, mesmo que vários usuários tenham permissão de escrita em um diretório, apenas o proprietário de um arquivo pode excluir o arquivo dentro de um diretório sticky. O seguinte comando habilitará os modos de escrita e sticky:

```bash
chmod -v a+wt $LFS/sources
```

Existem várias maneiras de obter todos os packages e patches necessários para construir o LFS:

- Os arquivos podem ser baixados individualmente conforme descrito nas próximas duas seções.

- Para versões estáveis do livro, um tarball de todos os arquivos necessários pode ser baixado de um dos sites mirror listados em https://www.linuxfromscratch.org/mirrors.html#files.

- Os arquivos podem ser baixados usando wget e uma wget-list conforme descrito abaixo.

Para baixar todos os packages e patches usando wget-list-systemd como entrada para o comando wget, use:

```bash
wget --input-file=wget-list-systemd --continue --directory-prefix=$LFS/sources
```

Além disso, a partir do LFS-7.0, existe um arquivo separado, md5sums, que pode ser usado para verificar se todos os packages corretos estão disponíveis antes de prosseguir. Coloque esse arquivo em $LFS/sources e execute:

```bash
pushd $LFS/sources
  md5sum -c md5sums
popd
```

Esta verificação pode ser usada após recuperar os arquivos necessários com qualquer um dos métodos listados acima.

Se os packages e patches forem baixados como um usuário não-root, esses arquivos serão de propriedade do usuário. O sistema de arquivos registra o proprietário pelo seu UID, e o UID de um usuário normal na distro host não é atribuído no LFS. Assim, os arquivos permanecerão de propriedade de um UID sem nome no sistema LFS final. Se você não atribuir o mesmo UID para seu usuário no sistema LFS, altere os proprietários desses arquivos para root agora para evitar este problema:

```bash
chown root:root $LFS/sources/*
```
