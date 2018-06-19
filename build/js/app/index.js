require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            var data = format(res, 2);
            //console.log(data);
            var tpl = $('#wrap').html();
            var template = handlebars.compile(tpl);
            var html = template(data);
            $('.ul').html(html);
        },
        error: function(error) {
            console.warn(error);
        }
    });
    // targetArr = [
    //     [{}, {}],
    //     [{}, {}],
    //     [{}, {}]
    // ]
    function format(res, num) {
        var targetArr = [];
        var i = 0;
        res.forEach(function(val, index) {
            //console.log(val)
            if (!targetArr[i]) {
                targetArr[i] = [];
            }
            var ind = index + 1;
            targetArr[i].push(val);
            if (ind % num === 0) {
                i++;
            }
        });
        return targetArr;
    }
})