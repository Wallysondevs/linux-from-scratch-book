import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function RequisitosHost() {
  return (
    <PageContainer
      title="Requisitos do Host"
      subtitle="O que precisa estar instalado e funcionando no Linux que você vai usar como base."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>Versões mínimas exigidas pelo LFS 12.4</h2>
      <p>O livro oficial exige (no mínimo) as seguintes versões instaladas no host:</p>
      <ul>
        <li>Bash &ge; 3.2 (link <code>/bin/sh</code> apontando para bash ou compatível)</li>
        <li>Binutils &ge; 2.13.1 (recomendado &lt; 2.42 para evitar incompatibilidades)</li>
        <li>Bison &ge; 2.7</li>
        <li>Coreutils &ge; 6.9</li>
        <li>Diffutils &ge; 2.8.1</li>
        <li>Findutils &ge; 4.2.31</li>
        <li>Gawk &ge; 4.0.1</li>
        <li>GCC &ge; 5.2 (incluindo g++)</li>
        <li>Glibc 2.11 a 2.40</li>
        <li>Grep &ge; 2.5.1a</li>
        <li>Gzip &ge; 1.3.12</li>
        <li>Linux Kernel &ge; 4.19</li>
        <li>M4 &ge; 1.4.10</li>
        <li>Make &ge; 4.0</li>
        <li>Patch &ge; 2.5.4</li>
        <li>Perl &ge; 5.8.8</li>
        <li>Python &ge; 3.4</li>
        <li>Sed &ge; 4.1.5</li>
        <li>Tar &ge; 1.22</li>
        <li>Texinfo &ge; 5.0</li>
        <li>Xz &ge; 5.0.0</li>
      </ul>

      <h2>Como verificar tudo de uma vez</h2>
      <p>
        O LFS publica um script <code>version-check.sh</code> que confere todas
        as versões. Baixe e rode ele:
      </p>
      <CodeBlock
        language="bash"
        code={`cat > version-check.sh << "EOF"
#!/bin/bash
# Versões mínimas para LFS 12.4
export LC_ALL=C
bash --version | head -n1 | cut -d" " -f2-4
MYSH=$(readlink -f /bin/sh)
echo "/bin/sh -> $MYSH"
echo $MYSH | grep -q bash || echo "ERRO: /bin/sh nao aponta para bash"
unset MYSH

echo -n "Binutils: "; ld --version | head -n1 | cut -d" " -f3-
bison --version | head -n1
if [ -h /usr/bin/yacc ]; then
  echo "/usr/bin/yacc -> \`readlink -f /usr/bin/yacc\`"
elif [ -x /usr/bin/yacc ]; then
  echo yacc is \`/usr/bin/yacc --version | head -n1\`
else
  echo "yacc nao encontrado"
fi

echo -n "Coreutils: "; chown --version | head -n1 | cut -d")" -f2
diff --version | head -n1
find --version | head -n1
gawk --version | head -n1

if [ -h /usr/bin/awk ]; then
  echo "/usr/bin/awk -> \`readlink -f /usr/bin/awk\`"
elif [ -x /usr/bin/awk ]; then
  echo awk is \`/usr/bin/awk --version | head -n1\`
else
  echo "awk nao encontrado"
fi

gcc --version | head -n1
g++ --version | head -n1
ldd --version | head -n1 | cut -d" " -f2-
grep --version | head -n1
gzip --version | head -n1
cat /proc/version
m4 --version | head -n1
make --version | head -n1
patch --version | head -n1
echo Perl \`perl -V:version\`
python3 --version
sed --version | head -n1
tar --version | head -n1
makeinfo --version | head -n1
xz --version | head -n1

echo 'int main(){}' > dummy.c && g++ -o dummy dummy.c
if [ -x dummy ]; then
  echo "g++ compilation OK";
else
  echo "g++ compilation falhou"
fi
rm -f dummy.c dummy
EOF

bash version-check.sh`}
      />

      <AlertBox type="warning" title="Faltou alguma dependência?">
        Se aparecer "comando não encontrado" ou versão antiga, instale o pacote
        correspondente pelo gerenciador da sua distro (ex.: <code>apt install bison</code>,
        <code>dnf install texinfo</code>). Resolva tudo antes de seguir.
      </AlertBox>

      <h2>Disco / VM</h2>
      <ul>
        <li>Mínimo: 30 GB. Recomendado: 50–60 GB para folga.</li>
        <li>Idealmente, um disco virtual ou partição inteira dedicada — não dentro da partição do host.</li>
        <li>SSD acelera muito (compilar gera muito I/O).</li>
      </ul>

      <h2>Conexão & energia</h2>
      <ul>
        <li>Banda larga estável para baixar ~700 MB de fontes.</li>
        <li>No-break ou bateria carregada: queda de luz no meio do <code>make install</code> da Glibc é bem chato.</li>
      </ul>
    </PageContainer>
  );
}
