import React from 'react';
import { Link } from  'react-router-dom';


export default class Header extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">			  
			  <div className="form-group mb-3 d-flex align-items-center">
				<Link to="/addproducts/" className="btn btn-secondary mr-2"><i className="fas fa-arrow-left"></i></Link>
				<h6 className="text-dark position-relative" style={{top:'3px'}}>Regresar</h6>
			  </div>
			</nav>
		);
	}
}