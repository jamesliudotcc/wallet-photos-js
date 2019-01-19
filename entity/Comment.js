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
var Comment = /** @class */ (function () {
    function Comment() {
        this.id = 0;
        this.timestamp = new Date();
        this.comment = '';
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comment.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.comments; }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Photo_1.Photo; }, function (photo) { return photo.comments; }),
        __metadata("design:type", Photo_1.Photo)
    ], Comment.prototype, "photo", void 0);
    __decorate([
        typeorm_1.Column('timestamp'),
        __metadata("design:type", Date)
    ], Comment.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Comment.prototype, "comment", void 0);
    Comment = __decorate([
        typeorm_1.Entity()
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map