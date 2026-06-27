# 8.48. OpenSSL-3.5.2

O pacote OpenSSL contém ferramentas de gerenciamento e bibliotecas relacionadas à criptografia. Estas são úteis para fornecer funções criptográficas a outros pacotes, como OpenSSH, aplicativos de e-mail e navegadores web (para acessar sites HTTPS).

## 8.48.1. Instalação do OpenSSL

Prepare o OpenSSL para compilação:

```bash
./config --prefix=/usr         \
         --openssldir=/etc/ssl \
         --libdir=lib          \
         shared                \
         zlib-dynamic
```

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
HARNESS_JOBS=$(nproc) make test
```

Um teste, 30-test_afalg.t, é conhecido por falhar se o kernel host não tiver CONFIG_CRYPTO_USER_API_SKCIPHER habilitado, ou não tiver nenhuma opção que forneça uma implementação AES com CBC (por exemplo, a combinação de CONFIG_CRYPTO_AES e CONFIG_CRYPTO_CBC, ou CONFIG_CRYPTO_AES_NI_INTEL se a CPU suportar AES-NI) habilitada. Se falhar, pode ser ignorado com segurança.

Instale o pacote:

```bash
sed -i '/INSTALL_LIBS/s/libcrypto.a libssl.a//' Makefile
make MANSUFFIX=ssl install
```

Adicione a versão ao nome do diretório de documentação, para ser consistente com outros pacotes:

```bash
mv -v /usr/share/doc/openssl /usr/share/doc/openssl-3.5.2
```

Se desejar, instale alguma documentação adicional:

```bash
cp -vfr doc/* /usr/share/doc/openssl-3.5.2
```

### Nota

Você deve atualizar o OpenSSL quando uma nova versão que corrige vulnerabilidades for anunciada. Desde o OpenSSL 3.0.0, o esquema de versionamento do OpenSSL segue o formato MAJOR.MINOR.PATCH. A compatibilidade API/ABI é garantida para o mesmo número de versão MAJOR. Como o LFS instala apenas as bibliotecas compartilhadas, não há necessidade de recompilar pacotes que se vinculam a libcrypto.so ou libssl.so ao atualizar para uma versão com o mesmo número de versão MAJOR.

No entanto, quaisquer programas em execução vinculados a essas bibliotecas precisam ser parados e reiniciados. Leia as entradas relacionadas na [Seção 8.2.1, “Problemas de Atualização”](#/page/chapter08__pkgmgt) para detalhes.

## 8.48.2. Conteúdo do OpenSSL

### Descrições Breves

c_rehash

é um script Perl que escaneia todos os arquivos em um diretório e adiciona links simbólicos aos seus valores de hash. O uso de c_rehash é considerado obsoleto e deve ser substituído pelo comando openssl rehash

openssl

é uma ferramenta de linha de comando para usar as várias funções de criptografia da biblioteca crypto do OpenSSL a partir do shell. Pode ser usado para várias funções que estão documentadas em [openssl(1)](https://man.archlinux.org/man/openssl.1)

libcrypto.so

implementa uma ampla gama de algoritmos criptográficos usados em vários padrões da Internet. Os serviços fornecidos por esta biblioteca são usados pelas implementações OpenSSL de SSL, TLS e S/MIME, e também foram usados para implementar OpenSSH, OpenPGP e outros padrões criptográficos

libssl.so

implementa o protocolo Transport Layer Security (TLS v1). Ele fornece uma API rica, cuja documentação pode ser encontrada em [ssl(7)](https://man.archlinux.org/man/ssl.7)
