import { BrowserRouter, Routes, Route } from "react-router-dom";
import ONGProfilePage from "./pages/OngProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ONGProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
