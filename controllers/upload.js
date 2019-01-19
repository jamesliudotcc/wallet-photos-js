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
var multer = require("multer");
var sharp = require("sharp");
var typeorm_1 = require("typeorm");
var Photo_1 = require("../entity/Photo");
var User_1 = require("../entity/User");
var router = express.Router();
var photoRepository = typeorm_1.getRepository(Photo_1.Photo);
var userRepository = typeorm_1.getRepository(User_1.User);
var upload = multer({ dest: 'uploads/' });
router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.session) return [3 /*break*/, 2];
                return [4 /*yield*/, userRepository.findOne(req.session.passport.user)];
            case 1:
                user = _a.sent();
                if (user.contrib) {
                    res.render('upload/upload', {
                        alerts: req.flash(),
                        user: __assign({ password: '' }, user),
                    });
                }
                else {
                    req.flash('error', 'Not approved to add photos');
                    res.redirect('/photos');
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
router.post('/', upload.single('file'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.file.mimetype.startsWith('image/jpeg')) {
                    return [2 /*return*/, res.status(422).json({ error: 'Jpegs only plz' })];
                }
                if (!req.session) return [3 /*break*/, 3];
                return [4 /*yield*/, userRepository.findOneOrFail(req.session.passport.user)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, updateModelWithPhoto(req, user)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, res.status(200).redirect('/upload')];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); });
function updateModelWithPhoto(req, user) {
    return __awaiter(this, void 0, void 0, function () {
        var photo, newSavedPhoto, photoToUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    photo = new Photo_1.Photo();
                    photo.origUrl = req.file.path;
                    return [4 /*yield*/, photoRepository.save(photo)];
                case 1:
                    newSavedPhoto = _a.sent();
                    return [4 /*yield*/, photoRepository.findOne(newSavedPhoto.id)];
                case 2:
                    photoToUpdate = _a.sent();
                    if (!photoToUpdate) return [3 /*break*/, 4];
                    photoToUpdate.user = user.id;
                    photoToUpdate.smUrl = newSavedPhoto.id + "-sm.jpg";
                    photoToUpdate.mdUrl = newSavedPhoto.id + "-md.jpg";
                    photoToUpdate.lgUrl = newSavedPhoto.id + "-lg.jpg";
                    return [4 /*yield*/, photoRepository.save(photoToUpdate)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: // See if this can be re-written using try-catch?
                // Fix async behavior where return happens before update.
                return [4 /*yield*/, createSizes(req.file.path, String(photo.id))];
                case 5:
                    // Fix async behavior where return happens before update.
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createSizes(imagePath, imageNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var SIZES;
        return __generator(this, function (_a) {
            SIZES = [
                { name: 'sm', width: 512, quality: 80 },
                { name: 'md', width: 1024, quality: 80 },
                { name: 'lg', width: 2048, quality: 60 },
            ];
            SIZES.forEach(function (size) {
                sharp(imagePath)
                    .jpeg({ quality: size.quality })
                    .rotate()
                    .resize(size.width)
                    .toFile("static/photos/" + imageNumber + "-" + size.name + ".jpg", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
module.exports = router;
//# sourceMappingURL=upload.js.map