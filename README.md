# ⚡ WOOHP Gadget

<br />

**Briefing:** criar um compressor de imagens que foque em comprimir o máximo possível **sem perder a qualidade original do componente**.

**Result:** Um otimizador de imagens focado em performance e privacidade. Desenvolvido com **React 19**, **Vite** e **Web Workers**. O **WOOHP Gadget** permite comprimir imagens diretamente no navegador sem enviar dados para servidores externos.

<br />

## ✨ Features

- **Compressão Client-Side**: Todo o processamento é feito no próprio dispositivo usando Web Workers, garantindo privacidade total e sem travar a UI (Multi-threading).
- **Slider de Comparação**: Visualização de diferença de qualidade entre a imagem original e a otimizada em tempo real.
- **Inteligência de Tamanho**: Se a imagem otimizada ficar maior que a original, o app preserva o arquivo original automaticamente (evitando perda de nitidez desnecessária).
- **Interface Futurista**: Design dark mode com estética inspirada em gadgets de espionagem, utilizando Tailwind CSS 4.
- **Suporte a Formatos**: Compatível com PNG, JPG, WebP e GIF (até 15MB).

<br />

## 🚀 Tech stack

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)

- **React 19**: Aproveitando as melhorias de performance e gerenciamento de estados.
- **Vite (Rolldown)**: Build rápido e hot-reload instantâneo.
- **browser-image-compression**: Algoritmos de compressão via Web Worker para não travar a UI.
- **Tailwind CSS 4**: Estilização moderna e otimizada.
- **Lucide React**: Biblioteca de ícones leve e consistente.

<br />

## 🧠 Aprendizados

- **Web Workers**: Entendendo como rodar processos pesados em paralelo para a interface não congelar durante a compressão.
- **Gestão de memória**: Aprendi a limpar as URLs criadas com `revokeObjectURL` para o app não vazar RAM.
- **Performance vs Qualidade**: Ajustei o foco para manter a nitidez (High-Fidelity) em vez de apenas esmagar o tamanho do arquivo.
- **Browser APIs**: Vi que as APIs nativas do navegador (Canvas) são parrudas o suficiente para processar imagens de 15MB sem precisar de backend ou tecnologias mais complexas para esse caso.
