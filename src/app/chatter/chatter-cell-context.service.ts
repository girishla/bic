export default function CellContext(metaDataResponses, BIGate) {
  return {

    getContextCollection: function () {

      var contextCollection = BIGate.getViewDataReferences();

      var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection)


      return mergedCollection;

    }

  }
}
