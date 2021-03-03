function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}

function getTotalSum() {
  tp = 0;
  num = 0;
  $("[data-price]").each(function() {
    count = parseInt( $(this).val() );
    console.log(count);
    priceVal = parseInt( $(this).attr("data-price") );
    num = count * priceVal;
    tp += num;
  });
  $(".tp").text(tp);
}

function getRespPositionElems() {
  $("[data-resp-elem]").each(function() {
    index = $(this).attr("data-resp-elem");
    respWidth = $(this).attr("data-respwidth");
    if(bodyWidth <= respWidth ) {
      templ = $(this).children("*");
      $("[data-resp-append = '"+index+"']").append(templ);
    } else {
      templ = $("[data-resp-append = '"+index+"']").children("*");
      $("[data-resp-elem = '"+index+"']").append(templ);
    }
  });
}

function getRespNavParams() {
  // if(bodyWidth > 900) {
    scrollTopCoord = $("#headerTopWrapp").offset().top + $("#headerTopWrapp").height();
  // } else {
  //   scrollTopCoord= 5;
  // }
  if($(document).scrollTop() > scrollTopCoord) {
    $("#headerTop").addClass("scroll");
  } else {
    $("#headerTop").removeClass("scroll");
  }
}

function getRespNavScrollDimension() {
  var st = $(this).scrollTop();
  if (st > scrollPos){
    $("#headerTop").removeClass("up");
  } else {
    $("#headerTop").addClass("up");
  }
  scrollPos = st;
}

function getBodyParams() {
  div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  $("body").addClass("fixed");
  $("body").css({
      "position" : "fixed",
      "top" :  -$(document).scrollTop() + "px",
      "overflow" : "hidden",
      "right" : 0,
      "left" : 0,
      "bottom" : 0,
      "padding-right" : scrollWidth + "px"
  });
}

function resetBodyParams() {
  curTop = $("body").css("top");
  curTop = Math.abs(parseInt(curTop, 10));
  $("body").attr("style", "");
  if (curTop !== 0) {
      $("html").scrollTop(curTop);
  }
  $("body").removeClass("fixed");
}

function getTagsBtnParams() {
  $("[data-tags]").each(function()  {
    tagsName = $(this).attr("data-tags");
    if(!$("[data-tagsbtn = '"+tagsName+"']").hasClass("active")) {
      tagsDropdown = $(this).find(".tags_list_2");
      defaultHeight = $(this).attr("def-height");
      $(this).css({
        "height" : defaultHeight + "px"
      });
      tagsListHeight = tagsDropdown.height();
      if(tagsListHeight >= defaultHeight) {
        $("[data-tagsbtn = '"+tagsName+"']").addClass("visible");
      } else {
        $("[data-tagsbtn = '"+tagsName+"']").removeClass("visible");
      }
    }
  });
}

function getRespSlider() {
  if($(".categpries_thumbs")) {
    if(bodyWidth <= 900) {
      $(".categpries_thumbs").not(".slick-initialized").slick({
          dots: true,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          responsive: [
              {
                breakpoint: 900,
                settings: {
                  arrows: false,
                  dots: false
                }
              }
            ]
      });
    } else if($(".categpries_thumbs").hasClass("slick-initialized")) {
      $(".categpries_thumbs").slick('unslick');
    }
  }


  if($(".thumbnails_1")) {
    if(bodyWidth <= 900) {
      $(".thumbnails_1").not(".slick-initialized").slick({
          dots: true,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          responsive: [
              {
                breakpoint: 900,
                settings: {
                  arrows: false,
                  dots: false
                }
              }
            ]
      });
    } else if($(".thumbnails_1").hasClass("slick-initialized")) {
      $(".thumbnails_1").slick('unslick');
    }
  }

  if($('.scrollbar_900').length > 0) {
    if(bodyWidth <= 900) {
      $('.scrollbar_900').mCustomScrollbar({
        axis:"x",
        alwaysShowScrollbar: 0
      });
    } else {
      $('.scrollbar_900').mCustomScrollbar("destroy");
    }
  }

  if($('.scrollbar_600').length > 0) {
    if(bodyWidth <= 600) {
      $('.scrollbar_600').mCustomScrollbar({
        axis:"x",
        alwaysShowScrollbar: 0
      });
    } else {
      $('.scrollbar_600').mCustomScrollbar("destroy");
    }
  }

}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var index, respWidth, templ;
var scrollPos = 0;


$(window).load(function() {
  getAnimation();
});

$(window).resize(function() {
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getRespPositionElems();
  getRespNavParams();
  getTagsBtnParams();
  getRespSlider();
  getAnimation();
  if(!$(".basketLink").hasClass("active")) {
    $(".resp_bg_basket").css({
      "display" : "none"
    });
  }
  if(!$(".search_wrapp ").hasClass("active")) {
    $(".resp_bg_search").css({
      "display" : "none"
    });
  }
});

$(document).scroll(function() {
  getRespNavParams();
  getAnimation();
});


$(window).scroll(function(){
  getRespNavScrollDimension();
});

$(document).ready(function() {
  
  if($('.scrollBar').length > 0) {
    $('.scrollBar').mCustomScrollbar({
    });
  }

  getRespPositionElems();
  getRespNavParams();
  getRespNavScrollDimension();
  getTagsBtnParams();
  getRespSlider();

  $(".dropdown_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dropdown_box");
    parent.toggleClass("active");
  });

  $(".val").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dropdown_box");
    activeVal = parent.find(".active_val");
    parent.find(".hide_val").val($(this).html());
    activeVal.html($(this).html());
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".dropdown_box").removeClass("active");
    }
  });

  $(document).on("mouseup", function(e) {
      e.preventDefault();
      hide_element = $(".dropdown_box");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0
          && hide_element.hasClass("active")) {
        hide_element.removeClass("active")
      }
  });

  // ---------------

  $(".catalog_btn").on("click", function(e) {
    e.preventDefault();
    if($(".catalog_menu").is(":hidden")) {
      $(".catalog_menu").stop().slideDown(300);
      $(this).addClass("active");
    } else {
      $(".catalog_menu").stop().slideUp(300);
      $(this).removeClass("active");
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".catalog_btn").removeClass("active");
      $(".catalog_menu").stop().slideUp(300);
    }
  });

  $(document).on("mouseup", function(e) {
      e.preventDefault();
      hide_element = $(".catalog_menu");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
        $(".catalog_btn").removeClass("active");
        hide_element.stop().slideUp(300);
      }
  });

  $( ".catalog_menu ul li" ).bind( "mouseenter mouseleave", function() {
    $( this ).toggleClass( "hover" );
    subMenu = $(this).children(".sub_menu");
    if($(this).children(".sub_menu").length > 0) {
      if($(this).hasClass("hover")) {
        subMenu.stop().slideDown(300);
      } else {
        subMenu.stop().slideUp(300);
      }
    }
  });

  // ------------------

  // Обработчик поиска

  $("#searchBtn").on("click", function(e) {
    e.preventDefault();
    if($(".search_result").is(":hidden")) {
      parent = $(this).closest(".search_wrapp");
      parent.addClass("active");
      $(".search_result").slideDown(300);
      $(".resp_bg_search").fadeIn(300);
    } else {
      $(".resp_bg_search").fadeOut(300);
    }
  });

  $(".search_input").keyup(function(e) {
    e.preventDefault();
    val = $(this).val();
    parent = $(this).closest(".search_wrapp");
    if(val.length > 0) {
      parent.addClass("active");
    } else {
      parent.removeClass("active");
    }
  });

  $("#resetBtn").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".search_wrapp");
    parent.removeClass("active");
    parent.find(".search_input").val("");
    $(".search_result").slideUp(300);
    $(".resp_bg_search").fadeOut(300);
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".search_wrapp").removeClass("active");
      $(".search_result").stop().slideUp(300);
      $(".resp_bg_search").fadeOut(300);
    }
  });

  $(".resp_bg_search").on("click", function(e) {
    $(".search_wrapp").removeClass("active");
    $(".search_result").stop().slideUp(300);
    $(this).fadeOut(300);
  });

  $(document).on("mouseup", function(e) {
      e.preventDefault();
      hide_element = $(".search_result");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
        hide_element.stop().slideUp(300);
        $(".search_wrapp").removeClass("active");
      }
  });

  // -------------

  // $(".count_box button").click(function(e) {
  $(document).on("click", ".count_box button", function(e) {
    e.preventDefault();
    parentBlock = $(this).closest(".count_box");
    countInput = parentBlock.find(".count_num input");
    countVal = countInput.val();
    if(countVal == "") {
        countVal = 1;
    }
    if( $(this).hasClass("minus_btn") && countVal > 1 ) {
        countVal--;
    } else if( $(this).hasClass("plus_btn")) {
        countVal++;
    }
    countInput.val(countVal);
    getTotalSum();
  });

  // ---------------

  // $(".basketLink").on("click", function(e) {
  $(document).on("click", ".basketLink", function(e) {
    e.preventDefault();
    parent = $(this).closest(".basket_link_wrapp");
    dropdown = parent.find(".basket_dropdown");
    if( dropdown.is(":hidden") ) {
      $(".resp_bg_basket").fadeIn(300);
      dropdown.slideDown(300);
      $(this).addClass("active");   
    } else if(dropdown.is(":visible") ){
      dropdown.slideUp(300);      
      $(".resp_bg_basket").fadeOut(300);
      $(".basketLink").removeClass("active");
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".basket_dropdown").slideUp(300);
      $(".basketLink").removeClass("active");
      $(".resp_bg_basket").fadeOut(300);
    }
  });

  $(document).on("mouseup", function(e) {
    e.preventDefault();
    hide_element = $(".basket_dropdown");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
      hide_element.slideUp(300);
      $(".basketLink").removeClass("active");
      $(".resp_bg_basket").fadeOut(300);
    }
  });

  // $(".resp_bg_basket").on("click", function(e) {
  $(document).on("click", ".resp_bg_basket", function(e) {
    e.preventDefault();
     $(this).fadeOut(300);
     $(".basketLink").removeClass("active");
  });

  // $(".basket_item .del_btn").on("click", function(e) {
  $(document).on("click", ".basket_item .del_btn", function(e) {
    e.preventDefault();
    parent = $(this).closest(".basket_item");
    parent.slideUp(400);
    setTimeout(function() {
      basketItems = parent.closest(".basket_items");
      parent.remove();      
      countGoods = 0;
      basketItems.find(".basket_item").each(function() {
        countGoods++;
      });
      $(".cp").text(countGoods);
      getTotalSum();
    }, 500);
  });

  if( $(".promo_slider").length > 0 ) {
      $(".promo_slider").not(".slick-initialized").slick({
          dots: true,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          responsive: [
              {
                breakpoint: 900,
                settings: {
                  arrows: false
                }
              }
            ]
      });
  }

  if( $(".thumbs_slider").length > 0 ) {
    $(".thumbs_slider").not(".slick-initialized").slick({
        dots: true,
        arrows: false,
        // autoplay: true,
        autoplaySpeed: 4000,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: $(".thumbs_slider_controls"),
        fade: true,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              variableWidth: true,
              slidesToShow: 3,
              fade: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              variableWidth: true,
              slidesToShow: 3,
              fade: false
            }
          }
        ]
    });
  }
  
if( $(".goods_cards_slider").length > 0 ) {
      $(".goods_cards_slider").not(".slick-initialized").slick({
          dots: false,
          arrows: false,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 5,
          slidesToScroll: 1,
          // variableWidth: true,
          // fade: true,
          responsive: [
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  variableWidth: true
                }
              }
            ]
      });
  }

  if( $(".slider_2").length > 0 ) {
    $(".slider_2").not(".slick-initialized").slick({
        dots: true,
        arrows: true,
        // autoplay: true,
        autoplaySpeed: 4000,
        speed: 1200,
        slidesToShow: 2,
        slidesToScroll: 1,
        // variableWidth: true,
        // fade: true,
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                arrows: false
              }
            }
          ]
    });
  }

  if( $(".testimonials_slider").length > 0 ) {
    $(".testimonials_slider").not(".slick-initialized").slick({
        dots: true,
        arrows: true,
        // autoplay: true,
        autoplaySpeed: 4000,
        speed: 1200,
        slidesToShow: 3,
        slidesToScroll: 1,
        // variableWidth: true,
        // fade: true,
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false
              }
            },
            {
              breakpoint: 540,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
    });
  }

    if( $(".news_slider").length > 0 ) {
      $(".news_slider").not(".slick-initialized").slick({
          dots: true,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          // fade: true,
          responsive: [
              {
                breakpoint: 900,
                settings: {
                  dots: false,
                  arrows: false
                }
              },
              // {
              //   breakpoint: 540,
              //   settings: {
              //     slidesToShow: 1,
              //     slidesToScroll: 1
              //   }
              // }
            ]
      });
    }

    if( $(".slider_3").length > 0 ) {
      $(".slider_3").not(".slick-initialized").slick({
          dots: true,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                arrows: false
              }
            }
          ]
      });
    }

    // --------

    if($("#map").length > 0) {
      ymaps.ready(function () {        
          var myMap = new ymaps.Map('map', {
              center: [55.755814, 37.617635],
              zoom: 14
          }, {
              searchControlProvider: 'yandex#search'
          });
          myPlacemark1 = new ymaps.Placemark([55.755814, 37.617635], {
              hintContent: ''
          }, {
              // iconLayout: 'default#imageWithContent',
              // iconImageHref: 'img/yellow_marker.png',
              // iconImageSize: [39, 35],
              // iconImageOffset: [19, -17]
          });
          myMap.geoObjects.add(myPlacemark1);        
      });
    }

    // ---------

    if( $(".slider_4").length > 0 ) {
      $(".slider_4").not(".slick-initialized").slick({
          dots: true,
          arrows: false,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true
      });
    }

    $(".good_thumb_2 .pill_1").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".good_thumb_2");
      parent.addClass("active");
    });

  // ------------

  $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
          $(".resp_bg").fadeIn(300);
          getBodyParams();
          $("#resp_nav").removeClass("left");
      } else {
          $("#resp_nav").fadeOut(300);
          $("#resp_nav").removeClass("left");
          $(".resp_bg").fadeOut(300);
          $(".submenu_box").removeClass("right");
          $(this).removeClass("active");
          resetBodyParams();
      }
  });

  $(".resp_bg").on("click", function(e) {
    e.preventDefault();
    $("#resp_nav").fadeOut(300);
    $(this).fadeOut(300);
    $(".respmenubtn").removeClass("active");
    $(".submenu_box").removeClass("right");
    resetBodyParams();
  });
  
  $(this).keydown(function(eventObject){
      if (eventObject.which == 27 &&
          $("#resp_nav").is(":visible") &&
          bodyWidth <= 900) {
              $("#resp_nav").fadeOut(300);
              $(".respmenubtn").removeClass("active");
              $(".resp_bg").fadeOut(300);
              $(".submenu_box").removeClass("right");
              resetBodyParams();
      }
  });

  // -------------

  $("[data-submenu-link]").on("click", function(e) {
    e.preventDefault();
    index = $(this).attr("data-submenu-link");
    $("#resp_nav").addClass("left");
    $(".submenu_box").removeClass("right");
    $("[data-sub-menu = '"+index+"']").addClass("right");
  });

  $(".submenu_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".submenu_box");
    subName = parent.attr("data-sub-menu");
    subParent = $("[data-submenu-link = '"+subName+"']").closest(".submenu_box");
    parent.removeClass("right");
    if(subParent.length > 0) {
      subParent.addClass("right");
    } else {
      $("#resp_nav").removeClass("left");
    }  
  });

  // ------------

  var countDownTime = $("#counter").attr("data-countdowntime");
  var countDownDate = new Date(countDownTime).getTime();

  var x = setInterval(function() {

      var now = new Date().getTime();
      
      var distance = countDownDate - now;
      
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if(hours <= 9) {
        hours = "0"+hours;
      }
      document.getElementById("counter").innerHTML = hours + ":"
      + minutes + ":" + seconds;
      
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("counter").innerHTML = "Истекло";
      }
  }, 1000);

  // -------------

  $(".tagsBtn").on("click", function(e) {
    e.preventDefault();
    tagsName = $(this).attr("data-tagsbtn");
    tags = $("[data-tags = '"+tagsName+"']").find(".tags_list_2");
    defaultHeight = parseInt( $("[data-tags = '"+tagsName+"']").attr("def-height") );
    if( $(this).hasClass("active") ) {
      $("[data-tags = '"+tagsName+"']").animate({
        "height" : defaultHeight + "px"
      }, 300);
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
      $("[data-tags = '"+tagsName+"']").animate({
        "height" : tags.height() + "px"
      }, 300);
      setTimeout(function() {
        $("[data-tags = '"+tagsName+"']").css({
          "height" : "auto"
        });
      }, 500);
    }
  });

});