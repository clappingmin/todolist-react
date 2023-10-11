import styles from './Webtoon.module.scss';
import { Button, Image } from '@chakra-ui/react';
import { Todo } from '../../../shared/interfaces/todo.interface';

interface WebtoonProps {
  type?: 'normal' | 'subscribe';
  info: Todo;
}

function Webtoon({ type = 'normal', info }: WebtoonProps) {
  return type === 'subscribe' ? (
    <div className={styles.wrapperSubscribe}>
      <Image
        className={styles.webtoonImage}
        fallbackSrc="https://via.placeholder.com/150"
      ></Image>
      <div className={`${styles.toonTitle} text-overflow-1`}>
        {info.todo}dfafdddddddddddddddddddddddddddddddddddddddddd
      </div>
      <Button w="100%" mt="8px">
        Subscribe
      </Button>
    </div>
  ) : (
    <div className={styles.wrapperNormal}>
      <Image
        className={styles.webtoonImage}
        fallbackSrc="https://via.placeholder.com/150"
      ></Image>
      <div className={styles.genre}>Romance</div>
      <div className={`${styles.toonTitle} text-overflow-2`}>
        dafdsfsdfadsfadfsfdafds
      </div>
    </div>
  );
}

export default Webtoon;
