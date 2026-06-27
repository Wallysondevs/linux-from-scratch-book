# 9.4. Gerenciando Dispositivos

## 9.4.1. Lidando com Dispositivos Duplicados

Conforme explicado na Seção 9.3, “Visão Geral do Manuseio de Dispositivos e Módulos,” a ordem em que dispositivos com a mesma função aparecem em /dev é essencialmente aleatória. Por exemplo, se você tiver uma webcam USB e um sintonizador de TV, às vezes /dev/video0 se refere à câmera e /dev/video1 se refere ao sintonizador, e às vezes após uma reinicialização a ordem muda. Para todas as classes de hardware, exceto placas de som e placas de rede, isso é corrigível criando regras udev para criar symlinks persistentes. O caso das placas de rede é abordado separadamente na Seção 9.2, “Configuração Geral de Rede,” e a configuração de placas de som pode ser encontrada no BLFS.

Para cada um dos seus dispositivos que provavelmente terá este problema (mesmo que o problema não exista na sua distribuição Linux atual), encontre o diretório correspondente em /sys/class ou /sys/block. Para dispositivos de vídeo, isso pode ser /sys/class/video4linux/videoX. Descubra os atributos que identificam o dispositivo de forma única (geralmente, IDs de fornecedor e produto e/ou números de série funcionam):

```bash
udevadm info -a -p /sys/class/video4linux/video0
```

Então escreva regras que criem os symlinks, por exemplo:

```bash
cat > /etc/udev/rules.d/83-duplicate_devs.rules << "EOF"

# Persistent symlinks for webcam and tuner
KERNEL=="video*", ATTRS{idProduct}=="1910", ATTRS{idVendor}=="0d81", SYMLINK+="webcam"
KERNEL=="video*", ATTRS{device}=="0x036f",  ATTRS{vendor}=="0x109e", SYMLINK+="tvtuner"

EOF
```

O resultado é que os dispositivos /dev/video0 e /dev/video1 ainda se referem aleatoriamente ao sintonizador e à webcam (e, portanto, nunca devem ser usados diretamente), mas existem symlinks /dev/tvtuner e /dev/webcam que sempre apontam para o dispositivo correto.
