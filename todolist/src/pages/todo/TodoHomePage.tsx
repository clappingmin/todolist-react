import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase/firebase';

function TodoHomePage() {
  const testFireBase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'cities'), {
        name: 'Tokyo',
        country: 'Japan',
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <h1>투두 홈화면</h1>
      <button
        onClick={() => {
          testFireBase();
        }}
      >
        파이어베이스 테스트
      </button>
    </>
  );
}

export default TodoHomePage;
