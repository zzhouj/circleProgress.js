(function (window) {
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            function (cb) {
                return window.setTimeout(cb, 1000 / 60);
            };
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ||
            window.clearTimeout;
    })();

    var circleProgress = function (options) {
        if (options.progress !== 0) {
            options.progress = options.progress || 100;
        }
        if (options.duration !== 0) {
            options.duration = options.duration || 1000;
        }
        options.fps = 60;    // requestAnimationFrame / cancelAnimationFrame
        options.color = options.color || 'rgb(52, 145, 204)';
        options.bgColor = options.bgColor || 'rgb(230, 230, 230)';
        options.textColor = options.textColor || 'black';
        options.progressWidth = options.progressWidth || 0.25; //r
        options.fontScale = options.fontScale || 0.4; //r

        options.toFixed = options.toFixed || 0;
        var svg = document.getElementById(options.id);
        if (svg == null) {
            return;
        }
        svg.textContent = '';

        options.width = parseInt(svg.getAttribute('width'));
        options.height = parseInt(svg.getAttribute('height'));

        options.x = options.width / 2;
        options.y = options.height / 2;
        options.r1 = Math.floor(Math.min(options.width, options.height) / 2);
        options.r2 = Math.floor(options.r1 * (1 - options.progressWidth));
        options.r = Math.floor((options.r1 + options.r2) / 2);
        options.strokeWidth = options.r1 - options.r2;
        options.fontSize = Math.floor(options.r1 * options.fontScale);

        options.fullBgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        options.fullBgCircle.setAttribute('cx', options.x);
        options.fullBgCircle.setAttribute('cy', options.y);
        options.fullBgCircle.setAttribute('r', options.r);
        options.fullBgCircle.setAttribute('stroke-width', options.strokeWidth);
        options.fullBgCircle.setAttribute('stroke', options.bgColor);
        options.fullBgCircle.setAttribute('fill', 'none');
        svg.appendChild(options.fullBgCircle);

        options.fullProgressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        options.fullProgressCircle.setAttribute('cx', options.x);
        options.fullProgressCircle.setAttribute('cy', options.y);
        options.fullProgressCircle.setAttribute('r', options.r);
        options.fullProgressCircle.setAttribute('stroke-width', options.strokeWidth);
        options.fullProgressCircle.setAttribute('stroke', options.color);
        options.fullProgressCircle.setAttribute('fill', 'none');
        svg.appendChild(options.fullProgressCircle);

        options.bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        options.bgCircle.setAttribute('d', 'M0, 0');
        options.bgCircle.setAttribute('stroke-width', options.strokeWidth);
        options.bgCircle.setAttribute('stroke', options.bgColor);
        options.bgCircle.setAttribute('fill', 'none');
        svg.appendChild(options.bgCircle);

        options.progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        options.progressCircle.setAttribute('d', 'M0, 0');
        options.progressCircle.setAttribute('stroke-width', options.strokeWidth);
        options.progressCircle.setAttribute('stroke', options.color);
        options.progressCircle.setAttribute('fill', 'none');
        svg.appendChild(options.progressCircle);

        options.progressText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        options.progressText.setAttribute('x', options.x);
        options.progressText.setAttribute('y', options.y + options.fontSize / 3);
        options.progressText.setAttribute('text-anchor', 'middle');
        options.progressText.setAttribute('font-size', options.fontSize);
        options.progressText.setAttribute('stroke', 'none');
        options.progressText.setAttribute('fill', options.textColor);
        svg.appendChild(options.progressText);

        var step = function () {
            if (options.current < options.progress && options.duration > 0) {
                drawCircleProgress(options);
                options.current += options.progress * (1000 / options.fps) / options.duration;
                svg.setAttribute('data-requestID', requestAnimationFrame(step));
            } else {
                options.current = options.progress;
                drawCircleProgress(options);
                svg.removeAttribute('data-requestID');
            }
        };

        cancelAnimationFrame(svg.getAttribute('data-requestID'));
        options.current = 0;
        step();
    };

    var drawCircleProgress = function (options) {
        var current = options.current;
        var x = options.x;
        var y = options.y;
        var r = options.r;

        var startAngle = -Math.PI / 2;
        var endAngle = startAngle + Math.PI * 2 * current / 100;

        options.fullBgCircle.style.cssText = (current === 0) ? '' : 'display:none';
        options.fullProgressCircle.style.cssText = (current === 100) ? '' : 'display:none';

        var x1 = x + r * Math.cos(startAngle);
        var y1 = y + r * Math.sin(startAngle);
        var x2 = x + r * Math.cos(endAngle);
        var y2 = y + r * Math.sin(endAngle);

        var largeArc = (endAngle - startAngle) < Math.PI ? 0 : 1;
        var sweep = 1;

        options.bgCircle.setAttribute('d', 'M' + x1 + ' ' + y1 +
            ' A' + r + ' ' + r + ' 0 ' + (1 - largeArc) + ' ' + (1 - sweep) + ' ' + x2 + ' ' + y2);

        options.progressCircle.setAttribute('d', 'M' + x1 + ' ' + y1 +
            ' A' + r + ' ' + r + ' 0 ' + largeArc + ' ' + sweep + ' ' + x2 + ' ' + y2);

        options.progressText.textContent = '' + current.toFixed(options.toFixed) + '%';
    };

    window.circleProgress = circleProgress;

})(this);