import './styles/App.css';
import Main from './views/Main';
import Test from './views/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
