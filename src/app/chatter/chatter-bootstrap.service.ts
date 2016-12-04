declare var obips: any;//Global defined by OBI JS


//Bootstrap Class with static methods - singleton implementation
export default class BootstrapService {


  //service semaphores to control processing sequence.
  //These are needed because several analysis objects may attempt to bootstrap the app at the same time and one will be allowed
  static chatterLoaded: Boolean = false;
  static chatterLoading: Boolean = false;
  static chatterBooting: Boolean = false;
  static chatterBaseJQElement: HTMLElement;
  static dashboardContentJQElement: JQuery;


  //This is the main method to load all dependencies & start the bootstrap process
  public static boot(): Boolean {

    console.log('in boot');

    if ((!BootstrapService.chatterLoaded) && (!BootstrapService.chatterLoading)) { //chatter.module Loaded for the first time - Load JS and CSS files
      // BootstrapService.chatterLoading = true;
      // BootstrapService.initOBIMetadataAndBootstrap();
      BootstrapService.chatterLoaded = true
      BootstrapService.bootstrapApp();
    }
    return true;
  }


  //Load OBI report metadata into an angular constant/value and then bootstrap
  // public static initOBIMetadataAndBootstrap(): void {

  //   console.info('in initOBIMetadataAndBootstrap');

  //   BootstrapService.chatterLoaded = true;
  //   BootstrapService.chatterLoading = false;
  //   BootstrapService.bootstrapApp();

  // }

  public static attachDirectives(): void {

    BootstrapService.dashboardContentJQElement.append("<div chatter-feedback></div>");
    BootstrapService.dashboardContentJQElement.find('.DashboardPageContentDiv').after("<div obi-side-nav='true'></div>");
    //  pageContentDiv.setAttribute('obi-fab-menu', 'true');




    //moved here from else block



    var injector = angular.element(BootstrapService.chatterBaseJQElement).injector()
    var compileService = injector.get('$compile');
    angular.forEach($("[viewtype='tableView'][id*='tableView'],[viewtype='pivotTableView'][id*='pivotTableView']"), function (value, key) {
      //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
      if (value.getAttribute('sid')) return;
      value.setAttribute('obi-table', 'true');
      $(value).addClass('bic');
      // var scope = ((angular.element(value).scope()));
      // var linkFn = compileService(value, scope);
      // console.log('In bootstrapApp(): linking mutated DOM with scope...');
      // linkFn(scope);
    })



    angular.forEach($(".CVView:not([vid*='tableView'],[vid*='pivotTableView'])"), function (value, key) {
      //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
      // if (value.getAttribute('sid')) return;
      value.setAttribute('obi-view', 'true');
      $(value).addClass('bic');

    })





  }

  private static bootstrapApp(): void {

    //Semaphore logic to habdle multiple analysis trying to bootstrap at the same time. One one is allowed to - and that becomes elected as the master analysis.
    if ((!BootstrapService.chatterLoaded) || BootstrapService.chatterLoading || BootstrapService.chatterBooting) return;

    BootstrapService.chatterBooting = true;


    // var feedbackBodyElem=$('body').append("<chatter-feedback></chatter-feedback>");
    BootstrapService.chatterBaseJQElement = $('.ComponentHeader')[0];
    /*var pageContentDiv = BootstrapService.chatterBaseJQElement[0];*/
    //Bootstrap if not already.
    //The First analysis object to set this attribute will have to responsibility of bootstrapping the entire app into context
    if (!(BootstrapService.chatterBaseJQElement.getAttribute('obi-chatter-enable'))) {
      //attach chatter directive - this will make angular loop through table elements and attach further directives
      BootstrapService.chatterBaseJQElement.setAttribute('obi-chatter-enable', 'true');

      // BootstrapService.dashboardContentJQElement = $('.DashboardPageContentDiv');




      BootstrapService.dashboardContentJQElement = $('.ComponentHeader');

      BootstrapService.dashboardContentJQElement.find('.DashboardPageContentDiv').addClass('md-sidenav-push-in-target');




      //se the css scope used in the slds scoped version
      // BootstrapService.dashboardContentJQElement.addClass('biview');
      //$('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");
      BootstrapService.dashboardContentJQElement.append("<div obi-side-nav-button='true'></div>")
      BootstrapService.dashboardContentJQElement.append("<obi-progress-circular></obi-progress-circular>");

      console.log('New - Attempt to attach angular to page content DIV');

      angular.bootstrap(BootstrapService.chatterBaseJQElement, ['chatter.module', 'oc.lazyLoad']);
      console.log('Angular Bootstraped: ' + 'chatter.module');

      var initInjector = angular.injector(["ng", "chatter.module"]);
      var BIGate: any = initInjector.get("BIGate");

      console.log('Edge Definitions in Cache');


      //BootstrapService.attachDirectives();




    }
    BootstrapService.chatterBooting = false;

  }



  public static startChatterFeed(MetadataService, $ocLazyLoad, AppUIState, $compile, $scope, $rootScope, TopicService) {


    // var BootstrapService: any = (<any>require("../chatter-bootstrap.service")).default;
    var initInjector = angular.injector(["ng", "chatter.module"]);
    var BIGate: any = initInjector.get("BIGate");
    BootstrapService.chatterLoading = true;

    MetadataService.getMedataCollection().then(function () {

      BootstrapService.chatterLoaded = true;
      BootstrapService.chatterLoading = false;
      BootstrapService.attachDirectives();
      BootstrapService.observeSensitiveDOMChanges();

      require.ensure(['./chatter-feed/chatter-feed.module.ts'], function () {
        // let module = require('../chatter-feed/chatter-feed.module.ts');

        console.log('attempting to lazy load');
        var module = (<any>require('./chatter-feed/chatter-feed.module')).default();
        $ocLazyLoad.inject({
          name: 'chatter-feed.module'
        }).then(function () {
          //Cache all topics before compile
          //  TopicService.getAll().then((data: any) => {
          $compile(angular.element('.ComponentHeader .PrimaryTabTable'))($scope);
          $compile(angular.element('[chatter-feedback]'))($scope);

          // angular.forEach($("[viewtype='tableView'][id*='tableView'],[viewtype='pivotTableView'][id*='pivotTableView']"), function (value, key) {
          //   //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
          //   if (value.getAttribute('sid')) return;
          //   value.setAttribute('obi-table', 'true');
          //   $(value).addClass('bic');
          //   var scope = ((angular.element(value).scope()));
          //   var linkFn =  $compile(value, scope);
          //   console.log('In bootstrapApp(): linking mutated DOM with scope...');
          //   linkFn(scope);
          // })

          AppUIState.progressOff();
          // AppUIState.sideNavOpened = true;



          // //show pinned comments after a second
          // setTimeout(() => {

          //   $rootScope.$broadcast("rootEvent:showPinned");

          // }, 1000)


          //   });



        }, function (err) {
          console.log('lazy load errors', err)
        });


      })



    })


  }

  public static processMutations(viewElement, type): void {

    var newScope: any;

    if (type == "table") {

      var table = viewElement;


      //Reextract Prompts for Mutation Processing because Prompts could have changed
      // var initInjector = angular.injector(["ng", "chatter.module"]);
      // var BIGate: any = initInjector.get("BIGate");
      // BIGate.instancePromptMap=BIGate.resetPrompts();


      if (!table.getAttribute('sid') || (!($(viewElement).find('td[id^=e_saw],td[id^=db_saw]')[0].getAttribute("obi-table-cell") == "true"))) {

        //Recompile to cater to the changes
        var injector = angular.element(BootstrapService.chatterBaseJQElement).injector();
        var compileService = injector.get('$compile');
        table.setAttribute('obi-table', 'true');
        $(table).addClass('bic');
        if (newScope) {
          newScope.$destroy();
        }
        var scope = ((angular.element(table).scope()));
        newScope = scope.$new();
        var linkFn = compileService(table, newScope);
        console.log('linking mutated DOM with scope...');
        linkFn(newScope);
      }

    }
    else {

      console.log('processing mutations for ', viewElement)


      var ngScoped = $(viewElement).attr('ng-scope');

      if ((typeof ngScoped == typeof undefined) && (!($(viewElement).hasClass('bic')))) {



        //Recompile to cater to the changes
        var injector = angular.element(BootstrapService.chatterBaseJQElement).injector();
        var compileService = injector.get('$compile');
        viewElement.setAttribute('obi-view', 'true');
        $(viewElement).addClass('bic');
        if (newScope) {
          newScope.$destroy();
        }
        var scope = ((angular.element(viewElement).scope()));
        newScope = scope.$new();
        var linkFn = compileService(viewElement, newScope);
        console.log('linking mutated DOM with scope...');
        linkFn(newScope);

      }

    }




  }

  public static observeSensitiveDOMChanges(): void {




    if ((!BootstrapService.chatterLoaded) || BootstrapService.chatterLoading || BootstrapService.chatterBooting) return;
    BootstrapService.chatterLoading = true;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    //Setup Observers for entire views

    var targetSectionArray = $(document).find('.SectionDiv');

    $.each(targetSectionArray, function (viewIdx, targetView) {

      var viewObserver = new MutationObserver(function (mutations: any) {

        //console.log(mutations);

        $.each($(targetView).find("[viewtype='tableView'][id*='tableView'],[viewtype='pivotTableView'][id*='pivotTableView']"), function (viewIdx, viewElement) {

          // console.log('mutated ' + viewElement.getAttribute('id'));
          BootstrapService.processMutations(viewElement, "table");

        })

      });

      viewObserver.observe(targetView, {
        childList: true,
        subtree: true
      });



    });



    $.each(targetSectionArray, function (viewIdx, targetView) {



      var viewObserver = new MutationObserver(function (mutations: any) {


        var needsProcessing = false;

        $.each(mutations, (mutationIndex, mutation) => {

          console.log('mutation.removedNodes', mutation.removedNodes)

          $(mutation.removedNodes).each(function (value, index) {
            if (this.nodeType === 1) {

              var viewid = this.getAttribute('vid');
              if (viewid) {
                console.log('viewid after', viewid);
                //just before recompiling remove all previous popovers associated with the view
                $('[id*="nspopover"][viewid="' + viewid + '"]').remove();

              }
            }
          });


          $(mutation.addedNodes).each(function (value, index) {
            if (this.nodeType === 1) {
              var viewid = this.getAttribute('vid');
              if (viewid) {
                console.log('added node', viewid);
                //just before recompiling remove all previous popovers associated with the view
                needsProcessing = true;
              }
            }
          });

        })

        if (needsProcessing) {
          $.each($(targetView).find(".CVView:not([vid*='tableView'],[vid*='pivotTableView'])"), function (viewIdx, viewElement) {

            BootstrapService.processMutations(viewElement, "view");

          })


        }


      });

      viewObserver.observe(targetView, {
        childList: true,
        subtree: true
      });



    });

    BootstrapService.chatterLoading = false;

  }
}
