# 8.69. Make-4.4.1

O pacote Make contém um programa para controlar a geração de executáveis e outros arquivos não-fonte de um pacote a partir de arquivos fonte.

## 8.69.1. Instalação do Make

Prepare o Make para compilação:

```bash
./configure --prefix=/usr
```

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
chown -R tester .
su tester -c "PATH=$PATH make check"
```

Instale o pacote:

```bash
make install
```

## 8.69.2. Conteúdo do Make

### Descrições Breves

make

Determina automaticamente quais partes de um pacote precisam ser (re)compiladas e então executa os comandos relevantes
