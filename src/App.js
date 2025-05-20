import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthThunk } from "./redux/actions/authActions";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
