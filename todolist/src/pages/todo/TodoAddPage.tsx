import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../../shared/interfaces/todo.interface';
import { addTodo } from '../../service/firebase';

function TodoAddPage() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [memo, setMemo] = useState<string>('');
  const [isRepeated, setIsRepeated] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const changeIsReapeated = (event: any) => {
    setIsRepeated(event.target.checked);
  };

  const tagSubmitHanlder = (event: any) => {
    const newTag = { name: tag };
    setTag('');

    if (tags.find((tag) => tag.name === newTag.name)) {
      return;
    }

    setTags([...tags, newTag]);
  };

  const addTag = () => {
    // todo : todo가 비어있을 경우 막기
    const newTodo = { todo, memo, isRepeated, startDate, endDate };
    addTodo(newTodo)
      .then((isSuccess) => {
        if (isSuccess) {
          navigate('/todo');
          return;
        }

        // todo : 투두 추가 실패 알럿 띄우기
      })
      .catch((e) => {
        // todo : 투두 추가 실패 알럿 띄우기
        console.log(e);
      });
  };

  const cancelHandler = () => {
    // todo : 홈화면으로 돌아갈지 알럿 띄우기
    navigate('/todo');
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>Todo</FormLabel>
        <Input
          type="text"
          placeholder="Todo"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
      </FormControl>

      <Divider />

      <FormControl>
        <FormLabel>태그</FormLabel>
        <Input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(event) => {
            setTag(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.code === 'Enter') tagSubmitHanlder(event);
          }}
        />
      </FormControl>
      {tags.length ? (
        <TagBox>
          {tags.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                {tag.name}
              </div>
            );
          })}
        </TagBox>
      ) : null}

      <FormControl>
        <FormLabel>Memo</FormLabel>
        <Textarea
          placeholder="Memo"
          value={memo}
          onChange={(event) => {
            setMemo(event.target.value);
          }}
        />
      </FormControl>

      <Divider />

      <FormControl
        display="flex"
        alignItems="center"
        onChange={($event) => {
          changeIsReapeated($event);
        }}
      >
        <FormLabel htmlFor="isRepeated" mb="0">
          반복하기
        </FormLabel>
        <Switch id="isRepeated" />
      </FormControl>

      {isRepeated && (
        <DateBox>
          <FormControl>
            <FormLabel>시작 날짜</FormLabel>
            <Input
              type="datetime-local"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>마지막 날짜</FormLabel>
            <Input
              type="datetime-local"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
              }}
            />
          </FormControl>
        </DateBox>
      )}

      <Button onClick={addTag}>추가하기</Button>
      <Button onClick={cancelHandler}>취소하기</Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TagBox = styled.div`
  width: 100%;
  padding: 8px;
  margin: 20px 0;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  & > .tag {
    background: skyblue;
    border-radius: 8px;
    padding: 2px 4px;
  }
`;

export default TodoAddPage;
