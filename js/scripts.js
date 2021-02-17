function getTotalSum() {
  tp = 0;
  $("[data-price]").each(function() {    
    count = parseInt( $(this).val() );
    priceVal = $(this).attr("data-price");
    num = count * priceVal;
    tp += num;
  });
  console.log(tp);
  $(".tp").text(tp);
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {



});

$(window).resize(function() {



});

$(document).scroll(function() {



});

$(document).ready(function() {

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
    $( this ).toggleClass( "active" );
    if($(this).hasClass("active")) {
      $(".catalog_menu").stop().slideDown(300);
    } else {
      $(".catalog_menu").stop().slideUp(300);
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".catalog_btn").removeClass("active");
      $(".catalog_menu").stop().slideUp(300);
    }
  });

  // $(document).on("mouseup", function(e) {
  //     e.preventDefault();
  //     hide_element = $(".catalog_menu");
  //     if (!hide_element.is(e.target)
  //         && hide_element.has(e.target).length === 0) {
  //       $(".catalog_btn").removeClass("active");
  //       hide_element.stop().slideUp(300);
  //     }
  // });

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
    parent = $(this).closest(".search_wrapp");
    parent.addClass("active");
    $(".search_result").slideDown(300);
  });

  $("#resetBtn").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".search_wrapp");
    parent.removeClass("active");
    parent.find(".search_input").val("");
    $(".search_result").slideUp(300);
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".search_wrapp").removeClass("active");
      $(".search_result").stop().slideUp(300);
    }
  });

  // $(document).on("mouseup", function(e) {
  //     e.preventDefault();
  //     hide_element = $(".search_result");
  //     if (!hide_element.is(e.target)
  //         && hide_element.has(e.target).length === 0) {
  //       hide_element.stop().slideUp(300);
  //       $(".search_wrapp").removeClass("active");
  //     }
  // });

  // -------------

  $(".count_box button").click(function(e) {
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

  $(".basket_link").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".basket_link_wrapp");
    dropdown = parent.find(".basket_dropdown");
    $(this).toggleClass("active");
    if( $(this).hasClass("active") ) {
      dropdown.slideDown(300);
    } else {
      dropdown.slideUp(300);
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".basket_dropdown").slideUp(300);
      $(".basket_link").removeClass("active");
    }
  });

  // $(document).on("mouseup", function(e) {
  //   e.preventDefault();
  //   hide_element = $(".basket_dropdown");
  //   if (!hide_element.is(e.target)
  //       && hide_element.has(e.target).length === 0) {
  //     hide_element.slideUp(300);
  //     $(".basket_link").removeClass("active");
  //   }
  // });

  $(".basket_item .del_btn").on("click", function(e) {
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
          fade: true
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
        appendDots: $(".thumbs_slider_controls")
        // fade: true
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
          // responsive: [
          //     {
          //       breakpoint: 900,
          //       settings: {
          //         slidesToShow: 2,
          //         slidesToScroll: 2
          //       }
          //     },
          //     {
          //       breakpoint: 540,
          //       settings: {
          //         slidesToShow: 1,
          //         slidesToScroll: 1
          //       }
          //     }
          //   ]
      });
  }

  if( $(".goods_cards_slider_2").length > 0 ) {
      $(".goods_cards_slider_2").not(".slick-initialized").slick({
          dots: false,
          arrows: false,
          // autoplay: true,
          autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 5,
          slidesToScroll: 1,
          // variableWidth: true,
          // fade: true,
          // responsive: [
          //     {
          //       breakpoint: 900,
          //       settings: {
          //         slidesToShow: 2,
          //         slidesToScroll: 2
          //       }
          //     },
          //     {
          //       breakpoint: 540,
          //       settings: {
          //         slidesToShow: 1,
          //         slidesToScroll: 1
          //       }
          //     }
          //   ]
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
        // responsive: [
        //     {
        //       breakpoint: 900,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2
        //       }
        //     },
        //     {
        //       breakpoint: 540,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
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
        // responsive: [
        //     {
        //       breakpoint: 900,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2
        //       }
        //     },
        //     {
        //       breakpoint: 540,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
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
          // variableWidth: true,
          // fade: true,
          // responsive: [
          //     {
          //       breakpoint: 900,
          //       settings: {
          //         slidesToShow: 2,
          //         slidesToScroll: 2
          //       }
          //     },
          //     {
          //       breakpoint: 540,
          //       settings: {
          //         slidesToShow: 1,
          //         slidesToScroll: 1
          //       }
          //     }
          //   ]
      });
    }

  // if( $(".portfolio_slider").length > 0 ) {
  //     $(".portfolio_slider").not(".slick-initialized").slick({
  //         dots: true,
  //         arrows: true,
  //         autoplay: true,
  //         autoplaySpeed: 4000,
  //         speed: 1200,
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         // fade: true,
  //         responsive: [
  //             {
  //               breakpoint: 900,
  //               settings: {
  //                 slidesToShow: 2,
  //                 slidesToScroll: 2
  //               }
  //             },
  //             {
  //               breakpoint: 540,
  //               settings: {
  //                 slidesToShow: 1,
  //                 slidesToScroll: 1
  //               }
  //             }
  //           ]
  //     });
  // }

});