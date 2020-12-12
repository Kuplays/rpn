import React from 'react';
import './App.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import TestComponent from './TestComponent.js';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      content: [],
      error: null
    }
  }

  setContent = (newContent) => {
    console.log("RECIEVED: " + newContent);
    console.log("INFIX RECIEVED: " + newContent.infixNotation);
    let copy = this.state.content;
    copy.push(newContent);
    this.setState({content: copy});
    console.log("PARENT CHANGED CONTENT: " + this.state.content);
  }

  toggleLoadingState = (newState) => this.setState({hasLoaded: newState});

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="#">
              RPN Calculator
            </NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <InputForm passResult = {this.setContent} parentToggler = {this.toggleLoadingState} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              {this.state.content != null ? <ResultTable newContent = {this.state.content} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
