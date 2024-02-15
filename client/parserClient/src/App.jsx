import GlobalStyles from "./style/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Repo from "./pages/Repo";
import Dependencies from "./pages/Dependencies";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="repo" element={<Repo />} />
          <Route path="dependencies" element={<Dependencies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
