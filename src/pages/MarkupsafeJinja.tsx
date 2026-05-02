import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function MarkupsafeJinja() {
  return (
    <PageContainer
      title="MarkupSafe & Jinja2"
      subtitle="Dependências Python necessárias para o Systemd e algumas ferramentas de build."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>MarkupSafe</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf markupsafe-3.0.2.tar.gz && cd markupsafe-3.0.2
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Markupsafe
cd .. && rm -rf markupsafe-3.0.2`}
      />

      <h2>Jinja2</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf jinja2-3.1.4.tar.gz && cd jinja2-3.1.4
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Jinja2
cd .. && rm -rf jinja2-3.1.4`}
      />
    </PageContainer>
  );
}
