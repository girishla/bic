declare var obips:any;//Global defined by OBI JS


//Bootstrap Class with static methods - singleton implementation
export default class BootstrapService {


  //service semaphores to control processing sequence.
  //These are needed because several analysis objects may attempt to bootstrap the app at the same time and one will be allowed
  static chatterLoaded:Boolean = false;
  static chatterLoading:Boolean = false;
  static chatterBooting:Boolean = false;
  static chatterBaseJQElement:HTMLElement;
  static dashboardContentJQElement:JQuery;


  //This is the main method to load all dependencies & start the bootstrap process
  public static boot():Boolean {

    console.log('in boot');

    if ((!BootstrapService.chatterLoaded) && (!BootstrapService.chatterLoading)) { //chatter.module Loaded for the first time - Load JS and CSS files
      BootstrapService.chatterLoading = true;
      BootstrapService.initOBIMetadataAndBootstrap();




/*      require(dependencies, function () {
          if ((typeof obips != 'undefined')) {
            console.log('inside OBI - Manually bootstrapping angular');
            BootstrapService.initOBIMetadataAndBootstrap();
          } else {
            console.log('outside OBI - Manually bootstrapping angular');
            angular.bootstrap(document, ['chatter.module']);
          }
        }
      );*/
    }
    return true;
  }


  //Load OBI report metadata into an angular constant/value and then bootstrap
  public static initOBIMetadataAndBootstrap():void {

    console.info('in initOBIMetadataAndBootstrap');

    var initInjector = angular.injector(["ng", "chatter.module"]);
    var BIGate:any = initInjector.get("BIGate");
    BootstrapService.chatterLoading = true;
    var contextCollection = BIGate.getViewDataReferences();
    var allReportsPromises = BIGate.getAllReportsXML();


    allReportsPromises.then(function (responses:any) {
      var allMetadataPromises = BIGate.getAllReportsMetadata(responses);


      console.log('allMetadataPromises',allMetadataPromises);

      allMetadataPromises.then(function (metaDataResponses:any) {
        console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
        console.log(metaDataResponses);
        var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection);
        //Load metadata and Context Info into an app Constant so it is available as a service throughout
        angular
          .module('chatter.module')
          .constant('metaDataResponses', metaDataResponses);
        angular
          .module('chatter.module')
          .value('contextCollection', mergedCollection);
        BootstrapService.chatterLoaded = true;
        BootstrapService.chatterLoading = false;
        BootstrapService.bootstrapApp();
        BootstrapService.observeSensitiveDOMChanges();
      })
    });

  }

  private static bootstrapApp():void {

    //Semaphore logic to habdle multiple analysis trying to bootstrap at the same time. One one is allowed to - and that becomes elected as the master analysis.
    if ((!BootstrapService.chatterLoaded) || BootstrapService.chatterLoading || BootstrapService.chatterBooting) return;

    BootstrapService.chatterBooting = true;
    BootstrapService.chatterBaseJQElement = $('#PageContentOuterDiv')[0];
    /*var pageContentDiv = BootstrapService.chatterBaseJQElement[0];*/
    //Bootstrap if not already.
    //The First analysis object to set this attribute will have to responsibility of bootstrapping the entire app into context
    if (!(BootstrapService.chatterBaseJQElement.getAttribute('obi-chatter-enable'))) {
      //attach chatter directive - this will make angular loop through table elements and attach further directives
      BootstrapService.chatterBaseJQElement.setAttribute('obi-chatter-enable', 'true');
      BootstrapService.dashboardContentJQElement = $('.DashboardPageContentDiv');
      BootstrapService.dashboardContentJQElement.addClass('md-sidenav-push-in-target');
      //$('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");
      BootstrapService.dashboardContentJQElement.append("<div obi-side-nav-button='true'></div>");
      BootstrapService.dashboardContentJQElement.after("<div obi-side-nav='true'></div>");
      //  pageContentDiv.setAttribute('obi-fab-menu', 'true');
      console.log('New - Attempt to attach angular to page content DIV');
      angular.bootstrap(BootstrapService.chatterBaseJQElement, ['chatter.module']);
      console.log('Angular Bootstraped: ' + 'chatter.module');
    } else {
      //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
      //This is a more performant alternative to re-bootstrapping the entire App.
      var injector = angular.element(BootstrapService.chatterBaseJQElement).injector()
      var compileService = injector.get('$compile');
      angular.forEach($("[viewtype='tableView']"), function (value, key) {
        //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
        if (value.getAttribute('sid')) return;
        value.setAttribute('obi-table', 'true');
        var scope = ((angular.element(value).scope()));
        var linkFn = compileService(value, scope);
        console.log('In bootstrapApp(): linking mutated DOM with scope...');
        linkFn(scope);
      });
    }
    BootstrapService.chatterBooting = false;

  }


  public static observeSensitiveDOMChanges():void {




    if ((!BootstrapService.chatterLoaded) || BootstrapService.chatterLoading || BootstrapService.chatterBooting) return;
    BootstrapService.chatterLoading = true;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    //In Analysis Mode
    var targetViewElementArray = $(document).find('div[id^=tableView]');

    //In Dashboard Mode
    if (targetViewElementArray.length < 1) {
      targetViewElementArray = $('.ViewContainer');

    }

    $.each(targetViewElementArray, function (viewIdx, viewElement) {




      var newScope:any;
      var observer = new MutationObserver(function (mutations:any) {

        console.log('in Mutation Processor');

         console.log(mutations);

        // console.log('mutated ' + viewElement.getAttribute('id'));
        var table = viewElement;
        //TODO Fine-tune performance - to handle only specific DOM mutations
        if (!table.getAttribute('sid') || (!($(viewElement).find('td[id^=e_saw]')[0].getAttribute('obi-table-cell') == 'true'))) {

          //Recompile to cater to the changes
          var injector = angular.element(BootstrapService.chatterBaseJQElement).injector();
          var compileService = injector.get('$compile');
          table.setAttribute('obi-table', 'true');
          if (newScope) {
            newScope.$destroy();
          }
          var scope = ((angular.element(table).scope()));
          newScope = scope.$new();
          var linkFn = compileService(table, newScope);
          console.log('linking mutated DOM with scope...');
          linkFn(newScope);
        }
      });

      observer.observe(viewElement, {
        childList: true,
        subtree:true
      });

    })

    BootstrapService.chatterLoading = false;

  }
}
