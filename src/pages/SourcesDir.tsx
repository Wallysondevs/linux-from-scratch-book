import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SourcesDir() {
  return (
    <PageContainer
      title="O Diretório /sources"
      subtitle="Por que ele fica em /mnt/lfs/sources e como organizar todo o trabalho ali."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Por que <code>$LFS/sources</code>?</h2>
      <ul>
        <li>
          Estará disponível depois do chroot como <code>/sources</code> — ou seja,
          os tarballs podem ser extraídos lá dentro também.
        </li>
        <li>Centraliza tudo num único lugar — fácil de fazer backup.</li>
        <li>Permanece com permissões abertas para o usuário <code>lfs</code> trabalhar.</li>
      </ul>

      <h2>Permissões essenciais</h2>
      <p>
        O bit <code>t</code> (sticky) garante que cada arquivo só pode ser
        apagado pelo dono. <code>a+w</code> permite escrita por todos:
      </p>
      <CodeBlock
        language="bash"
        code={`chmod -v a+wt $LFS/sources

# verificando:
stat -c "%a %n" $LFS/sources
# 1777 /mnt/lfs/sources`}
      />

      <h2>Padrão de extração</h2>
      <p>
        Em todo capítulo, o livro pede que você:
      </p>
      <ol>
        <li>Vá para <code>$LFS/sources</code>.</li>
        <li>Extraia o tarball (<code>tar -xf nome.tar.xz</code>).</li>
        <li>Entre no diretório criado.</li>
        <li>Faça o build.</li>
        <li>Saia para <code>../</code> e <strong>apague</strong> o diretório extraído.</li>
      </ol>

      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

# ... build aqui ...

cd ..
rm -rf bash-5.3`}
      />

      <AlertBox type="info" title="Por que apagar?">
        Mantém <code>/sources</code> limpo e evita confusão com diretórios
        de builds antigas. Se algo der errado, basta extrair de novo (o tarball
        original continua lá).
      </AlertBox>
    </PageContainer>
  );
}
