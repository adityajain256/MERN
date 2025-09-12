import React,{useState} from 'react'
import Note from './component/Note'
import Navbar from './component/Nabvar'

import './App.css'


function App() {
    const [isVisible, setIsVisible] = useState(false);
    
  
    // const toggleEditMode = () => {
    //   setEditMode((prev) => !prev);
    // };

   const toggleVisibility = () => {
     setIsVisible(!isVisible);

   };

 
  return (
    <>
      <Navbar toggleVisibility={toggleVisibility} isVisible={isVisible} />
      <Note isVisible={isVisible} toggleVisibility={toggleVisibility} />
    </>
  );
}

export default App
