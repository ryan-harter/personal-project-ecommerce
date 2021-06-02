import './App.css';
import React, {useState} from 'react'
import routes from './routes'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

function App() {

  
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
