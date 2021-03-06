/// <reference path="../../typings/main.d.ts" />
/// <reference path="./chatter/chatter-declarations.ts" />


import "jquery"
import "angular/angular.js";
import "font-awesome/scss/font-awesome.scss";
import "angular-material/angular-material.js"
import "angular-animate/angular-animate.js"
import "angular-aria/angular-aria.js"
import "angular-resource"
import "angular-socket-io/socket.js"
import "moment/moment.js"
import "angular-moment/angular-moment.js"



import "./chatter/chatter.module";
import "angular-material/angular-material.scss"
// import "nprogress/nprogress.css";

if (typeof chatterDelay !== "undefined") {
    setTimeout(function () { BootstrapService.boot(); }, chatterDelay);
}
else {
    setTimeout(function () { BootstrapService.boot(); }, 1000);
}



import BootstrapService from "./chatter/chatter-bootstrap.service";



// window.bootstrapChatter=BootstrapService.boot;
//





