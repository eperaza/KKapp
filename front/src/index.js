import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import React, { useState, useEffect, Component, Fragment  } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
//import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {GridExample} from "./grid.js";
import {Validar} from "./validar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'

class Home extends Component {
  
  render() {
    return (        
        <Router>

          <Route path="/" exact render={()=>{
            return(
                <div>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Menu
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/">Cupones</Dropdown.Item>
                        <Dropdown.Item href="/validar">Canjear Cupones</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <img src="https://1000logos.net/wp-content/uploads/2017/12/krispy-kreme-logo.png" style={{width:'100px', height:'60px', position:'absolute', right:'0'}}/>
                  </nav>
                  <GridExample/>
                </div>
            );
          }} 
          />
          <Route path="/validar/" exact render={()=>{
            return(
              <div>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Menu
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/">Cupones</Dropdown.Item>
                        <Dropdown.Item href="/validar">Canjear Cupones</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <img src="https://1000logos.net/wp-content/uploads/2017/12/krispy-kreme-logo.png" style={{width:'100px', height:'60px', position:'absolute', right:'0'}}/>
                  </nav>
                  <Validar/>
                </div>

              );
            }} 
          />
              
            
        </Router>        
    );
  }
}


ReactDOM.render(<Home></Home>, document.querySelector('#root'));
reportWebVitals();
