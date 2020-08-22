import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';

export default class Products extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	products:[],
	  	typeRender:'Grid'
	  };
	}

	componentDidMount(){
		this.getProducts();
	}

	shortDescription(text){
		text = text.replace(/\&#60;h2&#62;Descripcion&#60;&#47;h2&#62;&#60;div&#62;/g,'');
		console.log(text.length <= 68);
		if(text.length >= 68){
			return text = `${text.substring(0,68)}...`;
		}else{
			return text;
		}
	}

	getFormatNumber(num){
		num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		return num;
	}

	renderList(item , index){
		if(item == '' || item === undefined || item === null){

		}else{
			return(<tr>
						<th scope="row">{index+1}</th>
						<th style={{width:'45%'}}>
							<div className="media">
								<a className="thumbnail pull-left" href="#"> <img className="media-object" src={nike} style={{width:'72px',height:'72px',borderRadius:'8px'}} /></a>
								<div className="media-body">
									<h4 className="media-heading mb-0 ml-3"><a href="#" className="text-dark">{item.name}</a></h4>
									<h5 className="media-heading mb-0 ml-3 text-muted"> De: <a href="#" style={{fontSize:'17px'}}>{item.orgname}</a></h5>
									<span className="ml-3 text-muted">Cantidad disponible: </span><span className="text-dark"><strong>{item.qty}</strong></span>
					            </div>
					       </div>
					   	</th>
					    <th className="text-center"><strong>${this.getFormatNumber(item.purprice)}</strong></th>
					    <th className="text-center"><strong>${this.getFormatNumber(item.saleprice)}</strong></th>
					    <th className="d-flex">
					     <button type="button" className="btn btn-warning mr-2">Editar</button>
					     <button type="button" className="btn btn-danger">Eliminar</button>
					    </th>
				</tr>);
		}
	}

	renderGrid(item, index){
		if(item === '' || item === undefined || item === null){

		}else{ 
			return(<div className="card border-0 mb-3" key={(index+1)}>
						<img src={nike} className="card-img-top img-product" alt="..." />
						<div className="card-body">
							<h5 className="card-title mb-1">{item.name}</h5>
							<h6 className="card-text  mb-1 text-dark text-price poppins-extrabold">${this.getFormatNumber(item.saleprice)}</h6>
							<p className="card-text text-muted mb-1">{this.shortDescription(item.description)}</p>
							<p className="card-text"><small className="text-muted">Cantidad disponible <b>{item.qty}</b></small></p>
						</div>
					</div>
			);
		}
	}

	getProducts(){
		const URL = 'http://localhost:8089/ORM/products_/listfororganization/';
		let data = new FormData();
		data.append('orgid',1);
		data.append('facid',1);
		fetch(URL,{
			method:'POST',body:data
		})
		.then(res => res.json())
		.then(res => {
			console.log(res);
			if(Array.isArray(res)){
				if(!res[0].hasOwnProperty('response')){
					this.setState({products:res});
				}
			}
		})

	}

	changeView(e,typeview){
		e.preventDefault();
		if(typeview === 'Grid'){
			document.querySelector('.btngrid').classList.remove('btn-light');
			document.querySelector('.btngrid').classList.add('btn-secondary');
			document.querySelector('.btnlist').classList.remove('btn-secondary');
			document.querySelector('.btnlist').classList.add('btn-light');
		}else{
			document.querySelector('.btngrid').classList.remove('btn-secondary');
			document.querySelector('.btngrid').classList.add('btn-light');
			document.querySelector('.btnlist').classList.remove('btn-light');
			document.querySelector('.btnlist').classList.add('btn-secondary');
		}
		this.setState({typeRender:typeview});
	}
	render(){
		const { products, typeRender } = this.state;
		return(
				<div className="card border-0 mt-1">
					<div className="card-header bg-transparent">
						<div className="d-flex justify-content-between mb-2 p-0">
							<h2 className="mb-3">Productos</h2>
							<Link to="/addproducts/" className="btn btn-primary" style={{height:'42px'}}>+ Agregar</Link>
						</div>
						<div className="search-bar">
							<div className="input-group mb-3">
								<div className="input-group-append">
									<button className="btn bg-transparent" type="button" id="button-addon1"><i className="fas fa-search"></i></button>
								</div>									
								<input type="text" className="form-control" placeholder="Busca un producto..." aria-label="Recipient's username" aria-describedby="button-addon2" />
								</div>
							</div>
							<div className="filters">

							</div>
						</div>
						<div className="card-body">
						    <div className="w-100 mb-4 d-flex justify-content-end">
								<div className="btn-group mr-2" role="group" aria-label="First group">
						    		<button type="button" className="btn btn-secondary btngrid" onClick={(ev) => this.changeView(ev,'Grid')}><i className="fas fa-th"></i></button>
						    		<button type="button" className="btn btn-light border-2 btnlist" onClick={(ev) => this.changeView(ev,'List')}><i className="fas fa-bars"></i></button>
						  		</div>
						    </div>
							<div className={typeRender === 'Grid' ? "row row-cols-1 row-cols-md-3" : "row w-100"}>
								{typeRender !== 'Grid' ? <table class="table">
								  <thead>
								    <tr>
								      <th scope="col">#</th>
								      <th scope="col">Producto</th>
								      <th scope="col">Precio de compra</th>
								      <th scope="col">Precio de venta</th>
								      <th scope="col">Acciones</th>
								    </tr>
								  </thead>
								  <tbody>
								  	{products.map((item, index) => {
								  		return this.renderList(item,index)
								  	})}
								  </tbody>
								</table>
								: products.map((item ,index) => {
									return this.renderGrid(item,index);
								})}
																  
							</div>
						</div>
					</div>
		);
	}
}