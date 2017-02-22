$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('#stickmenu li a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-50
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });







    $('#youtube-form').submit(function(e) {
      e.preventDefault();
      var query = encodeURIComponent($('#youtube-field').val());
      $.ajax({
         url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ query +"&type=video&key=AIzaSyBzhGR2sXqnxlr-LxHp86re8TrY23je7bA&maxResults=10",
         type: "get",
         success: function (response) {
           var html = '<div class="clearfix">';
           $.each(response.items, function(i, item) {
              var videoid = response.items[i]['id']['videoId'];
              var title = response.items[i]['snippet']['description'];
              var thumbnails = response.items[i]['snippet']['thumbnails']['medium']['url'];
              html+= '<div class="clearfix youtube_items">';
              html+= '<div class="col-sm-3 clearfix img_sec"><img src="'+ thumbnails +'" alt="'+ title +'" title="'+ title +'"></div>';
              html+= '<div class="col-sm-6 clearfix center_wrap"><p>'+ title +'</p></div>';
              html+= '<div class="col-sm-3 clearfix btn_wrap text-center"><a href="https://www.youtube.com/watch?v='+ videoid +'" target=_new class="btn btn-primary">Play video</a></div>';
              html+= '</div>';
           })
           html += "</div>"
           $('#youtube-item').empty();
           $('#youtube-item').append(html);
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
         }
     });
    });


});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#stickmenu li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#stickmenu li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
