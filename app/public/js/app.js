var nbErrors = 0;

function updateDOM(data, index, elementId) {
    var rawTime = data[index].temps.split(' ');
    var time = rawTime[0];
    var next = document.getElementById(elementId);
    next.innerText = time;
}

function call(success) {
    $.ajax({
        url: '/horaires',
        method: 'GET',
        success: function(data) {
            updateDOM(data, 0, 'next');
            updateDOM(data, 1, 'next2');
            data[2] != undefined && updateDOM(data, 2, 'next3');
            success();
        },
        error: function(err) {
            // Arrête l'interval au bout de 10 erreurs
            nbErrors++;
            if (nbErrors >= 10) {
                clearInterval(interval);
                document.getElementById('error').style.display = "block";
            }
            success();
        }
    });
}
call(function() {});

var interval = setInterval(function() {
    document.getElementById('refresh').style.visibility = "visible";
    call(function() {
        document.getElementById('refresh').style.visibility = "hidden";
    });
}, 10000);
