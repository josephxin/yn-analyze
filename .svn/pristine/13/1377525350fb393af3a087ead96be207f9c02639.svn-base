import React from 'react';
import './DivBar.css';

const colorText = ['#ae3a42', '#df8019', '#ffd800'];
const colorLinear = [{
		startColor: '#eb461f',
		endColor: '#ff952d'
	},
	{
		startColor: '#ff9000',
		endColor: '#ffd200'
	},
	{
		startColor: '#ffbc48',
		endColor: '#fffeac'
	},
	{
		startColor: '#00a2ff',
		endColor: '#00fffc'
	}
];

const data = []
class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data
		};
	}

	_setData(d) {
		this.lock = true;
		this.setState({
			data: d
		});
	}

	createBar() {
		if (!this.lock) { return }
		const me = this;
		me.lock = false;
		const data = me.state.data
		return data.map((s, i) => {
			let color = '#fff';
			let bg = '';
			if(i < 3) {
				color = "#f2b661"
			}
			return(
				<li key={s.name} style={{
	          height: '.38rem',
	          display: 'flex',
	          justifyContent: 'space-between'
	        }}>
          <p className={'overflow-ellipsis'} style={{
            width: '0.9rem',
            paddingLeft: '.22rem',
            lineHeight: '.38rem',
            textAlign: 'left',
            color: color,
          }} title={s.name.length >= 6 ? s.name : ''}>{s.name}</p>
          <p className={'overflow-ellipsis'} style={{
            width: '.7rem',
            lineHeight: '.38rem',
            textAlign: 'right',
            color: color,
          }} title={s.value.toString().length>5?(s.value+'起'):''}>{s.value}起</p>
          <div style={{
            flex: 1,
            margin: '0 .1rem',
            padding: '0.13rem .1rem 0',
            background: 'repeating-linear-gradient(-30deg, rgba(0,163,254,.1) 0%, rgba(0,163,254,.2) 0.5%,rgba(0,163,254,.2) 1%, rgba(0,163,254,.1) 1.5%)'
          }}>
          	<div style={{
          		border:'0.01rem solid #2da8ff',
          		borderRadius:'.1rem',
          		height: '.12rem',
          		boxSizing: 'border-box',
          		padding: '.016rem'
          	}}>
          		<div style={{
		              height: '100%',
		              background: '#185caf'
		            }}>
		            <p className={'linear'} style={{
		              width: Number(s.rate) + '%'
		            }}></p>
	            </div>
            </div>
          </div>
          <p style={{
            width: '.8rem',
            lineHeight: '.38rem',
            textAlign: 'left',
            color: color
          }}>{s.rate}%</p>
        </li>
			);
		})
	}

	createBarTwo() {
		if(!this.lock) {
			return
		}
		const me = this;
		me.lock = false;
		const data = me.state.data;
		let count = 0;
		data.forEach(s => {
			count += Number(s.value);
		});
		if(count === 0) {
			count = 1;
		}
		return data.map((s, i) => {
			let color = '#fff';
			let bg = '';
			let prefix=''
			if(i < 3) {
				color = "#f2b661"
				prefix='TOP'
			}
			return(
        <li key={s.name} style={{
	          height: '.38rem',
	          display: 'flex',
	          justifyContent: 'space-between'
	        }}>
        	<p style={{
            width: '.5rem',
            lineHeight: '.38rem',
            textAlign: 'center',
            color: color,
            marginLeft: '.2rem',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>{prefix + (i + 1)}</p>
          <p className={'overflow-ellipsis'} style={{
            width: '0.9rem',
            paddingLeft: '.22rem',
            lineHeight: '.38rem',
            textAlign: 'left',
            color: color,
          }} title={s.name.length >= 6 ? s.name : ''}>{s.name}</p>
          <div style={{
            flex: 1,
            margin: '0 .1rem',
            padding: '0.13rem .1rem 0',
            background: 'repeating-linear-gradient(-30deg, rgba(0,163,254,.1) 0%, rgba(0,163,254,.2) 0.5%,rgba(0,163,254,.2) 1%, rgba(0,163,254,.1) 1.5%)'
          }}>
          	<div style={{
          		border:'0.01rem solid #2da8ff',
          		borderRadius:'.1rem',
          		height: '.1rem',
          		boxSizing: 'border-box',
          		padding: '.016rem'
          	}}>
          		<div style={{
		              height: '100%',
		              background: '#185caf'
		            }}>
		            <p className={'linear'} style={{
		              width: Number(s.value) * 100 / count + '%',
		            }}></p>
	            </div>
            </div>
          </div>
         	<p className={'overflow-ellipsis'} style={{
            width: '.7rem',
            lineHeight: '.38rem',
            textAlign: 'right',
            color: color,
            marginRight: '.3rem'
          }} title={s.value.toString().length>5?(s.value+'起'):''}>{s.value}起</p>
        </li>
			);
		})
	}

	listControl(index) {
		switch(index) {
			case 2:
				return this.createBarTwo();
			default:
				return this.createBar();
		}
	}

	render() {
		const me = this;
		return(
			<div className={'frame-style' + ' ' + me.props.name}>
        <ul style={{
		      fontSize:' 0.14rem',
		      color: 'rgb(255, 255, 255)',
        }} ref={'pageRef'}>
          {me.listControl(me.props.type)}
        </ul>
      </div>
		);
	}
};

export default Page;