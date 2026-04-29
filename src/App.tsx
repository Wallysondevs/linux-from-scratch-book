import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import Home from "@/pages/Home";
import AvisoLegal from "@/pages/AvisoLegal";
import OQueELFS from "@/pages/OQueELFS";
import ComeceAqui from "@/pages/ComeceAqui";
import PreRequisitos from "@/pages/PreRequisitos";
import Convencoes from "@/pages/Convencoes";
import VersaoLFS from "@/pages/VersaoLFS";

import RequisitosHost from "@/pages/RequisitosHost";
import VersionCheck from "@/pages/VersionCheck";
import Particionamento from "@/pages/Particionamento";
import SistemaArquivos from "@/pages/SistemaArquivos";
import MontandoParticao from "@/pages/MontandoParticao";
import PacotesPatches from "@/pages/PacotesPatches";
import SourcesDir from "@/pages/SourcesDir";
import UsuarioLFS from "@/pages/UsuarioLFS";
import AmbienteLFS from "@/pages/AmbienteLFS";
import SbuTests from "@/pages/SbuTests";

import IntroToolchain from "@/pages/IntroToolchain";
import BinutilsPass1 from "@/pages/BinutilsPass1";
import GccPass1 from "@/pages/GccPass1";
import LinuxHeaders from "@/pages/LinuxHeaders";
import GlibcTemp from "@/pages/GlibcTemp";
import LibstdcPass1 from "@/pages/LibstdcPass1";

import M4 from "@/pages/M4";
import NcursesTemp from "@/pages/NcursesTemp";
import BashTemp from "@/pages/BashTemp";
import CoreutilsTemp from "@/pages/CoreutilsTemp";
import DiffutilsTemp from "@/pages/DiffutilsTemp";
import GrepTemp from "@/pages/GrepTemp";
import PatchTemp from "@/pages/PatchTemp";
import BinutilsPass2 from "@/pages/BinutilsPass2";
import GccPass2 from "@/pages/GccPass2";

import ChangingOwnership from "@/pages/ChangingOwnership";
import PreparingVfs from "@/pages/PreparingVfs";
import EnteringChroot from "@/pages/EnteringChroot";
import CreatingDirs from "@/pages/CreatingDirs";
import EssentialFiles from "@/pages/EssentialFiles";
import GettextBisonPerl from "@/pages/GettextBisonPerl";
import CleanupTemp from "@/pages/CleanupTemp";

import ManPages from "@/pages/ManPages";
import GlibcFinal from "@/pages/GlibcFinal";
import ZlibBzipXz from "@/pages/ZlibBzipXz";
import FileReadline from "@/pages/FileReadline";
import FlexTclExpect from "@/pages/FlexTclExpect";
import BinutilsFinal from "@/pages/BinutilsFinal";
import GmpMpfrMpc from "@/pages/GmpMpfrMpc";
import AttrAclLibcap from "@/pages/AttrAclLibcap";
import GccFinal from "@/pages/GccFinal";
import NcursesFinal from "@/pages/NcursesFinal";
import BisonGrepBash from "@/pages/BisonGrepBash";
import GdbmGperfExpat from "@/pages/GdbmGperfExpat";
import PerlFinal from "@/pages/PerlFinal";
import AutoconfAutomake from "@/pages/AutoconfAutomake";
import KmodElfutils from "@/pages/KmodElfutils";
import PythonFinal from "@/pages/PythonFinal";
import CoreutilsFinal from "@/pages/CoreutilsFinal";
import DiffutilsFinal from "@/pages/DiffutilsFinal";
import GroffGrub from "@/pages/GroffGrub";
import GzipIprouteKbd from "@/pages/GzipIprouteKbd";
import MakePatchTar from "@/pages/MakePatchTar";
import TexinfoVim from "@/pages/TexinfoVim";
import MarkupsafeJinja from "@/pages/MarkupsafeJinja";
import Systemd from "@/pages/Systemd";
import DbusManDb from "@/pages/DbusManDb";
import UtilLinuxE2fsprogs from "@/pages/UtilLinuxE2fsprogs";
import StripCleanup from "@/pages/StripCleanup";

import ConfigRede from "@/pages/ConfigRede";
import Bootscripts from "@/pages/Bootscripts";
import LocaleConfig from "@/pages/LocaleConfig";
import InputrcShells from "@/pages/InputrcShells";
import ClockConfig from "@/pages/ClockConfig";

import Fstab from "@/pages/Fstab";
import Kernel from "@/pages/Kernel";
import Grub from "@/pages/Grub";
import PrimeiroBoot from "@/pages/PrimeiroBoot";

import IntroBlfs from "@/pages/IntroBlfs";
import PackageManagement from "@/pages/PackageManagement";
import Xorg from "@/pages/Xorg";
import DesktopEnv from "@/pages/DesktopEnv";
import NetworkingBlfs from "@/pages/NetworkingBlfs";
import SecurityBlfs from "@/pages/SecurityBlfs";

import ComandosEssenciais from "@/pages/ComandosEssenciais";
import Troubleshooting from "@/pages/Troubleshooting";
import Referencias from "@/pages/Referencias";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [location] = useHashLocation();
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/aviso-legal" component={AvisoLegal} />
        <Route path="/o-que-e-lfs" component={OQueELFS} />
        <Route path="/comece-aqui" component={ComeceAqui} />
        <Route path="/pre-requisitos" component={PreRequisitos} />
        <Route path="/convencoes" component={Convencoes} />
        <Route path="/versao-lfs" component={VersaoLFS} />

        <Route path="/requisitos-host" component={RequisitosHost} />
        <Route path="/version-check" component={VersionCheck} />
        <Route path="/particionamento" component={Particionamento} />
        <Route path="/sistema-arquivos" component={SistemaArquivos} />
        <Route path="/montando-particao" component={MontandoParticao} />
        <Route path="/pacotes-patches" component={PacotesPatches} />
        <Route path="/sources-dir" component={SourcesDir} />
        <Route path="/usuario-lfs" component={UsuarioLFS} />
        <Route path="/ambiente-lfs" component={AmbienteLFS} />
        <Route path="/sbu-tests" component={SbuTests} />

        <Route path="/intro-toolchain" component={IntroToolchain} />
        <Route path="/binutils-pass1" component={BinutilsPass1} />
        <Route path="/gcc-pass1" component={GccPass1} />
        <Route path="/linux-headers" component={LinuxHeaders} />
        <Route path="/glibc-temp" component={GlibcTemp} />
        <Route path="/libstdc-pass1" component={LibstdcPass1} />

        <Route path="/m4" component={M4} />
        <Route path="/ncurses-temp" component={NcursesTemp} />
        <Route path="/bash-temp" component={BashTemp} />
        <Route path="/coreutils-temp" component={CoreutilsTemp} />
        <Route path="/diffutils-temp" component={DiffutilsTemp} />
        <Route path="/grep-temp" component={GrepTemp} />
        <Route path="/patch-temp" component={PatchTemp} />
        <Route path="/binutils-pass2" component={BinutilsPass2} />
        <Route path="/gcc-pass2" component={GccPass2} />

        <Route path="/changing-ownership" component={ChangingOwnership} />
        <Route path="/preparing-vfs" component={PreparingVfs} />
        <Route path="/entering-chroot" component={EnteringChroot} />
        <Route path="/creating-dirs" component={CreatingDirs} />
        <Route path="/essential-files" component={EssentialFiles} />
        <Route path="/gettext-bison-perl" component={GettextBisonPerl} />
        <Route path="/cleanup-temp" component={CleanupTemp} />

        <Route path="/man-pages" component={ManPages} />
        <Route path="/glibc-final" component={GlibcFinal} />
        <Route path="/zlib-bzip-xz" component={ZlibBzipXz} />
        <Route path="/file-readline" component={FileReadline} />
        <Route path="/flex-tcl-expect" component={FlexTclExpect} />
        <Route path="/binutils-final" component={BinutilsFinal} />
        <Route path="/gmp-mpfr-mpc" component={GmpMpfrMpc} />
        <Route path="/attr-acl-libcap" component={AttrAclLibcap} />
        <Route path="/gcc-final" component={GccFinal} />
        <Route path="/ncurses-final" component={NcursesFinal} />
        <Route path="/bison-grep-bash" component={BisonGrepBash} />
        <Route path="/gdbm-gperf-expat" component={GdbmGperfExpat} />
        <Route path="/perl-final" component={PerlFinal} />
        <Route path="/autoconf-automake" component={AutoconfAutomake} />
        <Route path="/kmod-elfutils" component={KmodElfutils} />
        <Route path="/python-final" component={PythonFinal} />
        <Route path="/coreutils-final" component={CoreutilsFinal} />
        <Route path="/diffutils-final" component={DiffutilsFinal} />
        <Route path="/groff-grub" component={GroffGrub} />
        <Route path="/gzip-iproute-kbd" component={GzipIprouteKbd} />
        <Route path="/make-patch-tar" component={MakePatchTar} />
        <Route path="/texinfo-vim" component={TexinfoVim} />
        <Route path="/markupsafe-jinja" component={MarkupsafeJinja} />
        <Route path="/systemd" component={Systemd} />
        <Route path="/dbus-mandb" component={DbusManDb} />
        <Route path="/util-linux-e2fsprogs" component={UtilLinuxE2fsprogs} />
        <Route path="/strip-cleanup" component={StripCleanup} />

        <Route path="/config-rede" component={ConfigRede} />
        <Route path="/bootscripts" component={Bootscripts} />
        <Route path="/locale-config" component={LocaleConfig} />
        <Route path="/inputrc-shells" component={InputrcShells} />
        <Route path="/clock-config" component={ClockConfig} />

        <Route path="/fstab" component={Fstab} />
        <Route path="/kernel" component={Kernel} />
        <Route path="/grub" component={Grub} />
        <Route path="/primeiro-boot" component={PrimeiroBoot} />

        <Route path="/intro-blfs" component={IntroBlfs} />
        <Route path="/package-management" component={PackageManagement} />
        <Route path="/xorg" component={Xorg} />
        <Route path="/desktop-env" component={DesktopEnv} />
        <Route path="/networking-blfs" component={NetworkingBlfs} />
        <Route path="/security-blfs" component={SecurityBlfs} />

        <Route path="/comandos-essenciais" component={ComandosEssenciais} />
        <Route path="/troubleshooting" component={Troubleshooting} />
        <Route path="/referencias" component={Referencias} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
