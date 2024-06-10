//  import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Login from './components/login'
 import Home from './components/Home'
 import ProtectedRoute from './components/ProtectedRoute'
import './App.css';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<ProtectedRoute element={Home} />}/>

      </Routes>
    </Router>
  );
}

export default App;
