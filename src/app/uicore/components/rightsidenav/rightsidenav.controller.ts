
    /* @ngInject */
 export default   function RightSidenavController($scope, $http, $mdSidenav, $state) {
        var vm = this;
        // sets the current active tab
        vm.close = close;
        vm.currentTab = 0;
        vm.notificationGroups = [{
            name: 'NPS',
            notifications: [{
                title: 'New NPS survey response from HMRC',
                icon: 'fa fa-smile-o',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            },{
                title: 'New NPS survey response from Foot Anstey',
                icon: 'fa fa-frown-o',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            }]
        },{
            name: 'Accounts',
            notifications: [{
                title: 'New Account added to your portfolio',
                icon: 'zmdi zmdi-alert-triangle',
                iconColor: 'rgb(255, 152, 0)',
                date: moment().startOf('hour')
            }]
        },{
            name: 'Dashboard Content',
            notifications: [{
                title: 'New Dashboard NPS created by user Girish Lakshmanan',
                icon: 'fa-dashboard',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'NPS Dashboard Changed by user Girish Lakshmanan',
                icon: 'fa-dashboard',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            }]
        }];
        vm.settingsGroups = [{
            name: 'Account Settings',
            settings: [{
                title: 'Show my avatar',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'Send me notifications',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        }];

        vm.statisticsGroups = [{
            name: 'User Statistics',
            stats: [{
                title: 'Logins this month',
                mdClass: 'md-primary',
                value: 60
            },{
                title: 'Reports created this month',
                mdClass: 'md-accent',
                value: 10
            }]
        }];

        ////////////////

        // add an event to switch tabs (used when user clicks a menu item before sidebar opens)
        $scope.$on('uicoreSwitchNotificationTab', function($event, tab) {
            vm.currentTab = tab;
        });

        // fetch some dummy emails from the API
/*        $http({
            method: 'GET',
            url: API_CONFIG.url + 'email/inbox'
        }).success(function(data) {
            vm.emails = data.slice(1,20);
        });*/

        function openMail() {
            $state.go('elasticslice-no-scroll.email.inbox');
            vm.close();
        }

        function close() {
            $mdSidenav('notifications').close();
        }
    }
