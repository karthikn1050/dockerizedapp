import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed'
import Widgets from './Widgets'
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Explore from './explore';
import Profile from './profile';
import Message from './message';
import Login from './login';
import { useEffect } from 'react';
import axios from 'axios';
import Selectapp from './selectapp';
//import Sidebar from './sidebar/Sidebar';
import Chatbox from './chatbox';
function App() {

  return (
    <div className="app">

      {/* Feed */}
      <BrowserRouter>
      <Routes>
        <Route exact path="/idiscover" element={<Feed />} />

        <Route exact path="/idiscover/profile" element={<Profile />} />
        <Route exact path="/idiscover/explore" element={<Explore />} />
        <Route exact path="/idiscover/message" element={<Chatbox />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/select" element={<Selectapp />} />
      </Routes>
      </BrowserRouter>
      {/* Widget */}
    
    </div>
  );
}

export default App;
