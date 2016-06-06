
    export class TimestampFilter {
        constructor() {
            return (input:any) => {
                return new Date(input).getTime();
            }
        }
    }

    
