import React from "react";
import { Link } from "react-router";

export default class RootContainer extends React.Component {
	render() {
		return (<div> RootContainer
			<Link to="/second">second</Link>
			<Link to="/third">third</Link> 
			<Link to="/fourth">fourth</Link>
			{this.props.children}
		</div>)
	}
}