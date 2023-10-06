import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimationTest.module.scss';

const AnimationTest = () => {
  const list = {
    hidden: {
      opacity: 0.8,
    },
    visible: {
      background: 'gold',
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.wrapper}>
      <motion.ul variants={list} initial="hidden" animate="visible">
        <motion.li variants={item}>item1</motion.li>
        <motion.li variants={item}>item2</motion.li>
        <motion.li variants={item}>item3</motion.li>
        <motion.li variants={item}>item4</motion.li>
      </motion.ul>
    </div>
  );
};

export default AnimationTest;
