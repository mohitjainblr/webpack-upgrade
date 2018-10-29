import  RootContainer from './components/RootContainer/index';
const asyncComponent = bundle => (location, cb) => {
	bundle().then(component => {
		cb(null, component.default ? component.default : component);
	});
};

let routes = {
	path: '/',
	component: RootContainer,
	childRoutes: [
		{ 
			path: 'second',
			pathName: 'second',
			getComponent: asyncComponent(() => import(/* webpackChunkName: "second" */ './components/SecondContainer/index')),
			ignoreScrollBehavior: true
		},
		{ 
			path: 'third',
			pathName: 'third',
			getComponent: asyncComponent(() => import(/* webpackChunkName: "third" */ './components/ThirdContainer/index')),
			ignoreScrollBehavior: true
		},
		{ 
			path: 'fourth',
			pathName: 'fourth',
			getComponent: asyncComponent(() => import(/* webpackChunkName: "fourth" */ './components/FourthContainer/index')),
			ignoreScrollBehavior: true
		},
		{ 
			path: 'fifth',
			pathName: 'fifth',
			getComponent: asyncComponent(() => import(/* webpackChunkName: "fifth" */ './components/FifthContainer/index')),
			ignoreScrollBehavior: true
		}
	]
}

export default routes;