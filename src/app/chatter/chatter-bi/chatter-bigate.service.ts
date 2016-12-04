
declare var obips_scid;
declare var saw;
declare var obips;

declare var CryptoJS;
import "crypto-js/sha1.js"
import * as _ from "lodash"
//import { demapify } from 'es6-mapify'

export default function BIGateService($http, $q) {

  //var MapVar = <any>require('es6-map/polyfill');;

  var getDashboardPrompts = function () {

    var promptNotifierJQE = $("span[id^=bicprompt]");
    var dashboardPrompts = {};
    $.each(promptNotifierJQE, function (elemIndex) {
      dashboardPrompts[$(this).attr('id')] = $(this).text()
    })


    //console.log('before return dashboardPrompts');
    //console.log(dashboardPrompts);

    return dashboardPrompts;

  }

  var gateInstance = {

    sawSessionId: obips_scid,
    currentDashPath: saw.session.SessionInfos().portalPath,
    currentUser: saw.session.SessionInfos().user,
    currentStateXML: saw.getXmlIsland("idClientStateXml", null, null, true),
    instancePromptMap: getDashboardPrompts(),

    baseURL: saw.getBaseURL(),


    resetPrompts: function () {

      gateInstance.instancePromptMap = getDashboardPrompts();

    },


    //Gets a list of Reports and their catalogPaths and SearchIds. Note that the SearchIds are session tokens and are only valid for a presentation services session.
    getReportsFromStateXML: function () {

      var reports = [];


      //Get Current Page
      var xmlIsland = saw.getXmlIsland("idClientStateXml", null, null, true);


      var firstStatePath = $(xmlIsland).find("ref[statePath]").attr('statePath');

      //in some cases there is no statepath refs so just return
      if (!firstStatePath) return [];

      var pageId = (/~p:(.*?)~r:/).exec(firstStatePath)[1];


      var refsArray = {};
      var searchId;


      //collect statepaths
      $.each($(xmlIsland).find("ref[statePath]"), function (refIndex, refItem) {
        var statePath = $(refItem).attr('statePath');
        searchId = $(refItem).attr('searchID');
        //var pageId = (/~p:(.*?)~r:/).exec(statePath)[1];
        refsArray[searchId] = statePath;

      })


      $.each($(xmlIsland).find("[cid='p:" + pageId + "']").find('[folder]'), function (reportIndex, reportItem) {

        reports.push({
          reportId: $(reportItem).attr('cid'),
          analysisPath: $(reportItem).attr('folder') + '/' + $(reportItem).attr('itemName'),
          searchId: $(reportItem).attr('searchId'),
          statePath: refsArray[$(reportItem).attr('searchId')]
        })

      });


      return reports;


    },



    getViewDataReferences: function (viewId) {


      var contextCollection = [];
      var contextMeasures = {};

      //Reset prompts in case user changed values
      gateInstance.resetPrompts();

      //Collect Data references for Table views
      $.each($("[id*=tableView] .PTChildPivotTable table[id*='saw']"), function (viewIndex, view) {

        var viewModel = obips.ViewModel.getViewModelById(view.getAttribute('Id'))

        //var edgeDefinition = viewModel.getEdgeDefinition(view.getAttribute('Id'));

        var edgeDefinition = viewModel.getEdgeDefinition(viewModel.masterClientId);


        //var edgeDefinition=viewModel.edgeDefinition;

        if (edgeDefinition) {
          //for each table cell collect data references
          $.each($("[id*=tableView] .PTChildPivotTable table[id='" + view.getAttribute('Id') + "']").find('td[id^=e_saw]'), function (elementIndex, element) {

            var elementId = element.getAttribute('Id');


            var edgeCoords = obips.EdgeCoords.parseCoordsFromID(elementId);

            var edgeNum = edgeCoords.getEdge();
            var layerNum = edgeCoords.getLayer();
            var sliceNum = edgeCoords.getSlice();
            var qdrObject = new obips.QDR();


            //console.log(elementId,edgeDefinition);

            var qdrString = qdrObject.getQDR(edgeDefinition, null, edgeDefinition.getColLayerCount(), edgeDefinition.getRowLayerCount(), edgeNum, layerNum, sliceNum, true);
            qdrObject._setQDR(qdrString)


            var columnId = edgeDefinition.getColumnIDFromLayerID(edgeNum, layerNum, sliceNum);

            var currentColFormula, currentColValue;
            if (edgeDefinition.isMeasureLayer(edgeNum, layerNum)) {


              var measureQDR = qdrObject.getTarget();

              angular.forEach(measureQDR._g, function (value, key) {

                contextMeasures[key] = value;
                currentColFormula = key;
                currentColValue = value[0];

              });

              var contextRefs = {};
              angular.forEach(qdrObject.qdr._m, function (item, index) {
                angular.forEach(item._g, function (value, key) {
                  contextRefs[key] = value[0];

                });

              });

              contextCollection.push({
                element: elementId,
                reportStatePath: viewModel.reportStatePath,
                columnId: columnId,
                columnValue: currentColValue,
                refs: contextRefs,
                filters: gateInstance.instancePromptMap
              })

            } //End if (edgeDefinition.isMeasureLayer(edgeNum, layerNum))

          });


        }



      })


      //Collect Data references for Pivot views. The key difference is that we process db_saw elements and DatabodyCoords which means there is no need to extract measures.(As They are all measures)

      $.each($("[id*=pivotTableView] .PTChildPivotTable table[id*='saw']"), function (viewIndex, view) {

        var viewModel = obips.ViewModel.getViewModelById(view.getAttribute('Id'))

        var edgeDefinition = viewModel.getEdgeDefinition(viewModel.masterClientId);



        var pivotCellJQElements = $("[id*=pivotTableView] .PTChildPivotTable table[id='" + view.getAttribute('Id') + "']").find('td[id^=db_saw]');



        //for each pivot data cell, collect data references
        $.each(pivotCellJQElements, function (elementIndex, element) {

          //var elementId = element.getAttribute('Id');

          var bodyCoords = obips.DatabodyCoords.findCoords($('#' + element.getAttribute('Id'))[0])
          var bodyDef = viewModel.getBodyDefinition(bodyCoords.getId());


          var rowNum = bodyCoords.getRow();
          var colNum = bodyCoords.getCol();
          var qdrObject = new obips.QDR();


          //get Column Id so we can subsequently map it to the Metadata column details


          var columnId = bodyDef.getID(bodyCoords.getRow(), bodyCoords.getCol());
          var columnValue = bodyDef.getUnformattedValue(bodyCoords.getRow(), bodyCoords.getCol());

          var qdrString = qdrObject.getQDR(edgeDefinition, null, edgeDefinition.getColLayerCount(), edgeDefinition.getRowLayerCount(), obips.JSDataLayout.DATA_EDGE, rowNum, colNum, true);
          qdrObject._setQDR(qdrString)

          //Get Context References from QDR
          var contextRefs = {};
          angular.forEach(qdrObject.qdr._m, function (item, index) {
            angular.forEach(item._g, function (value, key) {

              if (angular.isArray(value)) {
                contextRefs[key] = value[0];
              }
              else {
                angular.forEach(value, function (keyItem, keyProp) {
                  key = key + '.' + keyProp;
                  contextRefs[key] = keyItem[0];
                })

              }

            });

          });

          contextCollection.push({
            element: element.getAttribute('Id'),
            reportStatePath: viewModel.reportStatePath,
            columnId: columnId,
            columnValue: columnValue,
            refs: contextRefs,
            filters: gateInstance.instancePromptMap
          })


        });


      })

      //Keep a copy of all data references before deleting measure references
      angular.forEach(contextCollection, function (value, key) {

        value.dimRefs = angular.copy(value.refs, value.dimRefs);

      });


      //Delete Measures from context Data references as ony dimensions are of interest
      angular.forEach(contextCollection, function (value, key) {
        angular.forEach(contextMeasures, function (measureValue, measureKey) {
          delete value.dimRefs[measureKey];

        });

      });


      return contextCollection;


    },


    getMergedContextCollection: function (metaData, contextCollection) {


      // console.log('metaData', metaData)
      // console.log('contextCollection', contextCollection)

      var mergedContextCollection = [];
      //mergedContextCollection=angular.copy(contextCollection,mergedContextCollection)
      mergedContextCollection = _.cloneDeep(contextCollection);

      //Loop through Context collection which contains all Table and pivot measure elements. For each measure element, try and match it to the metadata column ids from all the reports. If there is a match, copy it over.
      angular.forEach(mergedContextCollection, function (collectionItem, index) {

        angular.forEach(metaData, function (metaDataValue, metaDataIndex) {

          //statepath comparisons were added because the column Ids were same even if they belonged to different subject areas. Column Ids are based on the BMM
          //statepath may be null in some cases possible due to a product bug where xmlisland does not contain all the current statepaths
          if ((metaData[metaDataIndex].colMap[collectionItem.columnId]) && (!metaData[metaDataIndex].reportStatePath || (metaData[metaDataIndex].reportStatePath == collectionItem.reportStatePath))) {
            mergedContextCollection[index].columnDetails = angular.copy(metaData[metaDataIndex].colMap[collectionItem.columnId], contextCollection.columnDetails);
            mergedContextCollection[index].currentDashboard = metaDataValue.currentDashboard;
            mergedContextCollection[index].analysisPath = metaDataValue.analysisPath

          }
        });

      });

      //console.log('before mergedContextCollection', mergedContextCollection)
      return mergedContextCollection;

    },

    getReportDetailsFromSearchId: function () {

      var reports = [];


      //Get Current Page
      var xmlIsland = saw.getXmlIsland("idClientStateXml", null, null, true);
      var statePath = $(xmlIsland).find('ref[statePath]').attr('statePath');
      var pageId = (/~p:(.*?)~r:/).exec(statePath)[1];



      $.each($(xmlIsland).find("[cid='p:" + pageId + "']").find('[folder]'), function (reportIndex, reportItem) {

        reports.push({
          reportId: $(this).attr('cid'),
          analysisPath: $(this).attr('folder') + '/' + $(this).attr('itemName'),
          searchId: $(this).attr('searchId')
        })

      });

      return reports;


    },

    //Gets the catalog XML for a Report(Analysis). Requires the Search Id.
    //Returns a Promise object.
    getReportXml: function (report) {
      return $q(function (resolve, reject) {
        $http.get("/analytics/saw.dll?getReportXmlFromSearchID&SearchID=" + report.searchId
        ).then(function (response) {

          // console.log("Report XML from Search Id:");
          //  console.log('Report XML from Search Id:',response);


          resolve({ report: report, xml: response })


        }, function (errResponse) {
          reject(errResponse)
        })
      });
    },


    getAllReportsXML: function () {

      var allReportXMLPromises = [];

      angular.forEach(gateInstance.getReportsFromStateXML(), function (value, key) {

        allReportXMLPromises.push(gateInstance.getReportXml(value));

      });



      return $q.all(allReportXMLPromises);

    },


    //Gets Report Data in a friendly JSON structure
    //Returns a Promise object.
    getReportMetadata: function (reportXML, reportDetails) {


      var extractMetadataFromInstance = function (inst: any) {


        var colMap = [];


        angular.forEach(inst.columnIDToColumnInfo, function (value, key) {
          var colInfo = inst.getColumnInfoByID(key);


          //If hierarchy, just set colinfo to Top level

          if (colInfo.hierarchyLevels) {
            colInfo = colInfo.hierarchyLevels[0].displayColumnInfo;
          }

          //console.log('response.primarySubjectArea', response.primarySubjectArea);

          this[key] = {
            baseFormula: inst.primarySubjectArea + '.' + colInfo.getBaseFormula(),
            businessModelAndDimensionID: colInfo.getBusinessModelAndDimensionID(),
            columnFormulaExprType: colInfo.getColumnFormulaExprType(),
            defaultDisplayTimeZone: colInfo.getDefaultDisplayTimeZone(),
            defaultDisplayTimeZoneOffset: colInfo.getDefaultDisplayTimeZoneOffset(),
            displayTimeZone: colInfo.getDisplayTimeZone(),
            displayTimeZoneOffset: colInfo.getDisplayTimeZoneOffset(),
            remarks: colInfo.getRemarks(),
            resolvedFormula: colInfo.getResolvedFormula(),
            type: colInfo.getType(),
            isDoubleColumn: colInfo.isDoubleColumn(),
            isMeasure: colInfo.isMeasure(),
            isMultiValueEnabled: colInfo.isMultiValueEnabled(),
            isPickListEnabled: colInfo.isPickListEnabled(),
            isTime: colInfo.isTime()
          };
        }, colMap);


        var reportMetadata = {
          colMap: colMap,
          primarySubjectArea: inst.primarySubjectArea,
          reportStatePath: reportDetails.statePath,
          analysisPath: reportDetails.analysisPath,
          reportId: reportDetails.reportId,
          searchId: reportDetails.searchId,
          currentDashboard: gateInstance.currentDashPath
        }


        return reportMetadata;
      }


      return $q(function (resolve, reject) {

        //console.log('reportDetails.statePath', reportDetails)

        var inst: any;

        if (reportDetails.statePath) {
          inst = obips.ReportMetadata.GetInstanceByStatePath(reportDetails.statePath);
          resolve(extractMetadataFromInstance(inst));
        }
        else {
          //console.log('statepath was null: loading instance from reportXML')
          inst = new obips.ReportMetadata();
          if (!inst) {
            inst = obips.ReportMetadata.GetInstance(false);
          }
          inst.loadReportMetadata(reportXML, function (response) {
            resolve(extractMetadataFromInstance(inst));
          }, { displayValueLookup: true })
        }


        //11.1.1.7
        // var inst = new obips.ReportMetadata();


        //11.1.1.9 & 12c

        // if (!inst.columnIDToColumnInfo) {
        //   //inst = obips.ReportMetadata.GetInstance(false);
        //   inst = obips.ReportMetadata.GetInstanceByStatePath(reportDetails.statePath);
        // }

        //  inst.loadReportMetadata(reportXML, function (response) {
        //inst.loadReportMetadata(xmlObject,function (response) {;          





        //  }, { displayValueLookup: true })//End of inst.loadReportMetadata(reportXML, function (response)


      });
    },


    //Returns an array of Promises resolving to all report Metadata
    getAllReportsMetadata: function (reportXMLs) {


      //console.log('In getAllReportsMetadata', reportXMLs);

      var metadataPromisesArray = [];

      angular.forEach(reportXMLs, function (value, key) {

        var regEx = /<saw:report((.|\n)*)/;
        var responseXMLArr = regEx.exec(value.xml.data);
        var responseXML = responseXMLArr && responseXMLArr[0];

        //console.log('calling getReportMetadata:', responseXML, value)

        //Get and Load Report Metadata
        var reportMetadataPromise = gateInstance.getReportMetadata(responseXML, value.report)
        metadataPromisesArray.push(reportMetadataPromise)

      });

      return $q.all(metadataPromisesArray);


    },

    getReportIdFromElement: function (element) {

      return $(element).closest("[vid*='tableView'],[vid*='pivotTableView']").attr('vid');

    },
    getReportIdFromCell: function (elementId) {

      return $('#' + elementId).closest("[vid*='tableView'],[vid*='pivotTableView']").attr('vid');

    },

    getContextHash: function (elementID) {



      //return default Context if not within OBI
      if (!(typeof obips)) {

        return {
          columnID: '',
          heading: '',
          currentRowColumns: '',
          value: '',
          SHA1: 'defaultSHA1'
        }

      }



      var contextHash = {};
      var edgeCoords = obips.EdgeCoords.findCoords($('#' + (elementID)).children()[0]);

      var sawViewModelID = edgeCoords.getId();

      var sawColumn = obips.ViewModel.getCurrentColumn(edgeCoords);

      var sawViewModel = obips.ViewModel.getViewModelById(sawViewModelID);
      var columnID = sawColumn.getAttribute('columnID');
      var stateInstance = obips.ReportMetadata.GetInstanceByStatePath(sawViewModel.reportStatePath);

      //console.log('sawViewModel.reportStatePath:', sawViewModel.reportStatePath)

      var numLayers = sawViewModel.getEdgeDefinition(sawViewModelID).getLayerCount(obips.JSDataLayout.ROW_EDGE);

      var currentRowColumns = [];
      var currentColumnElementId;


      //Loop through all columns in the same row as the current Element
      $.each($('#' + (elementID)).closest('td').siblings(), function (siblingIndex, sibling) {


        currentColumnElementId = sibling.getAttribute('id');

        var currentColEdgeCoords = obips.EdgeCoords.findCoords($('#' + currentColumnElementId).children()[0]);

        var currentCol = obips.ViewModel.getCurrentColumn(currentColEdgeCoords);

        var colFormulaSelector = $(currentCol).find('columnFormula').find('expr')[0];
        var colHeadingSelector = $(currentCol).find('columnHeading').find('caption').find('text')[0];

        currentRowColumns.push({
          //Get the Column Formula for the element
          //formula: currentCol.querySelector('columnFormula expr').innerHTML,
          formula: colFormulaSelector && colFormulaSelector.innerHTML,
          //Get the Heading of current element
          heading: ((colHeadingSelector && colHeadingSelector.innerHTML) || (colFormulaSelector && colFormulaSelector.innerHTML)),

          //Get the Column Value of the Current element
          value: currentColEdgeCoords.element.textContent

        })


      })

      contextHash = {

        //isMeasure: stateInstance.getColumnInfoByID(columnID).isMeasure(),
        columnID: columnID,
        //baseFormula: stateInstance.getColumnInfoByID(columnID).getBaseFormula(),
        heading: ((sawColumn.querySelector('columnHeading caption text') && sawColumn.querySelector('columnHeading caption text').innerHTML) || (sawColumn.querySelector('columnFormula expr').innerHTML)),
        currentRowColumns: currentRowColumns,
        value: edgeCoords.element.textContent,
        SHA1: CryptoJS.SHA1(JSON.stringify(contextHash)).toString()

      }

      return <any>contextHash
    }//End Function getcontextHash


  };



  return gateInstance;
}
