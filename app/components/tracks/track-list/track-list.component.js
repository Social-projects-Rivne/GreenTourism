
angular.module('trackList', ['trackFilter', 'filterMapType', 'trackMaker', 'showMap', 'popularTrack'])
.component('trackList', {
    templateUrl: 'components/tracks/track-list/track-list.template.html',
    controller: function mapMenuController($rootScope) {
        var ctrlScope = this;
        $rootScope.menuOpen = false;
        ctrlScope.toggleMenu = function () {
          if ($rootScope.menuOpen) {
              $("#addMenu").animate({
                  left: "-420px"
              });
              if ($rootScope.stepOneActive) {
                    $rootScope.map.off('click', ctrlScope.addPointForNewTrack);
                }
              $rootScope.menuOpen = false;
          } else {
              $("#addMenu").animate({
                  left: "46px"
              });      
              $rootScope.startStepOne();
              $rootScope.menuOpen = true;     
          }
        }
    }
  });
