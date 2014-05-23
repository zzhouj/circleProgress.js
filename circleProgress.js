(function (window) {
    var circleProgress = function (options) {
        if (options.progress !== 0) {
            options.progress = options.progress || 100;
        }
        if (options.duration !== 0) {
            options.duration = options.duration || 1000;
        }
        options.fps = options.fps || 24;
        options.color = options.color || 'rgb(52, 145, 204)';
        options.bgColor = options.bgColor || 'rgb(230, 230, 230)';
        options.textColor = options.textColor || 'black';
        options.progressWith = options.progressWith || 0.25; //r
        options.fontScale = options.fontScale || 0.4; //r

        options.toFixed = options.toFixed || 0;
        var canvas = document.getElementById(options.id);
        if (canvas == null) {
            return;
        }
        options.width = canvas.width;
        options.height = canvas.height;
        options.context = canvas.getContext('2d');

        var drawNext = function () {
            if (options.current < options.progress && options.duration > 0) {
                drawCircleProgress(options);
                options.current += options.progress * (1000 / options.fps) / options.duration;
                canvas.setAttribute('data-timeid', setTimeout(drawNext, (1000 / options.fps)));
            } else {
                options.current = options.progress;
                drawCircleProgress(options);
                canvas.removeAttribute('data-timeid');
            }
        };

        clearTimeout(canvas.getAttribute('data-timeid'));
        options.current = 0;
        drawNext();
    };

    var drawCircleProgress = function (options) {
        var context = options.context;
        var width = options.width;
        var height = options.height;
        var current = options.current;
        var color = options.color;
        var bgColor = options.bgColor;
        var textColor = options.textColor;
        var progressWith = options.progressWith;
        var fontScale = options.fontScale;

        var x = width / 2;
        var y = height / 2;
        var r1 = Math.floor(Math.min(width, height) / 2);
        var r2 = Math.floor(r1 * (1 - progressWith));
        var startAngle = -Math.PI / 2;
        var endAngle = startAngle + Math.PI * 2 * current / 100;
        var fontSize = Math.floor(r1 * fontScale);

        context.clearRect(0, 0, width, height);

        context.beginPath();
        if (current > 0) {
            context.arc(x, y, r1, startAngle, endAngle, true);
            context.arc(x, y, r2, endAngle, startAngle, false);
        } else {
            context.arc(x, y, r1, 0, Math.PI * 2, true);
            context.arc(x, y, r2, Math.PI * 2, 0, false);
        }
        context.closePath();
        context.fillStyle = bgColor;
        context.fill();

        context.beginPath();
        context.arc(x, y, r1, startAngle, endAngle, false);
        context.arc(x, y, r2, endAngle, startAngle, true);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.fillStyle = textColor;
        context.font = '' + fontSize + 'px arial';
        var text = '' + current.toFixed(options.toFixed) + '%';
        var textWidth = context.measureText(text).width;
        context.fillText(text, x - textWidth / 2, y + fontSize / 2);
    };

    window.circleProgress = circleProgress;

})(this);