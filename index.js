import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import RootContainer from "./components/RootContainer/index";
//import SecondContainer from "./components/SecondContainer/index";
import Routes from "./routes";
import styles from './styles.android.css';
//import styles1 from './styles.android.1.css';
//import styles2 from './styles.android.2.css';

// let routes = (
//     <Router history={browserHistory}>
// 		<Route path="/" name="mypage" component={RootContainer}>
// 			<Route path="second" name="homepage" component={SecondContainer}/>
// 		</Route>
//     </Router>
// );

window.addEventListener('DOMContentLoaded', () => {
	let container = document.createElement('div');
	container.id = name;
	document.body.appendChild(container);
//	ReactDOM.render(Routes, container);
	ReactDOM.render(<Router routes={Routes} history={browserHistory}/>, container);
});
