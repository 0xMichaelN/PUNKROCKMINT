import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import {HashRouter as Router, Routes, Route, Link} from "react-router-dom";
// import Minter from './pages/minter';

ReactDOM.render(
  // ORIGINAL
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')

  //Let's make a Router for a Mint page!!!
  // <React.StrictMode>
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<App/>} />
  //       {/* <Route path="/mint" element={<Minter/>}/> */}
  //     </Routes>
  //   </Router>
  // </React.StrictMode>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
