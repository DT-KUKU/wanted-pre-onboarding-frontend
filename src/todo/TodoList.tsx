import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { deleteTodo, IHeader, updateTodo } from "../api/todoAPI";
import { IListType } from "./Todo";

const List = styled.li`
  list-style: none;
  margin: 10px 0px;
  flex: 2;
`;

const ButtonStyle = styled.button`
  margin-left: 8px;
  height: 30px;
`;
interface IListPropsType {
  list: IListType;
  setList: Dispatch<SetStateAction<IListType[]>>;
  authHeader: IHeader;
}

function TodoList({ list, setList, authHeader }: IListPropsType) {
  const [modifyContent, setModifyContent] = useState<string>(list.todo);
  const [modify, setModify] = useState<boolean>(true);
  const [check, setCheck] = useState<boolean>(list.isCompleted);
  const deleteHandler = (id: number) => {
    deleteTodo(id, authHeader);
    setList((prev) => prev.filter((el) => el.id !== id));
  };

  const updateHandler = (id: number, isCheck?: boolean) => {
    const update: Omit<IListType, "userId"> = {
      id,
      todo: modifyContent,
      isCompleted: isCheck ? check : !check,
    };
    updateTodo(update, authHeader).then((res) => {
      setList((prev) => {
        return prev.map((el) => {
          if (el.id === res.data.id) {
            return res.data;
          }
          return el;
        });
      });
    });
    if (!modify && isCheck) {
      setModify(true);
    }
  };

  const cancelHandler = () => {
    setModify(true);
    setModifyContent(list.todo);
  };

  return (
    <div>
      {modify ? (
        <>
          <List>
            <label>
              <input
                type="checkbox"
                onChange={() => {
                  setCheck((prev) => !prev);
                  updateHandler(list.id);
                }}
                checked={check}
              />
              <span>{list.todo}</span>
            </label>
            <ButtonStyle onClick={() => setModify(false)}>수정</ButtonStyle>
            <ButtonStyle
              onClick={() => deleteHandler(list.id)}
              data-testid="cancel-button"
            >
              삭제
            </ButtonStyle>
          </List>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            onChange={() => {
              setCheck((prev) => !prev);
              updateHandler(list.id);
            }}
            checked={check}
          />
          <input
            data-testid="modify-input"
            type="text"
            value={modifyContent}
            onChange={(e) => {
              setModifyContent(e.currentTarget.value);
            }}
          />
          <ButtonStyle
            onClick={() => updateHandler(list.id, true)}
            data-testid="submit-button"
          >
            제출
          </ButtonStyle>
          <ButtonStyle onClick={cancelHandler} data-testid="cancel-button">
            취소
          </ButtonStyle>
        </>
      )}
    </div>
  );
}

export default TodoList;
