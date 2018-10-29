var vendor =  {
    // 'react': 'react',
    // 'react-router': 'reactRouter',
    // 'react-dom': 'reactDom',
    // 'object-assign': 'objectAssign',
    // 'phrontend': 'phrontend',
    // 'classnames': 'classnames',
    // 'keymirror': 'keymirror',
    // 'flux': 'flux',
    // 'lodash.isstring': 'lodashIsstring',
     'lodash.isarray': 'lodashIsarray'
    // 'lodash.isundefined': 'lodashIsundefined',
     //'lodash.result': 'lodashResult',
    // 'lodash.clone': 'lodashClone',
    // 'es6-promise': 'es6Promise',
    // 'form-serialize': 'formSerialize',
    // 'lodash._baseclone': 'lodashBaseclone',
    // 'lodash.keys': 'lodashKeys',
    // 'lodash.isarguments': 'lodashIsarguments',
    // 'process': 'process',
    // 'object.assign': 'objectAssign1',
    // 'object-keys': 'objectKeys',
};

var webpack2Libs  =  {
	'react': ['react'],
	'reactRouter': ['react-router'],
	'reactDom': ['react-dom'],
	'objectAssign': ['object-assign'],
	'phrontend': ['phrontend'],
	'classnames': ['classnames'],
	'keymirror': ['keymirror'],
	'flux': ['flux'],
	'lodashIsstring': ['lodash.isstring'],
	'lodashIsarray': ['lodash.isarray'],
	'lodashResult': ['lodash.result'],
	'lodashIsundefined': ['lodash.isundefined'],
	'lodashBaseclone': ['lodash._baseclone'],
	'lodashClone': ['lodash.clone'],
	'lodashKeys': ['lodash.keys'],
	'lodashIsarguments': ['lodash.isarguments'],
	'es6Promise': ['es6-promise'],
	'formSerialize': ['form-serialize'],
	'process': ['process'],
	'objectAssign1': ['object.assign'],
	'objectKeys': ['object-keys']
	// 'whatwgFetch': ['whatwg-fetch']
};

module.exports = {
	vendor: vendor,
	webpack2Libs: webpack2Libs
}