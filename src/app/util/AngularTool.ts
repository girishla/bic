    // TODO, probably want to move stuff in this util module to services
    export class AngularTool {
        // http://stackoverflow.com/questions/24303408/bind-to-attributes-in-prototypically-inherited-scope
        public static setupBinding($parse: any, scope: any, attrs: any, attrsToBind: string[]) {
            angular.forEach(attrsToBind, (attrName, key) => {
                scope.$watch(attrs[attrName], (val:any) => {
                    if (scope[attrName] != val) {
                        scope[attrName] = val;
                    }
                });

                scope[attrName] = $parse(attrs[attrName])(scope);
            });
        }

    }


