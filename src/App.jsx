import Contacts from "./components/Contacts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddContact from "./components/AddContact/AddContact";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
