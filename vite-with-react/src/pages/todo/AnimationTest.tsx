import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input, useColorMode,
    useDisclosure,
} from '@chakra-ui/react';
import styles from './AnimationTest.module.scss';
import {useRef} from 'react';
import Carousel from "./components/Carousel.tsx";

const AnimationTest = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const bottomSheet = useDisclosure();
    const rightSheet = useDisclosure();
    const cancelRef = useRef<any>();


    return (
        <div className={styles.wrapper}>

            <h1>슬라이더</h1>
            <Carousel/>

            <br/>

            <button onClick={onOpen}>모달 열기</button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <button>x</button>
                        </AlertDialogHeader>
                        <AlertDialogBody>알럿</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose}>Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <br/>

            <button onClick={bottomSheet.onOpen}>하단 액션시트 열기</button>
            <Drawer
                isOpen={bottomSheet.isOpen}
                placement="bottom"
                onClose={bottomSheet.onClose}
                variant={'bottom'}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>
                        Create your account
                        <button>X</button>
                    </DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..."/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <br/>
            <button onClick={rightSheet.onOpen}>우측 액션시트 열기</button>
            <Drawer
                isOpen={rightSheet.isOpen}
                placement="right"
                onClose={rightSheet.onClose}
                variant={'right'}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..."/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default AnimationTest;
