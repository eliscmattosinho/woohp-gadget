# ⚡ WOOHP Gadget

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)

Um otimizador de imagens de interesse pessoal, focado em performance e privacidade. Desenvolvido com **React 19**, **Vite** e **WebAssembly**, o WOOHP Gadget permite comprimir imagens diretamente no navegador sem enviar seus dados para servidores externos.

## ✨ Features

- **Compressão Client-Side**: Todo o processamento é feito no próprio dispositivo usando Web Workers, garantindo privacidade total.
- **Slider de Comparação**: Visualização de diferença de qualidade entre a imagem original e a otimizada em tempo real.
- **Inteligência de Tamanho**: Se a imagem otimizada ficar maior que a original, o app preserva o arquivo original automaticamente (compressão de imagens consideradas muito pequenas para o algoritmo).
- **Interface Futurista**: Design dark mode com estética inspirada em gadgets de espionagem, utilizando Tailwind CSS 4.
- **Suporte a Formatos**: Compatível com PNG, JPG, WebP e GIF (até 15MB).

## 🚀 Tech stack

O projeto utiliza as versões mais recentes do ecossistema front-end:

- **React 19**: Aproveitando as melhorias de performance e gerenciamento de estados.
- **Vite (Rolldown)**: Build rápido e hot-reload instantâneo.
- **browser-image-compression**: Algoritmos de compressão via Web Worker para não travar a UI.
- **Tailwind CSS 4**: Estilização moderna e otimizada.
- **Lucide React**: Biblioteca de ícones leve e consistente.
