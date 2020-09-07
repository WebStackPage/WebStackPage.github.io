$.getJSON('cn/data.json', function (data) {
  ul_html = '';
  div_html = ''

  sortByKeyAsc(data, 'index').forEach(function (cate) {
    images = ''
    cate['lists'].forEach(function (list) {
      images += '<div class="img-div">' +
        '<img src="http://img.daohangtv.com/image/logos/' + list['img_url'] + '" width="36">' +
        '<span>' + list['name'] + '</span>' +
        '</div>'
    })
    div_html +=
      '<div class="col-sm-12" style="width:' + cate['width'] + '%">' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading">' +
              cate['category'] +
          '</div>' +
          '<div class="panel-body">' +
    images +
          '</div>' +
        '</div>' +
    '</div>'
  })
  $('.main-content').append(div_html);
});

function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}