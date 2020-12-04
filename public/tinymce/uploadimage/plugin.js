(function () {
    'use strict';
    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
    function selectLocalImages(editor) {		
		var uploadurl = editor.getParam('images_upload_url', '', 'string');
        var dom = editor.dom;

        var input_f = $('<input type="file" name="Filedata[]" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">');
        input_f.on('change', function () {
            var form = $("<form/>",
                {
                    action: uploadurl, //设置上传图片的路由，配置在初始化时
                    style: 'display:none',
                    method: 'post',
                    enctype: 'multipart/form-data'
                }
            );
            form.append(input_f);
            //ajax提交表单
            form.ajaxSubmit({
                beforeSubmit: function () {
                    return true;
                },
                success: function (data) {
					editor.focus();
					var json = JSON.parse(data);
					json.forEach(function (row) {
						editor.selection.setContent(dom.createHTML('img', {src: row.path}));
					})	
                }
            });
        });

        input_f.click();
    }

    var register$1 = function (editor) {
      editor.ui.registry.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片',
        onAction: function () {
          selectLocalImages(editor)
        }
      });
      editor.ui.registry.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片',
        onAction: function () {
          selectLocalImages(editor)
        }
      });
    };
    var Buttons = { register: register$1 };
    function Plugin () {
      global.add('uploadimage', function (editor) {        
        Buttons.register(editor);
      });
    }
    Plugin();
}());
