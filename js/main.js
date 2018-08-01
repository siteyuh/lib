$(function(){
  
  $('textarea').click(function(){
    $(this).select();
  });
  
  var req = $.ajax({
    type: 'GET',
    url: 'json.php',
    dataType: 'json',
    cache: false,
  });
  
  req.done(function(data){
    console.log('done');
    
    // entyは配列になっているから$.eachで分解
    var dataArray = data.entry;
    $.each(dataArray, function(i){
      // entry.linkも配列になっているから$.eachで分解
      var objArray = dataArray[i].link;
      $.each(objArray, function(j){
//        console.log(objArray[j].href);
        $('#sample ul').append('<li><a href="' + objArray[j].href + '" target="_blank">' + dataArray[i].title + '</a></li>');
      });
    });
  });
  
  req.fail(function(data){
    alert('fail');
  });
  
  req.always(function(data){
    console.log('always');
  });
    
  /*
    Humberger menu
  */
  $('.mobmenu').click(function(){
    $(this).next().fadeToggle();
  });
  $('.closebtn').click(function(){
    $(this).parent().fadeToggle();
  });
  
  /*
    disappear when Scroll
  */
  $(window).scroll(function(){});
  
  /*
    1p Scroll
  */
  var $section = $('.page'); // 各スライド
  var $pager = $('#pager'); // ページャー枠
  
  var option = {
    section: '.page',
    scrollSpeed: 1000,
    scrollbars: false,
    before:function(index, section) {
      setCurrent(index); // 現在のsectionにクラスを設定
      pagerCurrent(index); // ページャーに対応する順番にクラス名を付与
    },
    afterRender:function() {
      createPager(); // ページャーの作成
      setCurrent(); // 現在のsectionにクラスを設定
    }
  }
  $.scrollify(option);
  
  // 現在のsectionにクラスを設定
  function setCurrent(index = 0) {
    // 一旦、すべてのsectionのクラスをとる
    $section.removeClass('is-show');
    // 現在のsectionのみにクラスを付与
    $section.eq(index).addClass('is-show');
  }
  
  // ページャーに対応する順番にクラス名を付与
  function pagerCurrent(index = 0) {
    var $li = $pager.find('li');
    $li.removeClass('is-current');
    $li.eq(index).addClass('is-current');
  }
  
  // ページャーの作成
  function createPager() {
    $section.each(function(i, e){
      // ページ内リンク先の作成
      var sectionName = $(e).attr('data-section-name');
      // 最初のliにはクラスを付与
      var addClass = '';
      if (i === 0) {
        addClass = 'is-current';
      }
      // liのHTML作成
      var html = '';
      html += '<li class="' + addClass + '">';
      html += '<a href="#' + sectionName + '"></a>';
      html += '</li>';
      $pager.append(html);
    });

    pagerLink();
  }

  // ページャーでaタグをクリックされたらスクロールする
  function pagerLink () {
    $pager.find('a').on('click', function() {
      $.scrollify.move($(this).attr("href"));
    });
  }


});