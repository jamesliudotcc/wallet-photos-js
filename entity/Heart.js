"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Photo_1 = require("./Photo");
var Heart = /** @class */ (function () {
    function Heart() {
        this.id = 0;
        this.timestamp = new Date();
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Heart.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.hearts; }, { eager: true }),
        __metadata("design:type", User_1.User)
    ], Heart.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Photo_1.Photo; }, function (photo) { return photo.hearts; }),
        __metadata("design:type", Photo_1.Photo)
    ], Heart.prototype, "photo", void 0);
    __decorate([
        typeorm_1.Column('timestamp'),
        __metadata("design:type", Date)
    ], Heart.prototype, "timestamp", void 0);
    Heart = __decorate([
        typeorm_1.Entity()
    ], Heart);
    return Heart;
}());
exports.Heart = Heart;
//# sourceMappingURL=Heart.js.map