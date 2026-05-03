import{j as e}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as i}from"./AlertBox-DFdNRTyW.js";import{P as o}from"./PracticeBox-BXFoiNe5.js";function d(){return e.jsxs(r,{title:"Coreutils — Pacote temporário",subtitle:"ls, cp, mv, mkdir, cat, chmod, dd, df... os ~100 utilitários básicos do GNU. Sem eles, nem o ./configure roda.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx("h2",{children:"O que tem dentro?"}),e.jsxs("p",{children:["Coreutils é a coleção de comandos POSIX essenciais do GNU: manipulação de arquivos (",e.jsx("code",{children:"cp, mv, ln, rm, install"}),"), texto (",e.jsx("code",{children:"cat, head, tail, sort, uniq, wc, cut, tr"}),"), shell (",e.jsx("code",{children:"echo, printf, test, true, false, env, sleep"}),"), sistema (",e.jsx("code",{children:"id, who, whoami, uname, date, df, du"}),") e numerais (",e.jsx("code",{children:"seq, factor, expr"}),"). Aqui montamos a versão temporária para que o resto do build tenha esses binários disponíveis."]}),e.jsxs(i,{type:"info",title:"Coreutils ≠ BusyBox",children:["BusyBox é uma reimplementação minimalista (1 binário, ~1 MB). Coreutils é a referência GNU completa (~100 binários, ~7 MB), compatível com tudo que ",e.jsx("code",{children:"autoconf"})," espera. LFS usa Coreutils para máxima compatibilidade."]}),e.jsx("h2",{children:"Build"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf coreutils-9.7.tar.xz
cd coreutils-9.7

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --enable-install-program=hostname \\
            --enable-no-install-program=kill,uptime

make
make DESTDIR=$LFS install

# Mover hostname para o lugar correto
mv -v $LFS/usr/bin/chroot              $LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                    $LFS/usr/share/man/man8/chroot.8

cd $LFS/sources
rm -rf coreutils-9.7`}),e.jsx("h2",{children:"Anatomia das flags"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"--enable-install-program=hostname"})," — instala ",e.jsx("code",{children:"hostname"})," (que é parte de ",e.jsx("code",{children:"inetutils"})," tradicionalmente, mas o LFS prefere a versão GNU)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--enable-no-install-program=kill,uptime"})," — não instala ",e.jsx("code",{children:"kill"})," (vem do ",e.jsx("code",{children:"util-linux"}),") nem ",e.jsx("code",{children:"uptime"})," (vem do ",e.jsx("code",{children:"procps-ng"}),"). Evita conflitos no install final."]}),e.jsxs("li",{children:[e.jsx("code",{children:"mv chroot ... /usr/sbin"})," — chroot é comando administrativo; LFS o coloca em ",e.jsx("code",{children:"/sbin"}),". Idem para a página de manual: seção 1 → 8."]})]}),e.jsx("h2",{children:"Casos práticos"}),e.jsx(s,{language:"bash",code:`# Listar quantos binários foram instalados:
ls $LFS/usr/bin/ | wc -l

# Confirmar versão:
$LFS/usr/bin/ls --version | head -1
# ls (GNU coreutils) 9.7

# Verificar que kill e uptime NÃO foram instalados:
ls $LFS/usr/bin/{kill,uptime} 2>/dev/null
# (saída vazia)

# Conferir o move do chroot:
ls -l $LFS/usr/sbin/chroot
ls -l $LFS/usr/share/man/man8/chroot.8`}),e.jsx(o,{title:"Validar Coreutils cross-compilado",children:e.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:"file $LFS/usr/bin/ls"})," mostra ",e.jsx("code",{children:"x86-64"})," e dynamically linked."]}),e.jsxs("li",{children:[e.jsx("code",{children:"$LFS_TGT-readelf -d $LFS/usr/bin/ls | grep NEEDED"})," deve listar apenas ",e.jsx("code",{children:"libc.so.6"})," (e talvez ",e.jsx("code",{children:"libpcre2"}),", ",e.jsx("code",{children:"libacl"}),", ",e.jsx("code",{children:"libattr"})," se já instaladas)."]}),e.jsxs("li",{children:["Conte 100+ executáveis: ",e.jsx("code",{children:"ls $LFS/usr/bin/ | wc -l"})," >= 100."]})]})}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs(i,{type:"warning",title:"Pular o move do chroot",children:["Se você não mover ",e.jsx("code",{children:"chroot"})," para ",e.jsx("code",{children:"/usr/sbin"}),", scripts de manutenção do sistema final falham porque",e.jsx("code",{children:" /usr/sbin"})," está no PATH do root mas",e.jsx("code",{children:" /usr/bin"})," talvez não esteja em scripts cron."]}),e.jsxs(i,{type:"danger",title:"Esquecer --enable-no-install-program",children:["Sem essa flag, o Coreutils instala ",e.jsx("code",{children:"kill"})," e",e.jsx("code",{children:" uptime"})," em ",e.jsx("code",{children:"/usr/bin"}),". Quando",e.jsx("code",{children:" util-linux"})," e ",e.jsx("code",{children:"procps"})," tentarem instalar suas próprias versões depois, eles sobrescrevem — mas as páginas de manual ficam com referências cruzadas erradas e o sistema fica inconsistente."]}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(s,{language:"bash",code:`# Tempo: ~0.6 SBU
# Tarball: coreutils-9.7.tar.xz (~6 MB)
# Pós-install obrigatório: mv chroot → /usr/sbin
# Validação: count em /usr/bin >= 100, ls --version OK
# Conflitos evitados: kill (util-linux), uptime (procps-ng)`})]})}export{d as default};
