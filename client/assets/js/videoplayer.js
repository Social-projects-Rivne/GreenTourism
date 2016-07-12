$(document).ready(function(){
    var controls = {
        video: $("#myvideo")
       // playpause: $("#playpause")
    };
    var video = controls.video[0];

    $(document).on('click',$("#myvideo"), function(){
        video=$("#myvideo")[0];
       // $( "#playpause" ).animate({
         //   opacity: 0
      //  }, 100);
        if (video.paused&&video) {
            video.play();
            //$("#playpause").text("STOP");
        } else {

            video.pause();
           // $("#playpause").text("Play");
        }

       // $("#playpause").toggleClass("paused");
       // $("#playpause").toggleClass("paused");
    });


});
