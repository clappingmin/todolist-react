import { Center, IconButton, Image, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Todo } from '../../shared/interfaces/todo.interface';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  todosAtom,
  setFBTodosAtom,
  updateTodoAtom,
} from '../../store/todo.store';
import { useNavigate } from 'react-router-dom';
import styles from './TodoHomePage.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useInterval } from '../../shared/hooks/useInterval';
import Webtoon from './components/Webtoon';

const TEST_IMAGE_URL =
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80';

const TEST_IMAGE_URL_02 =
  'https://i.namu.wiki/i/FcQCB0D5dM3v3wfcnn5_UTmRE6JRbLzS_xzbWAcLLmSclIwOH7qitaddq3kMnqQTwZuu57RrzG1oGZaB_i9fWA.webp';

function TodoHomePage() {
  const navigate = useNavigate();

  const [readyToRender, setReadyToRender] = useState<boolean>(false);
  const todos = useAtomValue(todosAtom);
  const setTodosFB = useSetAtom(setFBTodosAtom);
  const updateTodos = useSetAtom(updateTodoAtom);

  const imgUrls = [TEST_IMAGE_URL, TEST_IMAGE_URL_02];

  const [recommendedIdx, setRecommendedIdx] = useState<number>(0);

  /**
   * 이미지 슬라이드
   */
  useInterval(() => {
    if (recommendedIdx === imgUrls.length - 1)
      setRecommendedIdx((recommendedIdx) => 0);
    else setRecommendedIdx((recommendedIdx) => recommendedIdx + 1);
  }, 10000);

  useEffect(() => {
    setTodosFB();
    setReadyToRender(true);

    return () => {};
  }, []);

  const checkboxChangeHandler = (target: Todo) => {
    try {
      const updatedTodo = { ...target, isDone: !target.isDone };
      updateTodos(updatedTodo);
    } catch (e) {}
  };

  const goToDetail = (todo: Todo) => {
    navigate(`${todo.id}`);
  };

  return (
    <div className={styles.wrapper}>
      {readyToRender ? (
        <>
          <div className={styles.slideWrapper}>
            <AnimatePresence>
              {imgUrls.map((img, idx) => {
                return (
                  recommendedIdx === idx && (
                    <motion.img
                      key={idx}
                      className={styles.recommendedImage}
                      src={imgUrls[recommendedIdx]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )
                );
              })}
            </AnimatePresence>
            <div className={styles.topContainer}></div>
            {/* <IconButton
            aria-label="search"
            icon={<span className="material-icons">search</span>}
          /> */}
            <div className={styles.bottomContainer}>
              <div className={styles.webtoonInfoContainer}>
                <div>School Stories</div>
                <div className={styles.dot}></div>
                <div>Slice of Life</div>
                <div className={styles.dot}></div>
                <div>99.9M</div>
                <div className={styles.dot}></div>
                <div>99.9M</div>
              </div>
              <div className={styles.slideInfoContainer}>
                <div className={styles.webtoonTitle}>
                  Think you can survive high school?
                </div>
                <div>1/3</div>
              </div>
            </div>
          </div>
          <div className={styles.recentWrapper}>
            <div className={styles.titleWrapper}>
              <div>최근 감상 작품</div>
              <IconButton
                h="24px"
                aria-label="backButton"
                icon={<span className="material-icons">arrow_forward_ios</span>}
              ></IconButton>
            </div>
            <div className={styles.recentWebtoons}>
              {todos.slice(0, 3).map((todo, index) => {
                return <Webtoon key={index} info={todo}></Webtoon>;
              })}
            </div>
          </div>
          <div className={styles.recommendedWrapper}>
            <div className={styles.titleWrapper}>
              <div>Nine님을 위한 추천💘 여기 있어요!</div>
              <IconButton
                h="24px"
                aria-label="backButton"
                icon={<span className="material-icons">arrow_forward_ios</span>}
              ></IconButton>
            </div>
            <div
              className={`${styles.recommendedWebtoons} scroll-display-none`}
            >
              {todos.map((todo, index) => {
                return (
                  <Webtoon key={index} info={todo} type="subscribe"></Webtoon>
                );
              })}
            </div>
          </div>
          <div className={styles.hotTrendWrapper}>
            <div className={styles.titleWrapper}>
              <div>인기 급상승</div>
              <IconButton
                h="24px"
                aria-label="backButton"
                icon={<span className="material-icons">arrow_forward_ios</span>}
              ></IconButton>
            </div>
            <div className={`${styles.hotTrendWetoons} scroll-display-none`}>
              {todos.map((todo, index) => {
                return (
                  <Image
                    key={index}
                    fallbackSrc="https://via.placeholder.com/150"
                    aspectRatio="6/10"
                    borderRadius="4px"
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.rankedWrapper}>
            <div className={styles.titleWrapper}>
              <div>인기 순위</div>
              <IconButton
                h="24px"
                aria-label="backButton"
                icon={<span className="material-icons">arrow_forward_ios</span>}
              ></IconButton>
            </div>
          </div>
        </>
      ) : (
        <Center h="100%">
          <Spinner />
        </Center>
      )}
    </div>
  );
}

export default TodoHomePage;
