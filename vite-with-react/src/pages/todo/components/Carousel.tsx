import {motion, AnimatePresence, useReducedMotion} from "framer-motion";
import styles from './Carousel.module.scss'
import {useEffect, useState} from "react";
import {wrap} from "popmotion";
import {useInterval} from "../../../shared/hooks/useInterval.ts";

export const images = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
];

// initial과 animate를 정리해놓은 객체
const variants = {
    entry: {
        opacity: 0,
    },
    center: {
        opacity: 1,
        transition: {duration: 0.5}
    },
    exit: {
        opacity: 0,
        transition: {duration: 0.5}
    }
};

export default function Carousel() {
    //박스마다 이미지 적용
    const [visible, setVisible] = useState(0);

    //next 버튼
    const nextPlease = () => {
        setVisible((prev) => prev === images.length - 1 ? 0 : prev + 1);
    };

    //prev 버튼
    const prevPlease = () => {
        setVisible((prev) => prev === 0 ? images.length - 1 : prev - 1);
    };

    useInterval(() => {
        nextPlease();
    }, 2000);

    const testDebounce = () => {
        console.log('야호!!')
    }

    return <div className={styles.wrapper}>
        <div style={{display: "flex", gap: "8px", marginTop: "16px"}}>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button>
            <button onClick={testDebounce}>멈춰!</button>
        </div>

        <AnimatePresence>
            <motion.img
                variants={variants}
                src={images[visible]}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
            ></motion.img>
        </AnimatePresence>
    </div>;
}