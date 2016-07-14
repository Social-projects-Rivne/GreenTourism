angular.element(document).ready(function () {
  var controls = {
    video: angular.element("#myvideo")
  };
  var video = controls.video[0];

  angular.element(document).on('click', angular.element("#myvideo"), function () {
    video = angular.element("#myvideo")[0];

    if (video.paused && video) {
      video.play();

    } else {

      video.pause();

    }

  });


});
