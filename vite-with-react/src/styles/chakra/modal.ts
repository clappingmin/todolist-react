import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

// alert Modal 기본 사이즈
const xs = defineStyle({
  dialog: {
    w: '300px',
  },
});

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'blackAlpha.200',
  },
  dialog: {
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    color: '#242424',
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
  closeButton: {
    w: '24px',
    h: '24px',
  },
  body: {
    p: '16px',
    minHeight: '80px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: '16px',
    display: 'flex',
    gap: '8px',

    button: {
      w: '100%',
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    xs: xs,
  },
  defaultProps: {
    size: 'xs',
  },
});
