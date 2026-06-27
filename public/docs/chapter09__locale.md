# 9.7. Configurando o Locale do Sistema

Algumas variáveis de ambiente são necessárias para o suporte a idiomas nativos. Configurá-las corretamente resulta em:

- A saída dos programas sendo traduzida para o seu idioma nativo

- A classificação correta de caracteres em letras, dígitos e outras classes. Isso é necessário para que o bash aceite corretamente caracteres não-ASCII em linhas de comando em locales não-ingleses

- A ordem de classificação alfabética correta para o país

- O tamanho de papel padrão apropriado

- A formatação correta de valores monetários, de hora e de data

Substitua <ll> abaixo pelo código de duas letras para o seu idioma desejado (por exemplo, en) e <CC> pelo código de duas letras para o país apropriado (por exemplo, GB). <charmap> deve ser substituído pelo charmap canônico para o seu locale escolhido. Modificadores opcionais como @euro também podem estar presentes.

A lista de todos os locales suportados pelo Glibc pode ser obtida executando o seguinte comando:

```bash
locale -a
```

Charmaps podem ter vários aliases, por exemplo, ISO-8859-1 também é referido como iso8859-1 e iso88591. Algumas aplicações não conseguem lidar com os vários sinônimos corretamente (por exemplo, exigem que UTF-8 seja escrito como UTF-8, não utf8), então é mais seguro na maioria dos casos escolher o nome canônico para um locale específico. Para determinar o nome canônico, execute o seguinte comando, onde <locale name> é a saída fornecida por locale -a para o seu locale preferido (en_GB.iso88591 em nosso exemplo).

```bash
LC_ALL=<locale name> locale charmap
```

Para o locale en_GB.iso88591, o comando acima irá imprimir:

```
ISO-8859-1
```

Isso resulta em uma configuração de locale final de en_GB.ISO-8859-1. É importante que o locale encontrado usando a heurística acima seja testado antes de ser adicionado aos arquivos de inicialização do Bash:

```bash
LC_ALL=<locale name> locale language
LC_ALL=<locale name> locale charmap
LC_ALL=<locale name> locale int_curr_symbol
LC_ALL=<locale name> locale int_prefix
```

Os comandos acima devem imprimir o nome do idioma, a codificação de caracteres usada pelo locale, a moeda local e o prefixo a ser discado antes do número de telefone para entrar no país. Se algum dos comandos acima falhar com uma mensagem semelhante à mostrada abaixo, isso significa que seu locale não foi instalado no Capítulo 8 ou não é suportado pela instalação padrão do Glibc.

```
locale: Cannot set LC_* to default locale: No such file or directory
```

Se isso acontecer, você deve instalar o locale desejado usando o comando localedef, ou considerar escolher um locale diferente. Instruções adicionais assumem que não há tais mensagens de erro do Glibc.

Outros packages também podem funcionar incorretamente (mas podem não exibir necessariamente mensagens de erro) se o nome do locale não atender às suas expectativas. Nesses casos, investigar como outras distribuições Linux suportam seu locale pode fornecer informações úteis.

Uma vez que as configurações de locale apropriadas tenham sido determinadas, crie o arquivo /etc/locale.conf:

```bash
cat > /etc/locale.conf << "EOF"
LANG=<ll>_<CC>.<charmap><@modifiers>
EOF
```

O programa shell /bin/bash (doravante referido como “o shell”) usa uma coleção de arquivos de inicialização para ajudar a criar o ambiente de execução. Cada arquivo tem um uso específico e pode afetar ambientes de login e interativos de forma diferente. Os arquivos no diretório /etc fornecem configurações globais. Se arquivos equivalentes existirem no diretório home, eles podem sobrescrever as configurações globais.

Um shell de login interativo é iniciado após um login bem-sucedido, usando /bin/login, lendo o arquivo /etc/passwd. Um shell não-login interativo é iniciado na linha de comando (por exemplo, [prompt]$/bin/bash). Um shell não-interativo geralmente está presente quando um shell script está em execução. É não-interativo porque está processando um script e não esperando por entrada do usuário entre comandos.

Os shells de login geralmente não são afetados pelas configurações em /etc/locale.conf. Crie o /etc/profile para ler as configurações de locale de /etc/locale.conf e exportá-las, mas defina o locale C.UTF-8 em vez disso se estiver executando no console Linux (para evitar que programas produzam caracteres que o console Linux não consegue renderizar):

```bash
cat > /etc/profile << "EOF"
# Begin /etc/profile

for i in $(locale); do
  unset ${i%=*}
done

if [[ "$TERM" = linux ]]; then
  export LANG=C.UTF-8
else
  source /etc/locale.conf

  for i in $(locale); do
    key=${i%=*}
    if [[ -v $key ]]; then
      export $key
    fi
  done
fi

# End /etc/profile
EOF
```

Observe que você pode modificar /etc/locale.conf com o utilitário systemd localectl. Para usar localectl para o exemplo acima, execute:

```bash
localectl set-locale LANG="<ll>_<CC>.<charmap><@modifiers>"
```

Você também pode especificar outras variáveis de ambiente específicas do idioma, como LANG, LC_CTYPE, LC_NUMERIC ou qualquer outra variável de ambiente da saída do locale. Basta separá-las com um espaço. Um exemplo onde LANG é definido como en_US.UTF-8 mas LC_CTYPE é definido como apenas en_US é:

```bash
localectl set-locale LANG="en_US.UTF-8" LC_CTYPE="en_US"
```

### Nota

Observe que o comando localectl não funciona no ambiente chroot. Ele só pode ser usado depois que o sistema LFS é inicializado com systemd.

Os locales C (padrão) e en_US (o recomendado para usuários de inglês dos Estados Unidos) são diferentes. C usa o conjunto de caracteres US-ASCII de 7 bits e trata bytes com o bit mais alto definido como caracteres inválidos. É por isso que, por exemplo, o comando ls os substitui por pontos de interrogação nesse locale. Além disso, uma tentativa de enviar e-mail com tais caracteres de Mutt ou Pine resulta no envio de mensagens não-conformes com RFC (o charset no e-mail de saída é indicado como 8-bit desconhecido). Sugere-se que você use o locale C apenas se tiver certeza de que nunca precisará de caracteres de 8 bits.
