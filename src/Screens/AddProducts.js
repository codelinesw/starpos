import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import importimag from '../Images/buttons/add-image.png';
import Swal from 'sweetalert2';
import TextBox from '../Components/WriteDoc/TextBox';
export default class AddCategories extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	showSecondForm:true,
	  	organization:[''],
	  	orgid:'0',
	  	code:'',
	  	name:'',
	  	purprice:'',
	  	salesprice:'',
	  	qty:'',
	  	description:'',
	  	fileone:'',
	  	filetwo:'',
	  	filethree:'',
	  	filefour:''
	  };

	  this.expreNumber = /^([0-9])*$/;
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

	showForm(){
		const { showSecondForm } = this.state;
		if(showSecondForm){
			this.setState({showSecondForm:false});
		}else{
			this.setState({showSecondForm:true});
		}
	}


	renderItems(item,index){
		if(item === '' || item === undefined || item === null){

		}else{
			return(<option value={item.organization_id} key={index+1}>{item.name}</option>);
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

	validNumber(item,input){
	    let num = (input.target.value == "") ? 0 : input.target.value;
	    num = (num == null) ? 0 : num;
	    if(num.length > 0){
	    	if(isNaN(parseInt(num))){
	    	 input.target.classList.add('is-invalid');
		    }else{
		    	num = num.replace(/\./g,'');
		    	num = num.toString();
		    	num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		    	input.target.classList.remove('is-invalid');
				let obj = `[{"${item}":"${num}"}]`;
				console.log(obj);		
				this.setState(JSON.parse(obj)[0]);
				input.target.value = num;
		    }
	    }

	}

	ExistsOneFile(data){
		let count = 0;
		data.forEach((item, index) => {
			if(item === ''){
				count++;
			}
		});

		if(count < 4){
			return true;
		}else{
			return false;
		}
	}

	validateForm(ev){
		ev.preventDefault();
		const { fileone, filetwo, filethree, filefour, orgid, code, name, purprice} = this.state;
		let data = [fileone,filetwo,filethree,filefour];
		if((orgid === '0' || orgid == 0) && (this.ExistsOneFile(data)) && code.length == 0 && name.length == 0 && purprice.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto y tambien diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(!this.ExistsOneFile(data)){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto para poder continuar!',
				'warning'
			);
		}else if((orgid === '0' || orgid == 0)){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto y tambien diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(code.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto y tambien diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(name.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto y tambien diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else if(purprice.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de escojer por lo menos una imagen para el producto y tambien diligenciar todos los campos para poder continuar!',
				'warning'
			);
		}else{
			//alert('show other form');
			this.showForm(ev);
		}	
	}

	saveData(ev){
		ev.preventDefault();
		const { fileone, filetwo, filethree, filefour, orgid, code, name, purprice, salesprice, qty } = this.state;
		let description = localStorage.getItem('des_pecommerce');
		if(salesprice.length == 0 && qty.length == 0 && (description === '' || description === null || description === 'undefined')){
			Swal.fire(
				'Upps!',
				'Debes de todos los campos para poder continuar1!',
				'warning'
			);			
		}else if(salesprice.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de todos los campos para poder continuar2!',
				'warning'
			);
		}else if(qty.length == 0){
			Swal.fire(
				'Upps!',
				'Debes de todos los campos para poder continuar3!',
				'warning'
			);
		}else if((description === '' || description === null || description === 'undefined')){
			Swal.fire(
				'Upps!',
				'Debes de todos los campos para poder continuar4!',
				'warning'
			);			
		}else{
			let data = new FormData();
			data.append('orgid',orgid);
			data.append('code',code);
			data.append('name',name);
			data.append('purprice',purprice);
			data.append('imgI',fileone);
			data.append('imgII',filetwo);
			data.append('imgIII',filethree);
			data.append('imgIV',filefour);
			data.append('saleprice',salesprice);
			data.append('countav',qty);
			data.append('description',description);
			const URL = 'http://localhost:8089/ORM/products_/add/';
			fetch(URL,{
				method:'POST',
				body:data
			})
			.then(res => res.text())
			.then(res => {
				console.log(res);
				if(res === 'success'){
					Swal.fire(
						'Felicidades!',
						'El producto se ha creado correctamente, puedes visualizarlo en tu inventario',
						'success'
					);
				}else{
					Swal.fire(
						'Error!',
						'Ha ocurrido un error al intentar crear el producto, puedes intentar nuevamente mas tarde!',
						'error'
					);
				}
			})
		}
	}

	validNumber_(item,input){
		console.log('holius');
	    if(!this.expreNumber.test(input.target.value)){
			input.target.classList.add('is-invalid');
		}else{
			input.target.classList.remove('is-invalid');
			let obj = `[{"${item}":"${input.target.value}"}]`;				
			this.setState(JSON.parse(obj)[0]);
		}
	}

	redirect(ev){
		ev.preventDefault();
		const { 
			orgid,
		  	code,
		  	name,
		  	purprice,
		  	salesprice,
		  	qty,
		  	description,
		  	fileone,
		  	filetwo,
		  	filethree,
		  	filefour
		} = this.state;
		console.log(fileone);
		localStorage.setItem('infoP',JSON.stringify([{
			fileone:fileone
		 }]));

		//this.props.history.push('/writedescription/');
	}

	render(){

		const { showSecondForm, organization, code, purprice } = this.state;

		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-block justify-content-between mb-2 p-0">
							<h2 className="mb-0">Productos</h2>
							<h6 className="text-muted">En esta seccion puedes agregar un nuevo producto a una Tienda</h6>									
						</div>
					</div>
					<div className="card-body pt-1">
						<div className="row pl-4 pr-4 mt-0">
							{showSecondForm ? <form method="post" className="w-100 mt-2">
								<label htmlFor="">Escoje una imagen para el producto</label>
								<div className="row">
									<div className="col col-md-2">
										<div className="form-group mb-3 mt-3">
											<div className="box-choose-image text-center">												
												<div className="button-choose-file btn btn-chooseimage">
													<input type="file" className="choose-image inputchoose-image" id="choose-imageI" name="imgI" onChange={(ev) => this.setState({fileone:ev.target.files[0]})}/>
													<label htmlFor="choose-imageI" className="btn btn-chooseimage"><img src={importimag} width="50" height="50" /></label>
													<img src={adidas} className="imgview" />
												</div>
											</div>
										</div>
									</div>																	
									<div className="col col-md-2">
										<div className="form-group mb-3 mt-3">
											<div className="box-choose-image text-center">												
												<div className="button-choose-file btn btn-chooseimage">
													<input type="file" className="choose-image inputchoose-image" id="choose-imageII" name="imgII" onChange={(ev) => this.setState({filetwo:ev.target.files[0]})}/>
													<label htmlFor="choose-imageII" className="btn btn-chooseimage"><img src={importimag} width="50" height="50" /></label>
													<img src={adidas} className="imgview" />
												</div>
											</div>
										</div>
									</div>									
									<div className="col col-md-2">
										<div className="form-group mb-3 mt-3">
											<div className="box-choose-image text-center">												
												<div className="button-choose-file btn btn-chooseimage">
													<input type="file" className="choose-image inputchoose-image" id="choose-imageIII" name="imgIII" onChange={(ev) => this.setState({filethree:ev.target.files[0]})}/>
													<label htmlFor="choose-imageIII" className="btn btn-chooseimage"><img src={importimag} width="50" height="50" /></label>
													<img src={adidas} className="imgview" />
												</div>
											</div>
										</div>
									</div>
									<div className="col col-md-2">
										<div className="form-group mb-3 mt-3">
											<div className="box-choose-image text-center">												
												<div className="button-choose-file btn btn-chooseimage">
													<input type="file" className="choose-image inputchoose-image" id="choose-imageIV" name="imgIV" onChange={(ev) => this.setState({filefour:ev.target.files[0]})}/>
													<label htmlFor="choose-imageIV" className="btn btn-chooseimage"><img src={importimag} width="50" height="50" /></label>
													<img src={adidas} className="imgview" />
												</div>
											</div>
										</div>
									</div>																	
								</div>
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
										<div><label htmlFor="exampleInputNit">Codigo</label></div>
										<div className="input-group">
										  <input type="text" className="form-control" id="exampleInputcode" aria-describedby="codeHelp" value={code} onChange={(ev) => this.setState({code:ev.target.value})}/>
										  <div className="input-group-append">
										    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(ev) => this.generateCode(ev)}>GENERAR</button>
										  </div>
										</div>
										<small id="codeHelp" className="form-text text-muted">Codigo del producto,este se puede ingresar o generarse</small>
									</div>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="exampleInputName">Nombre</label>
									<input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" onChange={(ev) => this.setState({name:ev.target.value})}/>									    
								</div>
								<div className="form-group mb-3">
									<label htmlFor="exampleInputPurprice">Precio de Compra</label>
									<input type="text" className="form-control" id="exampleInputPurprice" aria-describedby="PurpriceHelp" onChange={(ev) => this.validNumber('purprice',ev)}/>									    
									<div className="invalid-feedback">El valor a ingresar debe ser solo numerico</div>
								</div>															
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.validateForm(ev)}>Guardar y Continuar</button>
									<Link to="/products/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form> : <form method="post" className="w-100 mt-2">
								<div className="form-group mb-3 d-flex align-items-center">
									<button type="button" className="btn btn-secondary mr-2" onClick={(ev) => this.showForm(ev)}><i class="fas fa-arrow-left"></i></button>
									<h6 className="text-dark position-relative" style={{top:'3px'}}>Regresar al formulario anterior</h6>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="exampleInputNit">Precio de Venta</label>
									<input type="text" className="form-control" id="exampleInputSalesprice" aria-describedby="SalespriceHelp" onChange={(ev) => this.validNumber('salesprice',ev)}/>
									<div className="invalid-feedback">El valor a ingresar debe ser solo numerico</div>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="exampleInputQty">Cantidad disponible</label>
									<input type="number" className="form-control" id="exampleInputQty" aria-describedby="QtyHelp" onChange={(ev) => this.setState({qty:ev.target.value})}/>									    
									<div className="invalid-feedback">El valor a ingresar debe ser solo numerico</div>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="exampleInputName">Descripción</label>
									<TextBox />
								</div>															
								<div className="button-group d-flex">									  									  									  
									<button type="submit" className="btn btn-primary mr-2" onClick={(ev) => this.saveData(ev)}>Guardar Cambios</button>
									<Link to="/products/" className="btn btn-warning">Ver todos</Link>
								</div>
							</form>}																									  
						</div>
					</div>
				</div>
		);
	}
}