import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function PythonFinal() {
  return (
    <PageContainer
      title="Python (final), Wheel, Ninja, Meson"
      subtitle="Python definitivo + ferramentas de build Python e Ninja/Meson para projetos modernos."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Python (final)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf Python-3.12.5.tar.xz && cd Python-3.12.5

./configure --prefix=/usr        \\
            --enable-shared      \\
            --with-system-expat  \\
            --enable-optimizations

make
make install

cat > /etc/pip.conf << EOF
[global]
root-user-action = ignore
disable-pip-version-check = true
EOF
cd .. && rm -rf Python-3.12.5`}
      />

      <h2>Wheel</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf wheel-0.44.0.tar.gz && cd wheel-0.44.0
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links=dist wheel
cd .. && rm -rf wheel-0.44.0`}
      />

      <h2>Setuptools</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf setuptools-72.2.0.tar.gz && cd setuptools-72.2.0
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links dist setuptools
cd .. && rm -rf setuptools-72.2.0`}
      />

      <h2>Ninja</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf ninja-1.12.1.tar.gz && cd ninja-1.12.1
export NINJAJOBS=$(nproc)
sed -i '/int Guess/a \\
  int   j = 0;\\
  char* jobs = getenv( "NINJAJOBS" );\\
  if ( jobs != NULL ) j = atoi( jobs );\\
  if ( j > 0 ) return j;\\
' src/ninja.cc

python3 configure.py --bootstrap
install -vm755 ninja /usr/bin/
install -vDm644 misc/bash-completion /usr/share/bash-completion/completions/ninja
install -vDm644 misc/zsh-completion  /usr/share/zsh/site-functions/_ninja
cd .. && rm -rf ninja-1.12.1`}
      />

      <h2>Meson</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf meson-1.5.1.tar.gz && cd meson-1.5.1
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links dist meson
install -vDm644 data/shell-completions/bash/meson \\
  /usr/share/bash-completion/completions/meson
install -vDm644 data/shell-completions/zsh/_meson \\
  /usr/share/zsh/site-functions/_meson
cd .. && rm -rf meson-1.5.1`}
      />
    </PageContainer>
  );
}
