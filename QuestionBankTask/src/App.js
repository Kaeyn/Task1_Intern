import logo from './logo.svg';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionBank from './Views/QuestionBank';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path ="/QuestionBank" element={<QuestionBank/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
