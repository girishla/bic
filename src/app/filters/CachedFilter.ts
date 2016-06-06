    // This filter makes sure the same elastic.js object is returned after every digest.
    // This workaround is needed because expressions like ejs.* return a new object every time
    export class CachedFilter {
        constructor() {
            var values = <any>{}; // keys: native elasticsearch json, values: elastic.js object
            return (input:any) => {
                if (!input) {
                    return input;
                }
                var json = angular.toJson(input.toJSON());
                if (!values[json]) {
                    values[json] = input;
                }
                return values[json];
            }
        }
    }


