
    /* @ngInject */
export default    function LeftSidenavController(uicoreSettings, uicoreLayout) {
        var vm = this;
        vm.layout = uicoreLayout.layout;
        vm.sidebarInfo = {
            appName: uicoreSettings.name,
            appLogo: uicoreSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////

        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            uicoreLayout.setOption('sideMenuSize', menu);
        }
    }

