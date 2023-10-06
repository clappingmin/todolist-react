import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './AnimationTest.module.scss';

const AnimationTest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.wrapper}>
      <button onClick={onOpen}>모달 열기</button>
      <Modal isOpen={isOpen} onClose={onClose} variant="withCloseButton">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <button onClick={onClose}>x</button>
          </ModalHeader>
          <ModalBody>야호!</ModalBody>
          <ModalFooter>
            <Button>close</Button>
            <Button>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AnimationTest;
