import React from 'react';
import { Link } from  'react-router-dom';


export default class SideBar extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	getCurrentRoute(){
		let CurrentRoute = window.location.href;
		CurrentRoute = CurrentRoute.split('/');

		if(CurrentRoute.length >= 3){
			return CurrentRoute[3];
		}
	}

	addClass(ev){
		let btnOptions = document.querySelectorAll('._normal_');
		
		[].forEach.call(btnOptions, (item ,index) => {
			item.classList.remove('_active_');
		});
		if(ev.target.tagName === 'I'){
			ev.target.parentElement.classList.add('_active_');
		}else{
			ev.target.classList.add('_active_');
		}
	}
	render(){
		return(
				<nav className="nav flex-column">
					<Link className={this.getCurrentRoute() === 'dashboard' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/dashboard/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-house-user mr-2"></i> INDICADORES</Link>
					<Link className={this.getCurrentRoute() === 'organization' || this.getCurrentRoute() === 'addorganization' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/organization/" onClick={(ev) => this.addClass(ev)}> <i className="far fa-building mr-2"></i> TIENDAS</Link>
					<Link className={this.getCurrentRoute() === 'facilities' || this.getCurrentRoute() === 'addfacilities' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/facilities/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-sitemap mr-2"></i> SEDES</Link>
					<Link className={this.getCurrentRoute() === 'employees' || this.getCurrentRoute() === 'addemployees' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/employees/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-users mr-2"></i> EMPLEADOS</Link>
					<div className="dropdown-divider"></div>
					<Link className={this.getCurrentRoute() === 'categories' || this.getCurrentRoute() === 'addcategories' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/categories/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-boxes mr-2"></i> CATEGORIAS</Link>
					<Link className={this.getCurrentRoute() === 'products' || this.getCurrentRoute() === 'addproducts' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/products/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-box-open mr-2"></i> PRODUCTOS</Link>
					<Link className={this.getCurrentRoute() === 'sales' || this.getCurrentRoute() === 'addsales' ?'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/sales/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-chart-area mr-2"></i> VENTAS</Link>
					<Link className={this.getCurrentRoute() === 'domiciles' || this.getCurrentRoute() === 'adddomiciles' ? 'nav-link option-nav _normal_ d-flex _active_' : 'nav-link option-nav _normal_ d-flex'} to="/domiciles/" onClick={(ev) => this.addClass(ev)}> <i className="fas fa-shopping-cart mr-2"></i> DOMICILIOS</Link>
				</nav>
		);
	}
}