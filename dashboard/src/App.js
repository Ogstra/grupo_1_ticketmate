import { Component, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EventsList from './components/EventsList';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

    return (
  <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/events" exact={true} component={EventsList} />
        </Switch>
      </div>
    )
  
}


export default App;
