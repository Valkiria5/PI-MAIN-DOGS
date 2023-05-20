import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import  LandingPage from './components/landingpage/LandingPage'
import Home from './components/home/Home'
import Form from './components/form/Form';
import Detail from './components/details/Details';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path ='/home' element={<Home/>}/>
        <Route path = '/createadog' element={<Form/>}/>
        <Route path = '/home/:id' element = {<Detail/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
