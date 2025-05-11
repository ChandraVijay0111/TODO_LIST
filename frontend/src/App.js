
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Todo from './components/Todo';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { useDispatch } from 'react-redux';
import { authactions } from './store';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Edit from './components/Edit';

function App() {
  const dispatch=useDispatch();
  const id=sessionStorage.getItem("id")
  if(id){
    dispatch(authactions.login());
  }
  return (
      
      <>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About />} />
          <Route path='/edit' element={<Edit />} />
          <Route exact path='/addtodo' element={<Todo/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout />} />
        </Routes>
        
      </Router>
      <Footer/>
      </>
  );
}

export default App;
