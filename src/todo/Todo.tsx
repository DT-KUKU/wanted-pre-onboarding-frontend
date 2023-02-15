import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createTodo, getTodoList } from "../api/todoAPI";
import useToken from "../hooks/useToken";
import TodoList from "./TodoList";

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 350px;
  margin: auto;
`;

const TitleWrapper = styled.div``;

const InputWrapper = styled.div`
  input {
    border-radius: 4px;
    border: 1px solid gray;
    margin-right: 10px;
    height: 25px;
    width: 250px;
  }
  button {
    border-radius: 5px;
    border: 1px solid gray;
    background-color: transparent;
    height: 25px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 8px;
`;

const Ment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: inherit;
`;

const ListWrapper = styled.ul`
  padding-left: 15px;

  div {
    display: flex;
    align-items: center;
  }
`;

export interface IListType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

function Todo() {
  const [list, setList] = useState<IListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const { pathname: url } = useLocation();
  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  useToken(url);
  const ListAppendHandler = () => {
    createTodo(input, authHeader).then((res) => {
      setList((prev) => {
        return [...prev, res?.data];
      });
    });
    setInput("");
  };

  useEffect(() => {
    getTodoList(authHeader).then((res) => {
      setList(res);
      setLoading(false);
    });
  }, []);

  return (
    <TodoContainer>
      <TitleWrapper>
        <h1>Todo List</h1>
      </TitleWrapper>
      <InputWrapper>
        <input
          data-testid="new-todo-input"
          type="text"
          onChange={(e) => {
            setInput(e.currentTarget.value);
          }}
          value={input}
        />
        <button
          data-testid="new-todo-add-button"
          type="button"
          onClick={ListAppendHandler}
        >
          추가
        </button>
      </InputWrapper>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ListContainer>
          {list.length === 0 ? (
            <Ment>할일이 없어요!</Ment>
          ) : (
            <ListWrapper>
              {list.map((el) => {
                return (
                  <TodoList
                    key={el.id}
                    list={el}
                    setList={setList}
                    authHeader={authHeader}
                  />
                );
              })}
            </ListWrapper>
          )}
        </ListContainer>
      )}
    </TodoContainer>
  );
}

export default Todo;
