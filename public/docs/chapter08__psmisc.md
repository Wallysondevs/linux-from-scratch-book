# 8.32. Psmisc-23.7

O Psmisc package contém programas para exibir informações sobre processos em execução.

## 8.32.1. Instalação do Psmisc

Prepare o Psmisc para compilação:

```bash
./configure --prefix=/usr
```

Compile o package:

```bash
make
```

Para executar a suíte de testes, execute:

```bash
make check
```

Instale o package:

```bash
make install
```

## 8.32.2. Conteúdo do Psmisc

### Descrições Breves

fuser

Informa os IDs de Processo (PIDs) de processos que utilizam os arquivos ou sistemas de arquivos fornecidos

killall

Mata processos pelo nome; ele envia um sinal para todos os processos executando qualquer um dos comandos fornecidos

peekfd

Visualiza os descritores de arquivo de um processo em execução, dado o seu PID

prtstat

Imprime informações sobre um processo

pslog

Informa o caminho atual dos logs de um processo

pstree

Exibe processos em execução como uma árvore

pstree.x11

O mesmo que pstree, exceto que ele aguarda por confirmação antes de sair
