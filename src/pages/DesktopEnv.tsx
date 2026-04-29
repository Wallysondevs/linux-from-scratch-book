import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function DesktopEnv() {
  return (
    <PageContainer
      title="Ambientes Desktop"
      subtitle="GNOME, KDE Plasma, Xfce, LXQt — qual escolher e o que esperar."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Comparativo rápido</h2>
      <ul>
        <li>
          <strong>Xfce</strong> — leve, rápido, pouca dependência. Ideal para o
          primeiro DE no LFS. ~50 pacotes adicionais.
        </li>
        <li>
          <strong>LXQt</strong> — também leve, baseado em Qt. ~60 pacotes.
        </li>
        <li>
          <strong>KDE Plasma</strong> — completo, lindo, recursos completos.
          Centenas de pacotes (Qt, Frameworks, Plasma). Build longa.
        </li>
        <li>
          <strong>GNOME</strong> — muito completo. Cuidado: depende de toda a
          stack GLib/GObject/Gjs/Vala. Build extensa, mas vale para quem usa o
          GNOME no dia a dia.
        </li>
        <li>
          <strong>WMs minimalistas</strong> — i3, dwm, openbox: leves e ótimos
          para ambientes "gamers" da terminal.
        </li>
      </ul>

      <h2>Recomendação</h2>
      <p>
        Para sua primeira incursão em ambientes gráficos no LFS, escolha{" "}
        <strong>Xfce</strong> ou <strong>i3</strong>. São rápidos de instalar,
        funcionais e revelam pouco do "submundo" desktop. Quando se sentir à
        vontade, escale para Plasma ou GNOME.
      </p>

      <AlertBox type="info" title="Display Manager (login gráfico)">
        SDDM (default Plasma), GDM (GNOME), LightDM (Xfce/LXQt) — cada um tem
        seu capítulo no BLFS. Você pode também rodar <code>startx</code> de
        TTY pura, sem display manager.
      </AlertBox>
    </PageContainer>
  );
}
