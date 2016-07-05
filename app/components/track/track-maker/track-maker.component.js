angular.module('trackMaker', [])
  .component('trackMaker', {
    templateUrl: 'components/track/track-maker/track-maker.template.html',
    controller: function trackMakerController($http, $rootScope) {

      var ctrlScope = this;
      ctrlScope.stepOneDisabled = false;
      $rootScope.stepOneActive = true;
      ctrlScope.stepTwoDisabled = true;
      ctrlScope.stepThreeDisabled = true;
      ctrlScope.stepFourDisabled = true;

      ctrlScope.trackPointsAlert = false;
      ctrlScope.trackNameAlert = false;
      ctrlScope.trackTypeAlert = false;

      ctrlScope.newTrackName = "";
      ctrlScope.newTrackPoints = [];
      ctrlScope.newTrackType = "";
      ctrlScope.newTrackDescription = "";

      var newTrack;
      var newTrackObj = {
        name: "",
        description: "",
        type: "",
        track_rate: "",
        track_points: [],
        comments: [{}],
        color: ""
      };
      var newTrackPointsCounter = 0;
      var newTrackFirstPoint;
      var newTrackLastPoint;

      var startIcon = L.icon({
        iconUrl: 'assets/img/tracks/startPoint.png',
        iconSize: [50, 50],
        iconAnchor: [11, 47]
      });
      var finishIcon = L.icon({
        iconUrl: 'assets/img/tracks/finishPoint.png',
        iconSize: [50, 50],
        iconAnchor: [2, 49]
      });

      $http.get("components/track/tracks.type.json").then(function(data) {
        ctrlScope.types = data.data;
      }, function() {
        console.log("Error: fetching type json");
      });

      ctrlScope.hideMenu = function() {
        $("#addMenu").animate({
          left: "-420px"
        });
        if ($rootScope.stepOneActive) {
          $rootScope.map.off('click', ctrlScope.addPointForNewTrack);
        }
        $rootScope.menuOpen = false;
      }

      $rootScope.startStepOne = function() {
        if ($rootScope.stepOneActive) {
          $rootScope.map.on('click', ctrlScope.addPointForNewTrack);
        }
      }

      ctrlScope.addPointForNewTrack = function(e) {
        if (newTrackPointsCounter == 0) {
          newTrackFirstPoint = L.marker([e.latlng.lat, e.latlng.lng], {
            icon: startIcon
          }).addTo($rootScope.map);
          ctrlScope.newTrackPoints.push([e.latlng.lat, e.latlng.lng]);
          newTrackPointsCounter += 1;
        } else {
          ctrlScope.newTrackPoints.push([e.latlng.lat, e.latlng.lng]);
          newTrackPointsCounter += 1;
          if (newTrack) {
            $rootScope.map.removeLayer(newTrack);
          }
          newTrack = L.polyline(ctrlScope.newTrackPoints, {
            color: "#000",
            opacity: 1
          }).addTo($rootScope.map);
        }
      }

      ctrlScope.startStepTwo = function() {
        if (newTrackPointsCounter > 1) {
          $rootScope.stepOneActive = false;
          newTrackLastPoint = L.marker([ctrlScope.newTrackPoints[ctrlScope.newTrackPoints.length - 1][0], ctrlScope.newTrackPoints[ctrlScope.newTrackPoints.length - 1][1]], {
            icon: finishIcon
          }).addTo($rootScope.map);
          $rootScope.map.off('click', ctrlScope.addPointForNewTrack);
          ctrlScope.trackPointsAlert = false;
          ctrlScope.stepOneDisabled = true;
          ctrlScope.stepTwoDisabled = false;
        } else {
          ctrlScope.trackPointsAlert = true;
        }
      }

      ctrlScope.startStepThree = function() {
        if (ctrlScope.newTrackName != "") {
          ctrlScope.trackNameAlert = false;
          ctrlScope.stepTwoDisabled = true;
          ctrlScope.stepThreeDisabled = false;

        } else {
          ctrlScope.trackNameAlert = true;
        }
      }

      ctrlScope.selectNewPlaceType = function() {
        for (var i = 0; i < ctrlScope.types.length; i++) {
          if (ctrlScope.newTrackType.type == ctrlScope.types[i].type) {
            $rootScope.map.removeLayer(newTrack);
            newTrack = L.polyline(ctrlScope.newTrackPoints, {
              color: ctrlScope.newTrackType.color,
              opacity: 1
            }).addTo($rootScope.map);
          }
        }
      }

      ctrlScope.startStepFour = function() {
        if (ctrlScope.newTrackType != "") {
          ctrlScope.trackTypeAlert = false;
          ctrlScope.stepThreeDisabled = true;
          ctrlScope.stepFourDisabled = false;
        } else {
          ctrlScope.trackTypeAlert = true;
        }
      }

      ctrlScope.resetForm = function(isCreating) {
        ctrlScope.stepOneDisabled = false;
        $rootScope.stepOneActive = true;
        ctrlScope.stepTwoDisabled = true;
        ctrlScope.stepThreeDisabled = true;
        ctrlScope.stepFourDisabled = true;

        ctrlScope.newTrackName = "";
        ctrlScope.newTrackPoints = [];
        ctrlScope.newTrackType = "";
        ctrlScope.newTrackDescription = "";
        newTrackObj = {};

        $rootScope.map.removeLayer(newTrack);
        $rootScope.map.removeLayer(newTrackFirstPoint);
        $rootScope.map.removeLayer(newTrackLastPoint);
        newTrackPointsCounter = 0;

        $rootScope.map.on('click', ctrlScope.addPointForNewTrack);
      }

      ctrlScope.successCreating = function() {
        $rootScope.tracks.push([newTrack, ctrlScope.newTrackType.type]);
        newTrack = "";
        newTrackObj.track_points = ctrlScope.newTrackPoints;
        newTrackObj.name = ctrlScope.newTrackName;
        newTrackObj.type = ctrlScope.newTrackType.type;
        newTrackObj.color = ctrlScope.newTrackType.color;
        newTrackObj.description = ctrlScope.newTrackDescription;
        console.log(newTrackObj);
        ctrlScope.resetForm(true);
        console.log(newTrackObj);
      }
    }
  });
