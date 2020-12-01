$.getJSON('cn/data.json', function (data) {
  ul_html = '';
  div_html = '<div class="col-sm-3">'
    size = 0

  sortByKeyAsc(data, 'index').forEach(function (cate) {
    images = ''
    cate['lists'].forEach(function (list) {
      images += '<div class="img-div">' +
        '<img src="/assets/images/logos/' + list['img_url'] + '" width="36">' +
        '<span>' + list['name'] + '</span>' +
        '</div>'
    })
    div_html +=
        '<div class="">' +
          '<div class="panel-heading">' +
              cate['category'] +
          '</div>' +
          '<div class="panel-body">' +
            images +
          '</div>' +
          '</div>'

    size = size + cate['lists'].length;
    console.log(size)
    if(size >= 8){
      // console.log(size)
      div_html += '</div><div class="col-sm-3">'
      size = 0
    }
  })
  div_html = div_html + '</div>'
  $('#project_contain').append(div_html);
});

function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}