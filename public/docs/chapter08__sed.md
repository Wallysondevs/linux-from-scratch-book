# 8.31. Sed-4.9

O pacote Sed contém um editor de fluxo.

## 8.31.1. Instalação do Sed

Prepare o Sed para compilação:

```bash
./configure --prefix=/usr
```

Compile o pacote e gere a documentação HTML:

```bash
make
make html
```

Para testar os resultados, execute:

```bash
chown -R tester .
su tester -c "PATH=$PATH make check"
```

Instale o pacote e sua documentação:

```bash
make install
install -d -m755           /usr/share/doc/sed-4.9
install -m644 doc/sed.html /usr/share/doc/sed-4.9
```

## 8.31.2. Conteúdo do Sed

### Descrições Breves

sed

Filtra e transforma arquivos de texto em uma única passagem
