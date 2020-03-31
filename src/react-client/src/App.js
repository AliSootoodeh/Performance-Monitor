import React , { Component } from 'react';
import './App.css';
import socket from './utils/socketConnection';



class App extends Component {
  constructor(){
    super();
    this.state = {
      performanceData : {

      }
    }
  }

  componentDidMount(){
    socket.on('data', (data) => {
      this.setState({performanceData : {...data}})
    })
  }

  render() {
    return (
      <div className="App">
       <h1>Hello World!!</h1>
     </div>
    )
  }
}

export default App;
