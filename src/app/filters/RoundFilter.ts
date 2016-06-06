    export class RoundFilter {
        constructor() {
            return (input:any) => {
                if (!input) {
                    return input;
                }
                return Math.round(input);
            }
        }
    }

