# 7.7. Gettext-0.26

O pacote Gettext contém utilitários para internacionalização e localização. Estes permitem que programas sejam compilados com NLS (Native Language Support), possibilitando-lhes exibir mensagens na língua nativa do usuário.

## 7.7.1. Instalação do Gettext

Para nosso conjunto temporário de ferramentas, precisamos instalar apenas três programas do Gettext.

Prepare o Gettext para compilação:

```bash
./configure --disable-shared
```

O significado da opção configure:

Não precisamos instalar nenhuma das bibliotecas compartilhadas do Gettext neste momento, portanto não há necessidade de compilá-las.

Compile o pacote:

```bash
make
```

Instale os programas msgfmt, msgmerge e xgettext:

```bash
cp -v gettext-tools/src/{msgfmt,msgmerge,xgettext} /usr/bin
```

Detalhes sobre este pacote estão localizados na Seção 8.33.2, “Conteúdo do Gettext.”
