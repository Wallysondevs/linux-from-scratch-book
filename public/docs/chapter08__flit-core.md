# 8.52. Flit-Core-3.12.0

Flit-core são as partes de construção de distribuição do Flit (uma ferramenta de empacotamento para módulos Python simples).

## 8.52.1. Instalação do Flit-Core

Construa o pacote:

```bash
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
```

Instale o pacote:

```bash
pip3 install --no-index --find-links dist flit_core
```

O significado das opções de configuração e comandos do pip3:

Este comando constrói o arquivo wheel para este pacote.

Instrui o pip a colocar o wheel criado no diretório dist.

Impede o pip de copiar o wheel criado para o diretório /root/.cache/pip.

Este comando instala o pacote.

Estas opções impedem a busca de arquivos do repositório de pacotes online (PyPI). Se os pacotes forem instalados na ordem correta, o pip não precisará buscar nenhum arquivo em primeiro lugar; estas opções adicionam alguma segurança em caso de erro do usuário.

Instrui o pip a procurar por arquivos wheel no diretório dist.

## 8.52.2. Conteúdo do Flit-Core
