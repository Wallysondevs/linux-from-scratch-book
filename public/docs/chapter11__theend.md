# 11.1. O Fim

Muito bem! O novo sistema LFS está instalado! Desejamos-lhe muito sucesso com o seu novo e brilhante sistema Linux construído sob medida.

Pode ser uma boa ideia criar um arquivo /etc/lfs-release. Ao ter este arquivo, é muito fácil para você (e para nós, caso precise pedir ajuda em algum momento) descobrir qual versão do LFS está instalada no sistema. Crie este arquivo executando:

```bash
echo 12.4-systemd > /etc/lfs-release
```

Dois arquivos descrevendo o sistema instalado podem ser usados por pacotes que podem ser instalados no sistema posteriormente, seja em formato binário ou construindo-os.

O primeiro mostra o status do seu novo sistema em relação à Linux Standards Base (LSB). Para criar este arquivo, execute:

```bash
cat > /etc/lsb-release << "EOF"
DISTRIB_ID="Linux From Scratch"
DISTRIB_RELEASE="12.4-systemd"
DISTRIB_CODENAME="<your name here>"
DISTRIB_DESCRIPTION="Linux From Scratch"
EOF
```

O segundo contém aproximadamente as mesmas informações, e é usado pelo systemd e por alguns ambientes de desktop gráficos. Para criar este arquivo, execute:

```bash
cat > /etc/os-release << "EOF"
NAME="Linux From Scratch"
VERSION="12.4-systemd"
ID=lfs
PRETTY_NAME="Linux From Scratch 12.4-systemd"
VERSION_CODENAME="<your name here>"
HOME_URL="https://www.linuxfromscratch.org/lfs/"
RELEASE_TYPE="stable"
EOF
```

Certifique-se de personalizar os campos 'DISTRIB_CODENAME' e 'VERSION_CODENAME' para tornar o sistema exclusivamente seu.
