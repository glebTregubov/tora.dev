(function ($) {

    $(document).ready(function () {

        // var youtubeUrl = $('.field-name-field-video-code').find('a').text();
//	$('.field-name-field-video-code').before('<div class ="containingBlock"></div>');
//	alert(youtubeUrl);

        // $('.field-name-field-video-code').empty();
        // $('.views-field-field-video-code').empty();

//	$(".field-type-youtube").add("<div id='containingBlock class ='container grid-14 clearfix' '></div>");

        //var youtubeUrl = 'http://www.youtube.com/watch?v=xYemnKEKx0c'

        //var mediaMod = $('<div id = "Youtube1" width="640" height="300" class ="container grid-14 clearfix"><video width="100%" height="100%" id="player1" preload="none"> <source type="video/youtube" src="http://www.youtube.com/watch?v=xYemnKEKx0c"/></video></div>').appendTo('.containingBlock')
        // var mediaMod2 = $('#player1').find('source').attr('src', youtubeUrl);


        // new mediaelement('player1', { srcSrc: 'http://youtu.be/NpyV2Up2GQ0'}
//___________________________________________________________________________________________________________________________________________________

//
//        var $videoWrap = $(".node-inner"), // caching object
//            default_ht = $videoWrap.height();
//        var newWidth = default_ht;
//        var newHeight = 360 / 640 * newWidth;
//        $('#video-wrap').css('width', newWidth);
//        $('#video-wrap').css('height', newHeight + 'px');

        $('#player1').mediaelementplayer();


//______________________________________________________________________________________________________________________________________________________________


        // var boxthumbnail = $('<video id="example_video_2" class="video-js vjs-default-skin" width="640" height="264" data-setup='{"techOrder":["youtube"], "src":"http://youtu.be/NpyV2Up2GQ0"}'></video>')
        //               .appendTo('.field-name-field-video-code2');

        //  var boxthumbnail = $('<video id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264"></video>')
        //                .appendTo('.field-name-field-video-code2');

        // var posterSrc = "http://ec2-54-227-116-247.compute-1.amazonaws.com/models/site-templates/images/cover_img/ted_cover.jpg";

        // var vid = videojs("example_video_1", {"techOrder": ["youtube"], "src": "http://www.youtube.com/watch?v=xYemnKEKx0c" }, function() {fixPoster(this);});
//____________________________________________________________________________________________________________________________________________________________

//      new MediaElement('player1', {
//          // shows debug errors on screen
//          enablePluginDebug: false,
//          // remove or reorder to change plugin priority
//          plugins: ['flash','silverlight'],
//          // specify to force MediaElement to use a particular video or audio type
//          type: '',
//          // path to Flash and Silverlight plugins
//          pluginPath: '/myjsfiles/',
//          // name of flash file
//          flashName: 'flashmediaelement.swf',
//          // name of silverlight file
//          silverlightName: 'silverlightmediaelement.xap',
//          // default if the <video width> is not specified
//          defaultVideoWidth: 480,
//          // default if the <video height> is not specified
//          defaultVideoHeight: 270,
//          // overrides <video width>
//          pluginWidth: -1,
//          // overrides <video height>
//          pluginHeight: -1,
//          // rate in milliseconds for Flash and Silverlight to fire the timeupdate event
//          // larger number is less accurate, but less strain on plugin->JavaScript bridge
//          timerRate: 250,
//          // method that fires when the Flash or Silverlight object is ready
//          success: function (mediaElement, domObject) {
//
//              // add event listener
//              mediaElement.addEventListener('timeupdate', function(e) {
//
//                  document.getElementById('current-time').innerHTML = mediaElement.currentTime;
//
//              }, false);
//
//              // call the play method
//              mediaElement.play();
//
//          },
//          // fires when a problem is detected
//          error: function () {
//              alert("error")
//
//          }
//      });


//___________________________________________________________________________________________________________________________________

    });


    // Youtube plugin overrides poster (bug?), so this just sets it back.
// function fixPoster(player) {
//     var posterEl = player && player.posterImage && player.posterImage.el();
//     if (posterEl && ('backgroundImage' in posterEl.style)) {
//         posterEl.style.backgroundImage = null;
//         posterEl.style.backgroundColor = "black";
//         posterEl.appendChild(document.createElement("img"));
//     }
//     if (posterEl) {
//       var img = posterEl.querySelector("img");
//       img.src = posterSrc;
//       img.style.width = "initial";
//       img.style.height = "100%";
//     }
// }


})(jQuery);