$(function() {
    // 画像用のinputを生成する関数
    const buildFileField = (num)=> {
      const html = `<div data-index="${num}" class="js-file_group">
                      <input class="js-file" type="file"
                      name="item[images_attributes][${num}][picture]"
                      id="item_images_attributes_${num}_picture"><br>
                      <div class="js-remove">消去</div>
                    </div>`;
      return html;
    }
    // プレビュー用のimgタグを生成する関数
    const buildImg = (index, url)=> {
      const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
      return html;
    }
  
    // file_fieldのnameに動的なindexをつける為の配列
    let fileIndex = [1,2,3,4,5,6,7,8,9,10];
    // 既に使われているindexを除外
    lastIndex = $('.js-file_group:last').data('index');
    fileIndex.splice(0, lastIndex);
  
    $('.hidden-destroy').hide();
  
    $('.image-box__container').on('change', '.js-file', function(e) {
      const targetIndex = $(this).parent().data('index');
      // ファイルのブラウザ上でのURLを取得する
      const file = e.target.files[0];
      const blobUrl = window.URL.createObjectURL(file);
  
      // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
      if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
        img.setAttribute('src', blobUrl);
      } else {  // 新規画像追加の処理
        $('#previews').append(buildImg(targetIndex, blobUrl));
        // fileIndexの先頭の数字を使ってinputを作る
        $('.js').append(buildFileField(fileIndex[0]));
        fileIndex.shift();
        // 末尾の数に1足した数を追加する
        fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      }
    });
  
    $('#image-box').on('click', '.js-remove', function() {
      const targetIndex = $(this).parent().data('index');
      // 該当indexを振られているチェックボックスを取得する
      const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
      // もしチェックボックスが存在すればチェックを入れる
      if (hiddenCheck) hiddenCheck.prop('checked', true);
  
      $(this).parent().remove();
      $(`img[data-index="${targetIndex}"]`).remove();
  
      // 画像入力欄が0個にならないようにしておく
      if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
    });
  });
  
  $(function(){
    $('.subimage li').hover(function(){
        //ホバーしたliのインデックスを取得
        var index = $('.subimage li').index(this);
        //ホバーした画像URLを取得
        var imageurl = $('.subimage li').eq(index).find('img').attr('src');
        //ulのクラス名を取得（空白で分割）
        className = $(this).parent().attr('class').split(" ");
        //元のメイン画像を保存しておく
        defaultImage = $('img.mainimage.'+className[1]).attr('src');
        $('img.mainimage.'+className[1]).attr('src',imageurl);
    },function(){
        $('img.mainimage.'+className[1]).attr('src',defaultImage);
    });
  });
  