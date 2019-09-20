webpackJsonp([0],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerformPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dealersummary_dealersummary__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DealerformPage = /** @class */ (function () {
    // public rfid_no : string = "";
    function DealerformPage(navCtrl, navParams, httpreq, basic_op, cameraProvider, actionSheetCtrl, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.cameraProvider = cameraProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.mediaApi = "wp-json/wp/v2/media";
        this.userData = [];
        this.AddChosenPicture = [];
        this.dealerPic = [];
        this.chosenPicture = [];
        this.identityPic = [];
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
        this.userData.rfid_no = this.navParams.get("rfid");
        this.dealerid = this.navParams.get("dealerid");
        if (this.dealerid != undefined) {
            this.httpreq.getOnedata(this.dealerApi, this.dealerid).then(function (res) {
                _this.userData = res;
                _this.userData = _this.userData.acf;
                console.log(_this.userData.id_proof);
                _this.chosenPicture.length = 1;
                _this.AddChosenPicture.length = 1;
            });
        }
    }
    DealerformPage.prototype.ionViewDidLoad = function () { };
    DealerformPage.prototype.addDealer = function () {
        var _this = this;
        if (this.dealerid != undefined) {
            var data1 = {
                "title": this.userData.rfid_no,
                "status": "publish",
                "fields": {
                    "rfid_no": this.userData.rfid_no,
                    "dealer_name": this.userData.dealer_name,
                    "area": this.userData.area,
                    "address": this.userData.address,
                    "mobile_no": this.userData.mobile_no,
                    "company": this.userData.company,
                }
            };
            this.basic_op.loaderStart();
            this.httpreq.update(data1, this.dealerid, this.dealerApi).then(function (res) {
                _this.basic_op.loaderEnd(res);
                console.log(res);
                _this.viewCtrl.dismiss();
            }, function (err) {
                _this.basic_op.loaderEnd(err);
                _this.basic_op.alertboxDismiss(err.message);
            });
        }
        else {
            this.basic_op.loaderStart();
            if (this.dealerPic.length > 0) {
                this.httpreq.delete(this.mediaApi, this.dealerPic);
                this.httpreq.delete(this.mediaApi, this.identityPic);
            }
            if (this.chosenPicture.length > 0 && this.AddChosenPicture.length > 0) {
                this.insert();
            }
            else if (this.chosenPicture.length > 0 && this.AddChosenPicture.length == 0) {
                this.cameraProvider.upload(this.chosenPicture).then(function (res) {
                    _this.dealerPic = res;
                    _this.basic_op.loaderEnd(_this.dealerPic);
                    _this.dealerPic = _this.dealerPic.response;
                    _this.dealerPic = JSON.parse(_this.dealerPic);
                    _this.dealerPic = _this.dealerPic.id;
                    var data = {
                        "title": _this.userData.rfid_no,
                        "status": "publish",
                        "fields": {
                            "rfid_no": _this.userData.rfid_no,
                            "dealer_name": _this.userData.dealer_name,
                            "area": _this.userData.area,
                            "address": _this.userData.address,
                            "mobile_no": _this.userData.mobile_no,
                            "company": _this.userData.company,
                            "id_proof": _this.dealerPic
                        }
                    };
                    var photos = {
                        "photo": "../../assets/vehicle/profile.png",
                        "identity": _this.chosenPicture
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */], { data: data, photos: photos });
                }, function (error) {
                    _this.basic_op.loaderEnd(error);
                    _this.basic_op.alertboxDismiss(error.message);
                });
            }
            else if (this.chosenPicture.length == 0 && this.AddChosenPicture.length > 0) {
                this.cameraProvider.upload(this.AddChosenPicture).then(function (res) {
                    _this.identityPic = res;
                    _this.basic_op.loaderEnd(_this.identityPic);
                    _this.identityPic = _this.identityPic.response;
                    _this.identityPic = JSON.parse(_this.identityPic);
                    _this.identityPic = _this.identityPic.id;
                    var data = {
                        "title": _this.userData.rfid_no,
                        "status": "publish",
                        "fields": {
                            "rfid_no": _this.userData.rfid_no,
                            "dealer_name": _this.userData.dealer_name,
                            "area": _this.userData.area,
                            "address": _this.userData.address,
                            "mobile_no": _this.userData.mobile_no,
                            "company": _this.userData.company,
                            "dealer_photo": _this.identityPic
                        }
                    };
                    var photos = {
                        "photo": _this.AddChosenPicture,
                        "identity": "../../assets/vehicle/document.png"
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */], { data: data, photos: photos });
                }, function (error) {
                    _this.basic_op.loaderEnd(error);
                    _this.basic_op.alertboxDismiss(error.message);
                });
            }
            else {
                var data = {
                    "title": this.userData.rfid_no,
                    "status": "publish",
                    "fields": {
                        "rfid_no": this.userData.rfid_no,
                        "dealer_name": this.userData.dealer_name,
                        "area": this.userData.area,
                        "address": this.userData.address,
                        "mobile_no": this.userData.mobile_no,
                        "company": this.userData.company,
                    }
                };
                this.basic_op.loaderEnd(data);
                var photos = {
                    "photo": "../../assets/vehicle/profile.png",
                    "identity": "../../assets/vehicle/document.png"
                };
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */], { data: data, photos: photos });
            }
        }
    };
    DealerformPage.prototype.insert = function () {
        var _this = this;
        this.cameraProvider.upload(this.chosenPicture).then(function (res) {
            _this.dealerPic = res;
            _this.dealerPic = _this.dealerPic.response;
            _this.dealerPic = JSON.parse(_this.dealerPic);
            _this.dealerPic = _this.dealerPic.id;
            _this.cameraProvider.upload(_this.AddChosenPicture).then(function (res) {
                _this.identityPic = res;
                _this.basic_op.loaderEnd(_this.identityPic);
                _this.identityPic = _this.identityPic.response;
                _this.identityPic = JSON.parse(_this.identityPic);
                _this.identityPic = _this.identityPic.id;
                var data = {
                    "title": _this.userData.rfid_no,
                    "status": "publish",
                    "fields": {
                        "rfid_no": _this.userData.rfid_no,
                        "dealer_name": _this.userData.dealer_name,
                        "area": _this.userData.area,
                        "address": _this.userData.address,
                        "mobile_no": _this.userData.mobile_no,
                        "company": _this.userData.company,
                        "dealer_photo": _this.identityPic,
                        "id_proof": _this.dealerPic
                    }
                };
                var photos = {
                    "photo": _this.AddChosenPicture,
                    "identity": _this.chosenPicture
                };
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */], { data: data, photos: photos });
            }, function (error) {
                _this.basic_op.loaderEnd(error);
                _this.basic_op.alertboxDismiss(error.message);
            });
        }, function (error) {
            _this.basic_op.loaderEnd(error);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    DealerformPage.prototype.onOptionsSelected = function (e) {
        console.log(e);
    };
    DealerformPage.prototype.uplodPictureAdd = function () {
        var _this = this;
        var actionsheet = this.actionSheetCtrl.create({
            title: 'Upload Picture',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.dealerTakePicture();
                    }
                },
                {
                    text: 'Image Gallery',
                    handler: function () {
                        _this.dealerGetPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    DealerformPage.prototype.dealerTakePicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getProfilePictureFromCamera().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.AddChosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    DealerformPage.prototype.dealerGetPicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.AddChosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    DealerformPage.prototype.uplodPicture = function () {
        var _this = this;
        var actionsheet = this.actionSheetCtrl.create({
            title: 'Upload Picture',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Image Gallery',
                    handler: function () {
                        _this.getPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    DealerformPage.prototype.takePicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getProfilePictureFromCamera().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.chosenPicture = picture;
            }
        }, function (error) {
        });
    };
    DealerformPage.prototype.getPicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.chosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
            _this.basic_op.loaderEnd(picture);
        }, function (error) {
            //alert(error);
        });
    };
    DealerformPage.prototype.modalClose = function () {
        this.viewCtrl.dismiss();
    };
    DealerformPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerform',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerform\dealerform.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="danger">\n\n    <ion-title> Dealer\n\n      <ion-icon ios="ios-close-circle" md="md-close-circle" class="modal-close-btn" (click)="modalClose()" *ngIf="dealerid != undefined"></ion-icon></ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n	<form (ngSubmit)=\'addDealer()\' #dealerForm="ngForm">\n\n     \n\n		 <ion-item>\n\n         <ion-label floating>Rfid No</ion-label>\n\n        <ion-input type="text" name="rfid_no" id="rfid_no" [(ngModel)]="userData.rfid_no"></ion-input>\n\n      </ion-item>\n\n\n\n     <ion-item>\n\n         <ion-label floating>Name</ion-label>\n\n        <ion-input type="text" name="name" id="name" [(ngModel)]="userData.dealer_name"  required></ion-input>\n\n      </ion-item>\n\n\n\n        <ion-item>\n\n         <ion-label floating>Area</ion-label>\n\n        <ion-input type="text" name="area" id="area" [(ngModel)]="userData.area"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n         <ion-label floating>Address</ion-label>\n\n      <ion-textarea name="address" id="address" [(ngModel)]="userData.address"></ion-textarea>\n\n  	</ion-item>\n\n\n\n  		<ion-item>\n\n         <ion-label floating>Contact No</ion-label>\n\n        <ion-input type="number" name="contact_no" id="contact_no" [(ngModel)]="userData.mobile_no"  required></ion-input>\n\n      </ion-item>\n\n\n\n      \n\n     \n\n     <ion-item>\n\n      	<ion-label floating>Select Company</ion-label>\n\n      		<ion-select  name="company" id="company" (ngModelChange)=\'onOptionsSelected($event)\' [(ngModel)]="userData.company">\n\n             		<ion-option value="Hero">Hero</ion-option>\n\n             		<ion-option value="Honda">Honda</ion-option>\n\n             </ion-select>\n\n       </ion-item>\n\n\n\n       <ion-card>\n\n        <div (click)="uplodPictureAdd()" *ngIf = "dealerid == undefined"  color="danger" full ion-button icon-start>\n\n          <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n\n          Photo\n\n        </div>\n\n        <img [src]="AddChosenPicture" name="photo" id="photo" *ngIf = "dealerid == undefined">\n\n        <img [src]="userData.dealer_photo" name="photo" id="photo" *ngIf = "dealerid != undefined && userData.dealer_photo != undefined ">\n\n        <img src="../../assets/vehicle/profile.png" name="photo" id="photo" *ngIf = "dealerid != undefined && userData.dealer_photo == undefined ">\n\n     </ion-card>\n\n     \n\n\n\n     <ion-card>\n\n\n\n        <div (click)="uplodPicture()" *ngIf = "dealerid == undefined" color="danger" full ion-button icon-start>\n\n          <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n\n          ID PROOF\n\n        </div>\n\n        \n\n        <img [src]="chosenPicture" name="identity_proof" id="identity_proof" *ngIf="dealerid == undefined">\n\n            <img [src]="userData.id_proof" name="identity_proof" id="identity_proof" *ngIf="dealerid != undefined && userData.id_proof != undefined">\n\n            \n\n            <img src="../../assets/vehicle/document.png" name="identity_proof" id="identity_proof" *ngIf="dealerid != undefined && userData.id_proof == undefined">\n\n    \n\n     </ion-card> \n\n\n\n\n\n     \n\n     <ion-item no-lines>\n\n      <ion-buttons>\n\n            <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="dealerForm.form.invalid"  *ngIf="dealerid == undefined">Next <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon></button>\n\n           <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="dealerForm.form.invalid"  *ngIf="dealerid != undefined">Edit Dealer</button>\n\n      </ion-buttons>\n\n\n\n\n\n     </ion-item>\n\n    </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerform\dealerform.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__["a" /* CameraProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], DealerformPage);
    return DealerformPage;
}());

//# sourceMappingURL=dealerform.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerpaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DealerpaymentPage = /** @class */ (function () {
    function DealerpaymentPage(navCtrl, navParams, basic_op, httpreq) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.dealerCommissionApi = "wp-json/wp/v2/vehicle";
        this.dealerData = {};
        this.commission = 0;
        this.pending = 0;
        this.refresh = false;
    }
    DealerpaymentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dealerCommissionApi = this.httpreq.getUrl() + this.dealerCommissionApi;
        this.basic_op.getStorage('rfidno').then(function (val) {
            if (val != undefined) {
                _this.dealerComm(val);
            }
            else {
                //this.dealerComm(35518163);
                _this.basic_op.alertboxDismiss("Rfid session not set");
            }
        });
    };
    DealerpaymentPage.prototype.dealerComm = function (rfid) {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerCommissionApi, 'rfid', rfid, 99).then(function (res) {
            _this.dealerData = res;
            console.log(_this.dealerData);
            for (var i = 0; i < _this.dealerData.length; i++) {
                if (_this.dealerData[i].acf.commission_status == "Yes") {
                    console.log(i);
                    _this.commission = parseInt(_this.dealerData[i].acf.dealer_commission) + _this.commission;
                    console.log(_this.dealerData[i].acf.commission_status);
                    console.log(_this.commission);
                }
                else if (_this.dealerData[i].acf.commission_status == "No") {
                    console.log(i);
                    _this.pending = parseInt(_this.dealerData[i].acf.dealer_commission) + _this.pending;
                    console.log(_this.dealerData[i].acf.commission_status);
                    console.log(_this.commission);
                }
            }
            _this.basic_op.loaderEnd(res);
            _this.refresh = true;
        }, function (err) {
            _this.basic_op.loaderEnd(err);
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    DealerpaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerpayment',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerpayment\dealerpayment.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>Dealer Commission</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-card *ngIf="refresh">\n        <ion-list>\n          <ion-item>\n              <ion-row>\n                <ion-col col-6>\n                    <ion-icon color="danger" ios="ios-cash" md="md-cash"></ion-icon> Paid\n                </ion-col>\n                <ion-col col-6 text-right style="line-height: 20px;">\n                       {{commission | currency : "Rs." : 2}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-6>\n                   <ion-icon color="danger" ios="ios-cash" md="md-cash"></ion-icon> Pending\n                </ion-col>\n                <ion-col col-6 text-right style="line-height: 20px;">\n                       {{pending | currency : "Rs." : 2}}\n                </ion-col>\n              </ion-row>\n           </ion-item>\n        </ion-list>   \n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerpayment\dealerpayment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */]])
    ], DealerpaymentPage);
    return DealerpaymentPage;
}());

//# sourceMappingURL=dealerpayment.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicleformPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_vehiclesummary_vehiclesummary__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VehicleformPage = /** @class */ (function () {
    function VehicleformPage(navCtrl, navParams, httpreq, basic_op, cameraProvider, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.cameraProvider = cameraProvider;
        this.viewCtrl = viewCtrl;
        this.vehicleApi = "wp-json/wp/v2/vehicle";
        this.modelApi = "wp-json/wp/v2/model";
        this.vehicleData = [];
        this.tdate = new Date;
        this.vehicleApi = this.httpreq.getUrl() + this.vehicleApi;
        this.modelApi = this.httpreq.getUrl() + this.modelApi;
        this.customer_id = this.navParams.get("customer_id");
        this.entry_date = this.tdate.getDate() + '/' + (this.tdate.getMonth() + 1) + '/' + this.tdate.getFullYear();
        this.entry_date = this.entry_date.toString();
        this.rfid = this.navParams.get("rfid");
    }
    VehicleformPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.vehicle_id = this.navParams.get("vehicle_id");
        if (this.vehicle_id != undefined) {
            this.httpreq.getOnedata(this.vehicleApi, this.vehicle_id).then(function (res) {
                _this.vehicleData = res;
                _this.vehicleData = _this.vehicleData.acf;
                _this.model_no = _this.vehicleData.model_no;
            }, function (err) {
            });
        }
        this.basic_op.getStorage('rfidno').then(function (val) {
            if (val != undefined) {
                _this.rfid = val;
            }
            else {
                //  this.rfid = 35518163;
                if (_this.rfid != undefined) {
                    _this.basic_op.alertboxDismiss("Rfid session not set");
                }
            }
        });
        this.basic_op.getStorage('admin').then(function (val1) {
            if (val1 != undefined) {
                _this.company = val1;
                _this.getModel();
            }
            else {
                // return this.rfid = 35518163;
                if (_this.company != undefined) {
                    _this.basic_op.alertboxDismiss("Admin session not set");
                }
            }
        });
    };
    VehicleformPage.prototype.getModel = function () {
        var _this = this;
        this.httpreq.filterAcfFields(this.modelApi, 'company', this.company, 99).then(function (res) {
            _this.modeldata = res;
            console.log(_this.modeldata);
        });
    };
    VehicleformPage.prototype.addVehicle = function () {
        var _this = this;
        if (this.vehicle_id != undefined) {
            var data1 = {
                "title": this.vehicleData.chalan_no,
                "status": "publish",
                "fields": {
                    "chalan_no": this.vehicleData.chalan_no,
                    "engine_no": this.vehicleData.engine_no,
                    "model_no": this.vehicleData.model_no,
                    "frame_no": this.vehicleData.frame_no,
                    "vehicle_price": this.vehicleData.vehicle_price,
                    "pending_price": this.vehicleData.vehicle_pending_price,
                    "insaurance_policy": this.vehicleData.insaurance_policy,
                    "purchase_date": this.entry_date,
                    "payment_mode": this.vehicleData.payment_mode,
                    "dealer_commission": this.vehicleData.dealer_commission,
                    "commission_status": this.vehicleData.commission_status,
                }
            };
            this.basic_op.loaderStart();
            this.httpreq.update(data1, this.vehicle_id, this.vehicleApi).then(function (res) {
                _this.basic_op.loaderEnd(res);
                console.log(res);
                _this.viewCtrl.dismiss();
            }, function (err) {
                _this.basic_op.loaderEnd(err);
                _this.basic_op.alertboxDismiss(err.message);
            });
        }
        else {
            var data2 = {
                "title": this.vehicleData.chalan_no,
                "status": "publish",
                "fields": {
                    "chalan_no": this.vehicleData.chalan_no,
                    "engine_no": this.vehicleData.engine_no,
                    "model_no": this.model_no,
                    "frame_no": this.vehicleData.frame_no,
                    "vehicle_price": this.vehicleData.vehicle_price,
                    "pending_price": this.vehicleData.vehicle_pending_price,
                    "insaurance_policy": this.vehicleData.insaurance_policy,
                    "purchase_date": this.entry_date,
                    "payment_mode": this.vehicleData.payment_mode,
                    "dealer_commission": this.vehicleData.dealer_commission,
                    "commission_status": this.vehicleData.commission_status,
                    "vehicle_photo": "",
                    "customer_id": this.customer_id,
                    "rfid": this.rfid,
                    "company": this.company
                }
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_vehiclesummary_vehiclesummary__["a" /* VehiclesummaryPage */], { data: data2, customer_id: this.customer_id });
        }
    };
    VehicleformPage.prototype.onOptionsSelectedd = function (e) {
        console.log(e);
    };
    VehicleformPage.prototype.onOptionsSelected = function (e) {
        this.model_no = e;
        console.log(this.model_no);
    };
    VehicleformPage.prototype.onOptionsSelectedType = function (e) {
        console.log(e);
    };
    VehicleformPage.prototype.modalClose = function () {
        this.viewCtrl.dismiss();
    };
    VehicleformPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vehicleform',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\vehicleform\vehicleform.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar hideBackButton="true" color="danger">\n\n    <ion-title>Vehicle Form\n\n    <ion-icon ios="ios-close-circle" md="md-close-circle" class="modal-close-btn" (click)="modalClose()" *ngIf="vehicle_id != undefined"></ion-icon></ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n		<form (ngSubmit)=\'addVehicle()\' #vehicleForm="ngForm">\n\n     \n\n      <ion-item>\n\n         <ion-label floating>Chalan No</ion-label>\n\n        <ion-input type="text" name="chalan_no" id="chalan_no" [(ngModel)]="vehicleData.chalan_no"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n         <ion-label floating>Engine No</ion-label>\n\n        <ion-input type="text" name="engine_no" id="engine_no" [(ngModel)]="vehicleData.engine_no"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n      	<ion-label floating>Model No</ion-label>\n\n      		<ion-select  name="company" id="company" (ngModelChange)=\'onOptionsSelected($event)\' [(ngModel)]="model_no">\n\n             		<ion-option *ngFor="let opt of modeldata"  [value]="opt.acf.model_no">{{opt.acf.model_no}}</ion-option>\n\n             </ion-select>\n\n       </ion-item>\n\n\n\n\n\n      <ion-item>\n\n         <ion-label floating>Frame No</ion-label>\n\n        <ion-input type="text" name="frame_no" id="frame_no" [(ngModel)]="vehicleData.frame_no"  required></ion-input>\n\n      </ion-item>\n\n\n\n\n\n  		<ion-item>\n\n         <ion-label floating>Price</ion-label>\n\n        <ion-input type="number" name="price" id="price" [(ngModel)]="vehicleData.vehicle_price"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n         <ion-label floating>Pending Price</ion-label>\n\n        <ion-input type="number" name="pending_price" id="pending_price" [(ngModel)]="vehicleData.vehicle_pending_price"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n          <ion-label floating>Insurance Policy</ion-label>\n\n             <ion-select name="insurance_policy" id="insurance_policy" [(ngModel)]="vehicleData.insaurance_policy">\n\n                <ion-option value="Yes">Yes</ion-option>\n\n                <ion-option value="No">No</ion-option>\n\n             </ion-select>\n\n      </ion-item>\n\n     \n\n     <ion-item>\n\n         <ion-label floating>Purchase Date</ion-label>\n\n        <ion-input type="text" name="purchase_date" id="purchase_date" [(ngModel)]="entry_date"  required></ion-input>\n\n      </ion-item>\n\n      \n\n      <ion-item>\n\n        <ion-label floating>Payment Mode</ion-label>\n\n          <ion-select  name="payment" id="payment" (ngModelChange)=\'onOptionsSelectedd($event)\' [(ngModel)]="vehicleData.payment_mode">\n\n                <ion-option value="Cash">Cash</ion-option>\n\n                <ion-option value="HDFC Bank LTD">HDFC Bank LTD</ion-option>\n\n                <ion-option value="L & T Finance LTD">L & T Finance LTD</ion-option>\n\n                <ion-option value="Hero Fin corp">Hero Fin corp</ion-option>\n\n                <ion-option value="Indusind Bank">Indusind Bank</ion-option>\n\n             </ion-select>\n\n       </ion-item>\n\n\n\n      \n\n      <ion-item>\n\n         <ion-label floating>Dealer Commission</ion-label>\n\n        <ion-input type="number" name="commission" id="commission" [(ngModel)]="vehicleData.dealer_commission"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n          <ion-label floating>Commission Status</ion-label>\n\n             <ion-select name="commission_status" id="commission_status" [(ngModel)]="vehicleData.commission_status">\n\n                <ion-option value="Yes">Completed</ion-option>\n\n                <ion-option value="No">Pending</ion-option>\n\n             </ion-select>\n\n      </ion-item>\n\n\n\n     <ion-item no-lines>\n\n      <ion-buttons>\n\n            <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="vehicleForm.form.invalid" *ngIf="vehicle_id == undefined">Add Vehicle</button>\n\n            <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="vehicleForm.form.invalid"  *ngIf="vehicle_id != undefined">Edit Vehicle</button>\n\n\n\n      </ion-buttons>\n\n\n\n     </ion-item>\n\n    </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\vehicleform\vehicleform.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__["a" /* CameraProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], VehicleformPage);
    return VehicleformPage;
}());

//# sourceMappingURL=vehicleform.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dealerhome_dealerhome__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.vfs = __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default.a.pdfMake.vfs;


var ReportPage = /** @class */ (function () {
    function ReportPage(navCtrl, navParams, httpreq, basic_op, file, fileOpener, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.file = file;
        this.fileOpener = fileOpener;
        this.plt = plt;
        this.customerApi = "wp-json/wp/v2/customer";
        this.vehicleApi = "wp-json/wp/v2/vehicle";
        this.customerInfo = [];
        this.vehicleInfo = [];
        this.pdfObj = null;
        this.customerApi = this.httpreq.getUrl() + this.customerApi;
        this.vehicleApi = this.httpreq.getUrl() + this.vehicleApi;
        this.rfid = this.navParams.get("rfid");
        this.customer_id = this.navParams.get("customer_id");
        this.vehicle_id = this.navParams.get("vehicle_id");
        this.customerDetails();
        this.vehicleDetails();
    }
    ReportPage.prototype.ionViewDidLoad = function () {
    };
    ReportPage.prototype.customerDetails = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.getOnedata(this.customerApi, this.customer_id).then(function (res) {
            _this.customerInfo = res;
            _this.customerInfo = _this.customerInfo.acf;
            console.log(_this.customerInfo);
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    ReportPage.prototype.vehicleDetails = function () {
        var _this = this;
        this.httpreq.getOnedata(this.vehicleApi, this.vehicle_id).then(function (res) {
            _this.vehicleInfo = res;
            _this.vehicleInfo = _this.vehicleInfo.acf;
            console.log(_this.vehicleInfo);
            _this.basic_op.loaderEnd(_this.vehicleInfo);
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    ReportPage.prototype.createPdf = function () {
        console.log(this.customerInfo.photo);
        var docDefinition = {
            content: [
                { text: 'Customer Details', style: 'header' },
                // { text: new Date().toTimeString(), alignment: 'right' },
                //{ text: 'From', style: 'subheader' },
                { text: 'Customer Name', style: 'label' },
                { text: this.customerInfo.customer_name, style: 'subheader' },
                { text: 'Area', style: 'label' },
                { text: this.customerInfo.area, style: 'subheader' },
                { text: 'Address', style: 'label' },
                { text: this.customerInfo.address, style: 'subheader' },
                { text: 'Mobile No', style: 'label' },
                { text: this.customerInfo.mobile_no, style: 'subheader' },
                // { text: 'Customer Image', style: 'label' },
                // { image: 'data:image/jpeg;base64,'+this.customerInfo.photo, width: 100,height: 130},
                { text: 'Vehicle Details', style: 'header' },
                { text: 'Chalan No', style: 'label' },
                { text: this.vehicleInfo.chalan_no, style: 'subheader' },
                { text: 'Engine No', style: 'label' },
                { text: this.vehicleInfo.engine_no, style: 'subheader' },
                { text: 'Model No', style: 'label' },
                { text: this.vehicleInfo.model_no, style: 'subheader' },
                { text: 'Frame No', style: 'label' },
                { text: this.vehicleInfo.frame_no, style: 'subheader' },
                { text: 'Vehicle Price', style: 'label' },
                { text: this.vehicleInfo.vehicle_price, style: 'subheader' },
                { text: 'Vehicle Pending Price', style: 'label' },
                { text: this.vehicleInfo.pending_price, style: 'subheader' },
                { text: 'Insaurance Policy', style: 'label' },
                { text: this.vehicleInfo.insaurance_policy, style: 'subheader' },
                { text: 'Purchase Date', style: 'label' },
                { text: this.vehicleInfo.purchase_date, style: 'subheader' },
                { text: 'Payment Mode', style: 'label' },
                { text: this.vehicleInfo.payment_mode, style: 'subheader' },
                { text: 'Company', style: 'label' },
                { text: this.vehicleInfo.company, style: 'subheader' },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'right',
                },
                label: {
                    fontSize: 10,
                    alignment: 'left'
                },
            }
        };
        this.pdfObj = __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.createPdf(docDefinition);
    };
    ReportPage.prototype.downloadPdf = function (customerInfo, vehicleInfo) {
        var _this = this;
        this.createPdf();
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                _this.file.writeFile(_this.file.dataDirectory, _this.customerInfo.customer_name + "-" + _this.vehicleInfo.vehicle_name + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + _this.customerInfo.customer_name + "-" + _this.vehicleInfo.vehicle_name + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            // On a browser simply use download!
            this.pdfObj.download();
        }
    };
    ReportPage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_dealerhome_dealerhome__["a" /* DealerhomePage */]);
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-report',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\report\report.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="danger" hideBackButton="true">\n\n    <ion-title>Report</ion-title>\n\n      <ion-buttons end> \n\n        <button (click)="goToHome()" ion-button color="danger">\n\n          <ion-icon ios="ios-home" md="md-home" ></ion-icon> \n\n        </button>\n\n        </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<ion-card>\n\n		<ion-card-header>\n\n		    Customer Details\n\n		</ion-card-header>\n\n  		<ion-list>\n\n          <ion-item>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Name\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       <b>{{customerInfo.customer_name}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Area\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{customerInfo.area}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Address\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{customerInfo.address}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Mobile No.\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{customerInfo.mobile_no}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-12>\n\n                    Photo\n\n                </ion-col>\n\n                <ion-col>\n\n                       <img [src]="customerInfo.id_proof_front" name="photo" id="photo">\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-12>\n\n                    Identity\n\n                </ion-col>\n\n                <ion-col>\n\n                    <img [src]="customerInfo.id_proof_back" name="identity" id="identity">\n\n                </ion-col>\n\n              </ion-row>\n\n            </ion-item>\n\n            </ion-list>\n\n    </ion-card>\n\n    <ion-card>\n\n    	<ion-card-header>\n\n		    Vehicle Details\n\n		</ion-card-header>\n\n  		<ion-list no-lines>\n\n          <ion-item>\n\n               <ion-row>\n\n                <ion-col col-6>\n\n                    Chalan No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.chalan_no}}\n\n                </ion-col>\n\n              </ion-row> \n\n                <ion-row>\n\n                <ion-col col-6>\n\n                    Engine No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.engine_no}}\n\n                </ion-col>\n\n              </ion-row> \n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Model No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       <b>{{vehicleInfo.model_no}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Frame No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.frame_no}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Price\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.vehicle_price | currency : "Rs." : 2}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Pending Price\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.pending_price | currency : "Rs." : 2}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Insaurance Policy\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.insaurance_policy}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                   Purchase Date\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.purchase_date }}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                   Payment Mode\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.payment_mode }}\n\n                </ion-col>\n\n              </ion-row>\n\n             \n\n            </ion-item>\n\n            </ion-list>\n\n    </ion-card>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n	<ion-buttons>\n\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="downloadPdf(customerInfo,vehicleInfo)">Report</button>\n\n	</ion-buttons>\n\n</ion-footer>'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\report\report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], ReportPage);
    return ReportPage;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicledetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_vehicleform_vehicleform__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.vfs = __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default.a.pdfMake.vfs;


var VehicledetailsPage = /** @class */ (function () {
    function VehicledetailsPage(navCtrl, navParams, httpreq, basic_op, modalCtrl, file, fileOpener, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.modalCtrl = modalCtrl;
        this.file = file;
        this.fileOpener = fileOpener;
        this.plt = plt;
        this.customerApi = "wp-json/wp/v2/customer";
        this.vehicleApi = "wp-json/wp/v2/vehicle";
        this.vehicleinfo = [];
        this.customerInfo = [];
        this.pdfObj = null;
    }
    VehicledetailsPage.prototype.ionViewDidLoad = function () {
        this.vehicleApi = this.httpreq.getUrl() + this.vehicleApi;
        this.customerApi = this.httpreq.getUrl() + this.customerApi;
        this.customerid = this.navParams.get('customerId');
        this.vehicleDetails();
        this.customerDetails();
    };
    VehicledetailsPage.prototype.vehicleDetails = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.vehicleApi, 'customer_id', this.customerid, 99).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.vehicleinfo = res;
            console.log(_this.vehicleinfo);
        }, function (err) {
            _this.basic_op.loaderEnd(err);
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    VehicledetailsPage.prototype.customerDetails = function () {
        var _this = this;
        this.httpreq.getOnedata(this.customerApi, this.customerid).then(function (res) {
            _this.customerInfo = res;
            _this.customerInfo = _this.customerInfo.acf;
            console.log(_this.customerInfo);
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    VehicledetailsPage.prototype.editVehicle = function (vehicle) {
        var _this = this;
        var vehicleModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_vehicleform_vehicleform__["a" /* VehicleformPage */], { vehicle_id: vehicle });
        vehicleModal.present();
        vehicleModal.onDidDismiss(function () {
            _this.vehicleDetails();
        });
    };
    VehicledetailsPage.prototype.reportPage = function (vehicleInfo) {
        this.downloadPdf(vehicleInfo);
    };
    VehicledetailsPage.prototype.downloadPdf = function (vehicleInfo) {
        var _this = this;
        this.createPdf(vehicleInfo);
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                _this.file.writeFile(_this.file.dataDirectory, _this.customerInfo.customer_name + "-" + vehicleInfo.acf.vehicle_name + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + _this.customerInfo.customer_name + "-" + vehicleInfo.acf.vehicle_name + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            this.pdfObj.download();
        }
    };
    VehicledetailsPage.prototype.createPdf = function (vehicleInfo) {
        var docDefinition = {
            content: [
                { text: 'Customer Details', style: 'header' },
                // { text: new Date().toTimeString(), alignment: 'right' },
                //{ text: 'From', style: 'subheader' },
                { text: 'Customer Name', style: 'label' },
                { text: this.customerInfo.customer_name, style: 'subheader' },
                { text: 'Area', style: 'label' },
                { text: this.customerInfo.area, style: 'subheader' },
                { text: 'Address', style: 'label' },
                { text: this.customerInfo.address, style: 'subheader' },
                { text: 'Mobile No', style: 'label' },
                { text: this.customerInfo.mobile_no, style: 'subheader' },
                { text: 'Vehicle Details', style: 'header' },
                { text: 'Chalan No', style: 'label' },
                { text: vehicleInfo.acf.chalan_no, style: 'subheader' },
                { text: 'Engine No', style: 'label' },
                { text: vehicleInfo.acf.engine_no, style: 'subheader' },
                { text: 'Model No', style: 'label' },
                { text: vehicleInfo.acf.model_no, style: 'subheader' },
                { text: 'Frame No', style: 'label' },
                { text: vehicleInfo.acf.frame_no, style: 'subheader' },
                { text: 'Vehicle Price', style: 'label' },
                { text: vehicleInfo.acf.vehicle_price, style: 'subheader' },
                { text: 'Vehicle Pending Price', style: 'label' },
                { text: vehicleInfo.acf.pending_price, style: 'subheader' },
                { text: 'Insaurance Policy', style: 'label' },
                { text: vehicleInfo.acf.insaurance_policy, style: 'subheader' },
                { text: 'Purchase Date', style: 'label' },
                { text: vehicleInfo.acf.purchase_date, style: 'subheader' },
                { text: 'Payment Mode', style: 'label' },
                { text: vehicleInfo.acf.payment_mode, style: 'subheader' },
                { text: 'Company', style: 'label' },
                { text: vehicleInfo.acf.company, style: 'subheader' },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'right',
                },
                label: {
                    fontSize: 10,
                    alignment: 'left'
                },
            }
        };
        this.pdfObj = __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.createPdf(docDefinition);
    };
    VehicledetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vehicledetails',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\vehicledetails\vehicledetails.html"*/'\n<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>Vehicle Information</ion-title>	\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-card *ngFor="let vehicle of vehicleinfo">\n  		<ion-list no-lines>\n          <ion-item>\n              <ion-row>\n                <ion-col col-4>\n                     Chalan No\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.chalan_no}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                     Engine No\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                  {{vehicle.acf.engine_no}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                     Model No\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.model_no}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                     Frame No\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.frame_no}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                    Purchase Date\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.purchase_date}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                    Price\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.vehicle_price | currency : "Rs." : 2}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-6>\n                    Pending Price\n                </ion-col>\n                <ion-col col-6 text-wrap>\n                        <b>{{vehicle.acf.pending_price | currency : "Rs." : 2}}</b>\n                </ion-col>\n              </ion-row>\n      		  <ion-row>\n                <ion-col col-4>\n                    Payment Mode\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data">\n                	{{vehicle.acf.payment_mode}}\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col col-4>\n                    Commission \n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data" *ngIf="vehicle.acf.commission_status == \'Yes\'" style="color:blue">\n                  Completed\n                </ion-col>\n                <ion-col col-8 text-wrap text-right class="vehicle-data" *ngIf="vehicle.acf.commission_status == \'No\'" style="color:red">\n                  Pending\n                </ion-col>\n            </ion-row>\n            </ion-item>\n            <ion-item>\n              <ion-row>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="editVehicle(vehicle.id)" class="back-btn">\n        <ion-icon ios="ios-clipboard" md="md-clipboard"></ion-icon>\n        <div>Edit</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="reportPage(vehicle)" class="next-btn">\n        <ion-icon ios="ios-paper" md="md-paper" class="car-icon"></ion-icon>\n        <div>Report</div>\n      </button>\n    </ion-col>\n  </ion-row>\n\n      			<!-- <ion-buttons>\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="editVehicle(vehicle.id)">Edit</button>\n      			</ion-buttons> -->\n  			</ion-item>\n            </ion-list>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\vehicledetails\vehicledetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], VehicledetailsPage);
    return VehicledetailsPage;
}());

//# sourceMappingURL=vehicledetails.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_vehicledetails_vehicledetails__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default.a.vfs = __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts___default.a.pdfMake.vfs;


var CustomerslistPage = /** @class */ (function () {
    function CustomerslistPage(navCtrl, navParams, httpreq, basic_op, file, fileOpener, plt, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.file = file;
        this.fileOpener = fileOpener;
        this.plt = plt;
        this.modalCtrl = modalCtrl;
        this.customerApi = "wp-json/wp/v2/customer";
        this.dealerPostApi = "wp-json/wp/v2/dealer_posts";
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.customerinfo = [];
        this.dealerInfo = [];
        this.dealerData = [];
        this.dealerSelect = false;
        this.pdfObj = null;
        this.all = [];
        this.checkDealerPage = false;
        this.customerApi = this.httpreq.getUrl() + this.customerApi;
        this.dealerPostApi = this.httpreq.getUrl() + this.dealerPostApi;
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
    }
    CustomerslistPage.prototype.ionViewDidLoad = function () {
        this.rfid = this.navParams.get("rfid");
        if (this.rfid != undefined) {
            this.checkDealerPage = true;
            this.customerDetails(this.rfid);
        }
        else {
            console.log(this.rfid);
            this.getAllDealers();
        }
    };
    CustomerslistPage.prototype.getAllDealers = function () {
        var _this = this;
        this.httpreq.getAllDataPosts(this.dealerPostApi).then(function (res) {
            _this.dealerInfo = res;
            for (var i = 0; i < _this.dealerInfo.data.length; i++) {
                _this.dealerData[i] = _this.dealerInfo.data[i].acf.mobile_no;
            }
            _this.all = _this.dealerData;
            console.log(_this.all);
            return _this.dealerData;
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    CustomerslistPage.prototype.getItems = function (ev) {
        this.customerinfo = [];
        var val = ev.target.value;
        if (val != 0) {
            if (val && val.trim() != '') {
                this.dealerSelect = true;
                this.dealerData = this.all.filter(function (dealer) {
                    return (dealer.indexOf(val) > -1);
                });
            }
        }
        else {
            this.dealerSelect = false;
            this.dealerData = this.all;
        }
    };
    CustomerslistPage.prototype.openItem = function (mobileno) {
        var _this = this;
        this.dealerSelect = false;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerApi, 'mobile_no', mobileno).then(function (res) {
            _this.dealerid = res;
            _this.rfid = _this.dealerid[0].acf.rfid_no;
            _this.dealerid = _this.dealerid[0].id;
            console.log("pp" + _this.rfid);
            _this.httpreq.filterAcfFields(_this.customerApi, 'dealer_id', _this.dealerid, 10).then(function (res) {
                _this.basic_op.loaderEnd(res);
                _this.customerinfo = res;
                console.log(_this.customerinfo);
            }, function (err) {
                _this.basic_op.loaderEnd(err);
                _this.basic_op.alertboxDismiss(err.message);
            });
        });
        // this.rfid = rfid;
        // this.customerDetails(rfid);
    };
    CustomerslistPage.prototype.customerDetails = function (rfid) {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerApi, 'rfid_no', rfid).then(function (res) {
            _this.dealerid = res;
            _this.dealerid = _this.dealerid[0].id;
            _this.httpreq.filterAcfFields(_this.customerApi, 'dealer_id', _this.dealerid, 99).then(function (res) {
                _this.basic_op.loaderEnd(res);
                _this.customerinfo = res;
                console.log(_this.customerinfo);
            }, function (err) {
                _this.basic_op.loaderEnd(err);
                _this.basic_op.alertboxDismiss(err.message);
            });
        });
    };
    CustomerslistPage.prototype.vehicleDetails = function (customerid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */], { customerId: customerid, rfid: this.rfid });
    };
    CustomerslistPage.prototype.editCustomer = function (customerId) {
        var _this = this;
        console.log(this.dealerid);
        var customer = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__["a" /* CustomerformPage */], { customer_id: customerId, dealerid: this.dealerid });
        customer.onDidDismiss(function () {
            _this.customerDetails(_this.rfid);
        });
        customer.present();
    };
    CustomerslistPage.prototype.reportPage = function (customerInfo) {
        this.downloadPdf(customerInfo);
    };
    CustomerslistPage.prototype.downloadPdf = function (customerInfo) {
        var _this = this;
        this.createPdf(customerInfo);
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                _this.file.writeFile(_this.file.dataDirectory, customerInfo.acf.customer_name + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + customerInfo.acf.customer_name + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            // On a browser simply use download!
            this.pdfObj.download();
        }
    };
    CustomerslistPage.prototype.createPdf = function (customerInfo) {
        console.log(customerInfo);
        var docDefinition = {
            content: [
                { text: 'Customer Details', style: 'header' },
                { text: 'Customer Name', style: 'label' },
                { text: customerInfo.acf.customer_name, style: 'subheader' },
                { text: 'Area', style: 'label' },
                { text: customerInfo.acf.area, style: 'subheader' },
                { text: 'Address', style: 'label' },
                { text: customerInfo.acf.address, style: 'subheader' },
                { text: 'Mobile No', style: 'label' },
                { text: customerInfo.acf.mobile_no, style: 'subheader' },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'right',
                },
                label: {
                    fontSize: 10,
                    alignment: 'left'
                },
            }
        };
        this.pdfObj = __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default.a.createPdf(docDefinition);
    };
    CustomerslistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerslist',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\customerslist\customerslist.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="danger">\n\n    <ion-title>Customers</ion-title>\n\n     <button ion-button menuToggle >\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n	<ion-searchbar (ionInput)="getItems($event)" placeholder="Enter dealer mobile no " *ngIf="!checkDealerPage"></ion-searchbar >\n\n  <ion-list *ngIf="dealerSelect">\n\n    <button ion-item (click)="openItem(dealer)" *ngFor="let dealer of dealerData">\n\n      <h2>{{dealer}}</h2>\n\n      </button>\n\n  </ion-list>\n\n\n\n  <ng-container *ngIf="customerinfo.length != 0">\n\n	<ion-list *ngFor="let customer of customerinfo">\n\n  <ion-item-sliding>\n\n    <ion-item (click)="editCustomer(customer.id)">\n\n      <h2>{{customer.acf.customer_name}} ({{customer.acf.company}})</h2>\n\n      <p>{{customer.acf.mobile_no}}</p>\n\n    </ion-item>\n\n    <ion-item-options side="right">\n\n      <button ion-button color="secondary" (click)="vehicleDetails(customer.id)">\n\n        <ion-icon ios="ios-car" md="md-car" class="car-icon"></ion-icon>\n\n        Details\n\n      </button>\n\n      <button ion-button color="danger" (click)="reportPage(customer)">\n\n        <ion-icon ios="ios-paper" md="md-paper" class="car-icon" ></ion-icon>\n\n        Report\n\n      </button>\n\n    </ion-item-options>\n\n  </ion-item-sliding>\n\n</ion-list>\n\n</ng-container>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\customerslist\customerslist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CustomerslistPage);
    return CustomerslistPage;
}());

//# sourceMappingURL=customerslist.js.map

/***/ }),

/***/ 132:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 132;

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 174;

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConnectionStatusEnum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConnectionStatusEnum;
(function (ConnectionStatusEnum) {
    ConnectionStatusEnum[ConnectionStatusEnum["Online"] = 0] = "Online";
    ConnectionStatusEnum[ConnectionStatusEnum["Offline"] = 1] = "Offline";
})(ConnectionStatusEnum || (ConnectionStatusEnum = {}));
var NetworkProvider = /** @class */ (function () {
    function NetworkProvider(http, alertCtrl, network, eventCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.eventCtrl = eventCtrl;
        this.previousStatus = ConnectionStatusEnum.Online;
    }
    NetworkProvider.prototype.initializeNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            if (_this.previousStatus === ConnectionStatusEnum.Online) {
                _this.eventCtrl.publish('network:offline');
            }
            _this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(function () {
            if (_this.previousStatus === ConnectionStatusEnum.Offline) {
                _this.eventCtrl.publish('network:online');
            }
            _this.previousStatus = ConnectionStatusEnum.Online;
        });
    };
    NetworkProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
    ], NetworkProvider);
    return NetworkProvider;
}());

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerscanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_serial__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dealerform_dealerform__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DealerscanPage = /** @class */ (function () {
    function DealerscanPage(navCtrl, navParams, basic_op, httpreq, serial, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.serial = serial;
        this.alertCtrl = alertCtrl;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.rfid = "";
        this.dealerInfo = {};
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
    }
    DealerscanPage.prototype.ionViewDidLoad = function () {
        //this.cardChecker();
    };
    DealerscanPage.prototype.ionViewWillEnter = function () {
        this.rfid = "";
        this.cardChecker();
    };
    DealerscanPage.prototype.cardChecker = function () {
        var _this = this;
        this.basic_op.removeStorage('rfidno');
        this.basic_op.removeStorage('dealerid');
        this.serial.requestPermission().then(function () {
            _this.serial.open({ baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: 0,
                dtr: true,
                rts: true,
                sleepOnPause: false }).then(function () {
                _this.device_attach = true;
                _this.serial.registerReadCallback().subscribe(function (res) {
                    var r = new Uint8Array(res);
                    _this.rfid = _this.rfid.concat(String.fromCharCode.apply(null, r));
                    if (_this.rfid.length == 8) {
                        _this.rfid = _this.rfid.substring(0, 8);
                        // this.serial.close();
                        _this.checkDealerRegister();
                    }
                }, function (error) {
                    _this.basic_op.alertboxDismiss("rfid card not read");
                });
            }, function (error) {
                _this.basic_op.alertboxDismiss("connection problem issue");
            });
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Machine is not connected',
                message: 'Machine is not connected.You have to connect the machine then dismiss.',
                buttons: [
                    {
                        text: 'Dismiss',
                        handler: function () {
                            if (_this.device_attach) {
                                // this.basic_op.alertboxDismiss("Machine is connected.");
                                //this.cardChecker();
                            }
                            else {
                                _this.cardChecker();
                            }
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            alert.present();
        });
    };
    DealerscanPage.prototype.checkDealerRegister = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerApi, 'rfid_no', this.rfid).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.dealerInfo = res;
            _this.dealerInfo = _this.dealerInfo[0];
            if (_this.dealerInfo != undefined) {
                if (_this.dealerInfo.acf.rfid_no == _this.rfid) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Card already registered',
                        buttons: [
                            {
                                text: 'Dismiss',
                                handler: function (data) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__["a" /* LoginPage */]);
                                }
                            }
                        ],
                        enableBackdropDismiss: false
                    });
                    alert_1.present();
                }
                else {
                    _this.serial.close();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealerform_dealerform__["a" /* DealerformPage */], { rfid: _this.rfid });
                }
            }
            else {
                _this.serial.close();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_dealerform_dealerform__["a" /* DealerformPage */], { rfid: _this.rfid });
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error.message);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    DealerscanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerscan',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerscan\dealerscan.html"*/'<ion-header>\n  <ion-navbar color="danger">\n  <ion-title>SCAN YOUR CARD</ion-title>\n  <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="homepage">\n      <ion-icon ios="ios-wifi" md="md-wifi" class="animated infinite heartBeat" *ngIf="device_attach"></ion-icon>\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerscan\dealerscan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_serial__["a" /* Serial */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DealerscanPage);
    return DealerscanPage;
}());

//# sourceMappingURL=dealerscan.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealersummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_loginpage_loginpage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DealersummaryPage = /** @class */ (function () {
    function DealersummaryPage(navCtrl, navParams, httpreq, basic_op, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.alertCtrl = alertCtrl;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.dealerInfo = [];
        this.dealerPhotos = [];
        this.dealerAdd = [];
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
        this.dealerInfo = this.navParams.get('data');
        this.dealerPhotos = this.navParams.get('photos');
    }
    DealersummaryPage.prototype.ionViewDidLoad = function () {
    };
    DealersummaryPage.prototype.editDealer = function () {
        this.navCtrl.pop();
    };
    DealersummaryPage.prototype.addDealer = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.send(this.dealerInfo, this.dealerApi).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.dealerAdd = res;
            // if(this.dealerAdd.acf.rfid_no)
            // {
            var alert = _this.alertCtrl.create({
                title: 'Registration is successful',
                buttons: [
                    {
                        text: 'Dismiss',
                        handler: function (data) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_loginpage_loginpage__["a" /* LoginPage */]);
                        }
                    }
                ],
                enableBackdropDismiss: false
            });
            alert.present();
            // }
            // else{
            // }
        }, function (error) {
            _this.basic_op.alertboxDismiss(error.message);
            _this.basic_op.loaderEnd(error);
        });
    };
    DealersummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealersummary',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealersummary\dealersummary.html"*/'\n<ion-header>\n\n  <ion-navbar hideBackButton="true" color="danger">\n    <ion-title>Dealer Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-card class="disp-section">\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img [src]="dealerPhotos.photo">\n    </ion-avatar>\n    <h2>{{dealerInfo.fields.dealer_name}}</h2>\n    <p>{{dealerInfo.fields.rfid_no}}</p>\n      </ion-item>\n\n  <img [src]="dealerPhotos.photo">\n\n  <ion-card-content>\n    <ion-list>\n      <ion-item><span>Mobile No : </span>{{dealerInfo.fields.mobile_no}}</ion-item>\n      <ion-item><span>Area : </span>{{dealerInfo.fields.area}}</ion-item>\n      <ion-item text-wrap><span>Address :</span> {{dealerInfo.fields.address}}</ion-item>\n      <ion-item><span>Company : </span>{{dealerInfo.fields.company}}</ion-item>\n      <ion-item><img [src]="dealerPhotos.identity"></ion-item>\n    </ion-list>\n    \n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="editDealer()" class="back-btn">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n        <div>Back</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="addDealer()" class="next-btn">\n        <div>Next</div>\n        <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>\n      </button>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n\n	              \n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealersummary\dealersummary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DealersummaryPage);
    return DealersummaryPage;
}());

//# sourceMappingURL=dealersummary.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_serial__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_controllers_controllers__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_dealerhome_dealerhome__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, basic_op, httpreq, ctrlProvider, serial, androidPermissions, platform, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.ctrlProvider = ctrlProvider;
        this.serial = serial;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.dealerInfo = {};
        this.rfid = "";
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
        this.basic_op.sideMenuClose();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.cardChecker();
    };
    HomePage.prototype.cardChecker = function () {
        var _this = this;
        this.basic_op.getStorage('rfidno').then(function (val) {
            if (val == undefined) {
                //{vid:'2341',pid:'0043',driver:'FtdiSerialDriver'}
                _this.rfid = "";
                _this.serial.requestPermission().then(function () {
                    _this.serial.open({ baudRate: 9600,
                        dataBits: 8,
                        stopBits: 1,
                        parity: 0,
                        dtr: true,
                        rts: true,
                        sleepOnPause: false }).then(function () {
                        _this.device_attach = true;
                        _this.serial.registerReadCallback().subscribe(function (res) {
                            var r = new Uint8Array(res);
                            _this.rfid = _this.rfid.concat(String.fromCharCode.apply(null, r));
                            if (_this.rfid.length == 8) {
                                _this.rfid = _this.rfid.substring(0, 8);
                                // this.serial.close();
                                _this.login(_this.rfid);
                                _this.serial.close();
                            }
                        }, function (error) {
                            _this.basic_op.alertboxDismiss("rfid card not read");
                        });
                    }, function (error) {
                        _this.basic_op.alertboxDismiss("connection problem issue");
                    });
                }, function (error) {
                    var alert = _this.alertCtrl.create({
                        title: 'Machine is not connected',
                        message: 'Machine is not connected.You have to connect the machine then dismiss.',
                        buttons: [
                            {
                                text: 'Dismiss',
                                handler: function () {
                                    if (_this.device_attach) {
                                        _this.basic_op.alertboxDismiss("Machine is connected.");
                                    }
                                    else {
                                        _this.cardChecker();
                                    }
                                }
                            }
                        ],
                        enableBackdropDismiss: false
                    });
                    alert.present();
                });
            }
        }, function (err) {
        });
    };
    HomePage.prototype.login = function (rfidno) {
        //this.basic_op.loaderStart();
        var _this = this;
        this.rfid = "";
        this.httpreq.filterAcfFields(this.dealerApi, 'rfid_no', rfidno).then(function (res) {
            // this.basic_op.loaderEnd(res);
            _this.dealerInfo = res;
            _this.dealerInfo = _this.dealerInfo[0];
            if (_this.dealerInfo != undefined) {
                if (_this.dealerInfo.acf.rfid_no == rfidno) {
                    _this.basic_op.setStorage('rfidno', rfidno);
                    _this.basic_op.setStorage('dealerid', _this.dealerInfo.id);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_dealerhome_dealerhome__["a" /* DealerhomePage */]);
                }
                else {
                    _this.rfid = "";
                    //   this.basic_op.alertboxDismiss("Card not detected.Try again");
                    //   let alert = this.alertCtrl.create({
                    //     title: 'Card not detected.Try again', 
                    //     buttons: [
                    //         {
                    //             text: 'Dismiss',
                    //             handler: () => {
                    //                        this.rfid = "";
                    //                        this.dealerInfo.length = 0;
                    //                        this.cardChecker();
                    //                     }
                    //         }
                    //     ],
                    //     enableBackdropDismiss : false
                    // });
                }
            }
            else {
                _this.rfid = "";
                //   this.basic_op.alertboxDismiss("Card not detected.Try again");
                //   let alert = this.alertCtrl.create({
                //     title: 'Card not detected.Try again', 
                //     buttons: [
                //         {
                //             text: 'Dismiss',
                //             handler: () => {
                //                        this.rfid = "";
                //                        this.dealerInfo.length = 0;
                //                        this.cardChecker();
                //                     }
                //         }
                //     ],
                //     enableBackdropDismiss : false
                // });
            }
        }, function (error) {
            _this.basic_op.alertboxDismiss("Card not detected.Try again");
            _this.cardChecker();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n  	<!-- <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n     --><ion-title>SCAN YOUR CARD</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="homepage">\n      <ion-icon ios="ios-wifi" md="md-wifi" class="animated infinite heartBeat" *ngIf="device_attach"></ion-icon>\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_httpprovider_httpprovider__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_controllers_controllers__["a" /* ControllersProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_serial__["a" /* Serial */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ControllersProvider = /** @class */ (function () {
    function ControllersProvider(http, actionSheet, basicOperation) {
        this.http = http;
        this.actionSheet = actionSheet;
        this.basicOperation = basicOperation;
    }
    ControllersProvider.prototype.actionSheetControllers = function () {
        var _this = this;
        try {
            var options = {
                title: 'Upload Picture',
                subtitle: 'Choose an picture',
                buttonLabels: ['Camera', 'Image Gallery'],
                addCancelButtonWithLabel: 'Cancel',
                addDestructiveButtonWithLabel: 'Delete',
                destructiveButtonLast: true
            };
            this.actionSheet.show(options).then(function (buttonIndex) {
                _this.basicOperation.alertboxDismiss(buttonIndex);
                switch (buttonIndex) {
                    case 1:
                        break;
                    case 2:
                        break;
                }
            });
        }
        catch (e) {
            console.error("error :- ", e);
        }
    };
    ControllersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__["a" /* ActionSheet */], __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */]])
    ], ControllersProvider);
    return ControllersProvider;
}());

//# sourceMappingURL=controllers.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dealerpayment_dealerpayment__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







__WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.vfs = __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_vfs_fonts___default.a.pdfMake.vfs;


var DealerprofilePage = /** @class */ (function () {
    function DealerprofilePage(navCtrl, navParams, basic_op, httpreq, file, fileOpener, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.file = file;
        this.fileOpener = fileOpener;
        this.plt = plt;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.dealerInfo = [];
        this.pdfObj = null;
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
    }
    DealerprofilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.basic_op.getStorage('rfidno').then(function (val) {
            if (val) {
                _this.dealerProfile(val);
            }
            else {
                _this.basic_op.alertboxDismiss("rfid session not set");
            }
        });
    };
    DealerprofilePage.prototype.dealerProfile = function (rfid) {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerApi, 'rfid_no', rfid, 1).then(function (res) {
            _this.dealerInfo = res;
            _this.dealerInfo = _this.dealerInfo[0];
            _this.dealerInfo = _this.dealerInfo.acf;
            _this.basic_op.loaderEnd(res);
            console.log(_this.dealerInfo);
        }, function (error) {
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    DealerprofilePage.prototype.dealerCommission = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_dealerpayment_dealerpayment__["a" /* DealerpaymentPage */]);
    };
    DealerprofilePage.prototype.reportPage = function () {
        this.downloadPdf();
    };
    DealerprofilePage.prototype.downloadPdf = function () {
        var _this = this;
        this.createPdf();
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                _this.file.writeFile(_this.file.dataDirectory, _this.dealerInfo.dealer_name + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + _this.dealerInfo.dealer_name + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            // On a browser simply use download!
            this.pdfObj.download();
        }
    };
    DealerprofilePage.prototype.createPdf = function () {
        console.log(this.dealerInfo);
        var docDefinition = {
            content: [
                { text: 'Dealer Details', style: 'header' },
                { text: 'Rfid No', style: 'label' },
                { text: this.dealerInfo.rfid_no, style: 'subheader' },
                { text: 'Name', style: 'label' },
                { text: this.dealerInfo.dealer_name, style: 'subheader' },
                { text: 'Mobile No', style: 'label' },
                { text: this.dealerInfo.mobile_no, style: 'subheader' },
                { text: 'Area', style: 'label' },
                { text: this.dealerInfo.area, style: 'subheader' },
                { text: 'Address', style: 'label' },
                { text: this.dealerInfo.address, style: 'subheader' },
                { text: 'Company', style: 'label' },
                { text: this.dealerInfo.company, style: 'subheader' },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'right',
                },
                label: {
                    fontSize: 10,
                    alignment: 'left'
                },
            }
        };
        this.pdfObj = __WEBPACK_IMPORTED_MODULE_5_pdfmake_build_pdfmake___default.a.createPdf(docDefinition);
    };
    DealerprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerprofile',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerprofile\dealerprofile.html"*/'\n<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>Dealer Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n \n<ion-content>\n\n  <ion-card class="disp-section">\n\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="../../assets/vehicle/profile.png" *ngIf="dealerInfo.dealer_photo == undefined">\n      <img [src]="dealerInfo.dealer_photo" *ngIf="dealerInfo.dealer_photo != undefined">\n    </ion-avatar>\n    <h2>{{dealerInfo.dealer_name}}</h2>\n    <p>{{dealerInfo.rfid_no}}</p>\n  </ion-item>\n\n  <img src="../../assets/vehicle/profile.png" *ngIf="dealerInfo.dealer_photo == undefined">\n  <img [src]="dealerInfo.dealer_photo" *ngIf="dealerInfo.dealer_photo != undefined">\n\n  <ion-card-content>\n    <ion-list>\n      <ion-item><span>Mobile No : </span>{{dealerInfo.mobile_no}}</ion-item>\n      <ion-item><span>Area : </span>{{dealerInfo.area}}</ion-item>\n      <ion-item text-wrap><span>Address :</span><p [innerHTML]="dealerInfo.address"></p></ion-item>\n      <ion-item><span>Company :</span> {{dealerInfo.company}}</ion-item>\n      <ion-item>\n        <img src="../../assets/vehicle/document.png" *ngIf="dealerInfo.id_proof == undefined">\n        <img [src]="dealerInfo.id_proof" *ngIf="dealerInfo.id_proof != undefined">\n      </ion-item>\n    </ion-list>\n    \n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="dealerCommission()">\n        <ion-icon ios="ios-cash" md="md-cash"></ion-icon>\n        <div>Commission</div>\n      </button>\n    </ion-col>\n    <ion-col>\n      <button color="danger" ion-button icon-start clear small (click)="reportPage()">\n        <ion-icon ios="ios-paper" md="md-paper"></ion-icon>\n        <div>Report</div>\n      </button>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n    \n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerprofile\dealerprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], DealerprofilePage);
    return DealerprofilePage;
}());

//# sourceMappingURL=dealerprofile.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_vehicleform_vehicleform__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomersummaryPage = /** @class */ (function () {
    function CustomersummaryPage(navCtrl, navParams, httpreq, basic_op) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.customerApi = "wp-json/wp/v2/customer";
        this.customerInfo = [];
        this.customerPhotos = [];
        this.customerAdd = [];
        this.customerApi = this.httpreq.getUrl() + this.customerApi;
        this.customerInfo = this.navParams.get('data');
        this.customerPhotos = this.navParams.get('photos');
    }
    CustomersummaryPage.prototype.ionViewDidLoad = function () {
    };
    CustomersummaryPage.prototype.editCustomer = function () {
        this.navCtrl.pop();
    };
    CustomersummaryPage.prototype.addVehicle = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.send(this.customerInfo, this.customerApi).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.customerAdd = res;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_vehicleform_vehicleform__["a" /* VehicleformPage */], { customer_id: _this.customerAdd.id });
        }, function (error) {
            _this.basic_op.alertboxDismiss(error.message);
            _this.basic_op.loaderEnd(error);
        });
    };
    CustomersummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customersummary',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\customersummary\customersummary.html"*/'<ion-header>\n\n\n\n  <ion-navbar hideBackButton="true" color="danger">\n\n    	<ion-title>Customer Details</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <ion-card class="disp-section">\n\n\n\n      <ion-item>\n\n        <h2>{{customerInfo.fields.customer_name}}</h2>\n\n      </ion-item>\n\n\n\n  <ion-card-content>\n\n    <ion-list>\n\n      <ion-item><span>Mobile No : </span>{{customerInfo.fields.mobile_no}}</ion-item>\n\n      <ion-item><span>Area : </span>{{customerInfo.fields.area}}</ion-item>\n\n      <ion-item text-wrap><span>Address :</span> {{customerInfo.fields.address}}</ion-item>\n\n      <ion-item><img [src]="customerPhotos.photo"></ion-item>\n\n      <ion-item><img [src]="customerPhotos.identity"></ion-item>\n\n    </ion-list>\n\n    \n\n  </ion-card-content>\n\n\n\n  <ion-row>\n\n    <ion-col>\n\n      <button color="danger" ion-button icon-start clear small (click)="editCustomer()" class="back-btn">\n\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n\n        <div>Back</div>\n\n      </button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <button color="danger" ion-button icon-start clear small (click)="addVehicle()" class="next-btn">\n\n        <div>Next</div>\n\n        <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n</ion-card>\n\n\n\n	              \n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\customersummary\customersummary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */]])
    ], CustomersummaryPage);
    return CustomersummaryPage;
}());

//# sourceMappingURL=customersummary.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehiclesummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_report_report__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VehiclesummaryPage = /** @class */ (function () {
    function VehiclesummaryPage(navCtrl, navParams, httpreq, basic_op) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.vehicleApi = "wp-json/wp/v2/vehicle";
        this.vehicleInfo = [];
        this.vehicleApi = this.httpreq.getUrl() + this.vehicleApi;
        this.vehicleInfo = this.navParams.get('data');
        this.customerId = this.navParams.get('customer_id');
        this.basic_op.getStorage('rfidno').then(function (res) {
            if (res != undefined) {
                return _this.rfid = res;
            }
            else {
                _this.basic_op.alertboxDismiss("Rfid session not set");
                //return this.rfid = 831;
            }
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    }
    VehiclesummaryPage.prototype.ionViewDidLoad = function () {
    };
    VehiclesummaryPage.prototype.editVehicle = function () {
        this.navCtrl.pop();
    };
    // addPaymentMode()
    // {
    // 		this.httpreq.send(this.vehicleInfo,this.vehicleApi).then(res=>{this.basic_op.loaderEnd(res);this.vehicle = res;
    //      this.navCtrl.push(DealerCustomerformPage,{vehicle_id : this.vehicle.id,customer_id : this.vehicle.acf.customer_id});
    //     },error => {
    //       this.basic_op.alertboxDismiss(error.message);
    //     });
    // }
    VehiclesummaryPage.prototype.reportpage = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.send(this.vehicleInfo, this.vehicleApi).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.vehicle = res;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_report_report__["a" /* ReportPage */], { rfid: _this.rfid, customer_id: _this.customerId, vehicle_id: _this.vehicle.id });
        }, function (error) {
            _this.basic_op.alertboxDismiss(error.message);
            _this.basic_op.loaderEnd(error);
        });
    };
    VehiclesummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vehiclesummary',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\vehiclesummary\vehiclesummary.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar hideBackButton="true" color="danger">\n\n    <ion-title>Vehicle Details</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n		\n\n    <ion-card>\n\n        <ion-list no-lines>\n\n          <ion-item>\n\n               <ion-row>\n\n                <ion-col col-6>\n\n                    Chalan No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.fields.chalan_no}}\n\n                </ion-col>\n\n              </ion-row> \n\n                <ion-row>\n\n                <ion-col col-6>\n\n                    Engine No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.fields.engine_no}}\n\n                </ion-col>\n\n              </ion-row> \n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Model No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       <b>{{vehicleInfo.fields.model_no}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Frame No\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.fields.frame_no}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Price\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.fields.vehicle_price | currency : "Rs." : 2}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Pending Price\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        <b>{{vehicleInfo.fields.pending_price | currency : "Rs." : 2}}</b>\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6 text-wrap>\n\n                    Insaurance Policy\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.fields.insaurance_policy}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6 text-wrap>\n\n                   Purchase Date\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.fields.purchase_date }}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6 text-wrap>\n\n                   Payment Mode\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                        {{vehicleInfo.fields.payment_mode }}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6 text-wrap>\n\n                    Dealer Commission\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.fields.dealer_commission | currency : "Rs." : 2}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6 text-wrap>\n\n                    Commission Status\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.fields.commission_status}}\n\n                </ion-col>\n\n              </ion-row>\n\n              <ion-row>\n\n                <ion-col col-6>\n\n                    Company\n\n                </ion-col>\n\n                <ion-col col-6 text-wrap>\n\n                       {{vehicleInfo.fields.company}}\n\n                </ion-col>\n\n              </ion-row>\n\n            </ion-item>\n\n            </ion-list>\n\n  \n\n    <ion-row>\n\n    <ion-col>\n\n      <button color="danger" ion-button icon-start clear small (click)="editVehicle()" class="back-btn">\n\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n\n        <div>Back</div>\n\n      </button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <button color="danger" ion-button icon-start clear small (click)="reportpage()" class="next-btn">\n\n        <div>Next</div>\n\n        <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n      			\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\vehiclesummary\vehiclesummary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */]])
    ], VehiclesummaryPage);
    return VehiclesummaryPage;
}());

//# sourceMappingURL=vehiclesummary.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_vehicledetails_vehicledetails__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









__WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default.a.vfs = __WEBPACK_IMPORTED_MODULE_7_pdfmake_build_vfs_fonts___default.a.pdfMake.vfs;


var CustomerdetailsPage = /** @class */ (function () {
    function CustomerdetailsPage(navCtrl, navParams, httpreq, basic_op, alert, modalCtrl, file, fileOpener, plt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.alert = alert;
        this.modalCtrl = modalCtrl;
        this.file = file;
        this.fileOpener = fileOpener;
        this.plt = plt;
        this.customerApi = "wp-json/wp/v2/customer";
        this.customerinfo = [];
        this.pdfObj = null;
        this.customerApi = this.httpreq.getUrl() + this.customerApi;
    }
    CustomerdetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.basic_op.getStorage('dealerid').then(function (val) {
            if (val != undefined) {
                _this.customerDetails(val);
            }
            else {
                _this.basic_op.alertboxDismiss("Session is not set");
            }
        });
    };
    CustomerdetailsPage.prototype.customerDetails = function (dealerid) {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.customerApi, 'dealer_id', dealerid, 99).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.customerinfo = res;
            console.log(_this.customerinfo);
        }, function (err) {
            _this.basic_op.loaderEnd(err);
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    CustomerdetailsPage.prototype.vehicleDetails = function (customerid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */], { customerId: customerid });
    };
    CustomerdetailsPage.prototype.editCustomer = function (customerId) {
        var _this = this;
        var customer = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__["a" /* CustomerformPage */], { customer_id: customerId });
        customer.present();
        customer.onDidDismiss(function () {
            _this.basic_op.getStorage('dealerid').then(function (val) {
                if (val != undefined) {
                    _this.customerDetails(val);
                }
                else {
                    _this.customerDetails(val);
                }
                _this.basic_op.loaderEnd(val);
            });
        });
    };
    CustomerdetailsPage.prototype.reportPage = function (customerInfo) {
        this.downloadPdf(customerInfo);
    };
    CustomerdetailsPage.prototype.downloadPdf = function (customerInfo) {
        var _this = this;
        this.createPdf(customerInfo);
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                _this.file.writeFile(_this.file.dataDirectory, customerInfo.acf.customer_name + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + customerInfo.acf.customer_name + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            // On a browser simply use download!
            this.pdfObj.download();
        }
    };
    CustomerdetailsPage.prototype.createPdf = function (customerInfo) {
        console.log(customerInfo);
        var docDefinition = {
            content: [
                { text: 'Customer Details', style: 'header' },
                { text: 'Customer Name', style: 'label' },
                { text: customerInfo.acf.customer_name, style: 'subheader' },
                { text: 'Area', style: 'label' },
                { text: customerInfo.acf.area, style: 'subheader' },
                { text: 'Address', style: 'label' },
                { text: customerInfo.acf.address, style: 'subheader' },
                { text: 'Mobile No', style: 'label' },
                { text: customerInfo.acf.mobile_no, style: 'subheader' },
            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'right',
                },
                label: {
                    fontSize: 10,
                    alignment: 'left'
                },
            }
        };
        this.pdfObj = __WEBPACK_IMPORTED_MODULE_6_pdfmake_build_pdfmake___default.a.createPdf(docDefinition);
    };
    CustomerdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerdetails',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\customerdetails\customerdetails.html"*/'\n<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>Customer Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n<ion-list *ngFor="let customer of customerinfo">\n  <ion-item-sliding>\n    <ion-item (click)="editCustomer(customer.id)">\n      <!-- <ion-avatar item-start>\n        <img [src]="customer.acf.photo">\n      </ion-avatar> -->\n      <h2>{{customer.acf.customer_name}} ({{customer.acf.company}})</h2>\n      <p>{{customer.acf.mobile_no}}</p>\n    </ion-item>\n    <ion-item-options side="right">\n      <button ion-button color="secondary" (click)="vehicleDetails(customer.id)">\n        <ion-icon ios="ios-car" md="md-car" class="car-icon"></ion-icon>\n        Details\n      </button>\n      <button ion-button color="danger" (click)="reportPage(customer)">\n        <ion-icon ios="ios-paper" md="md-paper" class="car-icon" ></ion-icon>\n        Report\n      </button>\n    </ion-item-options>\n  </ion-item-sliding>\n</ion-list>\n\n\n	<!-- <ion-card *ngFor="let customer of customerinfo" >\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n          <ion-item text-wrap>\n              <ion-thumbnail item-start>\n                  <img [src]="customer.acf.photo" class="customer-photo">\n              </ion-thumbnail>\n          </ion-item>  \n        </ion-col>\n        <ion-col col-6>\n            <h2>{{customer.acf.customer_name}}</h2>\n            <p>{{customer.acf.mobile_no}}</p>\n            <p text-wrap>{{customer.acf.area}}</p>\n            <p text-wrap>{{customer.acf.address}}</p>\n            <div class="car-user-detail">\n              <ion-icon ios="ios-clipboard" md="md-clipboard" (click)="editCustomer(customer.id)"></ion-icon>\n            <ion-icon ios="ios-car" md="md-car" class="car-icon" (click)="vehicleDetails(customer.id)"></ion-icon>\n            </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card> -->\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\customerdetails\customerdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], CustomerdetailsPage);
    return CustomerdetailsPage;
}());

//# sourceMappingURL=customerdetails.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminloginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_loginpage_loginpage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminloginPage = /** @class */ (function () {
    function AdminloginPage(navCtrl, navParams, basic_op, httpreq) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.adminApi = "wp-json/wp/v2/admin";
        this.loginData = {};
        this.adminData = [];
        this.url = this.httpreq.getUrl();
        this.adminApi = this.url + this.adminApi;
    }
    AdminloginPage.prototype.ionViewDidLoad = function () {
    };
    AdminloginPage.prototype.userLogin = function () {
        var _this = this;
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.adminApi, 'admin_name', this.loginData.username, 1).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.adminData = res;
            _this.adminData = _this.adminData[0];
            if (_this.adminData != undefined) {
                if (_this.adminData.acf.admin_name == _this.loginData.username) {
                    if (_this.adminData.acf.password == _this.loginData.password) {
                        _this.basic_op.setStorage('admin', _this.adminData.title.rendered);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_loginpage_loginpage__["a" /* LoginPage */]);
                    }
                    else {
                        _this.basic_op.alertboxDismiss('Wrong Username or Password');
                    }
                }
                else {
                    _this.basic_op.alertboxDismiss('Wrong Username or Password');
                }
            }
            else {
                _this.basic_op.alertboxDismiss('Wrong Username or Password');
            }
        }, function (error) {
            _this.basic_op.alertboxDismiss("error :- " + error.message);
        });
    };
    AdminloginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-adminlogin',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\adminlogin\adminlogin.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <ion-title>ADMIN LOGIN</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content clear>\n	<div class="login">\n        <img src="../assets/vehicle/pushpam-logo.png">\n        <ion-list class="home">\n            <ion-list inset>\n                <form (ngSubmit)=\'userLogin()\' #loginForm="ngForm">\n                    <ion-item>\n                        <ion-icon name="md-person" item-left></ion-icon>\n                        <ion-input type="text" name="username" id="username" placeholder="Username" [(ngModel)]="loginData.username"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-icon name="md-lock" item-left></ion-icon>\n                        <ion-input type="password" name="password" id="password" placeholder="Password" [(ngModel)]="loginData.password"></ion-input>\n                    </ion-item>\n                        \n      						<ion-buttons padding>\n            <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="loginForm.form.invalid" >Login</button>\n      						</ion-buttons>\n                </form>\n\n             </ion-list>\n        </ion-list>\n      </div>\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\adminlogin\adminlogin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */]])
    ], AdminloginPage);
    return AdminloginPage;
}());

//# sourceMappingURL=adminlogin.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_customerslist_customerslist__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dealerform_dealerform__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DealerslistPage = /** @class */ (function () {
    function DealerslistPage(navCtrl, navParams, basic_op, httpreq, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.modalCtrl = modalCtrl;
        this.dealerApi = "wp-json/wp/v2/dealer_posts";
        this.dealerInfo = [];
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
    }
    DealerslistPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.basic_op.getStorage('admin').then(function (val1) {
            if (val1 != undefined) {
                _this.company = val1;
                _this.dealerDetails();
            }
            else {
                if (_this.company != undefined) {
                    _this.basic_op.alertboxDismiss("Admin session not set");
                }
            }
        });
    };
    DealerslistPage.prototype.dealerDetails = function () {
        var _this = this;
        console.log(this.company);
        this.basic_op.loaderStart();
        this.httpreq.getAllDataPosts(this.dealerApi).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.dealerInfo = res;
            _this.dealerInfo = _this.dealerInfo.data;
            console.log(_this.dealerInfo);
        }, function (err) {
            _this.basic_op.loaderEnd(err);
            _this.basic_op.alertboxDismiss(err.message);
        });
    };
    DealerslistPage.prototype.customerlist = function (rfid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_customerslist_customerslist__["a" /* CustomerslistPage */], { rfid: rfid });
    };
    DealerslistPage.prototype.editDealer = function (dealerid) {
        var _this = this;
        var dealer = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_dealerform_dealerform__["a" /* DealerformPage */], { dealerid: dealerid });
        dealer.present();
        dealer.onDidDismiss(function () {
            _this.dealerDetails();
        });
    };
    DealerslistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerslist',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerslist\dealerslist.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n\n    <ion-title>Dealers Details</ion-title>\n\n     <button ion-button menuToggle >\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n<ion-list *ngFor="let dealer of dealerInfo">\n\n  <ion-item-sliding>\n\n    <ion-item (click)="editDealer(dealer.id)">\n\n      <h2>{{dealer.acf.dealer_name}}</h2>\n\n      <p>{{dealer.acf.mobile_no}}</p>\n\n    </ion-item>\n\n    <ion-item-options side="right">\n\n      <button ion-button color="secondary" (click)="customerlist(dealer.acf.rfid_no)">\n\n        <ion-icon ios="ios-person" md="md-person"></ion-icon>\n\n        Customers\n\n      </button>\n\n    </ion-item-options>\n\n  </ion-item-sliding>\n\n</ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerslist\dealerslist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], DealerslistPage);
    return DealerslistPage;
}());

//# sourceMappingURL=dealerslist.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentmodeSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_report_report__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PaymentmodeSummaryPage = /** @class */ (function () {
    function PaymentmodeSummaryPage(navCtrl, navParams, httpreq, basic_op, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.alertCtrl = alertCtrl;
        this.dealerCustomerApi = "wp-json/wp/v2/dealer_customer";
        this.payment = [];
        this.paymentData = [];
        this.dealerCustomerApi = this.httpreq.getUrl() + this.dealerCustomerApi;
        this.payment = this.navParams.get("data");
    }
    PaymentmodeSummaryPage.prototype.ionViewDidLoad = function () {
    };
    PaymentmodeSummaryPage.prototype.editpayment = function () {
        this.navCtrl.pop();
    };
    PaymentmodeSummaryPage.prototype.reportpage = function () {
        var _this = this;
        this.httpreq.send(this.payment, this.dealerCustomerApi).then(function (res) {
            _this.basic_op.loaderEnd(res);
            _this.paymentData = res;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_report_report__["a" /* ReportPage */], { rfid: _this.paymentData.acf.rfid_no, customer_id: _this.paymentData.acf.customer_id, vehicle_id: _this.paymentData.acf.vehicle_id });
        }, function (error) {
            _this.basic_op.alertboxDismiss(error.message);
            _this.basic_op.loaderEnd(error);
        });
    };
    PaymentmodeSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-paymentmode-summary',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\paymentmode-summary\paymentmode-summary.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton="true" color="danger">\n    <ion-title>Paymentmode Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<ion-card>\n  		<ion-list no-lines>\n          <ion-item>\n              <ion-row>\n                <ion-col col-4>\n                    Register Date\n                </ion-col>\n                <ion-col col-8 text-wrap text-right>\n                       {{payment.fields.entry_date}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                    Paymenet Mode\n                </ion-col>\n                <ion-col col-8 text-wrap text-right>\n                       {{payment.fields.payment_mode}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                    dealer commission\n                </ion-col>\n                <ion-col col-8 text-wrap text-right>\n                       {{payment.fields.dealer_commission}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-4>\n                   Commission Status\n                </ion-col>\n                <ion-col col-8 text-wrap text-right>\n                        {{payment.fields.commission_status}}\n                </ion-col>\n              </ion-row>\n              \n            </ion-item>\n            <ion-item>\n      			<ion-row>\n       				 <ion-col col-6 no-padding>\n            			<button no-margin no-padding ion-button  (click)="editpayment()" color="primary" color="danger">EDIT PAYMENT</button>\n       				 </ion-col>\n       				<ion-col col-6 no-padding>\n            			<button no-margin no-padding ion-button  (click)="reportpage()"color="secondary" color="danger">REPORT</button>\n        			</ion-col>\n   				 </ion-row>\n  			</ion-item>\n            </ion-list>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\paymentmode-summary\paymentmode-summary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], PaymentmodeSummaryPage);
    return PaymentmodeSummaryPage;
}());

//# sourceMappingURL=paymentmode-summary.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(255);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dealerform_dealerform__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_customerform_customerform__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_vehicleform_vehicleform__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dealer_customerform_dealer_customerform__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_customerdetails_customerdetails__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_customersummary_customersummary__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_vehiclesummary_vehiclesummary__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_paymentmode_summary_paymentmode_summary__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_report_report__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_adminlogin_adminlogin__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_dealerhome_dealerhome__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_dealerprofile_dealerprofile__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_dealerpayment_dealerpayment__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_dealerslist_dealerslist__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_customerslist_customerslist__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_vehicledetails_vehicledetails__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_loginpage_loginpage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_dealerscan_dealerscan__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_dealersummary_dealersummary__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_network__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_opener__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_serial__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_camera__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_camera_camera__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_social_sharing__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_social_share_social_share__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_action_sheet__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_controllers_controllers__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_android_permissions__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_network_network__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_dealerform_dealerform__["a" /* DealerformPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_customerform_customerform__["a" /* CustomerformPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_vehicleform_vehicleform__["a" /* VehicleformPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dealer_customerform_dealer_customerform__["a" /* DealerCustomerformPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_customerdetails_customerdetails__["a" /* CustomerdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_customersummary_customersummary__["a" /* CustomersummaryPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_vehiclesummary_vehiclesummary__["a" /* VehiclesummaryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_paymentmode_summary_paymentmode_summary__["a" /* PaymentmodeSummaryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_adminlogin_adminlogin__["a" /* AdminloginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_dealerhome_dealerhome__["a" /* DealerhomePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_dealerprofile_dealerprofile__["a" /* DealerprofilePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_dealerpayment_dealerpayment__["a" /* DealerpaymentPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_dealerslist_dealerslist__["a" /* DealerslistPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_customerslist_customerslist__["a" /* CustomerslistPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_loginpage_loginpage__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_dealerscan_dealerscan__["a" /* DealerscanPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_dealerform_dealerform__["a" /* DealerformPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_customerform_customerform__["a" /* CustomerformPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_vehicleform_vehicleform__["a" /* VehicleformPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dealer_customerform_dealer_customerform__["a" /* DealerCustomerformPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_customerdetails_customerdetails__["a" /* CustomerdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_customersummary_customersummary__["a" /* CustomersummaryPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_vehiclesummary_vehiclesummary__["a" /* VehiclesummaryPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_paymentmode_summary_paymentmode_summary__["a" /* PaymentmodeSummaryPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_adminlogin_adminlogin__["a" /* AdminloginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_dealerhome_dealerhome__["a" /* DealerhomePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_dealerprofile_dealerprofile__["a" /* DealerprofilePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_dealerpayment_dealerpayment__["a" /* DealerpaymentPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_dealerslist_dealerslist__["a" /* DealerslistPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_customerslist_customerslist__["a" /* CustomerslistPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_loginpage_loginpage__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_dealerscan_dealerscan__["a" /* DealerscanPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_dealersummary_dealersummary__["a" /* DealersummaryPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_serial__["a" /* Serial */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_action_sheet__["a" /* ActionSheet */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_32__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
                __WEBPACK_IMPORTED_MODULE_33__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_camera_camera__["a" /* CameraProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_social_share_social_share__["a" /* SocialShareProvider */],
                __WEBPACK_IMPORTED_MODULE_39__providers_controllers_controllers__["a" /* ControllersProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_42__providers_network_network__["a" /* NetworkProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_network_network__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dealerscan_dealerscan__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_adminlogin_adminlogin__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dealerslist_dealerslist__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_customerslist_customerslist__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_loginpage_loginpage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, basic_op, httpreq, networkProvider, events, network) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.networkProvider = networkProvider;
        this.events = events;
        this.network = network;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_12__pages_loginpage_loginpage__["a" /* LoginPage */] },
            { title: 'New Dealer', component: __WEBPACK_IMPORTED_MODULE_8__pages_dealerscan_dealerscan__["a" /* DealerscanPage */] },
            { title: 'Dealers List', component: __WEBPACK_IMPORTED_MODULE_10__pages_dealerslist_dealerslist__["a" /* DealerslistPage */] },
            { title: 'Customers List', component: __WEBPACK_IMPORTED_MODULE_11__pages_customerslist_customerslist__["a" /* CustomerslistPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            //this.networkProvider.initializeNetworkEvents();
            // Offline event
            // this.events.subscribe('network:offline', () => {
            //     this.basic_op.alertboxDismiss('network:offline ==> '+this.network.type);    
            // });
            // Online event
            // this.events.subscribe('network:online', () => {
            //     this.basic_op.alertboxDismiss('network:online ==> '+this.network.type);        
            // });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.basic_op.removeStorage('rfidno');
            _this.basic_op.removeStorage('dealerid');
            _this.basic_op.getStorage('admin').then(function (val) {
                if (val) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_loginpage_loginpage__["a" /* LoginPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_adminlogin_adminlogin__["a" /* AdminloginPage */];
                }
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.basic_op.removeStorage('admin');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_adminlogin_adminlogin__["a" /* AdminloginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\app\app.html"*/'<ion-menu id="myMenu" [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button menuClose ion-item (click)="logout()">\n        Logout\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"G:\ionic\pushpam-motors\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_network_network__["a" /* NetworkProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerCustomerformPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_paymentmode_summary_paymentmode_summary__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DealerCustomerformPage = /** @class */ (function () {
    function DealerCustomerformPage(navCtrl, navParams, httpreq, basic_op) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.dealerCustomerApi = "wp-json/wp/v2/dealer_customer";
        this.dealer_customer = [];
        this.tdate = new Date;
        this.dealerCustomerApi = this.httpreq.getUrl() + this.dealerCustomerApi;
        this.vehicle_id = this.navParams.get("vehicle_id");
        this.customer_id = this.navParams.get("customer_id");
        this.basic_op.getStorage('rfidno').then(function (res) {
            _this.rfid = res;
            return _this.rfid;
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
    }
    DealerCustomerformPage.prototype.ionViewDidLoad = function () {
        this.entry_date = this.tdate.getDate() + '/' + (this.tdate.getMonth() + 1) + '/' + this.tdate.getFullYear();
        this.entry_date = this.entry_date.toString();
    };
    DealerCustomerformPage.prototype.addDealerCustomer = function () {
        // this.basic_op.loaderStart();
        var data = {
            "title": this.rfid + "-" + this.customer_id,
            "status": "publish",
            "fields": {
                "rfid_no": this.rfid,
                "customer_id": this.customer_id,
                "entry_date": this.entry_date,
                "payment_mode": this.dealer_customer.payment,
                "dealer_commission": this.dealer_customer.commission,
                "commission_status": this.dealer_customer.commission_status,
                "vehicle_id": this.vehicle_id
            }
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_paymentmode_summary_paymentmode_summary__["a" /* PaymentmodeSummaryPage */], { data: data });
    };
    DealerCustomerformPage.prototype.onOptionsSelected = function (e) {
        console.log(e);
    };
    DealerCustomerformPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealer-customerform',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealer-customerform\dealer-customerform.html"*/'\n<ion-header>\n\n  <ion-navbar hideBackButton="true" color="danger">\n    <ion-title>Payment Mode</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n			<form (ngSubmit)=\'addDealerCustomer()\' #dealercustomerForm="ngForm">\n\n      <ion-item>\n         <ion-label floating>Entry Date</ion-label>\n        <ion-input type="text" name="entry_date" id="entry_date" [(ngModel)]="entry_date"  required></ion-input>\n      </ion-item>\n\n     <ion-item>\n      	<ion-label floating>Payment Mode</ion-label>\n      		<ion-select  name="payment" id="payment" (ngModelChange)=\'onOptionsSelected($event)\' [(ngModel)]="dealer_customer.payment">\n             		<ion-option value="" selected="true">Select</ion-option>\n             		<ion-option value="HDFC Bank">HDFC Bank</ion-option>\n             		<ion-option value="Hero">Hero</ion-option>\n             		<ion-option value="Cash">Cash</ion-option>\n             </ion-select>\n       </ion-item>\n\n      \n  		<ion-item>\n         <ion-label floating>Dealer Commission</ion-label>\n        <ion-input type="number" name="commission" id="commission" [(ngModel)]="dealer_customer.commission"  required></ion-input>\n      </ion-item>\n\n      <ion-item>\n          <ion-label floating>Commission Status</ion-label>\n             <ion-select name="commission_status" id="commission_status" [(ngModel)]="dealer_customer.commission_status">\n                <ion-option value="Completed">Completed</ion-option>\n                <ion-option value="Pending">Pending</ion-option>\n             </ion-select>\n      </ion-item>\n\n     <ion-item no-lines>\n      <ion-buttons>\n            <button ion-button col-lg-12 block type="submit" color="dark" [disabled]="dealercustomerForm.form.invalid" color="danger">Add</button>\n           \n      </ion-buttons>\n\n     </ion-item>\n    </form>\n\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealer-customerform\dealer-customerform.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */]])
    ], DealerCustomerformPage);
    return DealerCustomerformPage;
}());

//# sourceMappingURL=dealer-customerform.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialShareProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocialShareProvider = /** @class */ (function () {
    function SocialShareProvider(http, action, social) {
        this.http = http;
        this.action = action;
        this.social = social;
    }
    SocialShareProvider.prototype.shareWithActionSheet = function (product) {
        var _this = this;
        var actionSheet = this.action.create({
            title: product.pro_name,
            buttons: [
                {
                    text: 'Share on facebook',
                    icon: 'logo-facebook',
                    handler: function () {
                        _this.social.shareViaFacebook(product.pro_name, product.pro_image, _this.baseURL);
                    }
                }, {
                    text: 'Share on Twitter',
                    icon: 'logo-twitter',
                    handler: function () {
                        _this.social.shareViaTwitter(product.pro_name, product.pro_image, _this.baseURL);
                    }
                }, {
                    text: 'Share on WhatsApp',
                    icon: 'logo-whatsapp',
                    handler: function () {
                        _this.social.shareViaWhatsApp(product.pro_name, '', _this.baseURL);
                    }
                }, {
                    text: 'Share on Instagram',
                    icon: 'logo-instagram',
                    handler: function () {
                        _this.social.shareViaInstagram(_this.baseURL, product.pro_image);
                    }
                }, {
                    text: 'Share',
                    icon: 'ios-share-alt',
                    handler: function () {
                        _this.social.share('', product.pro_name, '', _this.baseURL);
                    }
                }, {
                    text: 'Cancel',
                    icon: 'logo-destructive',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    SocialShareProvider.prototype.shareWithFacebookTwitter = function (product) {
        this.social.shareViaFacebook(product.pro_name, product.pro_image, this.baseURL);
    };
    SocialShareProvider.prototype.shareWithWhatsapp = function (product) {
        this.social.shareViaWhatsApp(product.pro_name, '', this.baseURL);
    };
    SocialShareProvider.prototype.shareWithInstagram = function (product) {
        this.social.shareViaInstagram(this.baseURL, product.pro_image);
    };
    SocialShareProvider.prototype.share = function (product) {
        this.social.share('', product.pro_name, '', this.baseURL);
    };
    SocialShareProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], SocialShareProvider);
    return SocialShareProvider;
}());

//# sourceMappingURL=social-share.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dealerhome_dealerhome__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, basic_op, httpreq) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.dealerApi = "wp-json/wp/v2/dealer";
        this.dealerInfo = {};
        this.dealerApi = this.httpreq.getUrl() + this.dealerApi;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.basic_op.sideMenuOpen();
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.basic_op.sideMenuOpen();
    };
    LoginPage.prototype.scanCard = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.manualLogin = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Login',
            message: 'Enter your mobile number',
            inputs: [
                {
                    name: 'mobile_no',
                    placeholder: 'Enter Your Mobile Number'
                }
            ],
            buttons: [
                {
                    text: 'Login',
                    handler: function (data) {
                        var mobile = data.mobile_no;
                        _this.getRfid(mobile);
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage.prototype.getRfid = function (mobile) {
        var _this = this;
        var dealer = {};
        this.basic_op.loaderStart();
        this.httpreq.filterAcfFields(this.dealerApi, 'mobile_no', mobile).then(function (res) {
            _this.basic_op.loaderEnd(res);
            dealer = res;
            dealer = dealer[0];
            if (dealer != undefined) {
                if (dealer.acf.mobile_no == mobile) {
                    var rfidno = dealer.acf.rfid_no;
                    _this.basic_op.setStorage('rfidno', rfidno);
                    _this.basic_op.setStorage('dealerid', dealer.id);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_dealerhome_dealerhome__["a" /* DealerhomePage */]);
                }
                else {
                    _this.basic_op.alertboxDismiss("Wrong Mobile No");
                }
            }
            else {
                _this.basic_op.alertboxDismiss("Wrong Mobile No");
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error.message);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-loginpage',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\loginpage\loginpage.html"*/'\n<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>Login</ion-title>\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="homepage"> \n	\n	<div class="middle-div">\n		\n	<ion-icon ios="ios-wifi" md="md-wifi"></ion-icon>\n	<button ion-button color="light" class="scan-btn" (click)="scanCard()" round outline>Scan Your Card</button>\n	<br>\n	<br>\n		<button ion-button color="light" class="scan-btn" (click)="manualLogin()" round outline>Manual Login</button>\n\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\loginpage\loginpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=loginpage.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_basicoperation_basicoperation__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CameraProvider = /** @class */ (function () {
    function CameraProvider(http, httpprovider, camera, transfer, basic_op) {
        this.http = http;
        this.httpprovider = httpprovider;
        this.camera = camera;
        this.transfer = transfer;
        this.basic_op = basic_op;
        this.data = null;
        this.url = this.httpprovider.getUrl() + "wp-json/wp/v2/media";
        console.log(this.url);
    }
    CameraProvider.prototype.getPictureFromCamera = function () {
        return this.getImage(this.camera.PictureSourceType.CAMERA, false);
    };
    CameraProvider.prototype.getProfilePictureFromCamera = function () {
        return this.getImage(this.camera.PictureSourceType.CAMERA, true);
    };
    CameraProvider.prototype.getPictureFromPhotoLibrary = function () {
        return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
    };
    CameraProvider.prototype.getImage = function (pictureSourceType, crop, quality, allowEdit, saveToAlbum) {
        if (crop === void 0) { crop = false; }
        if (quality === void 0) { quality = 20; }
        if (allowEdit === void 0) { allowEdit = true; }
        if (saveToAlbum === void 0) { saveToAlbum = false; }
        var options = {
            quality: quality,
            allowEdit: allowEdit,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: saveToAlbum,
            correctOrientation: true
        };
        return this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            //this.upload(base64Image)
            return base64Image;
        }, function (error) {
            console.log('CAMERA ERROR -> ' + JSON.stringify(error));
        });
    };
    CameraProvider.prototype.upload = function (image) {
        var fileTransfer = this.transfer.create();
        var options = {
            headers: {
                'Authorization': this.httpprovider.getJWTAuth(),
                'content-disposition': "attachment; filename=\'yash.jpeg\'"
            }
        };
        return fileTransfer.upload(image, this.url, options)
            .then(function (data) {
            return data;
        }, function (err) {
            console.log(err);
        });
    };
    CameraProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__httpprovider_httpprovider__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_5__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */]])
    ], CameraProvider);
    return CameraProvider;
}());

//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerhomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dealerprofile_dealerprofile__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_customerdetails_customerdetails__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_dealerpayment_dealerpayment__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_loginpage_loginpage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DealerhomePage = /** @class */ (function () {
    function DealerhomePage(navCtrl, navParams, basic_op, httpreq) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.basic_op = basic_op;
        this.httpreq = httpreq;
        this.basic_op.sideMenuClose();
    }
    DealerhomePage.prototype.ionViewDidLoad = function () {
    };
    DealerhomePage.prototype.logout = function () {
        this.basic_op.removeStorage('rfidno');
        this.basic_op.removeStorage('dealerid');
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_loginpage_loginpage__["a" /* LoginPage */]);
    };
    DealerhomePage.prototype.dealerProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_dealerprofile_dealerprofile__["a" /* DealerprofilePage */]);
    };
    DealerhomePage.prototype.addCustomer = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_customerform_customerform__["a" /* CustomerformPage */]);
    };
    DealerhomePage.prototype.customerDetails = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_customerdetails_customerdetails__["a" /* CustomerdetailsPage */]);
    };
    DealerhomePage.prototype.dealerPayment = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_dealerpayment_dealerpayment__["a" /* DealerpaymentPage */]);
    };
    DealerhomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dealerhome',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\dealerhome\dealerhome.html"*/'<ion-header>\n\n  <ion-navbar color="danger">\n    <ion-title>HOME</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-list>\n      <button ion-item lines (click)="dealerProfile()">\n        <ion-icon color="danger" ios="ios-person" md="md-person"></ion-icon><span>Dealer Profile</span>\n      </button>\n      <button ion-item lines (click)="addCustomer()">\n        <ion-icon color="danger" ios="ios-person-add" md="md-person-add"></ion-icon><span>Add Customer</span>\n      </button>\n      <button ion-item lines (click)="customerDetails()">\n        <ion-icon color="danger" ios="ios-people" md="md-people"></ion-icon><span>Customer Details</span>\n      </button>\n      <button ion-item lines (click)="dealerPayment()">\n        <ion-icon color="danger" ios="ios-cash" md="md-cash"></ion-icon><span>Dealer Commission</span>\n      </button>\n      <button ion-item lines (click)="logout()">\n        <ion-icon color="danger" ios="ios-log-out" md="md-log-out"></ion-icon><span>Logout</span>\n      </button>  \n       \n    </ion-list>\n\n	<!-- <ion-buttons padding>\n            <button ion-button col-lg-12 block type="button" color="danger" >DEALER PROFILE</button>\n    </ion-buttons>\n    <ion-buttons padding>\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="addCustomer()">ADD CUSTOMER</button>\n    </ion-buttons>\n    <ion-buttons padding>\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="customerDetails()">CUSTOMER DETAILS</button>\n    </ion-buttons>\n    <ion-buttons padding>\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="dealerPayment()">DEALER COMMISSION</button>\n    </ion-buttons>\n    <ion-buttons padding>\n            <button ion-button col-lg-12 block type="button" color="danger" (click)="logout()">LOGOUT</button>\n    </ion-buttons> -->\n\n	<!-- <button ion-button color="twitter" (click)="dealerProfile()">Profile</button>\n	<button ion-button color="twitter" (click)="addCustomer()">Add Customer</button>\n	<button ion-button color="twitter" (click)="customerDetails()">Customer Details</button>\n	<button ion-button color="twitter" (click)="dealerPayment()">Dealer Payment</button>	\n	<button ion-button color="twitter" (click)="logout()">Logout</button> -->\n</ion-content>\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\dealerhome\dealerhome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_httpprovider_httpprovider__["a" /* HttpProvider */]])
    ], DealerhomePage);
    return DealerhomePage;
}());

//# sourceMappingURL=dealerhome.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerformPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customersummary_customersummary__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CustomerformPage = /** @class */ (function () {
    function CustomerformPage(navCtrl, navParams, httpreq, basic_op, cameraProvider, actionSheetCtrl, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpreq = httpreq;
        this.basic_op = basic_op;
        this.cameraProvider = cameraProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.customerApi = "wp-json/wp/v2/customer";
        this.mediaApi = "wp-json/wp/v2/media";
        this.userData = [];
        this.AddChosenPicture = [];
        this.customerPic = [];
        this.chosenPicture = [];
        this.identityPic = [];
        this.mediaApi = this.httpreq.getUrl() + this.mediaApi;
        this.rfid = this.navParams.get("dealerid");
        this.basic_op.getStorage('dealerid').then(function (res) {
            if (res != undefined) {
                _this.rfid = res;
                return _this.rfid;
            }
            else {
                if (!_this.rfid) {
                    _this.basic_op.alertboxDismiss(" Rfid session not set");
                }
            }
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
        this.basic_op.getStorage('admin').then(function (adm) {
            if (adm != undefined) {
                _this.admin = adm;
                return _this.admin;
            }
            else {
                if (!_this.admin) {
                    _this.basic_op.alertboxDismiss(" Rfid session not set");
                }
            }
        }, function (err) {
            _this.basic_op.alertboxDismiss(err.message);
        });
        this.customerid = this.navParams.get("customer_id");
        if (this.customerid != undefined) {
            this.customerApi = this.httpreq.getUrl() + this.customerApi;
            this.httpreq.getOnedata(this.customerApi, this.customerid).then(function (res) {
                _this.userData = res;
                _this.userData = _this.userData.acf;
                _this.chosenPicture.length = 1;
                _this.AddChosenPicture.length = 1;
            });
        }
    }
    CustomerformPage.prototype.ionViewWillEnter = function () {
    };
    CustomerformPage.prototype.addCustomer = function () {
        var _this = this;
        if (this.customerid != undefined) {
            var data = {
                "title": this.userData.customer_name,
                "status": "publish",
                "fields": {
                    "customer_name": this.userData.customer_name,
                    "area": this.userData.area,
                    "address": this.userData.address,
                    "mobile_no": this.userData.mobile_no,
                }
            };
            this.basic_op.loaderStart();
            this.httpreq.update(data, this.customerid, this.customerApi).then(function (res) {
                _this.basic_op.loaderEnd(res);
                console.log(res);
                _this.viewCtrl.dismiss();
            }, function (err) {
                _this.basic_op.loaderEnd(err);
                _this.basic_op.alertboxDismiss(err.message);
            });
        }
        else {
            this.basic_op.loaderStart();
            if (this.customerPic.length > 0) {
                this.httpreq.delete(this.mediaApi, this.customerPic);
                this.httpreq.delete(this.mediaApi, this.identityPic);
            }
            this.cameraProvider.upload(this.chosenPicture).then(function (res) {
                _this.customerPic = res;
                _this.customerPic = _this.customerPic.response;
                _this.customerPic = JSON.parse(_this.customerPic);
                _this.customerPic = _this.customerPic.id;
                _this.cameraProvider.upload(_this.AddChosenPicture).then(function (res) {
                    _this.basic_op.loaderEnd(res);
                    _this.identityPic = res;
                    _this.identityPic = _this.identityPic.response;
                    _this.identityPic = JSON.parse(_this.identityPic);
                    _this.identityPic = _this.identityPic.id;
                    var data = {
                        "title": _this.userData.customer_name,
                        "status": "publish",
                        "fields": {
                            "customer_name": _this.userData.customer_name,
                            "area": _this.userData.area,
                            "address": _this.userData.address,
                            "mobile_no": _this.userData.mobile_no,
                            "id_proof_front": _this.identityPic,
                            "id_proof_back": _this.customerPic,
                            "company": _this.admin,
                            "dealer_id": _this.rfid
                        }
                    };
                    var photos = {
                        "photo": _this.AddChosenPicture,
                        "identity": _this.chosenPicture
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_customersummary_customersummary__["a" /* CustomersummaryPage */], { data: data, photos: photos });
                }, function (error) {
                    _this.basic_op.loaderEnd(error);
                    _this.basic_op.alertboxDismiss(error.message);
                });
            }, function (error) {
                _this.basic_op.loaderEnd(error);
                _this.basic_op.alertboxDismiss(error.message);
            });
        }
    };
    CustomerformPage.prototype.onOptionsSelected = function (e) {
        console.log(e);
    };
    CustomerformPage.prototype.uplodPictureAdd = function () {
        var _this = this;
        var actionsheet = this.actionSheetCtrl.create({
            title: 'Select Picture',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.dealerTakePicture();
                    }
                },
                {
                    text: 'Image Gallery',
                    handler: function () {
                        _this.dealerGetPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    CustomerformPage.prototype.dealerTakePicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getProfilePictureFromCamera().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.AddChosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    CustomerformPage.prototype.dealerGetPicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.AddChosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
        }, function (error) {
            _this.basic_op.loaderEnd(error);
            _this.basic_op.alertboxDismiss(error.message);
        });
    };
    CustomerformPage.prototype.uplodPicture = function () {
        var _this = this;
        var actionsheet = this.actionSheetCtrl.create({
            title: 'Select Picture',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Image Gallery',
                    handler: function () {
                        _this.getPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    CustomerformPage.prototype.takePicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getProfilePictureFromCamera().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.chosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
        }, function (error) {
        });
    };
    CustomerformPage.prototype.getPicture = function () {
        var _this = this;
        this.basic_op.loaderStart();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            _this.basic_op.loaderEnd(picture);
            if (picture) {
                return _this.chosenPicture = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(picture);
            }
            _this.basic_op.loaderEnd(picture);
        }, function (error) {
            //alert(error);
        });
    };
    CustomerformPage.prototype.modalClose = function () {
        this.viewCtrl.dismiss();
    };
    CustomerformPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerform',template:/*ion-inline-start:"G:\ionic\pushpam-motors\src\pages\customerform\customerform.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="danger">\n\n    <ion-title> Customer\n\n    <ion-icon ios="ios-close-circle" md="md-close-circle" class="modal-close-btn" (click)="modalClose()" *ngIf="customerid != undefined" ></ion-icon></ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n	<form (ngSubmit)=\'addCustomer()\' #customerForm="ngForm">\n\n\n\n     <ion-item>\n\n         <ion-label floating>Name</ion-label>\n\n        <ion-input type="text" name="name" id="name" [(ngModel)]="userData.customer_name"  required></ion-input>\n\n      </ion-item>\n\n\n\n        <ion-item>\n\n         <ion-label floating>Area</ion-label>\n\n        <ion-input type="text" name="area" id="area" [(ngModel)]="userData.area"  required></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n         <ion-label floating>Address</ion-label>\n\n      <ion-input type="text" name="address" id="address" [(ngModel)]="userData.address" required></ion-input>\n\n  	</ion-item>\n\n\n\n  		<ion-item>\n\n         <ion-label floating>Contact No</ion-label>\n\n        <ion-input type="number" name="contact_no" id="contact_no" [(ngModel)]="userData.mobile_no"  required></ion-input>\n\n      </ion-item>\n\n      \n\n      <p></p>\n\n\n\n     \n\n      <ion-card>\n\n        <div (click)="uplodPictureAdd()" *ngIf = "customerid == undefined" color="danger" full ion-button icon-start>\n\n          <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n\n          ID PROOF FRONT \n\n        </div>\n\n        <img [src]="AddChosenPicture" name="photo" id="photo" *ngIf = "customerid == undefined">\n\n        <img [src]="userData.id_proof_front" name="identity_proof" id="identity_proof" *ngIf = "customerid != undefined">\n\n     </ion-card>\n\n     \n\n\n\n     <ion-card>\n\n        <div (click)="uplodPicture()"  *ngIf = "customerid == undefined" color="danger" full ion-button icon-start>\n\n          <ion-icon ios="ios-camera" md="md-camera"></ion-icon>\n\n          ID PROOF BACK\n\n        </div>\n\n        <img [src]="chosenPicture" name="identity_proof" id="identity_proof" *ngIf="customerid == undefined">\n\n            <img [src]="userData.id_proof_back" name="identity_proof" id="identity_proof" *ngIf="customerid != undefined">\n\n     </ion-card>   \n\n    \n\n     \n\n     <ion-item no-lines>\n\n      <ion-buttons>\n\n            <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="customerForm.form.invalid || chosenPicture.length == 0 || AddChosenPicture.length == 0"  *ngIf="customerid == undefined">Next <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon></button>\n\n           <button ion-button col-lg-12 block type="submit" color="danger" [disabled]="customerForm.form.invalid"  *ngIf="customerid != undefined">Edit Customer</button>\n\n      </ion-buttons>\n\n\n\n     </ion-item>\n\n    </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"G:\ionic\pushpam-motors\src\pages\customerform\customerform.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_httpprovider_httpprovider__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_basicoperation_basicoperation__["a" /* BasicoperationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_camera_camera__["a" /* CameraProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], CustomerformPage);
    return CustomerformPage;
}());

//# sourceMappingURL=customerform.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicoperationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BasicoperationProvider = /** @class */ (function () {
    function BasicoperationProvider(http, alertCtrl, loadingCtrl, toastCtrl, storage, menuCtrl, network) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.menuCtrl = menuCtrl;
        this.network = network;
    }
    BasicoperationProvider.prototype.alertboxDismiss = function (title, btn_text, subtitle) {
        if (btn_text === void 0) { btn_text = 'Dismiss'; }
        if (subtitle === void 0) { subtitle = ''; }
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: [btn_text],
            enableBackdropDismiss: false
        });
        alert.present();
    };
    BasicoperationProvider.prototype.alertboxConfirm = function (title, message, fun_submit, btn_cancel, btn_submit) {
        if (btn_cancel === void 0) { btn_cancel = "Cancel"; }
        if (btn_submit === void 0) { btn_submit = "Agree"; }
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                    text: btn_cancel,
                    handler: function () { }
                },
                {
                    text: btn_submit,
                    handler: function () {
                        fun_submit();
                    }
                }]
        });
        alert.present();
    };
    BasicoperationProvider.prototype.loaderStart = function (content) {
        if (content === void 0) { content = ''; }
        this.loading = this.loadingCtrl.create({});
        this.loading.present();
    };
    BasicoperationProvider.prototype.loaderEnd = function (response) {
        if (response) {
            this.loading.dismiss();
        }
        else {
            this.loading.dismiss();
            this.alertboxDismiss("Can't getting any kind of response.");
        }
    };
    BasicoperationProvider.prototype.toast = function (message, duration, position) {
        if (duration === void 0) { duration = 2000; }
        if (position === void 0) { position = "bottom"; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    };
    BasicoperationProvider.prototype.setStorage = function (name, data) {
        this.storage.set(name, data);
    };
    BasicoperationProvider.prototype.getStorage = function (name) {
        return this.storage.get(name);
    };
    BasicoperationProvider.prototype.removeStorage = function (name) {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.remove(name);
        });
    };
    BasicoperationProvider.prototype.sideMenuClose = function () {
        this.menuCtrl.enable(false, 'myMenu');
    };
    BasicoperationProvider.prototype.sideMenuOpen = function () {
        this.menuCtrl.enable(true, 'myMenu');
    };
    BasicoperationProvider.prototype.networkConnect = function () {
        var _this = this;
        this.network.onConnect().subscribe(function () {
            _this.alertboxDismiss("Network is connected");
        });
    };
    BasicoperationProvider.prototype.networkDisConnect = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            _this.alertboxDismiss("Network is failed");
        });
    };
    BasicoperationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], BasicoperationProvider);
    return BasicoperationProvider;
}());

//# sourceMappingURL=basicoperation.js.map

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpProvider = /** @class */ (function () {
    function HttpProvider(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.data = null;
        this.TokenApi = "wp-json/wp/v2/pages/2";
        this.url = 'http://sandipmistry.com/pushpam-moters/';
        this.http.get(this.url + this.TokenApi).subscribe(function (val) {
            _this.apiData = val;
            console.log(_this.apiData);
            return _this.token = _this.apiData.acf.token_no;
        });
    }
    HttpProvider.prototype.getUrl = function () {
        return this.url;
    };
    HttpProvider.prototype.getJWTAuth = function () {
        return "Bearer " + this.token;
    };
    HttpProvider.prototype.get = function (route, page) {
        var _this = this;
        if (page === void 0) { page = "1"; }
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var concat;
            // check if url already has a query param
            if (route.indexOf('?') > 0) {
                concat = '&';
            }
            else {
                concat = '?';
            }
            //let url = this.url + route;
            var url = route;
            //  set pagination
            if (page === 'nopaging') {
                // get all results with no paging
                url = url + concat + 'per_page=50';
            }
            else {
                url = url + concat + 'page=' + page;
            }
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.getAuthenticatedData = function (route, page) {
        var _this = this;
        if (page === void 0) { page = "1"; }
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var concat;
            // check if url already has a query param
            if (route.indexOf('?') > 0) {
                concat = '&';
            }
            else {
                concat = '?';
            }
            //let url = this.url + route;
            var url = route;
            //  set pagination
            if (page === 'nopaging') {
                // get all results with no paging
                url = url + concat + 'per_page=50';
            }
            else {
                url = url + concat + 'page=' + page;
            }
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Authorization': _this.getJWTAuth()
                })
            };
            _this.http.get(url, httpOptions)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.send = function (data, route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!data)
                reject({ data: { message: "No data." } });
            var url = route;
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': _this.getJWTAuth()
                })
            };
            _this.http.post(url, data, httpOptions)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                // probably a bad url or 404
                reject(error);
                _this.handleError(error);
            });
        }); // end Promise
    };
    HttpProvider.prototype.delete = function (route, Id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Id)
                reject({ data: { message: "No Id." } });
            var url = route + "/" + Id + "?force=true";
            console.log(url);
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': _this.getJWTAuth()
                })
            };
            _this.http.delete(url, httpOptions)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                // probably a bad url or 404
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.update = function (data, id, route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!data)
                reject({ data: { message: "No data." } });
            var url = route + "/" + id;
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                    'Content-Type': 'application/json',
                    'Authorization': _this.getJWTAuth()
                })
            };
            _this.http.put(url, data, httpOptions)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                // probably a bad url or 404
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.getOnedata = function (route, Id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "/" + Id;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.getAllData = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "/?per_page=100";
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.handleError = function (err) {
        console.warn(err);
    };
    HttpProvider.prototype.getPerPageData = function (route, record) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "/?per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterCategoriesDataById = function (route, record, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[cat]=" + id + "&per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterCategoriesDataByName = function (route, record, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[category_name]=" + name + "&per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    //install wp-rest-filter  plugin by SK8Tech
    HttpProvider.prototype.filterAcfFields = function (route, key, value, record) {
        var _this = this;
        if (record === void 0) { record = 1; }
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[meta_key]=" + key + "&filter[meta_value]=" + value + "&per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterAcfFieldsAllrecord = function (route, key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[meta_key]=" + key + "&filter[meta_value]=" + value;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterDataByOrder = function (route, record, field, order) {
        var _this = this;
        if (order === void 0) { order = 0; }
        var direction;
        if (order == 1) {
            direction = 'desc';
        }
        else {
            direction = 'asc';
        }
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[orderby]=" + field + "&order=" + direction + "&per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterAcfDataByOrder = function (route, record, field, order) {
        var _this = this;
        if (order === void 0) { order = 0; }
        var direction;
        if (order == 1) {
            direction = 'desc';
        }
        else {
            direction = 'asc';
        }
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "?filter[orderby]=meta_value_num&filter[meta_key]=" + field + "&filter[order]=" + direction + "&per_page=" + record;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.filterById = function (route, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            var url = route + "/" + id;
            console.log(url);
            _this.http.get(url)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider.prototype.getAllDataPosts = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!route)
                reject({ data: { message: "No URL set. " } });
            //let url = route+"/?per_page=100";
            console.log(route);
            _this.http.get(route)
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                reject(error);
                _this.handleError(error);
            });
        });
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=httpprovider.js.map

/***/ })

},[235]);
//# sourceMappingURL=main.js.map