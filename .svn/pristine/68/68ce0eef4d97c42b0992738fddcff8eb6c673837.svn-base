import React from 'react';

/*
 * 隐患事故关联分析
 * @author joseph_xin
 */
class CompanyChildrenName extends React.Component {

	constructor() {
		super();
		let me = this;
		me.state = {
			text:''
		}
		me.companyChildren = {
		    color: '#FFF',
		    width: '5.4rem',
		    height:'0.2rem',
		    margin:".35rem auto 0",
		    fontSize:'0.14rem',
		    overflow: 'hidden',
		    whiteSpace: 'nowrap',
		    textOverflow: 'ellipsis',
		}
	}	
	setData(text){
		let me = this
		me.setState({
			text
		})
	}
	render() {
		let me = this;
		return(
			<div style={me.companyChildren}>事故原因:{
				me.state.text
			}</div>
		)
	};
	componentDidMount() {
	}







}

export default CompanyChildrenName;