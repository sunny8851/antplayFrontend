import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SignUP from "./components/Auth/LogUp";
import Login from "./components/Auth/Login";

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/SIGNUP"
            element={
              <>
                <SignUP />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
