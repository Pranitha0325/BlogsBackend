//  import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Login from './components/login'
 import Home from './components/Home'
 import Dashboard from './components/dashboard'
 import Blogs from './components/blogs'
 import MyProfile from './components/MyProfile'



 import ProtectedRoute from './components/ProtectedRoute'
import './App.css';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<ProtectedRoute element={Home} />}/>
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />}/>
        <Route path="/blogs/:id" element={<ProtectedRoute element={Blogs} />}/>
        <Route path="/myProfile" element={<ProtectedRoute element={MyProfile} />}/>




      </Routes>
    </Router>
  );
}

export default App;
