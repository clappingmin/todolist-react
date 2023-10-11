import {extendTheme, type ThemeConfig} from '@chakra-ui/react';
import {modalTheme} from './modal';

import buttonTheme from './button';
import colors from './color';
import {drawerTheme} from './drawer';

// colorMode
export const colorModeConfig: ThemeConfig = {
    initialColorMode: 'light',
    // useSystemColorMode: false,
};

// extendTheme 기본 제공 테마에서 확장 개념
export const theme = extendTheme({
    config: colorModeConfig,
    colors,
    components: {
        Button: buttonTheme,
        Modal: modalTheme,
        Drawer: drawerTheme,
    },
});