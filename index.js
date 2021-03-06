"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// Express required Imports
var express = require("express");
var bodyParser = require("body-parser");
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require("express-session");
require('dotenv').config();
// DB requried imports
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Photo_1 = require("./entity/Photo");
var User_1 = require("./entity/User");
var Comment_1 = require("./entity/Comment");
var Heart_1 = require("./entity/Heart");
// End of upload required packages
typeorm_1.createConnection({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    port: 5430,
    database: 'walletphotos',
    entities: [Photo_1.Photo, User_1.User, Comment_1.Comment, Heart_1.Heart],
    synchronize: true,
    logging: false,
})
    .then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var photoRepository, app;
    return __generator(this, function (_a) {
        photoRepository = connection.getRepository(Photo_1.Photo);
        app = express();
        app.set('view engine', 'pug');
        /* ****************************************
        //              Middlewares
        ******************************************/
        app.use(bodyParser.urlencoded({
            extended: false,
        }));
        app.use(session({ secret: 'Secret', resave: false, saveUninitialized: true }));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        // Expose Auth routes before all other
        // Middlewares run
        app.get('/', function (req, res) {
            res.render('home', { alerts: req.flash() });
        });
        app.use('/auth', require('./controllers/auth'));
        // Refactor into Middlewares
        app.use(function (req, res, next) {
            if (!req.isAuthenticated()) {
                return res.redirect('/');
            }
            next();
        });
        app.use(express.static('static'));
        /* ****************************************
        //              Routes
        ******************************************/
        app.use('/photos', require('./controllers/photos'));
        app.use('/upload', require('./controllers/upload'));
        app.use('/comment', require('./controllers/comment'));
        app.use('/heart', require('./controllers/heart'));
        app.use('/admin', require('./controllers/admin'));
        /* ****************************************
        //              Listen
        ******************************************/
        app.listen(process.env.PORT || 3000, function () {
            console.log('Listening');
        });
        return [2 /*return*/];
    });
}); })
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map