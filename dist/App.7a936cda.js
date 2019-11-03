// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Team/Bowling.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Team;

(function (Team) {
  Team[Team["Bengaluru"] = 0] = "Bengaluru";
  Team[Team["Chennai"] = 1] = "Chennai";
})(Team = exports.Team || (exports.Team = {}));

var Bowling =
/** @class */
function () {
  function Bowling(remainingOver, bowlingTeam) {
    this.remainingOver = remainingOver;
    this.bowlingTeam = bowlingTeam;
    this.$setdefaults(remainingOver);
  }

  Bowling.prototype.$setdefaults = function (val) {
    this.initialOver = val;
    this.remainingBalls = Bowling.ballsPerOver * val;
  };

  Bowling.prototype.nextBall = function () {
    this.beforeBowling();
    var restballs = this.remainingBalls;
    restballs -= 1;
    this.remainingBalls = restballs;
    this.remainingOver = parseInt("" + restballs / Bowling.ballsPerOver, 10);
    return this;
  };

  Bowling.prototype.beforeBowling = function () {
    if (this.remainingBalls % Bowling.ballsPerOver == 0) {
      var over = this.remainingBalls / Bowling.ballsPerOver;
      console.log(over + " overs");
    }
  };

  Bowling.ballsPerOver = 6;
  return Bowling;
}();

exports.default = Bowling;
},{}],"Team/Player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Player =
/** @class */
function () {
  function Player(player, team, ballProbability) {
    this.player = player;
    this.team = team;
    this.ballProbability = ballProbability;
    this.setdefaults(ballProbability);
  }

  Player.prototype.setdefaults = function (ballProbability) {
    this.playerProbability = ballProbability.map(function (val) {
      return val / 100;
    });
  };

  Player.prototype.scored = function () {
    if (!this.validate()) {
      console.error("Score: invalid");
    }

    var scored = -1;

    var _a = this,
        playerProbability = _a.playerProbability,
        ballProbability = _a.ballProbability,
        getrandom = _a.getrandom;

    for (var i = 0, score = 0, slected = getrandom(), len = ballProbability.length; i < len; i++) {
      score += playerProbability[i];

      if (slected <= score) {
        scored = ballProbability[i];
        break;
      }
    }

    return scored;
  };

  Player.prototype.validate = function () {
    var _a = this,
        playerProbability = _a.playerProbability,
        ballProbability = _a.ballProbability;

    var assess = playerProbability.reduce(function (acc, curr) {
      return acc + curr;
    });
    return assess === 1.0 && playerProbability.length === ballProbability.length;
  };

  Player.prototype.getrandom = function () {
    return Math.random() * 1;
  };

  return Player;
}();

exports.Player = Player;
},{}],"Team/Batsman.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Player_1 = require("./Player");

var Batsman =
/** @class */
function (_super) {
  __extends(Batsman, _super);

  function Batsman(player, team, ballProbability) {
    var _this = _super.call(this, player, team, ballProbability) || this;

    _this.ballsPlayed = 0;
    return _this;
  }

  Batsman.prototype.nextRun = function () {
    var totalRuns = this.totalRunScored;
    var currentScore = this.scored();

    if (currentScore > 0) {
      totalRuns += currentScore;
      this.requiredRun = this.requiredRun - currentScore;
      this.totalRunScored = totalRuns;
    }

    this.afterRun();
  };

  Batsman.prototype.afterRun = function () {
    console.log(this);
  };

  return Batsman;
}(Player_1.Player);

exports.default = Batsman;
},{"./Player":"Team/Player.ts"}],"Simulator/Cricketcontext.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Cricketcontext =
/** @class */
function () {
  function Cricketcontext(bowling, striker, nonstriker) {
    this.bowling = bowling;
    this.striker = striker;
    this.nonstriker = nonstriker;
    this.setdefaults();
  }

  Cricketcontext.prototype.setdefaults = function () {};

  return Cricketcontext;
}();

exports.default = Cricketcontext;
},{}],"Simulator/Simulator.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Cricketcontext_1 = __importDefault(require("./Cricketcontext"));

var Simulator =
/** @class */
function (_super) {
  __extends(Simulator, _super);

  function Simulator(bowling, batsman, netRunsRequired) {
    var _this = _super.call(this, bowling, batsman[0], batsman[1]) || this;

    _this.bowling = bowling;
    _this.batsman = batsman;
    _this.netRunsRequired = netRunsRequired;
    return _this;
  }

  Simulator.prototype.play = function () {
    var bowler = this.bowling;
    console.log(bowler, this.striker, this.nonstriker);
  };

  return Simulator;
}(Cricketcontext_1.default);

exports.Simulator = Simulator;
},{"./Cricketcontext":"Simulator/Cricketcontext.ts"}],"Simulator/Playcricket.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Bowling_1 = __importStar(require("../Team/Bowling"));

var Batsman_1 = __importDefault(require("../Team/Batsman"));

var Simulator_1 = require("./Simulator");

exports.Player = {
  Kirat: "Kirat Boli",
  Nodhi: "NS Nodhi",
  Rumra: "R Rumrah",
  Henra: "Shashi Henra"
};

var Playcricket =
/** @class */
function () {
  function Playcricket() {}

  Playcricket.play = function () {
    var chennaiSquad = new Bowling_1.default(4, Bowling_1.Team.Chennai);
    var bengaluruSquad = [new Batsman_1.default(exports.Player.Kirat, Bowling_1.Team.Bengaluru, [5, 30, 25, 10, 15, 1, 9, 5]), new Batsman_1.default(exports.Player.Nodhi, Bowling_1.Team.Bengaluru, [10, 40, 20, 5, 10, 1, 4, 10])];
    var simulator = new Simulator_1.Simulator(chennaiSquad, bengaluruSquad, 40);
    simulator.play();
  };

  return Playcricket;
}();

exports.default = Playcricket;
},{"../Team/Bowling":"Team/Bowling.ts","../Team/Batsman":"Team/Batsman.ts","./Simulator":"Simulator/Simulator.ts"}],"App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Playcricket_1 = __importDefault(require("./Simulator/Playcricket"));

Playcricket_1.default.play();
},{"./Simulator/Playcricket":"Simulator/Playcricket.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62805" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","App.ts"], null)
//# sourceMappingURL=/App.7a936cda.js.map