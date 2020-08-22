
import React from 'react';
import icon from '../Images/leaves.png';

export default class Header extends React.Component{

	componentDidMount(){

	}
	render(){
		return(
			<header className="header-main d-flex justify-content-between w-100 shadow-sm bg-white">
				<div className="col col-md-2 bg-dark-new">
					<div className="d-flex p-2">
						<img src={icon} width="35" height="35" className="mr-2"/>
						<p className="text-light mt-1 title-company">StarPos</p>
					</div>
				</div>
				<ul className="nav d-flex justify-content-end align-items-center">
					  <li className="nav-item">
					    <a className="nav-link" href="#"><i className="fas fa-bell text-muted icon-bell"></i></a>
					  </li>
					  <li className="nav-item">
					    <a className="nav-link d-flex text-muted s" href="#" tabIndex="-1" aria-disabled="true">Jhon Denver Murillo</a>
					  </li>
				</ul>
			</header>
		);
	}
}