# 1. start

```javascript
<motion.div
  className={styles.box}
  initial={{ scale: 0 }}
  animate={{ scale: 1, rotateZ: 360 }}
/>
```

- 객체 형태로 animation을 넣어준다.

---

# 2. animation

## Transition

```javascript
<motion.div
  className={styles.box}
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: ,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  }}
/>
```

- transition으로 원하는 애니메이션 적용 가능

---

### Enter animation

- 적용된 스타일이 initial에 적용된 값과 다르면 animate 속성에 적용된 값으로 자동으로 애니메이션을 적용해준다.
- 예시

```css
.box {
  background-color: red;
  width: 100px;
  height: 100px;
}
```

```javascript
<motion.div
  className={styles.box}
  initial={{ opacity: 0, scale: 0.5, backgroundColor: 'blue' }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  }}
/>
```

- 스타일에는 background-color가 red로 적용되어 있는데 initial에는 blue로 적용되어 있음
- 이런 경우 initial의 색상이 적용되서 애니메이션이 적용됨
- 만약 initial의 적용을 원하지 않을 경우 값을 false로 적용하자

---

### exit

- 컴포넌트가 없어질 때 즉시 사라지기 때문에 animation을 적용하기 어렵다.
- AnimatePresence를 사용하면 사라지는 animation을 완료 후 Dom을 제거한다.

```javascript
const AnimationTest = () => {
  const [isVisible, setIsVisible] = useState < boolean > false;

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setIsVisible(!isVisible)}>Change Visible</button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.box}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

### KeyFrames

- animate의 값을 배열로 넣어주면 차례대로 적용된다.
- repeat에 Infinity를 넣어주면 애니메이션이 계속 반복한다.
- repeatDelay는 애니메이션이 재실행할 때 delay할 시간(s)
- ease는 애니메이션 적용 스타일 ('ease', 'easeOut', 'easeInOut')
- 배열로 애니메이션을 넘기면 알아서 균등하게 적용되는데 정확한 타이밍을 지정하고 싶으면 transition.times를 배열로 넣어준다.

```javascript
<motion.div
  className={styles.box}
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  }}
  transition={{
    duration: 2,
    ease: 'easeOut',
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1,
  }}
/>
```

---

### Gsture

- hover(마우스 올리기), tap(클릭), drag, focus, inView(화면에 보일 때)
- 제스쳐가 시작될 때의 애니메이션 지정 가능
- drag의 경우 속성 `drag`를 추가해야 가능 (아래에 추가 예정)
- focus의 경우 input 같은 요소를 클릭한 상태의 애니메이션

```javascript
<motion.div
  className={styles.box}
  drag
  whileInView={{
    opacity: 0.5,
    rotate: [0, 360],
    transition: { delay: 1 },
  }}
  whileHover={{
    scale: 2,
  }}
  whileDrag={{
    opacity: 1,
    borderRadius: ['0%', '50%'],
    transition: { delay: 0 },
  }}
  whileTap={{
    background: 'blue',
  }}
></motion.div>
```

---

### Variants(변형)

- 미리 정의한 애니메이션 세트
- DOM 전체에 파생되는 애니메이션이나, 차례로 이뤄지는 애니메이션을 설정하고 싶을 때 사용
- 객체에 정의한 애니메이션을 variants에 넣어주고 객체의 키 값을 넣어서 사용하면 된다.

```javascript
const variants: any = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1 },
  transition: {
    duration: 2,
  },
};

return (
  <div className={styles.wrapper}>
    <motion.div
      className={styles.box}
      initial="hidden"
      animate="visible"
      variants={variants}
    ></motion.div>
    <motion.button initial="hidden" animate="visible" variants={variants}>
      야호
    </motion.button>
  </div>
);
```

---

### Propagation (전파)

- 만약 motion 컴포넌트에게 자식 컴포넌트가 있는 경우 자식 컴포넌트가 자체 animate를 정의하기 전이라면 부모의 variants 변화를 상속한다.

```javascript
const variants: any = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1 },
  transition: {
    duration: 2,
  },
};

const childVariants: any = {
  hidden: {
    borderRadius: '20%',
  },
  visible: { borderRadius: '50%' },
  scale: { scaleX: 2 },
};

<motion.div
  className={styles.box}
  initial="hidden"
  animate="visible"
  variants={variants}
>
  <motion.div
    className={styles.child}
    variants={childVariants}
    animate="scale" // child에서 정의
  ></motion.div>
  <motion.div
    className={styles.child}
    variants={childVariants}
    // child에서 따로 정의하지 않아서 부모에서 정의한 initial, animate르 상속받음
  ></motion.div>
</motion.div>;
```

- child에서 initial, animate를 따로 정의하지 않으면 부모에서 정의한 `initial="hidden" animate="visible"` 가 상속됨

---

### Orchestration

- delayChildren: 하위 요소의 animation delay 시간을 지정할 수 있다.
- staggerChildren: 하위 요소들의 애니메이션 시차를 지정할 수 있다.
- ex) staggerChildren : 0.2 -> 첫번째 자식 요소 애니메이션 수행 후 0.2초 후 두번째 요소 수행, 두번째 요소 수행 후 0.2초 후 세번째 요소 수행
- staggerDirection: 1 | -1 : 1은 정방향, -1은 역방향 실행
- when: false | 'afterChildren' | 'beforeChildren' 부모 요소 애니메이션 실행 순간
- repeat: Infinity 애니메이션 무한 반복 없을 경우 repeatType으로 적용됨
- repeatType: loop | reverse| mirror : mirror은 from to 교대로 실행
- repeatDelay: 반복 지연 시간

```javascript
const list = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      // child가 순서대로 나올 수 있게 해주는 속성
      staggerChildren: 0.2,
      // child delay 주기
      delayChildren: 3,
      // 자식 애니메이션 수행 순서 역방향
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
```

---

### Dynamic Variants

- variants 안에 함수로 작성해서 custom으로 넘긴 변수를 받아서 적용할 수 있다.

```javascript
const [list, setList] = useState(['❤️', '🧡', '💛', '💚']);

const parentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const variants: any = {
  hidden: {
    opacity: 0.5,
    y: 15,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: i * 0.1,
    },
  }),
};

return (
  <div className={styles.wrapper}>
    <motion.ul variants={parentVariants} initial="hidden" animate="visible">
      {list.map((item, i) => {
        return (
          <motion.li key={i} variants={variants} custom={i}>
            {item}
          </motion.li>
        );
      })}
    </motion.ul>
  </div>
);
```

---

### Manual Controls

- ui를 벗어나서 좀더 복잡한 애니메이션을 적용하고 싶을 때 `useAnimationControls`를 사용한다.

```javascript
const [show, setShow] = useState(false);
const controls = useAnimationControls();

useEffect(() => {
  if (show) controls.start({ scale: 2, background: 'pink' });
  else controls.start({ scale: 1, background: 'orange' });
}, [show]);

return (
  <div className={styles.wrapper}>
    <motion.h1 animate={controls}>{show ? 'WOW!' : '...'}</motion.h1>
    <button
      onClick={() => {
        setShow(!show);
      }}
    >
      setShow
    </button>
  </div>
);
```
