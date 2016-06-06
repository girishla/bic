import {ElasticService} from "./ElasticService";

export var services = angular.module('elasticslice.services', [])
  .service('es', ElasticService);
