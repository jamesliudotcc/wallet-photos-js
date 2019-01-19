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
var Comment_1 = require("./Comment");
var Heart_1 = require("./Heart");
var Photo = /** @class */ (function () {
    function Photo() {
        this.id = 0;
        this.name = '';
        this.origUrl = '';
        this.smUrl = '';
        this.mdUrl = '';
        this.lgUrl = '';
        this.timestamp = new Date();
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.photos; }),
        __metadata("design:type", User_1.User)
    ], Photo.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "origUrl", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "smUrl", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "mdUrl", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Photo.prototype, "lgUrl", void 0);
    __decorate([
        typeorm_1.Column('timestamp'),
        __metadata("design:type", Date)
    ], Photo.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1.Comment; }, function (comment) { return comment.photo; }, { eager: true }),
        __metadata("design:type", Array)
    ], Photo.prototype, "comments", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Heart_1.Heart; }, function (heart) { return heart.photo; }, { eager: true }),
        __metadata("design:type", Array)
    ], Photo.prototype, "hearts", void 0);
    Photo = __decorate([
        typeorm_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map