# 5.4. Cabeçalhos da API Linux-6.16.1

Os Headers da API do Linux (em linux-6.16.1.tar.xz) expõem a API do kernel para uso pelo Glibc.

## 5.4.1. Instalação dos Headers da API do Linux

O kernel Linux precisa expor uma Interface de Programação de Aplicações (API) para uso pela biblioteca C do sistema (Glibc no LFS). Isso é feito através da sanitização de vários arquivos de cabeçalho C que são fornecidos no tarball do código-fonte do kernel Linux.

Certifique-se de que não há arquivos obsoletos incorporados no package:

```bash
make mrproper
```

Agora extraia os headers do kernel visíveis ao usuário a partir do código-fonte. O make target recomendado “headers_install” não pode ser usado, porque ele requer rsync, que pode não estar disponível. Os headers são primeiro colocados em ./usr, depois copiados para o local necessário.

```bash
make headers
find usr/include -type f ! -name '*.h' -delete
cp -rv usr/include $LFS/usr
```

## 5.4.2. Conteúdo dos Headers da API do Linux

### Descrições Breves

/usr/include/asm/*.h

Os Headers da API do Linux ASM

/usr/include/asm-generic/*.h

Os Headers da API do Linux ASM Genéricos

/usr/include/drm/*.h

Os Headers da API do Linux DRM

/usr/include/linux/*.h

Os Headers da API do Linux Linux

/usr/include/misc/*.h

Os Headers da API do Linux Diversos

/usr/include/mtd/*.h

Os Headers da API do Linux MTD

/usr/include/rdma/*.h

Os Headers da API do Linux RDMA

/usr/include/scsi/*.h

Os Headers da API do Linux SCSI

/usr/include/sound/*.h

Os Headers da API do Linux de Som

/usr/include/video/*.h

Os Headers da API do Linux de Vídeo

/usr/include/xen/*.h

Os Headers da API do Linux Xen
