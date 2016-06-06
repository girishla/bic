import {BreadcrumbsService} from "./breadcrumbs/breadcrumbs.service";
import {FooterController} from "./footer/footer.controller";
import uicoreLoader from "./loader/loader.directive";
import LoaderService from "./loader/loader-service";
import {uicoreMenuDirective} from "./menu/menu.directive";
import {menuProvider} from "./menu/menu.provider";
import {uicoreMenuItemDirective} from "./menu/menu-item.directive";
import NotificationsPanelController from "./notifications-panel/notifications-panel.controller";
import tableImage from "./table/table-cell-image.filter";
import uicoreTable from "./table/table.directive";
import widget from "./widget/widget.directive";
import TriWizard from "./wizard/wizard.directive";
import startFrom from "./table/table-start-from.filter";
import WizardFormProgress from "./wizard/wizard-form.directive";
import LeftSidenavController from "./leftsidenav/leftsidenav.controller";
import RightSidenavController from "./rightsidenav/rightsidenav.controller";
import DefaultToolbarController from "./toolbar/toolbar.controller";
import ToolbarController from "./toolbars/toolbar.controller";
import sidenavPushIn from "./rightsidenav/pushsidenav.directive";
import "./wordcloud/wordcloud";



export default angular
  .module('uicore.components', [])
  .factory('uicoreBreadcrumbsService', BreadcrumbsService)
  .controller('FooterController', FooterController)
  .directive('uicoreLoader', uicoreLoader)
  .factory('uicoreLoaderService', LoaderService)
  .directive('uicoreMenu', uicoreMenuDirective)
  .provider('uicoreMenu', menuProvider)
  .directive('uicoreMenuItem', uicoreMenuItemDirective)
  .controller('NotificationsPanelController', NotificationsPanelController)
  .directive('uicoreTable', uicoreTable)
  .filter('tableImage', tableImage)
  .filter('startFrom', startFrom)
  .controller('DefaultToolbarController', DefaultToolbarController)
  .controller('ToolbarController', ToolbarController)
  .directive('uicoreWidget', widget)
  .directive('uicoreWizard', TriWizard)
  .directive('uicoreWizardForm', WizardFormProgress)
  .controller('LeftSidenavController', LeftSidenavController)
  .controller('RightSidenavController', RightSidenavController)
  .directive('sidenavPushIn', sidenavPushIn)

