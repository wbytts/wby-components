import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';


/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx', 
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // core: {
  //   builder: {
  //     name: '@storybook/builder-vite',
  //   },
  // },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {
    },
  },
  docs: {
    defaultName: '组件文档',

  },
};
export default config;
