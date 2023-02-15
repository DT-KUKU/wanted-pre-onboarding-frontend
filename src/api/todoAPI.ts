import axios from "axios";
import { IListType } from "../todo/Todo";

export const base = process.env.REACT_APP_API;

export interface IHeader {
  headers: {
    Authorization: string;
  };
}

export function getTodoList(header: IHeader) {
  const data = axios
    .get<IListType[]>(`${base}/todos`, header)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });
  return data;
}

export async function createTodo(todo: string, header: IHeader) {
  const data = await axios
    .post(
      `${base}/todos`,
      {
        todo,
      },
      header
    )
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export function updateTodo(
  { id, todo, isCompleted }: Omit<IListType, "userId">,
  header: IHeader
) {
  return axios.put(
    `${base}/todos/${id}`,
    {
      todo,
      isCompleted,
    },
    header
  );
}

export function deleteTodo(id: number, header: IHeader) {
  axios.delete(`${base}/todos/${id}`, header);
}
