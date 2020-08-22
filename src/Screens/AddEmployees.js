import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import Swal from 'sweetalert2';
export default class AddEmployees extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	orgid:'',
	  	organization:[''],
	  	code:'',
	  	name:'',
	  	address:'',
	  	phone:'',
	  	email:'',
	  	jobtype:'',
	  };

	  this.expreNumber = /^([0-9])*$/;
	  this.expreEmail  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	}

	componentDidMount(){
		this.getOrganization();
	}

	renderItems(item,index){
		console.log(item.name);
		if(item === '' || item === undefined || item === null){

		}else{
			return(<option value={item.organization_id}>{item.name}</option>);
		}
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

	validNumber(item,input){
		if(!this.expreNumber.test(input.target.value)){
			input.target.classList.add('is-invalid');
		}else{
			input.target.classList.remove('is-invalid');
			let obj = `[{"${item}":"${input.target.value}"}]`;				
			this.setState(JSON.parse(obj)[0]);
		}
	}

	validEmail(item,input){
		if(input.target.value.length > 0){
			if(!this.expreEmail.test(input.target.value)){
				input.target.classList.add('is-invalid');
			}else{
				input.target.classList.remove('is-invalid');
				let obj = `[{"${item}":"${input.target.value}"}]`;				
				this.setState(JSON.parse(obj)[0]);
			}
		}
	}

	saveData(){
		let URL = `http://localhost:8089/ORM/employees_/add/`;
		const { orgid, code, name , address, phone, mobilephone, email, jobtype } = this.state;
		let data_ = new FormData();
		data_.append('orgid',orgid);
		data_.append('code',code);
		data_.append('name',name);
		data_.append('address',address);
		data_.append('phone',phone);
		data_.append('email',email);
		data_.append('jobtype',jobtype);
		fetch(URL,{
			method:'POST',
			body:data_
		})
      	.then(response => response.text())
      	.then(res => {
   			console.log(res);
   			if(res === 'success'){
   				Swal.fire(
					'Upps!',
					'felicidades! el empleado se ha creado correctamente',
					'success'
				);
   			}else{
   				Swal.fire(
					'Upps!',
					'Error! Se ha generado un error al crear el empleado, por favor vuelva a intentar',
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

	validaForm(ev){
		ev.preventDefault();
		const { orgid , code, name , address , phone , email, jobtype } = this.state;

		if((orgid == '0' || orgid == 0) && code.length == 0 && name.length == 0 && (jobtype == 0 || jobtype === 'DEFAULT')){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar por lo menos los campos Organizacion, Identificacion, Nombre, Cargo para poder continuar!',
				'warning'
			);
		}else if((orgid == '0' || orgid == 0)){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar por lo menos los campos Organizacion, Identificacion, Nombre, Cargo para poder continuar!',
				'warning'
			);
		}else if(code.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar por lo menos los campos Organizacion, Identificacion, Nombre, Cargo para poder continuar!',
				'warning'
			);
		}else if(name.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar por lo menos los campos Organizacion, Identificacion, Nombre, Cargo para poder continuar!',
				'warning'
			);
		}else if((jobtype == 0 || jobtype === 'DEFAULT')){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar por lo menos los campos Organizacion, Identificacion, Nombre, Cargo para poder continuar!',
				'warning'
			);
		}else{
			this.saveData();
		}
	}


	render(){
		const { organization } = this.state;
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-block justify-content-between mb-2 p-0">
							<h2 className="mb-0">Empleado</h2>
							<h6 className="text-muted">En esta seccion puedes agregar un nuevo Empleado a una Tienda</h6>									
						</div>
					</div>
					<div className="card-body pt-1">
						<div className="row pl-4 pr-4 mt-0">
							<form method="post" className="w-100 mt-0" onSubmit={(ev) => this.validaForm(ev)}>
								<div className="row">
									<div className="col">
										<div className="form-group mb-1">
											<label for="exampleInputName">Organizacion</label>
											<select className="form-control" id="exampleFormControlSelect1" onChange={(ev) => this.setState({orgid:ev.target.value})}>
												{organization[0] != '' && organization.map((item,index) => {
													return this.renderItems(item,index);
												})}
											</select>
										</div>
									</div>								
									<div className="col">
										<div className="form-group mb-1">
											<label for="exampleInputNit">Identificacion</label>
											<input type="text" className="form-control" id="exampleInputNit" aria-describedby="NitHelp" onChange={(ev) => this.validNumber('code',ev)}/>
											<small id="NitHelp" className="form-text text-muted">El codigo puede representar el numero del local o un valor que lo identifique</small>
										</div>
									</div>
								</div>
								<div className="form-group mb-1">
									<label for="exampleInputLocation">Nombre completo</label>
									<input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" onChange={(ev) => this.setState({name:ev.target.value})} />									    
								</div>								
								<div className="row">
									<div className="col">
										<div className="form-group mb-1">
										  <label for="exampleInputLocation">Ubicacion</label>
										  <input type="text" className="form-control" id="exampleInputLocation" aria-describedby="LocationHelp" onChange={(ev) => this.setState({address:ev.target.value})}/>									    
										</div>
									</div>
									<div className="col">
										<div className="form-group mb-1">
										   <label for="exampleInputPhone">Telefono</label>
										   <input type="text" className="form-control" id="exampleInputPhone" aria-describedby="PhoneHelp" onChange={(ev) => this.validNumber('phone',ev)}/>
										   <small id="PhoneHelp" className="form-text text-muted">El valor para este campo debe ser numerico</small>									    
										</div>									
									</div>
								</div>
								<div className="form-group mb-3">
									<label for="exampleInputEmail">Email</label>
									<input type="text" className="form-control" id="exampleInputEmail" aria-describedby="EmailHelp" onChange={(ev) => this.validEmail('email',ev)} />									    
									<div className="invalid-feedback">Upps! Debe de ingresar un correo electronico valido</div>
								</div>								
								<div className="form-group">
								   <label for="exampleFormControlSelect1">Cargo</label>
								   <select className="form-control" id="exampleFormControlSelect1" defaultValue="1" onChange={(ev) => this.setState({jobtype:ev.target.value})}>
								     <option value="1">Representante de Venta</option>
								     <option value="2">Vendedor</option>
								     <option value="3">Administrador</option>
								     <option value="4">Gerente</option>
								     <option value="5">Auxiliar</option>
								   </select>
								</div>
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.validaForm(ev)}>Guardar Cambios</button>
									<Link to="/employees/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form>																									  
						</div>
					</div>
				</div>
		);
	}
}