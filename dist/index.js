/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mersenne-twister/src/mersenne-twister.js":
/*!***************************************************************!*\
  !*** ./node_modules/mersenne-twister/src/mersenne-twister.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace\r\n  so it's better encapsulated. Now you can have multiple random number generators\r\n  and they won't stomp all over eachother's state.\r\n\r\n  If you want to use this as a substitute for Math.random(), use the random()\r\n  method like so:\r\n\r\n  var m = new MersenneTwister();\r\n  var randomNumber = m.random();\r\n\r\n  You can also call the other genrand_{foo}() methods on the instance.\r\n\r\n  If you want to use a specific seed in order to get a repeatable random\r\n  sequence, pass an integer into the constructor:\r\n\r\n  var m = new MersenneTwister(123);\r\n\r\n  and that will always produce the same random sequence.\r\n\r\n  Sean McCullough (banksean@gmail.com)\r\n*/\r\n\r\n/*\r\n   A C-program for MT19937, with initialization improved 2002/1/26.\r\n   Coded by Takuji Nishimura and Makoto Matsumoto.\r\n\r\n   Before using, initialize the state by using init_seed(seed)\r\n   or init_by_array(init_key, key_length).\r\n\r\n   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,\r\n   All rights reserved.\r\n\r\n   Redistribution and use in source and binary forms, with or without\r\n   modification, are permitted provided that the following conditions\r\n   are met:\r\n\r\n     1. Redistributions of source code must retain the above copyright\r\n        notice, this list of conditions and the following disclaimer.\r\n\r\n     2. Redistributions in binary form must reproduce the above copyright\r\n        notice, this list of conditions and the following disclaimer in the\r\n        documentation and/or other materials provided with the distribution.\r\n\r\n     3. The names of its contributors may not be used to endorse or promote\r\n        products derived from this software without specific prior written\r\n        permission.\r\n\r\n   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\r\n   \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\r\n   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\r\n   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\r\n   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\r\n   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\r\n   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\r\n   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF\r\n   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING\r\n   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\r\n   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\r\n\r\n\r\n   Any feedback is very welcome.\r\n   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html\r\n   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)\r\n*/\r\n\r\nvar MersenneTwister = function(seed) {\r\n\tif (seed == undefined) {\r\n\t\tseed = new Date().getTime();\r\n\t}\r\n\r\n\t/* Period parameters */\r\n\tthis.N = 624;\r\n\tthis.M = 397;\r\n\tthis.MATRIX_A = 0x9908b0df;   /* constant vector a */\r\n\tthis.UPPER_MASK = 0x80000000; /* most significant w-r bits */\r\n\tthis.LOWER_MASK = 0x7fffffff; /* least significant r bits */\r\n\r\n\tthis.mt = new Array(this.N); /* the array for the state vector */\r\n\tthis.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */\r\n\r\n\tif (seed.constructor == Array) {\r\n\t\tthis.init_by_array(seed, seed.length);\r\n\t}\r\n\telse {\r\n\t\tthis.init_seed(seed);\r\n\t}\r\n}\r\n\r\n/* initializes mt[N] with a seed */\r\n/* origin name init_genrand */\r\nMersenneTwister.prototype.init_seed = function(s) {\r\n\tthis.mt[0] = s >>> 0;\r\n\tfor (this.mti=1; this.mti<this.N; this.mti++) {\r\n\t\tvar s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);\r\n\t\tthis.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)\r\n\t\t+ this.mti;\r\n\t\t/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */\r\n\t\t/* In the previous versions, MSBs of the seed affect   */\r\n\t\t/* only MSBs of the array mt[].                        */\r\n\t\t/* 2002/01/09 modified by Makoto Matsumoto             */\r\n\t\tthis.mt[this.mti] >>>= 0;\r\n\t\t/* for >32 bit machines */\r\n\t}\r\n}\r\n\r\n/* initialize by an array with array-length */\r\n/* init_key is the array for initializing keys */\r\n/* key_length is its length */\r\n/* slight change for C++, 2004/2/26 */\r\nMersenneTwister.prototype.init_by_array = function(init_key, key_length) {\r\n\tvar i, j, k;\r\n\tthis.init_seed(19650218);\r\n\ti=1; j=0;\r\n\tk = (this.N>key_length ? this.N : key_length);\r\n\tfor (; k; k--) {\r\n\t\tvar s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)\r\n\t\tthis.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))\r\n\t\t+ init_key[j] + j; /* non linear */\r\n\t\tthis.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\r\n\t\ti++; j++;\r\n\t\tif (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }\r\n\t\tif (j>=key_length) j=0;\r\n\t}\r\n\tfor (k=this.N-1; k; k--) {\r\n\t\tvar s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);\r\n\t\tthis.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))\r\n\t\t- i; /* non linear */\r\n\t\tthis.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\r\n\t\ti++;\r\n\t\tif (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }\r\n\t}\r\n\r\n\tthis.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */\r\n}\r\n\r\n/* generates a random number on [0,0xffffffff]-interval */\r\n/* origin name genrand_int32 */\r\nMersenneTwister.prototype.random_int = function() {\r\n\tvar y;\r\n\tvar mag01 = new Array(0x0, this.MATRIX_A);\r\n\t/* mag01[x] = x * MATRIX_A  for x=0,1 */\r\n\r\n\tif (this.mti >= this.N) { /* generate N words at one time */\r\n\t\tvar kk;\r\n\r\n\t\tif (this.mti == this.N+1)  /* if init_seed() has not been called, */\r\n\t\t\tthis.init_seed(5489);  /* a default initial seed is used */\r\n\r\n\t\tfor (kk=0;kk<this.N-this.M;kk++) {\r\n\t\t\ty = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);\r\n\t\t\tthis.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];\r\n\t\t}\r\n\t\tfor (;kk<this.N-1;kk++) {\r\n\t\t\ty = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);\r\n\t\t\tthis.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];\r\n\t\t}\r\n\t\ty = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);\r\n\t\tthis.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];\r\n\r\n\t\tthis.mti = 0;\r\n\t}\r\n\r\n\ty = this.mt[this.mti++];\r\n\r\n\t/* Tempering */\r\n\ty ^= (y >>> 11);\r\n\ty ^= (y << 7) & 0x9d2c5680;\r\n\ty ^= (y << 15) & 0xefc60000;\r\n\ty ^= (y >>> 18);\r\n\r\n\treturn y >>> 0;\r\n}\r\n\r\n/* generates a random number on [0,0x7fffffff]-interval */\r\n/* origin name genrand_int31 */\r\nMersenneTwister.prototype.random_int31 = function() {\r\n\treturn (this.random_int()>>>1);\r\n}\r\n\r\n/* generates a random number on [0,1]-real-interval */\r\n/* origin name genrand_real1 */\r\nMersenneTwister.prototype.random_incl = function() {\r\n\treturn this.random_int()*(1.0/4294967295.0);\r\n\t/* divided by 2^32-1 */\r\n}\r\n\r\n/* generates a random number on [0,1)-real-interval */\r\nMersenneTwister.prototype.random = function() {\r\n\treturn this.random_int()*(1.0/4294967296.0);\r\n\t/* divided by 2^32 */\r\n}\r\n\r\n/* generates a random number on (0,1)-real-interval */\r\n/* origin name genrand_real3 */\r\nMersenneTwister.prototype.random_excl = function() {\r\n\treturn (this.random_int() + 0.5)*(1.0/4294967296.0);\r\n\t/* divided by 2^32 */\r\n}\r\n\r\n/* generates a random number on [0,1) with 53-bit resolution*/\r\n/* origin name genrand_res53 */\r\nMersenneTwister.prototype.random_long = function() {\r\n\tvar a=this.random_int()>>>5, b=this.random_int()>>>6;\r\n\treturn(a*67108864.0+b)*(1.0/9007199254740992.0);\r\n}\r\n\r\n/* These real versions are due to Isaku Wada, 2002/01/09 added */\r\n\r\nmodule.exports = MersenneTwister;\r\n\n\n//# sourceURL=webpack:///./node_modules/mersenne-twister/src/mersenne-twister.js?");

/***/ }),

/***/ "./src/ClassicalSeekingMode.ts":
/*!*************************************!*\
  !*** ./src/ClassicalSeekingMode.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cat_1 = __webpack_require__(/*! ./cat */ \"./src/cat.ts\");\nvar Point_1 = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\nvar MersenneTwister = __webpack_require__(/*! mersenne-twister */ \"./node_modules/mersenne-twister/src/mersenne-twister.js\");\nvar ClassicalSeekingMode = /** @class */ (function () {\n    function ClassicalSeekingMode(seekingMemoryPool, seekingRangeOfSelectedDimension, countsOfDimensionsToChange, selfPositionConsidering) {\n        this.seekingMemoryPool = seekingMemoryPool;\n        this.seekingRangeOfSelectedDimension = seekingRangeOfSelectedDimension;\n        this.countsOfDimensionsToChange = countsOfDimensionsToChange;\n        this.selfPositionConsidering = selfPositionConsidering;\n        this.mersenneTwister = new MersenneTwister();\n    }\n    ClassicalSeekingMode.prototype.createCopies = function (cat) {\n        this.j = this.seekingMemoryPool;\n        var copies = [];\n        if (this.selfPositionConsidering) {\n            this.j = this.j - 1;\n            copies[this.j] = cat;\n        }\n        for (var i = 0; i < this.j; i++) {\n            var position = Point_1.Position.doRandomPosition();\n            var velocity = Point_1.Position.doRandomPosition();\n            copies[i] = new cat_1.Cat(position, velocity, cat.FunctionToOptimize);\n        }\n        return copies;\n    };\n    ClassicalSeekingMode.prototype.changePosition = function (cat) {\n        var _this = this;\n        if (cat.Position === undefined) {\n            console.error('catpos undefined');\n        }\n        var catPos = cat.Position;\n        if (this.countsOfDimensionsToChange == 1) {\n            var dimension = this.mersenneTwister.random();\n            var randomMove = function (pos, x, y) { return ((_this.mersenneTwister.random() > 0.5) ? pos.add : pos.subtract)(x, y); };\n            if (dimension < 0.5) {\n                cat.Position = randomMove(catPos, catPos.x * this.seekingRangeOfSelectedDimension, 0);\n            }\n            else {\n                cat.Position = randomMove(catPos, 0, catPos.y * this.seekingRangeOfSelectedDimension);\n            }\n        }\n        if (this.countsOfDimensionsToChange == 2) {\n            var randomOffset = function (value, offset) { return value + (_this.mersenneTwister.random() < 0.5) ? -offset : offset; };\n            cat.Position = new Point_1.Position(randomOffset(catPos.x, catPos.x * this.seekingRangeOfSelectedDimension), randomOffset(catPos.y, catPos.y * this.seekingRangeOfSelectedDimension));\n        }\n    };\n    ClassicalSeekingMode.prototype.calculateSelectionProb = function (copies, fitnessMax, fitnessMin) {\n        var allTheSame = false;\n        for (var i = 1; i < this.fitnessValues.length; i++) {\n            allTheSame = (this.fitnessValues[i - 1] === this.fitnessValues[i]);\n            if (!allTheSame) {\n                break;\n            }\n        }\n        if (allTheSame) {\n            copies.forEach(function (cat) { return cat.SelectionProb = 1; });\n        }\n        else {\n            copies.forEach(function (cat) {\n                return cat.SelectionProb = Math.abs((cat.calculateFitness() - fitnessMin) / (fitnessMax - fitnessMin));\n            });\n        }\n    };\n    ClassicalSeekingMode.prototype.chooseNewPosition = function (copies) {\n        var selectedCat;\n        var probability = [];\n        probability[0] = 0;\n        for (var i = 0; i < this.seekingMemoryPool; i++) {\n            probability[i + 1] = copies[i].SelectionProb + probability[i];\n        }\n        var probhigh = probability[this.seekingMemoryPool - 1];\n        for (var i = 0; i < this.seekingMemoryPool; i++) {\n            probability[i] = probability[i] / probhigh;\n        }\n        var twist = this.mersenneTwister.random();\n        for (var i = 0; i < probability.length; i++) {\n            if (probability[i] > twist) {\n                selectedCat = i - 1;\n                break;\n            }\n        }\n        return copies[selectedCat].Position;\n    };\n    ClassicalSeekingMode.prototype.seek = function (cat, fitnessMax, fitnessMin) {\n        var allTheSame;\n        this.fitnessValues = new Array(this.seekingMemoryPool);\n        var copies = this.createCopies(cat);\n        for (var i = 0; i < this.j; i++) {\n            this.changePosition(copies[i]);\n            this.fitnessValues[i] = copies[i].calculateFitness();\n        }\n        if (this.selfPositionConsidering) {\n            this.fitnessValues[this.j] = copies[this.j].calculateFitness();\n        }\n        this.calculateSelectionProb(copies, fitnessMax, fitnessMin);\n        cat.Position = this.chooseNewPosition(copies);\n    };\n    return ClassicalSeekingMode;\n}());\nexports.ClassicalSeekingMode = ClassicalSeekingMode;\n\n\n//# sourceURL=webpack:///./src/ClassicalSeekingMode.ts?");

/***/ }),

/***/ "./src/ClassicalTracingMode.ts":
/*!*************************************!*\
  !*** ./src/ClassicalTracingMode.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Point_1 = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\nvar MersenneTwister = __webpack_require__(/*! mersenne-twister */ \"./node_modules/mersenne-twister/src/mersenne-twister.js\");\nvar ClassicalTracingMode = /** @class */ (function () {\n    function ClassicalTracingMode(c, searchDomain) {\n        this.c = c;\n        this.searchDomain = searchDomain;\n    }\n    ClassicalTracingMode.prototype.updateVelocity = function (actualVelocity, xbest) {\n        if (actualVelocity === undefined) {\n            console.log('undefined velocity');\n        }\n        if (xbest === undefined) {\n            console.trace('undefined xbest');\n        }\n        return new Point_1.Position(actualVelocity.x + this.r * this.c * (xbest.x - actualVelocity.x), actualVelocity.y + this.r * this.c * (xbest.y - actualVelocity.y));\n    };\n    ClassicalTracingMode.limitRange = function (value, min, max) {\n        return Math.max(min, Math.min(max, value));\n    };\n    ClassicalTracingMode.prototype.checkVelocity = function (cat, velocity) {\n        var _this = this;\n        var newPosition = velocity;\n        var limitx = function (x) { return ClassicalTracingMode.limitRange(x, _this.searchDomain.min.x, _this.searchDomain.max.x); };\n        var limity = function (y) { return ClassicalTracingMode.limitRange(y, _this.searchDomain.min.y, _this.searchDomain.max.y); };\n        return new Point_1.Position(limitx(newPosition.x), limity(newPosition.y));\n    };\n    ClassicalTracingMode.prototype.trace = function (cat, xbest) {\n        this.r = ClassicalTracingMode.mersenneTwister.random();\n        cat.Position = this.checkVelocity(cat, this.updateVelocity(cat.Velocity, xbest));\n    };\n    ClassicalTracingMode.mersenneTwister = new MersenneTwister();\n    return ClassicalTracingMode;\n}());\nexports.ClassicalTracingMode = ClassicalTracingMode;\n\n\n//# sourceURL=webpack:///./src/ClassicalTracingMode.ts?");

/***/ }),

/***/ "./src/Point.ts":
/*!**********************!*\
  !*** ./src/Point.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar MersenneTwister = __webpack_require__(/*! mersenne-twister */ \"./node_modules/mersenne-twister/src/mersenne-twister.js\");\nvar Position = /** @class */ (function () {\n    function Position(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    Position.prototype.compareToPoint = function (point, sigma) {\n        return this.subtract(point.x, point.y).asAbsoluteDistance() < sigma;\n    };\n    Position.prototype.asAbsoluteDistance = function () {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    };\n    Position.prototype.subtract = function (x, y) {\n        return new Position(this.x - x, this.y - y);\n    };\n    Position.prototype.add = function (x, y) {\n        return new Position(this.x + x, this.y + y);\n    };\n    Position.doRandomPosition = function (minX, maxX, minY, maxY) {\n        if (minX === void 0) { minX = 0; }\n        if (maxX === void 0) { maxX = 1; }\n        if (minY === void 0) { minY = 0; }\n        if (maxY === void 0) { maxY = 1; }\n        return new Position(minX + (maxX - minX) * Position.mersenneTwister.random(), minY + (maxY - minY) * Position.mersenneTwister.random());\n    };\n    Position.mersenneTwister = new MersenneTwister();\n    return Position;\n}());\nexports.Position = Position;\n\n\n//# sourceURL=webpack:///./src/Point.ts?");

/***/ }),

/***/ "./src/cat.ts":
/*!********************!*\
  !*** ./src/cat.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Cat = /** @class */ (function () {\n    function Cat(position, velocity, functionToOptimize) {\n        this.position = position;\n        this.velocity = velocity;\n        this.functionToOptimize = functionToOptimize;\n    }\n    Object.defineProperty(Cat.prototype, \"FunctionToOptimize\", {\n        get: function () {\n            return this.functionToOptimize;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cat.prototype, \"Mode\", {\n        get: function () {\n            return this.mode;\n        },\n        set: function (mode) {\n            this.mode = mode;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cat.prototype, \"Position\", {\n        get: function () {\n            return this.position;\n        },\n        set: function (position) {\n            this.position = position;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cat.prototype, \"Velocity\", {\n        get: function () {\n            return this.velocity;\n        },\n        set: function (velocity) {\n            if (velocity === undefined) {\n                console.trace();\n            }\n            this.velocity = velocity;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Cat.prototype.calculateFitness = function () {\n        return this.functionToOptimize(this.position.x, this.position.y);\n    };\n    Object.defineProperty(Cat.prototype, \"SelectionProb\", {\n        get: function () {\n            return this.selectionProperty;\n        },\n        set: function (selectionProb) {\n            this.selectionProperty = selectionProb;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Cat;\n}());\nexports.Cat = Cat;\n\n\n//# sourceURL=webpack:///./src/cat.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cat_1 = __webpack_require__(/*! ./cat */ \"./src/cat.ts\");\nvar Point_1 = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\nvar ClassicalSeekingMode_1 = __webpack_require__(/*! ./ClassicalSeekingMode */ \"./src/ClassicalSeekingMode.ts\");\nvar ClassicalTracingMode_1 = __webpack_require__(/*! ./ClassicalTracingMode */ \"./src/ClassicalTracingMode.ts\");\nvar MersenneTwister = __webpack_require__(/*! mersenne-twister */ \"./node_modules/mersenne-twister/src/mersenne-twister.js\");\nfunction runCode() {\n    console.log('runcode');\n    var mersenneTwister = new MersenneTwister();\n    var minimumReached = false;\n    var seekingMode = new ClassicalSeekingMode_1.ClassicalSeekingMode(config.seekingMemoryPool, config.seekingRangeOfSelectedDimension, config.countsOfDimensionsToChange, config.selfPositionConsidering);\n    var tracingMode = new ClassicalTracingMode_1.ClassicalTracingMode(config.constantNumber, searchDomain);\n    var cats = [];\n    var lastResult;\n    var bestPosition;\n    var lastCats = [];\n    var results = [];\n    var fitnessValueBest = Number.POSITIVE_INFINITY;\n    var fitnessValueLeast = Number.NEGATIVE_INFINITY;\n    var minimumEpsilon = 1e-5;\n    for (var i = 0; i < config.numberOfCats; i++) {\n        cats[i] = new cat_1.Cat(Point_1.Position.doRandomPosition(searchDomain.min.x, searchDomain.max.x, searchDomain.min.y, searchDomain.max.y), Point_1.Position.doRandomPosition(), functionToOptimize);\n    }\n    for (var iterationCounter = 0; !minimumReached &&\n        iterationCounter < config.maximumNumberOfIterations; iterationCounter++) {\n        for (var _i = 0, cats_1 = cats; _i < cats_1.length; _i++) {\n            var cat = cats_1[_i];\n            var fitness = cat.calculateFitness();\n            if (fitness < fitnessValueBest) {\n                fitnessValueBest = fitness;\n                bestPosition = cat.Position;\n            }\n            if (fitness > fitnessValueLeast) {\n                fitnessValueLeast = fitness;\n            }\n            cat.Mode = mersenneTwister.random() >= config.mixtureRatio;\n        }\n        /*  console.log(cats);\n          break;*/\n        if (bestPosition !== undefined &&\n            (lastResult === undefined ||\n                !lastResult.compareToPoint(bestPosition, minimumEpsilon))) {\n            lastResult = bestPosition;\n            results.push(lastResult);\n        }\n        else {\n            console.log([\n                lastResult, bestPosition,\n                fitnessValueBest, fitnessValueLeast,\n                lastResult && bestPosition && lastResult.subtract(bestPosition.x, bestPosition.y),\n                lastResult && bestPosition && !lastResult.compareToPoint(bestPosition, minimumEpsilon)\n            ]);\n        }\n        for (var i = 0; i < config.numberOfCats; i++) {\n            if (cats[i].Mode) {\n                seekingMode.seek(cats[i], fitnessValueBest, fitnessValueLeast);\n                break;\n            }\n            else {\n                if (bestPosition === undefined) {\n                    console.log('no bestposition!');\n                }\n                tracingMode.trace(cats[i], bestPosition);\n            }\n        }\n        lastCats[iterationCounter % config.numberForCheckMinimumReached] = fitnessValueBest;\n        if (iterationCounter > (config.numberForCheckMinimumReached - 1)) {\n            for (var i = 0; i < lastCats.length; i++) {\n                if (Math.abs(lastCats[i] - lastCats[i + 1]) > minimumEpsilon) {\n                    minimumReached = false;\n                    break;\n                }\n                minimumReached = true;\n            }\n        }\n    }\n    return results;\n}\naddEventListener('message', function (message) {\n    try {\n        var data = message.data;\n        config = data.config;\n        functionToOptimize = new Function('return ' + data.func.toString())();\n        searchDomain = data.searchArea;\n        if (data.action === 'abort') {\n            isRunning = false;\n        }\n        postMessage({\n            info: '',\n            status: \"finished\",\n            result: runCode()\n        });\n    }\n    catch (e) {\n        postMessage({ info: e.toString(), result: undefined, status: \"error\" });\n    }\n});\nvar isRunning = false;\nvar config;\nvar functionToOptimize;\nvar searchDomain;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });