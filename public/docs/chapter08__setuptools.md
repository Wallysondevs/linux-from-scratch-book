# 8.55. Setuptools-80.9.0

Setuptools é uma ferramenta usada para baixar, construir, instalar, atualizar e desinstalar pacotes Python.

## 8.55.1. Instalação do Setuptools

Construa o pacote:

```bash
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
```

Instale o pacote:

```bash
pip3 install --no-index --find-links dist setuptools
```

## 8.55.2. Conteúdo do Setuptools
