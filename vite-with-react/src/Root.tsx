import styles from './Root.module.scss';
import {Outlet} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import './styles/global.scss';
import {theme} from "./styles/chakra/global.ts";
import {ChakraProvider} from '@chakra-ui/react';

function Root() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    return (
        <ChakraProvider theme={theme}>
            {/*chakraProvider를 추가하니 colorMode가 강제로 light에서 dark로 계속 바뀜*/}
            <div className={styles.wrapper}>
                <div className={styles.phone}>
                    <div className={styles.container}>
                        <Outlet/>
                    </div>
                    <NavigationBar/>
                </div>
            </div>
        </ChakraProvider>

    );
}

export default Root;
