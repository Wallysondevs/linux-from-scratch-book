# 6.5. Coreutils-9.7

O pacote Coreutils contém os programas utilitários básicos necessários por todo sistema operacional.

## 6.5.1. Instalação do Coreutils

Prepare o Coreutils para compilação:

```bash
./configure --prefix=/usr                     \
            --host=$LFS_TGT                   \
            --build=$(build-aux/config.guess) \
            --enable-install-program=hostname \
            --enable-no-install-program=kill,uptime
```

O significado das opções de configure:

Isso habilita o binário hostname a ser construído e instalado – ele é desabilitado por padrão, mas é requerido pela suíte de testes Perl.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Mova os programas para seus locais finais esperados. Embora isso não seja necessário neste ambiente temporário, devemos fazê-lo porque alguns programas codificam locais de executáveis:

```bash
mv -v $LFS/usr/bin/chroot              $LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                    $LFS/usr/share/man/man8/chroot.8
```

Detalhes sobre este pacote estão localizados em [Seção 8.59.2, “Conteúdo do Coreutils.”](#/page/chapter08__coreutils)
