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

export class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'id',
          headerName: 'Serie',
          sortable: true
        },
        {
          field: 'serie',
          headerName: 'Nombre'
        },
        {
          field: 'estatus'
        },
        {
          field: 'establecimiento'
        },
        {
          field: 'vigencia'
        },
        {
          field: 'producto'
        },
        {
          field: 'intentos',
          headerName: 'Intentos de Canje'

        }
        /*{ 
        field: '', 
        cellRenderer: 'btnCellRenderer', 
        cellRendererParams: {
          clicked: function(field) {
            alert(`${field} was clicked`);
          }
        },
        maxWidth: 70
        },
        { 
        field: '', 
        cellRenderer: 'btnCellRenderer', 
        cellRendererParams: {
          clicked: function(field) {
            alert(`${field} was clicked`);
          }
        },
        maxWidth: 50
        }*/
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 60,
      },
      components: {
        btnCellRenderer: BtnCellRenderer
      },
      rowData: [],
      id: null,
      establecimiento: null,
      estatus: null,
      serie: null,
      vigencia: null,
      producto: null,
      formId:null,
      formEstablecimiento:null,
      formEstatus:null,
      formProducto:null,
      formSerie:null,
      formVigencia:null,

    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);    
  }
  
  eraseSelectedRowData = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    if (typeof selectedData[0] !== 'undefined'){
    var payload =selectedData[0].id;
    Axios.post('http://18.220.204.199:3001/cuponesBorrar',{id:payload})
    .then(res => {
      //borrar fila
      let selectedRow = this.gridApi.getSelectedRows()[0];
      let newRowData = this.state.rowData.filter(row => {
        return row !== selectedRow;
      });
      this.setState({ rowData: newRowData });
    });
    }
  };
  /*
  editSelectedRowData = () => {
     
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    var id =selectedData[0].id;
    var serie =selectedData[0].serie;
    var establecimiento =selectedData[0].establecimiento;
    var estatus =selectedData[0].estatus;
    var vigencia =selectedData[0].vigencia;
    Axios.post('http://18.220.204.199:3001/cuponesEditar',{
      id:id,
      serie:serie,
      establecimiento: establecimiento,
      estatus: estatus,
      vigencia: vigencia
      })
    .then(res => {
      console.log(res);
    });
  };
*/
   onRowSelected = (event) => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    var id2 =selectedData[0].id;
    var serie2 =selectedData[0].serie;
    var establecimiento2 =selectedData[0].establecimiento;
    var estatus2 =selectedData[0].estatus;
    var vigencia2 =selectedData[0].vigencia;
    var producto2 =selectedData[0].producto;
    this.setState({ id:id2 });
    this.setState({ serie:serie2 });
    this.setState({ establecimiento:establecimiento2 });
    this.setState({ estatus:estatus2 });
    this.setState({ vigencia:vigencia2 });
    this.setState({ producto:producto2 });
    //this.setState({ showHideDemo1: !this.state.showHideDemo1 });

  };

  onSubmit = (event) => {
    event.preventDefault(event);
    Axios.post('http://18.220.204.199:3001/cuponesEditar',{
      id:event.target.id.value,
      serie: event.target.serie.value,
      establecimiento: event.target.establecimiento.value,
      estatus: event.target.estatus.value,
      vigencia: event.target.vigencia.value,
      producto: event.target.producto.value
      })
    .then(res => {
      console.log(res);
      //this.gridApi.setRowData(this.rowData);
      const updateData = data => {
        this.setState({ rowData: data });
      };

      Axios.post('http://18.220.204.199:3001/cuponesCargar')
      .then(res => {
        console.log(res.data);
        updateData(res.data);
      });
      //this.setState({ showHideDemo1: !this.state.showHideDemo1 });

    });
  };

  onSubmit2 = (event) => {
    event.preventDefault(event);
    Axios.post('http://18.220.204.199:3001/cuponesAgregar',{
      serie: event.target.serie.value,
      establecimiento: event.target.establecimiento.value,
      estatus: event.target.estatus.value,
      vigencia: event.target.vigencia.value,
      producto: event.target.producto.value
      })
    .then(res => {
      console.log(res);
      //this.gridApi.setRowData(this.rowData);
      const updateData = data => {
        this.setState({ rowData: data });
      };

      Axios.post('http://18.220.204.199:3001/cuponesCargar')
      .then(res => {
        console.log(res.data);
        updateData(res.data);
      });
      
    });
  };


  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = data => {
      this.setState({ rowData: data });
    };

    Axios.post('http://18.220.204.199:3001/cuponesCargar')
    .then(res => {
      console.log(res.data);
      updateData(res.data);
    });

  };
 
  render() {
    const { showHideDemo1 } = this.state;

    return (
      <div className="ag-theme-alpine" style={{ width: '99vw', height: '90vh' }}>
        <button 
          className = "btn btn-danger btn-sm"
          onClick={this.eraseSelectedRowData}
          style={{margin: 10}}
          >Borrar
        </button>
        {this.state.id!==null && 
        <Container triggerText={'Editar'} 
          formId={this.state.id} 
          formEstablecimiento={this.state.establecimiento}
          formEstatus={this.state.estatus}
          formProducto={this.state.producto}
          formSerie={this.state.serie}
          formVigencia={this.state.vigencia} 
          onSubmit={this.onSubmit} 
          classButton={"btn btn-primary btn-sm modal-button"}
          formType={'1'}/> }
        <div
          id="myGrid"
          style={{
            height: '70%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            components={this.state.components}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
            rowSelection="single"
            onRowSelected={this.onRowSelected.bind(this)}
          />
          <div style={{marginLeft: '9px', marginTop: '7px' }}>
          <Container triggerText={'Agregar'} 
          formId={null} 
          formEstablecimiento={null}
          formEstatus={null}
          formProducto={null}
          formSerie={null}
          formVigencia={null} 
          onSubmit={this.onSubmit2} 
          classButton={"btn btn-success btn-sm modal-button"}
          formType={'2'}/>
          </div>
        </div>
      </div>

     
    );
  }
}

export default GridExample;
reportWebVitals();
