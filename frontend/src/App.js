import React  from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

class SumIn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value1: "",
			value2: "",
			sum: "",
		};
		this.sumCall=this.sumCall.bind(this);
		this.handleSum1=this.handleSum1.bind(this);
		this.handleSum2=this.handleSum2.bind(this);
	}
	handleSum1(event){
		this.setState({value1: event.target.value})
		console.log("Handle1: "+ event.target.value)
	}
	handleSum2(event) {
		this.setState({value2: event.target.value})
		console.log("Handle2: "+ event.target.value)
	}

	render() {
		return (
			<div>
				<input type="number" onChange={this.handleSum1}/><br/>
				<input type="number" id="sum2" onChange={this.handleSum2}/><br/>
				<button onClick={this.sumCall}>Sum</button>

				<h1>{this.state.sum}</h1>
			</div>
		);
	}

	async sumCall(event){
		const url="http://127.0.0.1:8000/api/sum/";
		var sum1 = this.state.value1;
		var sum2 = this.state.value2;
		console.log(this.state.value1 + " " + this.state.value2)
		const res = await fetch(url+sum1+"/"+sum2).then((response) => {
			return response.json();
		})
		console.log(res['result']);xampp
		this.setState({sum:res['result']})
	}
	
}
// function App() {

//   const [items, setItems] = useState(null)

//   useEffect(() => {
//     fetch('http://localhost:8000/items')
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         setItems(data);
//       })
//   }, [])

//   return (
//     <div className="App">
//       {items && <BlogList blogs={items} />}
//     </div>
//   );
// }

export default SumIn;
