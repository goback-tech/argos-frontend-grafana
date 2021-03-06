import coreModule from '../core_module';
import config from 'app/core/config';

export class InvitedCtrl {
  /** @ngInject */
  constructor($scope, $routeParams, contextSrv, backendSrv) {
    contextSrv.sidemenu = false;
    $scope.formModel = {};

    $scope.navModel = {
      main: {
        icon: 'gicon gicon-branding',
        text: '초대',
        subTitle: 'ARGOS 계정 등록',
        breadcrumbs: [{ title: '로그인', url: 'login' }],
      },
    };

    $scope.init = function() {
      backendSrv.get('/api/user/invite/' + $routeParams.code).then(function(invite) {
        $scope.formModel.name = invite.name;
        $scope.formModel.email = invite.email;
        $scope.formModel.username = invite.email;
        $scope.formModel.inviteCode = $routeParams.code;

        $scope.greeting = invite.name || invite.email || invite.username;
        $scope.invitedBy = invite.invitedBy;
      });
    };

    $scope.submit = function() {
      if (!$scope.inviteForm.$valid) {
        return;
      }

      backendSrv.post('/api/user/invite/complete', $scope.formModel).then(function() {
        window.location.href = config.appSubUrl + '/';
      });
    };

    $scope.init();
  }
}

coreModule.controller('InvitedCtrl', InvitedCtrl);
