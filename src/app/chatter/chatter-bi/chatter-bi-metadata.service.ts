import * as _ from "lodash";
var SHA1 = <any>require("crypto-js/sha1")

interface IMetadataService {
    getMergedCollection(): ng.IPromise<{}>;
    getMedataCollection(): ng.IPromise<{}>;
    mergedCollection: any;
    metaDataCollection: any;
    contextCollection: any;
}

export class MetadataService implements IMetadataService {

    public mergedCollection: any = {};
    public metaDataCollection: any = {};
    public contextCollection: any = {};
    static $inject = ["BIGate", "$q"]
    constructor(private BIGate: any, private $q: ng.IQService) { 

        this.metaDataCollection={};
        this.mergedCollection={};
        this.contextCollection={};

    }

    public getMedataCollection =(): ng.IPromise<{}> => {

        return this.$q( (resolve, reject) => {
            if (!_.isEmpty(this.metaDataCollection)) {
                return resolve(this.metaDataCollection);
            } else {

                this.contextCollection = this.BIGate.getViewDataReferences();


                var allReportsPromises = this.BIGate.getAllReportsXML();

                allReportsPromises.then( (responses: any) => {
                    var allMetadataPromises = this.BIGate.getAllReportsMetadata(responses);


                    console.log('allMetadataPromises', allMetadataPromises);

                    allMetadataPromises.then( (metaDataResponses: any) => {
                        console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
                        //console.log(metaDataResponses);
                        this.metaDataCollection = metaDataResponses;

                        resolve(this.metaDataCollection)

                    }


                    )
                })
            }
        })

    }

    public getMergedCollection=(): ng.IPromise<{}> => {

        return this.$q( (resolve, reject) => {

            if (!_.isEmpty(this.mergedCollection)) {
                return resolve(this.mergedCollection);
            } else {

                this.getMedataCollection().then( (metaDataCollection) => {
                    this.mergedCollection = this.BIGate.getMergedContextCollection(metaDataCollection, this.contextCollection);
                    resolve(this.mergedCollection);

                })



            }



        });


    }

    public getContextCollection=(): any => {



      //Repopulate viewDatareferences in case they changed
      console.log('calling getViewDataReferences');

      this.contextCollection = this.BIGate.getViewDataReferences();


      var mergedCollection = this.BIGate.getMergedContextCollection(this.metaDataCollection, this.contextCollection)

      angular.forEach(mergedCollection, (collectionItem,key) =>{

        
    //assuming that at least one table cell will be in dashboard
        collectionItem.contextLevels = {
          level1Context: collectionItem.currentDashboard,
          level2Context: collectionItem.analysisPath,
          level3Context: { dimRefs: collectionItem.dimRefs, baseFormula: collectionItem.columnDetails.baseFormula },
          level4Context: { filters: collectionItem.filters },
        }

        // console.log('collectionItem.contextLevels',collectionItem.contextLevels)


        //apply a sha1 hash to all contexts
        collectionItem.contextLevels.level1ContextHash = collectionItem.contextLevels.level1Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level1Context)).toString() : collectionItem.contextLevels.level1Context;
        collectionItem.contextLevels.level2ContextHash = collectionItem.contextLevels.level2Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level2Context)).toString() : collectionItem.contextLevels.level2Context;
        collectionItem.contextLevels.level3ContextHash = collectionItem.contextLevels.level3Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level3Context)).toString() : collectionItem.contextLevels.level3Context;
        collectionItem.contextLevels.level4ContextHash = collectionItem.contextLevels.level4Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level4Context)).toString() : collectionItem.contextLevels.level4Context;
        
        collectionItem.contextLevels.combinedHash=SHA1(JSON.stringify(collectionItem.contextLevels.level1ContextHash+collectionItem.contextLevels.level2ContextHash+collectionItem.contextLevels.level3ContextHash+collectionItem.contextLevels.level4ContextHash)).toString()



        return collectionItem;
      })

 
      return mergedCollection;

    }



}