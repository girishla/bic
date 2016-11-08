var SHA1 = <any>require("crypto-js/sha1")

export default function CellContext(metaDataResponses, BIGate) {
  return {

    getContextCollection: function () {

      var contextCollection = BIGate.getViewDataReferences();

      var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection)



      angular.forEach(mergedCollection,function (collectionItem,key) {

        
    //assuming that at least one table cell will be in dashboard
        collectionItem.contextLevels = {
          level1Context: collectionItem.currentDashboard,
          level2Context: collectionItem.analysisPath,
          level3Context: { dimRefs: collectionItem.dimRefs, baseFormula: collectionItem.columnDetails.baseFormula },
          level4Context: { filters: collectionItem.filters },
        }

        console.log('collectionItem.contextLevels',collectionItem.contextLevels)


        //apply a sha1 hash to all contexts
        collectionItem.contextLevels.level1ContextHash = collectionItem.contextLevels.level1Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level1Context)).toString() : collectionItem.contextLevels.level1Context;
        collectionItem.contextLevels.level2ContextHash = collectionItem.contextLevels.level2Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level2Context)).toString() : collectionItem.contextLevels.level2Context;
        collectionItem.contextLevels.level3ContextHash = collectionItem.contextLevels.level3Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level3Context)).toString() : collectionItem.contextLevels.level3Context;
        collectionItem.contextLevels.level4ContextHash = collectionItem.contextLevels.level4Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level4Context)).toString() : collectionItem.contextLevels.level4Context;
        
        collectionItem.contextLevels.combinedHash=SHA1(JSON.stringify(collectionItem.contextLevels.level1ContextHash+collectionItem.contextLevels.level2ContextHash+collectionItem.contextLevels.level3ContextHash+collectionItem.contextLevels.level4ContextHash)).toString()



        return collectionItem;
      })

    //   mergedCollection = mergedCollection.map(function (collectionItem) {

    // //assuming that at least one table cell will be in dashboard
    //     collectionItem.contextLevels = {
    //       level1Context: metaDataResponses[0].currentDashboard,
    //       level2Context: metaDataResponses[0].analysisPath,
    //       level3Context: { dimRefs: collectionItem.dimRefs, baseFormula: collectionItem.columnDetails.baseFormula },
    //       level4Context: { filters: collectionItem.filters },
    //     }


    //     console.log('collectionItem.contextLevels',collectionItem.contextLevels)



    //     //apply a sha1 hash to all contexts
    //     collectionItem.contextLevels.level1ContextHash = collectionItem.contextLevels.level1Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level1Context)).toString() : collectionItem.contextLevels.level1Context;
    //     collectionItem.contextLevels.level2ContextHash = collectionItem.contextLevels.level2Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level2Context)).toString() : collectionItem.contextLevels.level2Context;
    //     collectionItem.contextLevels.level3ContextHash = collectionItem.contextLevels.level3Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level3Context)).toString() : collectionItem.contextLevels.level3Context;
    //     collectionItem.contextLevels.level4ContextHash = collectionItem.contextLevels.level4Context ? SHA1(JSON.stringify(collectionItem.contextLevels.level4Context)).toString() : collectionItem.contextLevels.level4Context;
        
    //     collectionItem.contextLevels.combinedHash=SHA1(JSON.stringify(collectionItem.contextLevels.level1ContextHash+collectionItem.contextLevels.level2ContextHash+collectionItem.contextLevels.level3ContextHash+collectionItem.contextLevels.level4ContextHash)).toString()



    //     return collectionItem;
    //   })

      console.log(mergedCollection);
      return mergedCollection;

    }

  }
}
