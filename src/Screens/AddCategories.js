import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import Swal from 'sweetalert2';
export default class AddCategories extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	organization:[''],
	  	orgid:'',
	  	code:'',
	  	name:''
	  };
	}

	componentDidMount(){
		this.getOrganization();
	}

	getOrganization(){
		const URL = 'http://localhost:8089/ORM/organization_/list/';
		fetch(URL,{
			method:'POST'
		})
		.then(res => res.json())
		.then(res => {
			if(res[0]){
				if(!res[0].hasOwnProperty('response')){
					this.setState({organization:res});
				}
			}
		});
	}


	renderItems(item,index){
		console.log(item.name);
		if(item === '' || item === undefined || item === null){

		}else{
			return(<option value={item.organization_id}>{item.name}</option>);
		}
	}

	generateCode(ev){
		ev.preventDefault();
		let chars = "0123456789abcdefABCDEF";
		let code = "";
		for (var x=0; x < 11; x++){
			let rand = Math.floor(Math.random()*chars.length);
			code += chars.substr(rand, 1);
		}
		this.setState({code:code});
	}


	saveData(){
		let URL = `http://localhost:8089/ORM/categories_/add/`;
		const { orgid, code, name } = this.state;
		let data = new FormData();
		data.append('orgid',orgid);
		data.append('code',code);
		data.append('name',name);
		fetch(URL,{
			method:'POST',
			body:data
		})
      	.then(response => response.text())
      	.then(res => {
   			console.log(res);
   			if(res === 'success'){
   				Swal.fire(
					'Upps!',
					'felicidades! la categoria se ha creado correctamente',
					'success'
				);
   			}else{
   				Swal.fire(
					'Upps!',
					'Error! Se ha generado un error al crear la categoria, por favor vuelva a intentar',
					'error'
				);
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

	validForm(ev){
		ev.preventDefault();
		const { orgid, code, name } = this.state;
		if((orgid === '0' || orgid == 0) && code.length == 0 && name.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de completar todos los campos para poder continuar',
				'warning'
			);
		}else if((orgid === '0' || orgid == 0)){
			Swal.fire(
				'Upps!',
				'Debes de completar todos los campos para poder continuar',
				'warning'
			);			
		}else if(code.length == 0){
			Swal.fire(
				'Felicidades!',
				'Debes de completar todos los campos para poder continuar',
				'warning'
			);
		}else if(name.length == 0){
			Swal.fire(
				'Felicidades!',
				'Debes de completar todos los campos para poder continuar',
				'warning'
			);
		}else{
			this.saveData();
		}
	}

	render(){
		const { code, organization } = this.state;
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-block justify-content-between mb-2 p-0">
							<h2 className="mb-0">Categorias</h2>
							<h6 className="text-muted">En esta seccion puedes agregar una nueva categoria a una Tienda</h6>									
						</div>
					</div>
					<div className="card-body pt-1">
						<div className="row pl-4 pr-4 mt-0">
							<form method="post" className="w-100 mt-0" onSubmit={(ev) => this.validForm(ev)}>
								<div className="row">
									<div className="col">
										<div className="form-group mb-2">
											<label htmlFor="exampleInputName">Organizacion</label>
											<select className="form-control" id="exampleFormControlSelect1" onChange={(ev) => this.setState({orgid:ev.target.value})}>
											{organization[0] != '' && organization.map((item,index) => {
												return this.renderItems(item,index);
											})}
											</select>
										</div>
									</div>
									<div className="col">
										<div><label htmlFor="exampleInputCode">Codigo</label></div>
										<div className="input-group">
										  <input type="text" className="form-control" id="exampleInputcode" aria-describedby="codeHelp" value={code} />
										  <div className="input-group-append">
										    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(ev) => this.generateCode(ev)}>GENERAR</button>
										  </div>
										</div>
										<small id="codeHelp" className="form-text text-muted">Codigo del producto,este se puede ingresar o generarse</small>
									</div>
								</div>														
								<div className="form-group mb-4">
									<label for="exampleInputName">Nombre</label>
									<input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" onChange={(ev) => this.setState({name:ev.target.value})} />									    
								</div>								
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.validForm(ev)}>Guardar Cambios</button>
									<Link to="/categories/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form>																									  
						</div>
					</div>
				</div>
		);
	}
}