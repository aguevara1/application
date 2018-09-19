import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state={
    charity:[]
  };
  //https://www.refugerestrooms.org/api/swagger_doc.json
//  http://img.omdbapi.com/?apikey=[yourkey]&
//  http://api.open-notify.org/iss-now.json
// http://www.omdbapi.com/?i=tt3896198&apikey=359b7a74
componentDidMount(){
   console.log('here')
  fetch('https://www.refugerestrooms.org/api/swagger_doc.json')
  .then(data=>data.json())
  .then(data=> { console.log(data, 'data')
  })
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
