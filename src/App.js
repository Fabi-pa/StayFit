
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import 'remixicon/fonts/remixicon.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 
import './App.css'; 
import React from 'react'; 
import Header from './components/Header/Header'; 
import SideBar from './components/SideBar/SideBar'; 
import Main from './components/Dashboard/Main'; 
import Footer from './components/Footer/Footer'; 

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <Main />
      <Footer />
      </>
  );
}

export default App;
