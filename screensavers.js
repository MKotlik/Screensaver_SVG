/*
    GLOBAL VARIABLES
 */

// Item Globals
var svg = document.getElementById("TV");
var dvdBtn = document.getElementById("DVDBtn");
var circleBtn = document.getElementById("circleBtn");
var stopBtn = document.getElementById("stopBtn");
var dvdFile = "dvd_logo.png";
var requestId;

// SVG Globals
var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
var dvd = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var dvdImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
// NOTE: Do I need an image global?

// Position Globals
// General
var svgH = svg.getAttribute("height"); //check that this works for svg element
var svgW = svg.getAttribute("width");
console.log("svg Size: " + svgW + " by " + svgH);
var centerX = svgW / 2;
var centerY = svgH / 2;
console.log("svg center: (" + centerX + "," + centerY + ")");
// Circle-related
var radius = svgW / 50;
console.log("Cirle radius: " + radius + "px");
var circleDir = 1;
// DVD-related
var dvdWidth = 150;
var dvdHeight = 68;
var dvdX = Math.round(Math.random() * (svgW - dvdWidth - 1));
var dvdY = Math.round(Math.random() * (svgH - dvdHeight - 1));
// Subtracting 1 from svg dimensions to protect from rounding-up issues.
console.log("DVD starting position: (" + dvdX + "," + dvdY + ")");
var dvdXDir = 1;
var dvdYDir = 1;

// Status Globals
var circleFirst = true;
var dvdFirst = true;
var lastAnimation = ""; // circle or dvd

// Style Globals
var redColor = "#F8333C";
var redTransparent = "rgba(248, 51, 60, 0.125)";
var blueColor = "#2B9EB3";
var blueTransparent = "rgba(43, 158, 179, 0.125)";
var circleColor = redColor;
var dvdColor = redTransparent;
var dvdColorSelector = 1;

/*
    ANIMATION FUNCTIONS
 */

var animateCircle = function(e) {
    console.log("Triggered!");
    window.cancelAnimationFrame(requestId);

    var drawCircle = function(e) {
        if (circleFirst) {
            circle.setAttribute("cx", centerX);
            circle.setAttribute("cy", centerY);
            circleFirst = false;
        }

        circle.setAttribute("r", radius);
        circle.setAttribute("fill", circleColor);

        if (radius >= centerX) {
            circleDir = -1;
            circleColor = blueColor;
        }
        if (radius <= 0) {
            circleDir = 1;
            circleColor = redColor;
        }

        radius += circleDir;

        if (lastAnimation != "circle") {
            clearSVG();
            svg.appendChild(circle);
        }
        lastAnimation = "circle";

        requestId = window.requestAnimationFrame(drawCircle);
    };

    drawCircle();
};

var animateDVD = function(e) {
    console.log("DVD Triggered!");
    window.cancelAnimationFrame(requestId);

    var drawDVD = function(e) {
	if (dvdFirst) {
	    dvdImg.setAttribute("href", dvdFile);
	    dvdImg.setAttribute("xlink:href", dvdFile);
	    dvdImg.setAttribute("height", dvdHeight);
	    dvdImg.setAttribute("width", dvdWidth);
	    dvdFirst = false;
	}
        if (dvdColorSelector == 1) {
            dvdColor = redTransparent;
        } else {
            dvdColor = blueTransparent;
        }

        dvd.setAttribute("x", dvdX);
        dvd.setAttribute("y", dvdY);
        dvd.setAttribute("width", dvdWidth);
        dvd.setAttribute("height", dvdHeight);
        dvd.setAttribute("fill", dvdColor);

	dvdImg.setAttribute("x", dvdX);
	dvdImg.setAttribute("y", dvdY);

        if (dvdX + dvdWidth >= svgW) {
            dvdXDir = -1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdX <= 0) {
            dvdXDir = 1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdY + dvdHeight >= svgH) {
            dvdYDir = -1;
            dvdColorSelector = dvdColorSelector * -1;
        }
        if (dvdY <= 0) {
            dvdYDir = 1;
            dvdColorSelector = dvdColorSelector * -1;
        }

        dvdX += 1 * dvdXDir;
        dvdY += 1 * dvdYDir;

        if (lastAnimation != "dvd") {
            clearSVG();
	    svg.appendChild(dvdImg);
            svg.appendChild(dvd);
        }
        lastAnimation = "dvd";

        requestId = window.requestAnimationFrame(drawDVD);
    };

    drawDVD();
};

/*
    CONTROL FUNCTIONS
 */

var clearSVG = function(e) {
    while (svg.hasChildNodes()) {
        svg.removeChild(svg.lastChild);
    }
    // NOTE: Reset first vars?
};

var stopAnimation = function(e) {
    window.cancelAnimationFrame(requestId);
};

/*
    BUTTON EVENT LISTENERS
 */

circleBtn.addEventListener("click", animateCircle);
dvdBtn.addEventListener("click", animateDVD);
stopBtn.addEventListener("click", stopAnimation);
