import { extendTheme } from '@chakra-ui/react';
import { modalTheme } from './modal';

import buttonTheme from './button';
import colors from './color';

// colorMode
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// extendTheme 기본 제공 테마에서 확장 개념
const theme = extendTheme({
  config,
  colors,
  components: {
    Button: buttonTheme,
    Modal: modalTheme,
  },
});

export default theme;
