import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Home from "@/pages/Home";

// All chapters lazy-loaded → per-route code splitting.
// Initial bundle ships only Home + shared layout.

// Comece Aqui
const AvisoLegal = lazy(() => import("@/pages/AvisoLegal"));
const OQueELFS = lazy(() => import("@/pages/OQueELFS"));
const ComeceAqui = lazy(() => import("@/pages/ComeceAqui"));
const PreRequisitos = lazy(() => import("@/pages/PreRequisitos"));
const Convencoes = lazy(() => import("@/pages/Convencoes"));
const VersaoLFS = lazy(() => import("@/pages/VersaoLFS"));

// Preparando Hospedeiro
const RequisitosHost = lazy(() => import("@/pages/RequisitosHost"));
const VersionCheck = lazy(() => import("@/pages/VersionCheck"));
const Particionamento = lazy(() => import("@/pages/Particionamento"));
const SistemaArquivos = lazy(() => import("@/pages/SistemaArquivos"));
const MontandoParticao = lazy(() => import("@/pages/MontandoParticao"));
const PacotesPatches = lazy(() => import("@/pages/PacotesPatches"));
const SourcesDir = lazy(() => import("@/pages/SourcesDir"));
const UsuarioLFS = lazy(() => import("@/pages/UsuarioLFS"));
const AmbienteLFS = lazy(() => import("@/pages/AmbienteLFS"));
const SbuTests = lazy(() => import("@/pages/SbuTests"));

// Toolchain
const IntroToolchain = lazy(() => import("@/pages/IntroToolchain"));
const BinutilsPass1 = lazy(() => import("@/pages/BinutilsPass1"));
const GccPass1 = lazy(() => import("@/pages/GccPass1"));
const LinuxHeaders = lazy(() => import("@/pages/LinuxHeaders"));
const GlibcTemp = lazy(() => import("@/pages/GlibcTemp"));
const LibstdcPass1 = lazy(() => import("@/pages/LibstdcPass1"));

// Cross-compiled tools
const M4 = lazy(() => import("@/pages/M4"));
const NcursesTemp = lazy(() => import("@/pages/NcursesTemp"));
const BashTemp = lazy(() => import("@/pages/BashTemp"));
const CoreutilsTemp = lazy(() => import("@/pages/CoreutilsTemp"));
const DiffutilsTemp = lazy(() => import("@/pages/DiffutilsTemp"));
const GrepTemp = lazy(() => import("@/pages/GrepTemp"));
const PatchTemp = lazy(() => import("@/pages/PatchTemp"));
const BinutilsPass2 = lazy(() => import("@/pages/BinutilsPass2"));
const GccPass2 = lazy(() => import("@/pages/GccPass2"));

// Chroot
const ChangingOwnership = lazy(() => import("@/pages/ChangingOwnership"));
const PreparingVfs = lazy(() => import("@/pages/PreparingVfs"));
const EnteringChroot = lazy(() => import("@/pages/EnteringChroot"));
const CreatingDirs = lazy(() => import("@/pages/CreatingDirs"));
const EssentialFiles = lazy(() => import("@/pages/EssentialFiles"));
const GettextBisonPerl = lazy(() => import("@/pages/GettextBisonPerl"));
const CleanupTemp = lazy(() => import("@/pages/CleanupTemp"));

// Sistema Final
const ManPages = lazy(() => import("@/pages/ManPages"));
const GlibcFinal = lazy(() => import("@/pages/GlibcFinal"));
const ZlibBzipXz = lazy(() => import("@/pages/ZlibBzipXz"));
const FileReadline = lazy(() => import("@/pages/FileReadline"));
const FlexTclExpect = lazy(() => import("@/pages/FlexTclExpect"));
const BinutilsFinal = lazy(() => import("@/pages/BinutilsFinal"));
const GmpMpfrMpc = lazy(() => import("@/pages/GmpMpfrMpc"));
const AttrAclLibcap = lazy(() => import("@/pages/AttrAclLibcap"));
const GccFinal = lazy(() => import("@/pages/GccFinal"));
const NcursesFinal = lazy(() => import("@/pages/NcursesFinal"));
const BisonGrepBash = lazy(() => import("@/pages/BisonGrepBash"));
const GdbmGperfExpat = lazy(() => import("@/pages/GdbmGperfExpat"));
const PerlFinal = lazy(() => import("@/pages/PerlFinal"));
const AutoconfAutomake = lazy(() => import("@/pages/AutoconfAutomake"));
const KmodElfutils = lazy(() => import("@/pages/KmodElfutils"));
const PythonFinal = lazy(() => import("@/pages/PythonFinal"));
const CoreutilsFinal = lazy(() => import("@/pages/CoreutilsFinal"));
const DiffutilsFinal = lazy(() => import("@/pages/DiffutilsFinal"));
const GroffGrub = lazy(() => import("@/pages/GroffGrub"));
const GzipIprouteKbd = lazy(() => import("@/pages/GzipIprouteKbd"));
const MakePatchTar = lazy(() => import("@/pages/MakePatchTar"));
const TexinfoVim = lazy(() => import("@/pages/TexinfoVim"));
const MarkupsafeJinja = lazy(() => import("@/pages/MarkupsafeJinja"));
const Systemd = lazy(() => import("@/pages/Systemd"));
const DbusManDb = lazy(() => import("@/pages/DbusManDb"));
const UtilLinuxE2fsprogs = lazy(() => import("@/pages/UtilLinuxE2fsprogs"));
const StripCleanup = lazy(() => import("@/pages/StripCleanup"));

// Configuração
const ConfigRede = lazy(() => import("@/pages/ConfigRede"));
const Bootscripts = lazy(() => import("@/pages/Bootscripts"));
const LocaleConfig = lazy(() => import("@/pages/LocaleConfig"));
const InputrcShells = lazy(() => import("@/pages/InputrcShells"));
const ClockConfig = lazy(() => import("@/pages/ClockConfig"));

// Boot
const Fstab = lazy(() => import("@/pages/Fstab"));
const Kernel = lazy(() => import("@/pages/Kernel"));
const Grub = lazy(() => import("@/pages/Grub"));
const PrimeiroBoot = lazy(() => import("@/pages/PrimeiroBoot"));

// BLFS
const IntroBlfs = lazy(() => import("@/pages/IntroBlfs"));
const PackageManagement = lazy(() => import("@/pages/PackageManagement"));
const Xorg = lazy(() => import("@/pages/Xorg"));
const DesktopEnv = lazy(() => import("@/pages/DesktopEnv"));
const NetworkingBlfs = lazy(() => import("@/pages/NetworkingBlfs"));
const SecurityBlfs = lazy(() => import("@/pages/SecurityBlfs"));

// Apêndices
const ComandosEssenciais = lazy(() => import("@/pages/ComandosEssenciais"));
const Troubleshooting = lazy(() => import("@/pages/Troubleshooting"));
const Referencias = lazy(() => import("@/pages/Referencias"));

const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function ChapterFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-mono text-sm text-muted-foreground flex items-center gap-3">
        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        carregando capítulo…
      </div>
    </div>
  );
}

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
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={<ChapterFallback />}>
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
      </Suspense>
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
