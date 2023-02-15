import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import Todo from "./todo/Todo";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

export default App;
