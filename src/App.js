import React, { Component } from 'react';
import './reset.css';
import './App.css';
import './responsive.css';

/* COMPONENTS */
import Header from './components/Header';
import Listing from './components/Listing';

class App extends Component {
  render() {
    return (
      <main>
          <Header />
          <Listing/>
      </main>
    );
  }
}

export default App;
