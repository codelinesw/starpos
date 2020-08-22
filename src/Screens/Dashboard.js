import React from 'react';

import Header from '../Components/Header';
import adidas from '../Images/adidas.jpeg';
import nike from '../Images/nike.jpg';
import LineChart_ from "../Components/LineChart_";
import PieChart_ from "../Components/PieChart_";
export default class Dashboard extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
		//document.body.style.backgroundColor = "red";
	}
	render(){
		return(
					<div className="card border-0 mt-1">
						<div className="card-header bg-gray">
							<div className="row p-0">
								<div className="col-sm-3">
								  <div className="card">
								    <div className="card-body">
								      <h5 className="card-title mb-1">1500</h5>
								      <p className="card-text mb-1">Total de Ordenes</p>
								      <a href="#" className="btn btn-primary">Ver mas</a>
								    </div>
								  </div>
								</div>
								<div className="col-sm-3">
								  <div className="card">
								    <div className="card-body">
								      <h5 className="card-title mb-1">450</h5>
								      <p className="card-text mb-1">Total de Ventas</p>
								      <a href="#" className="btn btn-primary">Ver mas</a>
								    </div>
								  </div>
								</div>
								<div className="col-sm-3">
								   <div className="card">
								     <div className="card-body">
								       <h5 className="card-title mb-1">2.500.000</h5>
								       <p className="card-text mb-1">Total de Ingresos</p>
								       <a href="#" className="btn btn-primary">Ver mas</a>
								     </div>
								   </div>
								</div>
								<div className="col-sm-3">
								   <div className="card">
								     <div className="card-body">
								       <h5 className="card-title mb-1">$500.000</h5>
								       <p className="card-text mb-1">Total de Gastos</p>
								       <a href="#" className="btn btn-primary">Ver mas</a>
								     </div>
								   </div>
								  </div>								  								  
								</div>							
							</div>
							<div className="card-body bg-gray">
								<div className="row row-cols-1 row-cols-md-3 justify-content-between">
									<div className="col col-md-7 shadow bg-white p-3 ml-3">
									 	<LineChart_ />
									</div>
									<div className="col col-md-4 shadow bg-white p-3 mr-3" style={{maxWidth:'385px'}}>
									 	<PieChart_ />
									</div>									 					  
							</div>
						</div>
					</div>
		);
	}
}