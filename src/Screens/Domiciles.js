import React from 'react';

import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';

export default class Domiciles extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-flex justify-content-between mb-2 p-0">
							<h2 className="mb-3">Domicilios</h2>
							<button type="button" className="btn btn-primary" style={{height:'45px'}}>+ Agregar</button>
						</div>
						<div className="search-bar">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<button className="btn btn-outline-secondary" type="button" id="button-addon1"><i className="fas fa-search"></i></button>
								</div>
								<input type="text" className="form-control" placeholder="Busca por codigo o Nombre" aria-label="Example text with button addon" aria-describedby="button-addon1" />								  																		  
							</div>
						</div>
						<div className="filters">

						</div>
					</div>
					<div className="card-body">
						<div className="row pl-3 pr-3">
							<table className="table table-bordered">
								<thead>
									<tr>
									  <th scope="col">#</th>
									  <th scope="col">Cliente</th>
									  <th scope="col">Producto</th>
									  <th scope="col">Cantidad</th>
									  <th scope="col">Fecha Venta</th>
									  <th scope="col">Valor</th>
									  <th scope="col">Domicilio</th>
									  <th scope="col">Acciones</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">1</th>
										<td><a href="#">Eduardo Perez Dias</a></td>
										<td>Zapatillas Adidas</td>
										<td>2</td>
										<td>26/07/2020</td>
										<td>$150.000</td>
										<td>$3.000</td>
										<td>
										    <div className="button-group d-flex">
										      	<button type="button" className="btn btn-warning mr-2">Editar</button>
										      	<button type="button" className="btn btn-danger">Eliminar</button>
										     </div>
										</td>
									</tr>
									<tr>
									    <th scope="row">2</th>
									    <td><a href="#">Eduardo Perez Dias</a></td>
									    <td>Zapatillas Adidas</td>
									    <td>2</td>
									    <td>26/07/2020</td>
										<td>$150.000</td>
										<td>$3.000</td>
									    <td>
									      <div className="button-group d-flex">
									      	<button type="button" className="btn btn-warning mr-2">Editar</button>
									      	<button type="button" className="btn btn-danger">Eliminar</button>
									      </div>
									     </td>
									 </tr>
								</tbody>
							</table>
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li className="page-item"><a className="page-link" href="#">Anterior</a></li>
									<li className="page-item"><a className="page-link bg-primary" href="#">1</a></li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
									<li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
								</ul>
							</nav>																  
						</div>
					</div>
				</div>
		);
	}
}