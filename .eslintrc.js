module.exports = {
	"env": {
	  "browser": true,
	  "node": true,
	  "es6": true
	},
	"globals": {
	  "ActiveXObject": true,
	  "Android": true
	},
	"plugins": [ "react" ],
	"extends": [ "eslint:recommended" ,  "plugin:react/recommended" ],
	"parserOptions": {
	  "sourceType": "module",
	  "ecmaVersion": 6,
	  "ecmaFeatures": {
		"impliedStrict": true,
		"experimentalObjectRestSpread": true,
		"jsx": true,
		"arrowFunctions": true,
		"blockBindings": true,
		"classes": true,
		"defaultParams": true,
		"forOf": true,
		"generators": true,
		"modules": true,
		"globalReturn": false,
		"templateStrings": true,
	  }
	},
	"rules": {
	  "no-mixed-spaces-and-tabs"  : 1,
	  "no-alert": 2,
	  "no-empty-function": 1,
	  "no-eq-null":2,
	  "no-extra-label": 2,
	  "no-loop-func": 2,
	  "no-console": 1,
	  "no-catch-shadow": 2,
	  "no-use-before-define": 2,
	  "no-multiple-empty-lines": 1,
	  /*React plugin overrides */
	  "react/prop-types": 0,
	  "react/no-find-dom-node": 0,
	  "react/display-name": 0,
	  "react/no-is-mounted": 1
	},
	"parser": "babel-eslint"
  };