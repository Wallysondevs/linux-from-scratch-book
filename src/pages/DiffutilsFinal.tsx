import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function DiffutilsFinal() {
  return (
    <PageContainer
      title="Diffutils, Gawk, Findutils (final)"
      subtitle="Versões finais dos três pacotes."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Diffutils</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf diffutils-3.10.tar.xz && cd diffutils-3.10
./configure --prefix=/usr
make && make install
cd .. && rm -rf diffutils-3.10`}
      />

      <h2>Gawk</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf gawk-5.3.0.tar.xz && cd gawk-5.3.0
sed -i 's/extras//' Makefile.in
./configure --prefix=/usr
make && make install
ln -sv gawk.1 /usr/share/man/man1/awk.1
mkdir -pv                                   /usr/share/doc/gawk-5.3.0
cp    -v doc/{awkforai.txt,*.{eps,pdf,jpg}} /usr/share/doc/gawk-5.3.0
cd .. && rm -rf gawk-5.3.0`}
      />

      <h2>Findutils</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf findutils-4.10.0.tar.xz && cd findutils-4.10.0
./configure --prefix=/usr --localstatedir=/var/lib/locate
make && make install
cd .. && rm -rf findutils-4.10.0`}
      />
    </PageContainer>
  );
}
