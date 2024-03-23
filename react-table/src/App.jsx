import React from 'react';
import './App.css';
import Practice from './components/Practice';
import Form from './components/forms';
import Createusers from './components/Createusers';
import FormComponent from './components/FormComponent';
import Captchaform from './components/Captchaform';
import Postdata from './components/postdata'
// import GameTypeModel from './components/GameTypeModel'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  // const [modalOpen, setModalOpen] = useState(true);
  // const [selectedGameType, setSelectedGameType] = useState(null);

  // const handleClose = () => {
  //   setModalOpen(false);
  // };

  // const handleSelect = (option) => {
  //   setSelectedGameType(option);
  // };
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/create' element={<Createusers />}/>
      <Route path='/captcha' element={<Captchaform/>}/>
      <Route path='/post' element={<Postdata/>}/>  
      <Route path='/practice' element={<Practice/>}/>  
      {/* <Route path='/mui' element={<GameTypeModel  open={modalOpen} onClose={handleClose} onSelect={handleSelect}/>}/>       */}
      </Routes>
    </Router>
    </>
  )
}

export default App
