# 8.54. Wheel-0.46.1

Wheel é uma biblioteca Python que é a implementação de referência do padrão de empacotamento Python wheel.

## 8.54.1. Instalação do Wheel

Compile o Wheel com o seguinte comando:

```bash
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
```

Instale o Wheel com o seguinte comando:

```bash
pip3 install --no-index --find-links dist wheel
```

## 8.54.2. Conteúdo do Wheel

### Descrições Breves

wheel

é um utilitário para descompactar, compactar ou converter arquivos wheel
