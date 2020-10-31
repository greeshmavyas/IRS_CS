import React from '../node_modules/@types/react';
import { BrowserRouter } from '../node_modules/react-router-dom';
import Main from "./components/Main"
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
