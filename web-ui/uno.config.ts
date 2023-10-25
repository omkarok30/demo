import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno,
  transformerDirectives, transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: [
    { logo: 'w-6em h-6em transform transition-800 hover:rotate-180' },
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     // ...
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
