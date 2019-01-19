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
var express = require("express");
var passport = require("../config/passportConfig");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var router = express.Router();
var userRepository = typeorm_1.getRepository(User_1.User);
var manager = typeorm_1.getManager();
router.get('/signup', function (req, res) {
    res.render('auth/signup', { previousData: null, alerts: req.flash() });
});
router.get('/login', function (req, res) {
    res.render('auth/login', { alerts: req.flash() });
});
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You logged out. Bye!');
    res.redirect('/');
});
router.get('/pending', function (req, res) {
    res.render('auth/pending', { previousData: null, alerts: req.flash() });
});
router.post('/signup', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var existingUser, numberOfAdmins, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.password != req.body.password2)) return [3 /*break*/, 1];
                req.flash('error', 'Passwords must match');
                res.redirect('/');
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, userRepository.findOne({
                    email: req.body.email,
                })];
            case 2:
                existingUser = _a.sent();
                if (!existingUser) return [3 /*break*/, 3];
                req.flash('error', 'Username already in use');
                res.redirect('/');
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, userRepository.count({
                    where: { admin: true },
                })];
            case 4:
                numberOfAdmins = _a.sent();
                return [4 /*yield*/, manager.create(User_1.User, {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        admin: numberOfAdmins ? false : true,
                        contrib: false,
                        family: false,
                        approved: false,
                        getEmails: false,
                    })];
            case 5:
                user = _a.sent();
                return [4 /*yield*/, manager.save(user)];
            case 6:
                _a.sent();
                req.flash('success', 'Yay good job, you signed up!');
                req.logIn(user, function (err) {
                    if (err) {
                        req.flash('error', 'Something went wrong with signup, please try again.');
                        res.redirect('/');
                    }
                    else {
                        //@ts-ignore
                        passport.authenticate('local', {
                            successRedirect: '/photos',
                            successFlash: 'Yay, login successful!',
                            failureRedirect: '/',
                            failureFlash: 'Invalid Credentials',
                        })(req, res, next);
                    }
                });
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post('/login', 
//@ts-ignore
passport.authenticate('local', {
    successRedirect: '/photos',
    successFlash: 'Yay, login successful!',
    failureRedirect: '/',
    failureFlash: 'Invalid Credentials',
}));
module.exports = router;
//# sourceMappingURL=auth.js.map