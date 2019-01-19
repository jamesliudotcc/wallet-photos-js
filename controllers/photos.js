"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var typeorm_1 = require("typeorm");
var Photo_1 = require("../entity/Photo");
var User_1 = require("../entity/User");
var router = express.Router();
var photoRepository = typeorm_1.getRepository(Photo_1.Photo);
var userRepository = typeorm_1.getRepository(User_1.User);
var STATIC_PHOTOS = '/photos/';
router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var allPhotos, user_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, photoRepository.find({ order: { id: 'DESC' } })];
            case 1:
                allPhotos = _a.sent();
                if (!req.session) return [3 /*break*/, 3];
                return [4 /*yield*/, userRepository.findOne(req.session.passport.user)];
            case 2:
                user_1 = _a.sent();
                res.render('photos/photos', {
                    // This should live in a function ?
                    photos: allPhotos
                        .filter(function (photo) {
                        if (photo.smUrl) {
                            return photo.smUrl;
                        }
                    })
                        .map(function (photo) { return ({
                        smUrl: STATIC_PHOTOS + photo.smUrl,
                        mdUrl: STATIC_PHOTOS + photo.mdUrl,
                        lgUrl: STATIC_PHOTOS + photo.lgUrl,
                        id: photo.id,
                        comments: photo.comments,
                        hideHeartButton: photo.hearts
                            .map(function (heart) { return heart.user.id; })
                            .filter(function (a) { return a === user_1.id; })
                            .map(function (a) {
                            // Give a literal true to Pug
                            if (a === user_1.id) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }),
                        hearts: photo.hearts.length,
                    }); }),
                    alerts: req.flash(),
                    user: __assign({ password: '' }, user_1),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:idx', function (req, res) {
    res.send("Got to photo number " + req.params.idx);
});
module.exports = router;
//# sourceMappingURL=photos.js.map