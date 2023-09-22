import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './styles/chakra/global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    {/* todo: colorMode가 지정이 안된다 ㅠㅠ */}
    <ColorModeScript initialColorMode="dark" />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
