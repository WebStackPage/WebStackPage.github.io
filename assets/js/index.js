$.getJSON('data.json', function (data) {
  ul_html = '';
  div_html = ''
  data.forEach(function (cate) {
    ul_html += '<li>' +
      '<a href="#' + cate['category'] + '" class="smooth">' +
      '<i class=""></i>' +
      '<span class="title">' + cate['category'] + '</span>' +
      '</a>' +
      '</li>'
    div_html += '<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="' + cate['category'] + '"></i>' + cate['category'] + '</h4>' +
      '<div class="row">'

    cate['lists'].forEach(function (list) {
      contact_html = ''
      $.each(list['contacts'], function (key, value) {
        contact_html += '<a href="' + value + '" target="_blank">' +
          '<img src="../assets/images/icon/' + key + '.png">' +
          '</a>'
      })
      div_html += '<div class="col-sm-3">' +
        '<div class="xe-widget xe-conversations box2 label-info" data-toggle="tooltip" data-placement="bottom" title="">' +
        '<div class="xe-comment-entry">' +
        '<a class="xe-user-img">' +
        '<img src="../assets/images/logos/' + list['img_url'] + '" width="72">' +
        '</a>' +
        '<div class="xe-comment">' +
        '<a href="#" class="xe-user-name overflowClip_1">' +
        '<strong>' + list['name'] + '</strong>' +
        '</a>' +
        '<div class="contact">' + contact_html +
        '</div>' +
        '<p class="overflowClip_2" title="">' + list['desc'] + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    })
    div_html += '</div>'
  })
  $('#main-menu').prepend(ul_html);
  $('#container').prepend(div_html);
})

window.addEventListener('load', function () {
  var observer = lozad()
  observer.observe()
});

$(document).ready(function () {

  $(document).on('click', '.has-sub', function () {
    var _this = $(this)
    if (!$(this).hasClass('expanded')) {
      setTimeout(function () {
        _this.find('ul').attr("style", "")
      }, 300);

    } else {
      $('.has-sub ul').each(function (id, ele) {
        var _that = $(this)
        if (_this.find('ul')[0] != ele) {
          setTimeout(function () {
            _that.attr("style", "")
          }, 300);
        }
      })
    }
  })
  $('.user-info-menu .hidden-sm').click(function () {
    if ($('.sidebar-menu').hasClass('collapsed')) {
      $('.has-sub.expanded > ul').attr("style", "")
    } else {
      $('.has-sub.expanded > ul').show()
    }
  })
  $("#main-menu li ul li").click(function () {
    $(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
    $(this).addClass('active'); // 添加当前元素的样式
  });
  $("a.smooth").click(function (ev) {
    ev.preventDefault();

    public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
    ps_destroy();
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 30
    }, {
      duration: 500,
      easing: "swing"
    });
  });
  return false;
});

var href = "";
var pos = 0;
$("a.smooth").click(function (e) {
  $("#main-menu li").each(function () {
    $(this).removeClass("active");
  });
  $(this).parent("li").addClass("active");
  e.preventDefault();
  href = $(this).attr("href");
  pos = $(href).position().top - 30;
});