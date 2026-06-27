# 8.57. Meson-1.8.3

Meson é um sistema de build de código aberto projetado para ser tanto extremamente rápido quanto o mais amigável possível para o usuário.

## 8.57.1. Instalação do Meson

Compile o Meson com o seguinte comando:

```bash
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
```

A suíte de testes requer alguns packages fora do escopo do LFS.

Instale o package:

```bash
pip3 install --no-index --find-links dist meson
install -vDm644 data/shell-completions/bash/meson /usr/share/bash-completion/completions/meson
install -vDm644 data/shell-completions/zsh/_meson /usr/share/zsh/site-functions/_meson
```

O significado dos parâmetros de instalação:

Coloca os wheels criados no diretório dist.

Instala wheels do diretório dist.

## 8.57.2. Conteúdo do Meson

### Descrições Breves

meson

Um sistema de build de alta produtividade
