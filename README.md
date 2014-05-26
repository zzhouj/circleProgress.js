circleProgress.js
=================

Animation circle progress using html5 canvas.

Features
========

+ Small size with only **1.48 kB** when minified.
+ Pure javascript and no other dependencies.
+ Animation progress increase.
+ Many custom options supported.

Snapshots
=========

[snapshot]: https://github.com/zzhouj/circleProgress.js/raw/master/snapshot.png "snapshot"

![snapshot][snapshot]

Usage
=====

1. Import js or minified js:

        <script type="text/javascript" src="circleProgress.min.js"></script>

2. Add canvas elements:

        <canvas id="circle-progress-custom" width="200" height="200"></canvas>

3. Render canvas with custom options:

        circleProgress({
            id: 'circle-progress-custom',
            progress: 70, // default: 100
            duration: 2000, // default: 1000
            color: 'red', // default: 'rgb(52, 145, 204)'
            bgColor: 'green', // default: 'rgb(230, 230, 230)'
            textColor: 'blue', // default: 'black'
            progressWith: 0.15, // default: 0.25 (r)
            fontScale: 0.5, // default: 0.4 (r)
            toFixed: 1  // default: 0
        });

License
=======

	The MIT License (MIT)
	
	Copyright (c) 2014 justin
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
