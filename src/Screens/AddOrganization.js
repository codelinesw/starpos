import React from 'react';
import {
 Redirect,
 Link
} from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import Swal from 'sweetalert2';

export default class Products extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nit:'',
	  	name:'',
	  	address:'',
	  	phone:'',
	  	mobilephone:''
	  };

	  this.expreNumber = /^([0-9])*$/;
	  this.expreEmail  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
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
		let URL = `http://localhost:8089/ORM/organization_/add/`;
		const { nit, name , address, phone, mobilephone, email } = this.state;
		let data = new FormData();
		data.append('nit',nit);
		data.append('name',name);
		data.append('address',address);
		data.append('phone',phone);
		data.append('mobilephone',mobilephone);
		data.append('email',email);
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
					'felicidades! la organizacion se ha creado correctamente',
					'success'
				);
   			}else{
   				Swal.fire(
					'Upps!',
					'Error! Se ha generado un error al crear la organizacion, por favor vuelva a intentar',
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
		const { nit , name , address , phone , mobilephone } = this.state;

		if(nit.length == 0 && name.length == 0 && address.length == 0 && phone.length == 0 && mobilephone.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(nit.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(name.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(address.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(phone.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(mobilephone.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else{
			this.saveData();
		}
	}

	render(){
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-block justify-content-between mb-2 p-0">
							<h2 className="mb-0">Tiendas</h2>
							<h6 className="text-muted">En esta seccion puedes agregar una nueva tienda al sistema</h6>									
						</div>
					</div>
					<div className="card-body pt-1">
						<div className="row pl-4 pr-4 mt-2">
							<form method="post" className="w-100 mt-0" onSubmit={(ev) => this.validaForm(ev)}>
								<div className="row">
									<div className="col">
										<div className="form-group mb-1">
									 		<label for="exampleInputNit">Nit</label>
									 		<input type="text" className="form-control" id="exampleInputNit" aria-describedby="NitHelp" onChange={(ev) => this.validNumber('nit',ev)} />
									 		<small id="NitHelp" className="form-text text-muted invalid-feedback">Identificacion de la organizacion(Empresa), debe ser numerico</small>									 		
										</div>
									</div>
									<div className="col">
										<div className="form-group mb-1">
									 		<label for="exampleInputName">Nombre</label>
									 		<input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" onChange={(ev) => this.setState({name:ev.target.value})}/>									    
										</div>
									</div>
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
								<div className="row mb-3">
									<div className="col">
										<div className="form-group mb-1">
											<label for="exampleInputMovil">Celular</label>
											 <input type="text" className="form-control" id="exampleInputMovil" aria-describedby="MovilHelp" onChange={(ev) => this.validNumber('mobilephone',ev)}/>
											 <small id="MovilHelp" className="form-text text-muted">El valor para este campo debe ser numerico</small>									    											 
										</div>
									</div>
									<div className="col">
										<div className="form-group">
											 <label for="exampleInputEmail">Email</label>
											 <input type="text" className="form-control" id="exampleInputEmail" aria-describedby="EmailHelp" onChange={(ev) => this.validEmail('email',ev)} />									    
											 <div className="invalid-feedback">Upps! Debe de ingresar un correo electronico valido</div>
										</div>
									</div>
								</div>
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.validaForm(ev)}>Guardar Cambios</button>
									<Link to="/organization/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form>																									  
						</div>
					</div>
				</div>
		);
	}
}