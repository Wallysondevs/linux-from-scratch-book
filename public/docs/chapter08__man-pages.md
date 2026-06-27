# 8.3. Man-pages-6.15

O pacote Man-pages contém mais de 2.400 páginas de manual.

## 8.3.1. Instalação do Man-pages

Remova duas páginas de manual para funções de hash de senha. Libxcrypt fornecerá uma versão melhor dessas páginas de manual:

```bash
rm -v man3/crypt*
```

Instale o Man-pages executando:

```bash
make -R GIT=false prefix=/usr install
```

O significado das opções:

Isso impede que o make defina quaisquer variáveis embutidas. O sistema de construção do man-pages não funciona bem com variáveis embutidas, mas atualmente não há como desativá-las, exceto passando -R explicitamente via linha de comando.

Isso impede que o sistema de construção emita muitas linhas de aviso 'git: command not found'.

## 8.3.2. Conteúdo do Man-pages

### Descrições Breves

páginas de manual

Descrevem funções da linguagem de programação C, arquivos de dispositivo importantes e arquivos de configuração significativos
