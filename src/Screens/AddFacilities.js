import React from 'react';
import {
 Redirect,
 Link
} from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import Swal from 'sweetalert2';
export default class AddFacilities extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	orgid:'0',
	  	code:'',
	  	name:'',
	  	address:'',
	  	phone:'',
	  	email:'',
	  	organization:['']
	  };

	  this.expreNumber = /^([0-9])*$/;
	  this.expreEmail  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;	  
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


	saveData(){
		const { orgid , code, name, address, phone , email } = this.state;
		const URL = 'http://localhost:8089/ORM/facilities_/add/';
		let data_ = new FormData();
		data_.append('orgid',orgid);
		data_.append('code',code);
		data_.append('name',name);
		data_.append('address', address);
		data_.append('phone',phone);
		data_.append('email',email);
		fetch(URL,{
			method:'POST',
			body:data_
		})
		.then(res => res.text())
		.then(res => {
			if(res === 'failed' || res === 'error' || res === 'false'){
				Swal.fire(
					'Upps!',
					'Se ha presentado un problema al intentar guardar la sede',
					'error'
				);
			}else{
				Swal.fire(
					'Felicidades!',
					'Se ha creado correctamente la sede!',
					'success'
				);
			}
		});
	}

	validateForm(ev){
		ev.preventDefault();
		const { orgid, code, name, address } = this.state;

		if((orgid == '0' || orgid == 0) && code.length == 0 && name.length == 0 && address.length == 0){
			Swal.fire(
				'Upps!',
				'Por lo menos debes de escojer una organizacion y diligenciar los campos codigo, nombre para continuar!',
				'warning'
			);
		}else if((orgid == '0' || orgid == 0)){
			Swal.fire(
				'Upps!',
				'Por lo menos debes de escojer una organizacion y diligenciar los campos codigo, nombre para continuar!',
				'warning'
			);			
		}else if(code.length == 0 || !this.expreNumber.test(code)){
			Swal.fire(
				'Upps!',
				'Por lo menos debes de escojer una organizacion y diligenciar los campos codigo, nombre para continuar!',
				'warning'
			);			
		}else if(name.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de escojer una organizacion y diligenciar los campos codigo, nombre  continuar!',
				'warning'
			);			
		}else{
			this.saveData();
		}
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

	render(){
		const { organization } = this.state;
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-block justify-content-between mb-2 p-0">
							<h2 className="mb-0">Sedes</h2>
							<h6 className="text-muted">En esta seccion puedes agregar una nueva sede a una Tienda</h6>									
						</div>
					</div>
					<div className="card-body pt-1">
						<div className="row pl-4 pr-4 mt-2">
							<form method="post" className="w-100 mt-0" onSubmit={(ev) => this.validateForm(ev)}>
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
											<label for="exampleInputNit">Codigo</label>
											<input type="text" className="form-control" id="exampleInputNit" aria-describedby="NitHelp" onChange={(ev) => this.validNumber('code',ev)}/>
											<small id="NitHelp" className="form-text text-muted">El codigo puede representar el numero del local o un valor que lo identifique</small>
										</div>
									</div>
								</div>
								<div className="form-group mb-3">
									<label for="exampleInputName">Nombre</label>
									<input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" onChange={(ev) => this.setState({name:ev.target.value})}/>									    
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
										   <input type="text" className="form-control" id="exampleInputPhone" aria-describedby="PhoneHelp" onChange={(ev) => this.setState({phone:ev.target.value})}/>
										   <small id="PhoneHelp" className="form-text text-muted">El valor para este campo debe ser numerico</small>									    
										</div>									
									</div>
								</div>
								<div className="form-group">
									<label for="exampleInputEmail">Email</label>
									<input type="text" className="form-control" id="exampleInputEmail" aria-describedby="EmailHelp" onChange={(ev) => this.validEmail('email',ev)}/>									    
									<div className="invalid-feedback">Upps! Debe de ingresar un correo electronico valido</div>
								</div>
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.validateForm(ev)}>Guardar Cambios</button>
									<Link to="/organization/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form>																									  
						</div>
					</div>
				</div>
		);
	}
}