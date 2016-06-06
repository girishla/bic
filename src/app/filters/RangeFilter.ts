    export class RangeFilter {
        constructor() {
            return (input:any, total:any) => {
                total = parseInt(total);
                for (var i = 0; i < total; i++) {
                    input.push(i);
                }
                return input;
            }
        }
    }

    
