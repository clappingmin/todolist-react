import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const bottom = definePartsStyle({
  dialog: {
    borderRadius: 'md',
    mb: '20px',
    mx: '16px',
    w: 'calc(100% - 32px)',
    backgroundColor: '#FFF',
  },
  header: {
    px: '16px',
    pt: '16px',
    pb: '0px',
    display: 'flex',
    justifyContent: 'end',

    button: {
      w: '24px',
      h: '24px',
    },
  },
  // closeButton:
});

const right = definePartsStyle({
  dialog: {
    maxWidth: '300px',
    width: '100%',
    backgroundColor: 'skyblue',
  },
});

// variant={'bottom'} 추가해서 사용하기
export const drawerTheme = defineMultiStyleConfig({
  variants: { bottom, right },
  defaultProps: {
    variant: 'right',
  },
});
