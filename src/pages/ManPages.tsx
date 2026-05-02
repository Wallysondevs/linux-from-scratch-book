import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ManPages() {
  return (
    <PageContainer
      title="Man-pages, Iana-Etc"
      subtitle="Páginas de manual do Linux e arquivos de protocolos/serviços padrão."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Man-pages</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf man-pages-6.15.tar.xz && cd man-pages-6.15

rm -v man3/crypt*
make prefix=/usr install
cd .. && rm -rf man-pages-6.15`}
      />

      <h2>Iana-Etc</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf iana-etc-20240806.tar.gz && cd iana-etc-20240806

cp services protocols /etc

cd .. && rm -rf iana-etc-20240806`}
      />

      <p className="text-sm text-muted-foreground mt-4">
        <code>/etc/services</code> e <code>/etc/protocols</code> são consultados
        por programas de rede para mapear nomes (HTTP, SSH...) a portas/números.
      </p>
    </PageContainer>
  );
}
