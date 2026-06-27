# 8.36. Bash-5.3

O pacote Bash contém o Bourne-Again Shell.

## 8.36.1. Instalação do Bash

Prepare o Bash para compilação:

```bash
./configure --prefix=/usr             \
            --without-bash-malloc     \
            --with-installed-readline \
            --docdir=/usr/share/doc/bash-5.3
```

O significado da nova opção configure:

Esta opção informa ao Bash para usar a biblioteca readline que já está instalada no sistema em vez de usar sua própria versão do readline.

Compile o pacote:

```bash
make
```

Pule para “Instalar o pacote” se não estiver executando a suíte de testes.

Para preparar os testes, garanta que o usuário tester possa escrever na árvore de fontes:

```bash
chown -R tester .
```

A suíte de testes deste pacote foi projetada para ser executada como um usuário não-root que é proprietário do terminal conectado à entrada padrão. Para satisfazer o requisito, crie um novo pseudo terminal usando Expect e execute os testes como o usuário tester:

```bash
LC_ALL=C.UTF-8 su -s /usr/bin/expect tester << "EOF"
set timeout -1
spawn make tests
expect eof
lassign [wait] _ _ _ value
exit $value
EOF
```

A suíte de testes usa diff para detectar a diferença entre a saída do script de teste e a saída esperada. Qualquer saída do diff (prefixada com < e >) indica uma falha no teste, a menos que haja uma mensagem dizendo que a diferença pode ser ignorada. O teste chamado run-builtins é conhecido por falhar em algumas distros host com uma diferença nas linhas 479 e 480 da saída. Alguns outros testes precisam das locales zh_TW.BIG5 e ja_JP.SJIS, eles são conhecidos por falhar a menos que essas locales estejam instaladas.

Instale o pacote:

```bash
make install
```

Execute o programa bash recém-compilado (substituindo o que está sendo executado atualmente):

```bash
exec /usr/bin/bash --login
```

## 8.36.2. Conteúdo do Bash

### Descrições Breves

bash

Um interpretador de comandos amplamente utilizado; ele realiza muitos tipos de expansões e substituições em uma dada linha de comando antes de executá-la, tornando este interpretador uma ferramenta poderosa

bashbug

Um script shell para ajudar o usuário a compor e enviar por e-mail relatórios de bugs formatados padrão relacionados ao bash

sh

Um symlink para o programa bash; quando invocado como sh, o bash tenta imitar o comportamento de inicialização de versões históricas do sh o mais fielmente possível, enquanto também está em conformidade com o padrão POSIX
