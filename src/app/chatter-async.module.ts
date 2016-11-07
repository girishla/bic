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
import "./chatter/chatter-feed/chatter-feed.scss"
import "angular-material/angular-material.scss"
import "salesforce-lightning-design-system-scoped/scss/index-vf.scss"
import "./chatter/chatter.scss"


setTimeout(function(){ BootstrapService.boot();}, 1000);


import BootstrapService from "./chatter/chatter-bootstrap.service";



// window.bootstrapChatter=BootstrapService.boot;
//





