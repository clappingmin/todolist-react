import React from "react";
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './Router';
import {ColorModeScript} from "@chakra-ui/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <ColorModeScript initialColorMode="light"/>
        <RouterProvider router={router}/>
    </>
);
