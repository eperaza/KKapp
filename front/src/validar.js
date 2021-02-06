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
import BtnCellRenderer from './btn-cell-renderer.jsx';
//modal imports
import { Container } from './Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


export class Validar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id:null
    };
    
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


  }
  
  textChangeHandler = (e) => {
   //console.log(e.target.value);
   
    Axios.post('http://18.220.204.199:3001/cuponesValidar',{
       id:e.target.value
   })
    .then(res => {
        this.setState({ establecimiento:res.data[0].establecimiento });
        this.setState({ estatus:res.data[0].estatus });
        this.setState({ serie:res.data[0].serie });
        this.setState({ vigencia:res.data[0].vigencia });
        this.setState({ id:res.data[0].id });
        this.setState({ producto:res.data[0].producto });
        this.setState({ intentos:res.data[0].intentos });
    })
    .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
};

onSubmit = (event) => {
    event.preventDefault(event);
    Axios.post('http://18.220.204.199:3001/cuponesCanjear',{
      id:this.state.id
      })
    .then(res => {
      console.log(res.data);
      Axios.post('http://18.220.204.199:3001/cuponesValidar',{
       id:this.state.id
        })
            .then(res => {
                this.setState({ establecimiento:res.data[0].establecimiento });
                this.setState({ estatus:res.data[0].estatus });
                this.setState({ serie:res.data[0].serie });
                this.setState({ vigencia:res.data[0].vigencia });
                this.setState({ id:res.data[0].id });
                this.setState({ producto:res.data[0].producto });
                this.setState({ intentos:res.data[0].intentos });
            })
            .catch(function (error) {
                if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
                console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

        });          
    });
  };

  render() {
    return (
      <div>
        <InputGroup size="lg">
            <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-lg">Cupon</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Large" type="number" placeholder="Introduce la serie del cupon (solo numeros)" aria-describedby="inputGroup-sizing-sm" onChange={this.textChangeHandler}/>
        </InputGroup>

          <div style={{marginLeft: '9px', marginTop: '7px' }}>
          <Container triggerText={'Canjear'} 
          formId={this.state.id} 
          formEstablecimiento={this.state.establecimiento}
          formEstatus={this.state.estatus}
          formProducto={this.state.producto}
          formSerie={this.state.serie}
          formVigencia={this.state.vigencia} 
          onSubmit={this.onSubmit} 
          classButton={"btn btn-primary btn-sm modal-button"}
          formType={'3'}
          formIntentos={this.state.intentos}/>
          </div>
      </div>

     
    );
  }
}

export default Validar;
reportWebVitals();
