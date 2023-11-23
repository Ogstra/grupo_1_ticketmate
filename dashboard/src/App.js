import { Component, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EventsList from "./components/EventsList";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#161d2b',
        paper: '#1c2535'
      },

    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="grid-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/events" exact={true} component={EventsList} />
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
