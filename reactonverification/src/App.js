import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginForm/LoginPage';
import Register from './Components/LoginForm/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
      <LoginPage />
    </div>
  );
}

export default App;
