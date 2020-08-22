import React from 'react';
import { Link } from  'react-router-dom';
import Header from '../Components/WriteDoc/Header';
import TextBox from '../Components/WriteDoc/TextBox';

export default class WriteDoc extends React.Component{

 constructor(props) {
   super(props);
 
   this.state = {};
 }

 render(){
 	return(
 		<div className="container-fuild">
 			<Header/>
 			<TextBox />
 		</div>
 	);
 }

}