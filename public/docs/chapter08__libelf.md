# 8.49. Libelf from Elfutils-0.193

Libelf é uma biblioteca para manipular arquivos ELF (Executable and Linkable Format).

## 8.49.1. Instalação do Libelf

Libelf faz parte do package elfutils-0.193. Use o arquivo elfutils-0.193.tar.bz2 como o source tarball.

Prepare o Libelf para compilação:

```bash
./configure --prefix=/usr        \
            --disable-debuginfod \
            --enable-libdebuginfod=dummy
```

Compile o package:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Dois testes são conhecidos por falhar, dwarf_srclang_check e run-backtrace-native-core.sh.

Instale apenas o Libelf:

```bash
make -C libelf install
install -vm644 config/libelf.pc /usr/lib/pkgconfig
rm /usr/lib/libelf.a
```

## 8.49.2. Conteúdo do Libelf

### Descrições Breves

libelf.so

Contém funções API para manipular arquivos objeto ELF
