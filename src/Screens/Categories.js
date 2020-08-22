import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import Swal from 'sweetalert2';
export default class Categories extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[]
	  };
	}

	componentDidMount(){
		this.getData();
	}

	renderItems(item,index){
		console.log(item);
		if(item === 'empty' || item === '' || item === null || item === undefined){

		}else{
			return(
				<tr key={index+1}>
					<th scope="row">{index+1}</th>
					<td>{item.code}</td>
					<td>{item.name}</td>
					<td>{item.created}</td>
					<td>{item.updated}</td>
					<td><div className="button-group d-flex p-0">
						<button type="button" className="btn btn-warning mr-2" style={{fontSize:'14.7px'}}>Editar</button>
						<button type="button" className="btn btn-danger" style={{fontSize:'14.7px'}}>Eliminar</button>
					</div></td>					
				</tr>
			);
		}
	}

	getData(){
		const URL = `http://localhost:8089/ORM/categories_/list/`;
		let data = new FormData();
		let id = 1;
		data.append('id',id);
		fetch(URL,{
			method:'POST',
			body:data
		})
      	.then(response => response.json())
      	.then(res => {
   			if(!res[0].error){
   				this.setState({data:res});
   			}else{
   				this.setState({data:['']});
   			}		
      	},(error) => {
		  console.log(error);		  
		}).catch(function(error) {
		    Swal.fire(
				'Upps!',
				'Revise su conexion a internet y vuelva a intentar nuevamente',
				'error'
			);
		    // ADD THIS THROW error
		   throw error;
		});
	}		

	render(){
		const { data } = this.state;
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-flex justify-content-between mb-2 p-0">
							<h2 className="mb-3">Categorias de los Productos</h2>
							<Link to="/addcategories/" className="btn btn-primary" style={{height:'42px'}}>+ Agregar</Link>
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
									    <th scope="col">Codigo</th>
									    <th scope="col">Nombre</th>
									    <th scope="col">Fecha Creacion</th>
									    <th scope="col">Fecha Actualizacion</th>
									    <th scope="col">Acciones</th>
									</tr>
								</thead>
								<tbody>
									{data.map((item,index) => {
										return this.renderItems(item, index);
									})}
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