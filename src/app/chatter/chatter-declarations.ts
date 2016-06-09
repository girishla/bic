//Extend the Window Interface to allow for Mutation Observers
interface Window {
  MutationObserver: any,
  WebKitMutationObserver:any,
  MozMutationObserver:any
  bootstrapChatter:()=>boolean;
}

