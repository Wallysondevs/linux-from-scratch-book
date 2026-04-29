import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SbuTests() {
  return (
    <PageContainer
      title="SBU e Test Suites"
      subtitle="Como o livro mede tempo e por que algumas suítes de teste vão falhar — e tudo bem."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>O que é um SBU?</h2>
      <p>
        SBU = <strong>Standard Build Unit</strong>. É o tempo que <em>sua máquina
        leva para construir o Binutils Pass 1</em>. O livro usa esse número como
        unidade para estimar todo o resto:
      </p>
      <ul>
        <li><strong>Binutils Pass 1</strong> = 1 SBU (referência)</li>
        <li><strong>GCC Pass 1</strong> ≈ 4 a 5 SBU</li>
        <li><strong>Glibc</strong> ≈ 4 SBU</li>
        <li><strong>GCC Final</strong> ≈ 12 SBU</li>
      </ul>

      <h2>Como medir o seu SBU</h2>
      <p>
        Quando construir o Binutils Pass 1, prefixe o <code>make</code> com{" "}
        <code>time</code>:
      </p>
      <pre className="bg-card p-4 rounded-md overflow-x-auto text-sm font-mono">
{`time make`}
      </pre>
      <p>
        O número de "real" minutos é o seu SBU. Use-o para projetar quanto
        tempo de máquina o resto vai consumir.
      </p>

      <h2>Test suites</h2>
      <p>
        Vários pacotes (Glibc, GCC, Coreutils) têm suítes de teste que rodam
        com <code>make check</code> ou <code>make -k check</code>. Em muitos
        casos, alguns testes vão falhar — isso é <strong>normal</strong> em
        ambientes minimalistas.
      </p>

      <AlertBox type="warning" title="Quais falhas se preocupar?">
        Apenas falhas em testes <strong>marcados como críticos pelo livro</strong>{" "}
        merecem atenção. Falhas isoladas em GCC/Glibc geralmente são causadas
        pelo ambiente reduzido e não comprometem o sistema.
      </AlertBox>

      <h2>Pulando test suites</h2>
      <p>
        Se quiser economizar muito tempo, pule os <code>make check</code> da
        toolchain temporária — o livro até sugere isso. Para o sistema final,
        rode pelo menos os de Glibc e GCC.
      </p>

      <AlertBox type="info" title="Iniciante? Pule por ora">
        Em sua primeira leitura, foque em terminar o livro. Falhas de teste
        não impedem o LFS de bootar. Numa segunda passada, você pode rodar
        tudo e investigar.
      </AlertBox>
    </PageContainer>
  );
}
