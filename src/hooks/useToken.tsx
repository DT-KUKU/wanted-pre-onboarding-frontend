import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useToken(url: string) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      if (url === "/signin" || url === "/signup") {
        navigate("/todo");
      }
    } else {
      if (url === "/todo") navigate("/signin");
    }
  }, []);
}

export default useToken;
