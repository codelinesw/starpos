import React from 'react';
import { Link } from  'react-router-dom';
import Swal from 'sweetalert2';

export default class TextBox extends React.Component{
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	disabledButton:true
	  };
	  this.charactersCode = ['&#47;','&#60;','&#62;'];
	  this.characters 	  = ['/','<','>'];
	}

	changeStyle(ev){
		ev.target.classList.add('focus');
	}

	removeFormat(ev){
		let text = ev.target.textContent;
		if(text.length < 1){
			ev.target.classList.remove('focus');
		}else{
			console.log(text.length);
			if(text.length > 25){
				document.querySelector('.btnsavedes').disabled = false;
				this.setState({disabledButton:false});
				document.querySelector('.btnsavedes').classList.remove('disabled_');
			}else{
				document.querySelector('.btnsavedes').disabled = true;
				this.setState({disabledButton:true});
				document.querySelector('.btnsavedes').classList.add('disabled_');
			}
			ev.target.classList.add('focus');
		}
		
	}

	addActiveClass(ev,index_){
		let btns = document.querySelectorAll('.btnoptions_');
		[].forEach.call(btns,( item , index ) => {
			console.log(item.className + ' === ' + ev.target.className);
			if(index === index_){
				item.classList.toggle('activeoptions');
			}else{
				item.classList.remove('activeoptions');
			}
		});
	}
	getFormat(ev,format,index){
		console.log(format);
		if(index == 1 || index == 2 || index == 8){
			document.querySelector('.textbox').classList.add('focus');
			document.querySelector('.textbox').focus();
			document.execCommand('formatBlock',false,format);
		}else{
			document.querySelector('.textbox').classList.add('focus');
			document.querySelector('.textbox').focus();
			document.execCommand(format,false,null);
		}
		this.addActiveClass(ev,index);
		
	}

	saveDescription(ev){
		ev.preventDefault();
		console.log('save description');
		if(document.getElementById('textbox').textContent.length > 254){
			if(localStorage.getItem('des_pecommerce')){
				let text = document.getElementById('textbox').innerHTML;
				text = text.replace(/\</g,this.charactersCode[1]).replace(/\//g,this.charactersCode[0]).replace(/\>/g,this.charactersCode[2]);
			 	localStorage.setItem('des_pecommerce',text);
			 	Swal.fire(
					'Felicidades!',
					'La descripcion del producto se ha agregado correctamente',
					'success'
				);
			}else{
			 	let text = document.getElementById('textbox').innerHTML;
			 	text = text.replace(/\</g,this.charactersCode[1]).replace(/\//g,this.charactersCode[0]).replace(/\>/g,this.charactersCode[2]);
			 	localStorage.setItem('des_pecommerce',text);
			 	Swal.fire(
					'Felicidades!',
					'La descripcion del producto se ha agregado correctamente',
					'success'
				);
			}
		}else{
			Swal.fire(
				'Upps!',
				'Debe por lo menos digitar una descripcion de por lo menos 255 caracteres para poder guardar y continuar!',
				'warning'
			);
		}
	}

	render(){
		const { disabledButton } = this.state;
		return(
			<div className="m-auto mb-5 bg-white roundeds w-100">
				<div className="card">
				 	<div className="card-header bg-white d-flex justify-content-between">
				 		<div className="btn-group" role="group" aria-label="...">
				 			<button type="button" className="btn tnormal btnoptions_" style={{fontSize:'15px'}} onClick={(ev) => this.getFormat(ev,'undo',0)}><i className="fas fa-remove-format"></i></button>
				 			<button type="button" className="btn btnoptions_" onClick={(ev) => this.getFormat(ev,'H1',1)}>H1</button>
				 			<button type="button" className="btn btnoptions_ tnormal" onClick={(ev) => this.getFormat(ev,'H2',2)}>H2</button>
				 			<button type="button" className="btn btnoptions_ tnormal" onClick={(ev) => this.getFormat(ev,'bold',3)}>B</button>
				 			<button type="button" className="btn tnormal btnoptions_ font-italic " style={{fontSize:'15px'}} onClick={(ev) => this.getFormat(ev,'italic',4)}><i className="fas fa-italic"></i></button>
				 			<button type="button" className="btn tnormal btnoptions_" style={{fontSize:'15px'}} onClick={(ev) => this.getFormat(ev,'underline',5)}><i className="fas fa-underline position-relative" style={{top:'1px'}}></i></button>
				 			<button type="button" className="btn tnormal btnoptions_" style={{fontSize:'16px'}} onClick={(ev) => this.getFormat(ev,'insertUnorderedList',6)}><i className="fas fa-list-ul"></i></button>
				 			<button type="button" className="btn tnormal btnoptions_" style={{fontSize:'16px'}} onClick={(ev) => this.getFormat(ev,'insertorderedlist',7)}><i className="fas fa-list-ol"></i></button>
				 			<button type="button" className="btn tnormal btnoptions_" style={{fontSize:'16px'}} onClick={(ev) => this.getFormat(ev,'blockquote',8)}><i className="fas fa-quote-right"></i></button>
				 		</div>
				 		<button type="button" className="btn btn-primary btnsavedes disabled_" disabled={disabledButton} onClick={(ev) => this.saveDescription(ev)}>Guardar</button>
					</div>
					<div className="card-body">
						<div className="textbox" id="textbox" contentEditable="true" onFocus={(ev) => this.changeStyle(ev)} onInput={(ev) => this.removeFormat(ev)}>

						</div>
					</div>					
				</div>
			</div>
		);
	}
}