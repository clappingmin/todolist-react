import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { defineStyle } from '@chakra-ui/react';

// 스타일 생성
const xl = defineStyle({
  fontSize: 'xl',
  px: '6',
  h: '100',
});

// defineStyleConfig을 사용하면 기본 스타일에 완전히 덮어쓴다 (주의!)
const buttonTheme = {
  // default style
  baseStyle: {
    fontWeight: '900',
  },

  // 새로운 커스텀 사이즈 추가
  sizes: {},

  // 추가적인 style 지정 가능
  // 여기 있는 애들 하단이나 상단에 defineStyle로 작성해서 사용하는 것이 좋아보임
  variants: {
    'with-shadow': {
      boxShadow: '0 0 2px 2px #efdfde',
    },
    // colorMode props 같은 걸로 정할 수도 있음
    solid: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'teal.300' : 'brand.500',
      fontWeight: 100,
      _hover: { bg: 'red.500' },
      _active: { bg: 'teal.500' },
      _focus: { bg: 'gray:500' },
    }),
    xl,
  },
  // 기본 props 설정
  defaultProps: {
    size: 'sm', // default is md
    variant: 'solid', // default is solid
  },
};

export default buttonTheme;
