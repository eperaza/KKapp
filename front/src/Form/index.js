import React, { Component } from 'react';


//passing state from parent to child
export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: '',
            formId: null,
            formSerie: null,
            formEstablecimiento: null,
            formEstatus: null,
            formVigencia: null,
            formProducto: null,
            formType:null,
            formIntentos:null,
            closeModal:null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
  handleChange = (event) => {
    //this.setState({formId: event.target.value});
  }

  handleClick = (event) => {
    //this.setState({formId: event.target.value});
    event.preventDefault();
    console.log('sirve');
    return this.props.onSubmit;
    
  }

    render() {
      if(this.props.formType==='1'){
        return (
            <form onSubmit={this.props.onSubmit} >
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input className="form-control" id="id" value={this.props.formId} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="serie">Nombre</label>
                <input className="form-control" id="serie" defaultValue={this.props.formSerie} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="estatus">Estatus</label>
                <input className="form-control" id="estatus" defaultValue={this.props.formEstatus} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="establecimiento">Establecimiento</label>
                <input className="form-control" id="establecimiento" defaultValue={this.props.formEstablecimiento} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="vigencia">Vigencia</label>
                <input className="form-control" id="vigencia" defaultValue={this.props.formVigencia} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="producto">Producto</label>
                <input className="form-control" id="producto" defaultValue={this.props.formProducto} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <button className="form-control btn btn-primary" type="submit"> 
                  Enviar
                </button>
              </div>
            </form>
        );
      }
      else if (this.props.formType==='2'){
        return (
            <form onSubmit={this.props.onSubmit}>
              <div className="form-group">
                <label htmlFor="serie">Nombre</label>
                <input className="form-control" id="serie" defaultValue={this.props.formSerie} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="estatus">Estatus</label>
                <input className="form-control" id="estatus" defaultValue={this.props.formEstatus} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="establecimiento">Establecimiento</label>
                <input className="form-control" id="establecimiento" defaultValue={this.props.formEstablecimiento} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="vigencia">Vigencia</label>
                <input className="form-control" id="vigencia" defaultValue={this.props.formVigencia} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <label htmlFor="producto">Producto</label>
                <input className="form-control" id="producto" defaultValue={this.props.formProducto} onChange={(event) => {
               this.setState({value: event.target.value});}} />
              </div>
              <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                  Enviar
                </button>
              </div>
            </form>
        );
      }
      else {
        if(this.props.formId){
          return (
              <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                  <label htmlFor="id">ID: {this.props.formId}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="serie">Nombre: {this.props.formSerie}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="serie">Estatus: {this.props.formEstatus}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="serie">Vigencia: {this.props.formVigencia}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="serie">Establecimiento: {this.props.formEstablecimiento}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="serie">Producto: {this.props.formProducto}</label>
                </div>
                <div className="form-group">
                  <label htmlFor="intentos">Intentos de Canje: {this.props.formIntentos}</label>
                </div>
                <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                  Canjear
                </button>
                </div>
              </form>
          );
          
        }
        else {
            return (
              <div><label>No existe el cupon ingresado</label></div>
            );
          }
      }
    }
}

/*
export const Form = ({ onSubmit, formId, updateTextCB }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" value={formId} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
*/
export default Form;
