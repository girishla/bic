

import "jquery"
import "angular/angular.js";
// import "font-awesome/css/font-awesome.css";
import "angular-material/angular-material.js"
import "angular-animate/angular-animate.js"
import "angular-aria/angular-aria.js"
import "angular-resource"
import "angular-socket-io/socket.js"
import "./chatter/chatter.module";
import "./chatter/chatter-feed/chatter-feed.scss"
import "saleforce-lightning-design-system-scoped/assets/styles/salesforce-lightning-design-system-vf.css"

import BootstrapService from "./chatter/chatter-bootstrap.service";


setTimeout(function(){ BootstrapService.boot();}, 1000);

// window.bootstrapChatter=BootstrapService.boot;
//





