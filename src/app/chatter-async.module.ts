

import "jquery"
import "angular/angular.js";
import "./chatter/chatter.module";
import "font-awesome/css/font-awesome.css";
import "angular-material/angular-material.js"
import "angular-material/angular-material.css"
import "angular-animate/angular-animate.js"
import "angular-aria/angular-aria.js"

import BootstrapService from "./chatter/chatter-bootstrap.service";


console.log('all loaded fine 104');
console.log('all loaded fine 990');

setTimeout(function(){ BootstrapService.boot();}, 2000);

// window.bootstrapChatter=BootstrapService.boot;
//





