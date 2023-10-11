## definePartsStyle vs defineStyle

- definePartsStyle: Chakra UI 컴포넌트의 특정 부분에 대한 스타일을 정의합니다.
- defineStyle: 일반적인 스타일을 정의하며, 특정 컴포넌트에 종속되지 않습니다.

### definePartsStyle 예시

```javascript
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
});
```

- modal에 종속적인 스타일을 재정의할 때 사용

### defineStyle 예시

```javascript
import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const xl = defineStyle({
  fontSize: 'xl',
  px: '6',
  h: '100',
});
```

- 특정 컴포넌트에 종속적이지 않음 여러 곳에서 사용할 수 있음
