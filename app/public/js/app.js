// (function() {
// })()


function call(success) {
    $.ajax({
        url: '/horaires',
        method: 'GET',
        success: function(data) {
            var rawTime = data[0].temps.split(' ');
            var time = rawTime[0];
            var next = document.getElementById('next');
            next.innerText = time;
            success();
        }
    });
}
call();

setInterval(function() {
    document.getElementById('refresh').style.visibility = "visible";
    call(function() {
        document.getElementById('refresh').style.visibility = "hidden";
    });
}, 10000)
