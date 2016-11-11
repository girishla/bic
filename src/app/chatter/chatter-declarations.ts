//Extend the Window Interface to allow for Mutation Observers
interface Window {
  MutationObserver: any,
  WebKitMutationObserver:any,
  MozMutationObserver:any,
  bootstrapChatter:()=>boolean,
  HTMLCanvasElement:any
}

//added for feedback functionality
interface JQueryStatic {
    feedback:any
}

declare var html2canvas;