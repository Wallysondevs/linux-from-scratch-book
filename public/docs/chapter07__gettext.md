# 7.7. Gettext-0.26

O pacote Gettext contém utilitários para internacionalização e localização. Estes permitem que programas sejam compilados com NLS (Suporte a Linguagem Nativa), possibilitando que eles exibam mensagens na linguagem nativa do usuário.

## 7.7.1. Instalação do Gettext

Para nosso conjunto temporário de ferramentas, nós só precisamos instalar três programas do Gettext.

Prepare o Gettext para compilação:

```bash
./configure --disable-shared
```

O significado da opção de configuração:

Nós não precisamos instalar nenhuma das bibliotecas compartilhadas do Gettext neste momento, portanto não há necessidade de construí-las.

Compile o pacote:

```bash
make
```

Instale os programas msgfmt, msgmerge e xgettext:

```bash
cp -v gettext-tools/src/{msgfmt,msgmerge,xgettext} /usr/bin
```

Detalhes sobre este pacote estão localizados em [Seção 8.33.2, “Conteúdo do Gettext.”](#/page/chapter08__gettext)
