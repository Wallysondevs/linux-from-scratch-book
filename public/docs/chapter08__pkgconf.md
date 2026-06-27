# 8.19. Pkgconf-2.5.1

O pacote pkgconf é um sucessor do pkg-config e contém uma ferramenta para passar o include path e/ou os library paths para ferramentas de build durante as fases de configure e make de instalações de pacotes.

## 8.19.1. Instalação do Pkgconf

Prepare o Pkgconf para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/pkgconf-2.5.1
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make install
```

Para manter a compatibilidade com o Pkg-config original, crie dois symlinks:

```bash
ln -sv pkgconf   /usr/bin/pkg-config
ln -sv pkgconf.1 /usr/share/man/man1/pkg-config.1
```

## 8.19.2. Conteúdo do Pkgconf

### Descrições Breves

pkgconf

Retorna metainformações para a biblioteca ou pacote especificado

bomtool

Gera uma Lista de Materiais de Software a partir de arquivos .pc do pkg-config

libpkgconf

Contém a maior parte da funcionalidade do pkgconf, enquanto permite que outras ferramentas como IDEs e compiladores utilizem seus frameworks
