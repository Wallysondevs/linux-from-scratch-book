# 8.56. Ninja-1.13.1

Ninja é um pequeno sistema de build com foco em velocidade.

## 8.56.1. Instalação do Ninja

Quando executado, o ninja normalmente utiliza o maior número possível de processos em paralelo. Por padrão, este é o número de cores no sistema, mais dois. Isso pode superaquecer a CPU, ou fazer com que o sistema fique sem memória. Quando o ninja é invocado da linha de comando, passar o parâmetro -jN limitará o número de processos paralelos. Alguns packages incorporam a execução do ninja e não passam o parâmetro -j para ele.

Usar o procedimento opcional abaixo permite que um usuário limite o número de processos paralelos através de uma variável de ambiente, NINJAJOBS. Por exemplo, definindo:

```
export NINJAJOBS=4
```

limitará o ninja a quatro processos paralelos.

Se desejado, faça o ninja reconhecer a variável de ambiente NINJAJOBS executando o editor de stream:

```bash
sed -i '/int Guess/a \
  int   j = 0;\
  char* jobs = getenv( "NINJAJOBS" );\
  if ( jobs != NULL ) j = atoi( jobs );\
  if ( j > 0 ) return j;\
' src/ninja.cc
```

Faça o build do Ninja com:

```bash
python3 configure.py --bootstrap --verbose
```

O significado da opção de build:

Este parâmetro força o Ninja a se reconstruir para o sistema atual.

Este parâmetro faz com que configure.py mostre o progresso do build do Ninja.

Os testes do package não podem ser executados no ambiente chroot. Eles exigem cmake. Mas a função básica deste package já é testada pela sua reconstrução (com a opção --bootstrap) de qualquer forma.

Instale o package:

```bash
install -vm755 ninja /usr/bin/
install -vDm644 misc/bash-completion /usr/share/bash-completion/completions/ninja
install -vDm644 misc/zsh-completion  /usr/share/zsh/site-functions/_ninja
```

## 8.56.2. Conteúdo do Ninja

### Descrições Curtas

ninja

é o sistema de build Ninja
