"use strict";
/*
    This file defines the basic elements of the KB name space
    
*/

var KB = KB || {}; // define namespace

KB.PRIME_PUSH = 0;
KB.SHIFT_PUSH = 1;
KB.ALTGR_PUSH = 2;
KB.SHIFT_ALTGR_PUSH = 3;
KB.PUSH_TYPES = {};
KB.PUSH_TYPES[KB.PRIME_PUSH] = "primary"; 
KB.PUSH_TYPES[KB.SHIFT_PUSH] = "shift"; 
KB.PUSH_TYPES[KB.ALTGR_PUSH] = "altGr";
KB.PUSH_TYPES[KB.SHIFT_ALTGR_PUSH] = "shiftAltGr";

KB.finger = {};
KB.finger.color = {};

KB.finger.NONE =        -1;
KB.finger.LEFT_PINKY =   1;
KB.finger.LEFT_RING =    2;
KB.finger.LEFT_MIDDLE =  3;
KB.finger.LEFT_INDEX =   4;
KB.finger.LEFT_THUMB =   5;
KB.finger.RIGHT_THUMB =  6;
KB.finger.RIGHT_INDEX =  7;
KB.finger.RIGHT_MIDDLE = 8;
KB.finger.RIGHT_RING =   9;
KB.finger.RIGHT_PINKY =  10;
KB.finger.BOTH_THUMBS =  11;

KB.fingers = {};
KB.fingers[KB.finger.LEFT_PINKY] =   "Left Pinky";
KB.fingers[KB.finger.LEFT_RING] =    "Left Ring";
KB.fingers[KB.finger.LEFT_MIDDLE] =  "Left Middle";
KB.fingers[KB.finger.LEFT_INDEX] =   "Left Index";
KB.fingers[KB.finger.LEFT_THUMB] =   "Left Thumb";
KB.fingers[KB.finger.RIGHT_THUMB] =  "Right Thumb";
KB.fingers[KB.finger.RIGHT_INDEX] =  "Right Index";
KB.fingers[KB.finger.RIGHT_MIDDLE] = "Right Middle";
KB.fingers[KB.finger.RIGHT_RING] =   "Right Ring";
KB.fingers[KB.finger.RIGHT_PINKY] =  "Right Pinky";

KB.finger.color[KB.finger.NONE] =           {r:255, g:255, b:255, a: 0.4};
KB.finger.color[KB.finger.LEFT_PINKY] =     {r:  0, g:255, b:255, a: 0.4};//"rgba(  0, 255, 255, 0.5)";//"#00FFFF";
KB.finger.color[KB.finger.LEFT_RING] =      {r:  0, g:  0, b:230, a: 0.4};//"rgba(  0,   0, 255, 0.5)";//"#0000FF";
KB.finger.color[KB.finger.LEFT_MIDDLE] =    {r:136, g:136, b:255, a: 0.4};//"rgba(136, 136, 255, 0.5)";//"#8888FF";78, 56, 126
KB.finger.color[KB.finger.LEFT_INDEX] =     {r:255, g:  0, b:255, a: 0.4};//"rgba(255,   0, 255, 0.5)";//"#FF00FF";
KB.finger.color[KB.finger.LEFT_THUMB] =     {r:255, g:255, b:255, a: 0.4};//"rgba(255, 255, 255, 0.5)";//"#ffffff";
KB.finger.color[KB.finger.RIGHT_THUMB] =    {r:204, g:204, b:204, a: 0.4};//"rgba(204, 204, 204, 0.5)";//"#cccccc";
KB.finger.color[KB.finger.RIGHT_INDEX] =    {r:255, g:  0, b:  0, a: 0.4};//"rgba(255,   0,   0, 0.5)";//"#FF0000";
KB.finger.color[KB.finger.RIGHT_MIDDLE] =   {r:255, g:136, b:  0, a: 0.4};//"rgba(255, 136,   0, 0.5)";//"#FF8800";
KB.finger.color[KB.finger.RIGHT_RING] =     {r:255, g:255, b:  0, a: 0.4};//"rgba(255, 255,   0, 0.5)";//"#FFFF00";
KB.finger.color[KB.finger.RIGHT_PINKY] =    {r:  0, g:255, b:  0, a: 0.4};//"rgba(  0, 255,   0, 0.5)";//"#00FF00";
KB.finger.color[KB.finger.BOTH_THUMBS] =    {r:255, g:255, b:255, a: 0.4};//"rgba(255, 255, 255, 0.5)";//"#ffffff";

KB.finger.colorHoverOpacity = {};
KB.finger.colorHoverOpacity[KB.finger.NONE] =           1;
KB.finger.colorHoverOpacity[KB.finger.LEFT_PINKY] =     1;
KB.finger.colorHoverOpacity[KB.finger.LEFT_RING] =      0.15;
KB.finger.colorHoverOpacity[KB.finger.LEFT_MIDDLE] =    0.5;
KB.finger.colorHoverOpacity[KB.finger.LEFT_INDEX] =     0.35;
KB.finger.colorHoverOpacity[KB.finger.LEFT_THUMB] =     1;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_THUMB] =    1;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_INDEX] =    0.25;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_MIDDLE] =   0.5;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_RING] =     0.5;
KB.finger.colorHoverOpacity[KB.finger.RIGHT_PINKY] =    0.5;
KB.finger.colorHoverOpacity[KB.finger.BOTH_THUMBS] =    1;

KB.finger.getColor = function(finger, opacity) {
    var r = KB.finger.color[finger].r,
        g = KB.finger.color[finger].g,
        b = KB.finger.color[finger].b;
    return "rgba("+r+","+g+", "+b+", "+opacity+")";
};

KB.finger.getColorHoverOpacity = function(finger) {
    return KB.finger.colorHoverOpacity[finger];
};
KB.finger.getColorNormalOpacity = function(finger) {
    return KB.finger.color[finger].a;
};

KB.finger.isThumb = function(finger) {
    switch(finger) {
        case KB.finger.RIGHT_THUMB:
        case KB.finger.LEFT_THUMB:
            return true;
    }
    return false;
};

KB.finger.whichHand = function(finger) {
    switch(finger) {
        case KB.finger.LEFT_PINKY:
        case KB.finger.LEFT_RING:
        case KB.finger.LEFT_MIDDLE:
        case KB.finger.LEFT_INDEX:
        case KB.finger.LEFT_THUMB:
            return "left";
        case KB.finger.RIGHT_PINKY:
        case KB.finger.RIGHT_RING:
        case KB.finger.RIGHT_MIDDLE:
        case KB.finger.RIGHT_INDEX:
        case KB.finger.RIGHT_THUMB:
            return "right";            
        case KB.finger.NONE:
            return "none";
        case KB.finger.BOTH_THUMBS:
            return "both";
    }
    return "none";
};

KB.finger.leftRightOrThumb = function(finger) {
    switch(finger) {
        case KB.finger.LEFT_PINKY:
        case KB.finger.LEFT_RING:
        case KB.finger.LEFT_MIDDLE:
        case KB.finger.LEFT_INDEX:
            return "left";
        case KB.finger.RIGHT_PINKY:
        case KB.finger.RIGHT_RING:
        case KB.finger.RIGHT_MIDDLE:
        case KB.finger.RIGHT_INDEX:
            return "right";
        case KB.finger.LEFT_THUMB:
        case KB.finger.RIGHT_THUMB:
        return "thumbs";
        case KB.finger.NONE:
            return "none";
        case KB.finger.BOTH_THUMBS:
            return "both";
    }
    return "none";
};

KB.finger.sameGroup = function(finger1, finger2) {
    if (finger1 === KB.finger.NONE || finger2 === KB.finger.NONE)
        return false;
    if (KB.finger.whichHand(finger1) !== KB.finger.whichHand(finger2))
        return false;
    if (KB.finger.isThumb(finger1) !== KB.finger.isThumb(finger2))
        return false;
    return true;
};

KB.glyphLayouts = {};
KB.glyphLayouts.standard = {};
KB.glyphLayouts.standard.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.standard[type](keyCode, fontSize, coords);
};
 
KB.glyphLayouts.standard[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
        
    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.standard[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.standard[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.standard[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};

KB.glyphLayouts.european = {};
KB.glyphLayouts.european.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.european[type](keyCode, fontSize, coords);
};
 
KB.glyphLayouts.european[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
        
    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.european[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.european[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.european[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};

KB.glyphLayouts.european_ss = KB.glyphLayouts.european;

KB.glyphLayouts.matrix = {};
KB.glyphLayouts.matrix.getCoords = function(id, type, keyCode, fontSize, coords) {
    return KB.glyphLayouts.matrix[type](keyCode, fontSize, coords);
};

KB.glyphLayouts.matrix[KB.PRIME_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;

    return {
        x: coords[3].x + padding,
        y:coords[3].y - padding/2,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.matrix[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[0].x + padding,
        y:coords[0].y + padding/2,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.matrix[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[2].x - padding,
        y:coords[2].y - padding/2,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.matrix[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords) {
    var width = coords[1].x - coords[0].x,
        padding = fontSize*0.4;//width * 0.1;
    return {
        x: coords[1].x - padding,
        y:coords[1].y + padding/2,
        textAlign: "right",
        textBaseline: "top"
    };
};

KB.glyphLayouts.ergodox = {};
KB.glyphLayouts.ergodox.getCoords = function(id, type, keyCode, fontSize, coords) {
    var angle;
    if (id >= 64 && id <= 69)  // left thumb keys
        angle = 0.45;
    else if (id >= 70 && id <= 75)  // right thumb keys
        angle = -0.45;
    else
        angle = 0.0;
    return KB.glyphLayouts.ergodox[type](keyCode, fontSize, coords, angle);
};
 
KB.glyphLayouts.ergodox[KB.PRIME_PUSH] = function(keyCode,fontSize,coords, angle) {
    var width = coords[1].x - coords[0].x,
        padding = {x: fontSize*0.4, y: -fontSize*0.2};//width * 0.1;
    rotatePoint(angle, {x: 0, y: 0}, padding);
        
    return {
        x: coords[3].x + padding.x,
        y:coords[3].y + padding.y,
        textAlign: "left",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.ergodox[KB.SHIFT_PUSH] = function(keyCode,fontSize,coords, angle) {
    var width = coords[1].x - coords[0].x,
        padding = {x: fontSize*0.4, y: fontSize*0.2};//width * 0.1;
    rotatePoint(angle, {x: 0, y: 0}, padding);
    return {
        x: coords[0].x + padding.x,
        y:coords[0].y + padding.y,
        textAlign: "left",
        textBaseline: "top"
    };
};
KB.glyphLayouts.ergodox[KB.ALTGR_PUSH] = function(keyCode,fontSize,coords, angle) {
    var width = coords[1].x - coords[0].x,
        padding = {x: -fontSize*0.4, y: -fontSize*0.2};//width * 0.1;
    rotatePoint(angle, {x: 0, y: 0}, padding);
    return {
        x: coords[2].x + padding.x,
        y:coords[2].y + padding.y,
        textAlign: "right",
        textBaseline: "bottom"
    };
};
KB.glyphLayouts.ergodox[KB.SHIFT_ALTGR_PUSH] = function(keyCode,fontSize,coords, angle) {
    var width = coords[1].x - coords[0].x,
        padding = {x: -fontSize*0.4, y: fontSize*0.2};//width * 0.1;
    rotatePoint(angle, {x: 0, y: 0}, padding);
    return {
        x: coords[1].x + padding.x,
        y:coords[1].y + padding.y,
        textAlign: "right",
        textBaseline: "top"
    };
};


KB.keyMap = {};

var setMountPoints = function( key ) {
	var mountPoint = {};
	mountPoint["top"] = {};
	mountPoint["right"] = {};
	mountPoint["bottom"] = {};
	mountPoint["left"] = {};
	mountPoint["top"].x = key.x + (key.w/2);
	mountPoint["top"].y = key.y;
	mountPoint["right"].x = key.x + key.w;
	mountPoint["right"].y = key.y + (key.h/2);
	mountPoint["bottom"].x = key.x + (key.w/2);
	mountPoint["bottom"].y = key.y + key.h;
	mountPoint["left"].x = key.x;
	mountPoint["left"].y = key.y + (key.h/2);
	return mountPoint;
};

var rotatePoint = function(angle, aroundPoint, rotatingPoint) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    rotatingPoint.x -= aroundPoint.x;
    rotatingPoint.y -= aroundPoint.y;

    var newX = rotatingPoint.x * c - rotatingPoint.y * s;
    var newY = rotatingPoint.x * s + rotatingPoint.y * c;

    rotatingPoint.x = newX + aroundPoint.x;
    rotatingPoint.y = newY + aroundPoint.y;
}


// standard keymap (ansi)
KB.keyMap.standard = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.standard.s683_225 = {};
KB.keyMap.standard.s683_225.width = 15*50 + 4;//756
KB.keyMap.standard.s683_225.height = 5*50 + 2;//254
KB.keyMap.standard.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.standard.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.standard.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,12,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["2,12"] = 112.5; // return
    keyWidths["3,0"] = 112.5; // l.shift
    keyWidths["3,11"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 300; // space
    keyWidths["4,4"] = 75;
    keyWidths["4,7"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            km[index].scan = index + (row === 3 && ii > 0? 2 : 1);
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
    km[0].scan = 0x29;  // OEM_3: `~
    km[27].scan = 0x2b;  // OEM_5: \|
    km[28].scan = 0x3a;  // Caps Lock
    km[40].scan = 0x1c;  // Enter
    km[53].scan = 0x1d;  // Left Ctrl
    km[54].scan = -0x5b  // Left Win
    km[57].scan = -0x38;  // Right Alt
    km[58].scan = -0x5c;  // Right Win
    km[59].scan = -0x5d;  // Menu
    km[60].scan = -0x1d;  // Right Ctrl
})();

// European keymap (ISO)
KB.keyMap.european = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.european.s683_225 = {};
KB.keyMap.european.s683_225.width = 15*50 + 4;//756
KB.keyMap.european.s683_225.height = 5*50 + 2;//254
KB.keyMap.european.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.european.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.european.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,13,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["3,0"] = 62.5; // l.shift
    keyWidths["3,12"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 300; // space
    keyWidths["4,4"] = 75;
    keyWidths["4,7"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            km[index].scan = index + (row === 4? 0 : 1);
            
            if (row === 1 && ii === 13) {
                var enterBottomWidth = 62.5;//keyWidths["3,0"]+12*normKeySize;
            
                km[index].coords = [
                    {
                        x:km[index].x,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w, 
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+km[index].h
                    }, {
                        x:km[index].x,
                        y:km[index].y+km[index].h
                    }
                ];
                
                km[index].cx = ( km[index].coords[1].x + km[index].coords[3].x ) / 2;
                km[index].cy = ( km[index].coords[1].y + km[index].coords[3].y ) / 2;
            }
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            if (row === 1 && ii === 13) {
                km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
                km[index].mountPoint["bottom"].y = km[index].y + km[index].h*2;
            }
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
    km[0].scan = 0x29;  // OEM_3: `~
    km[28].scan = 0x3a;  // Caps Lock
    km[40].scan = 0x2b;  // OEM_5: \|
    km[42].scan = 0x56;  // OEM_102: |\
    km[54].scan = 0x1d;  // Left Ctrl
    km[55].scan = -0x5b  // Left Win
    km[58].scan = -0x38;  // Right Alt
    km[59].scan = -0x5c;  // Right Win
    km[60].scan = -0x5d;  // Menu
    km[61].scan = -0x1d;  // Right Ctrl
})();

// European keymap with split spacebar
KB.keyMap.european_ss = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.european_ss.s683_225 = {};
KB.keyMap.european_ss.s683_225.width = 15*50 + 4;//756
KB.keyMap.european_ss.s683_225.height = 5*50 + 2;//254
KB.keyMap.european_ss.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.european_ss.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.european_ss.s683_225,
        normKeySize = 50,
        row,
        keyCount = [14,14,13,13,9],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;
        
    // special key sizes
    keyWidths["0,13"] = 100; // backspace
    keyWidths["1,0"] = 75; // tab
    keyWidths["1,13"] = 75; // backslash
    keyWidths["2,0"] = 87.5; // caps
    keyWidths["3,0"] = 62.5; // l.shift
    keyWidths["3,12"] = 137.5; //r.shift
    keyWidths["4,0"] = 75;
    keyWidths["4,2"] = 75;
    keyWidths["4,3"] = 150; // l.space
    keyWidths["4,4"] = 150; // r.space
    keyWidths["4,5"] = 75;
    keyWidths["4,8"] = 75;
        
    for (row = 0; row < 5; row++) {
        for (ii = 0; ii < keyCount[row]; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = keyWidths[row+","+ii] || normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            km[index].scan = index + (row === 4? 0 : 1);
            
            // make centre of spacebars near the edges?
            if (row === 4 && ii === 3) { //l.space
                km[index].cx = km[index].x + normKeySize;
            }
            if (row === 4 && ii === 4) { //r.space
                km[index].cx = km[index].x + km[index].w - normKeySize;
            }
            
            if (row === 1 && ii === 13) {
                var enterBottomWidth = 62.5;//keyWidths["3,0"]+12*normKeySize;
            
                km[index].coords = [
                    {
                        x:km[index].x,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w,
                        y:km[index].y
                    }, {
                        x:km[index].x+km[index].w, 
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+(km[index].h*2)
                    }, {
                        x:km[index].x+(km[index].w-enterBottomWidth),
                        y:km[index].y+km[index].h
                    }, {
                        x:km[index].x,
                        y:km[index].y+km[index].h
                    }
                ];
                
                km[index].cx = ( km[index].coords[1].x + km[index].coords[3].x ) / 2;
                km[index].cy = ( km[index].coords[1].y + km[index].coords[3].y ) / 2;
            }
            
            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );
            
            if (row === 1 && ii === 13) {
                km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
                km[index].mountPoint["bottom"].y = km[index].y + km[index].h*2;
            }
            
            curX += km[index].w;
            index++;
        }
        curX = 0.5;//2.5
        curY += normKeySize;
    }
    km[0].scan = 0x29;  // OEM_3: `~
    km[13].scan = -0x53;  // Backspace as Delete
    km[28].scan = 0x3a;  // Caps Lock
    km[40].scan = 0x2b;  // OEM_5: \|
    km[42].scan = 0x56;  // OEM_102: |\
    km[54].scan = 0x1d;  // Left Ctrl
    km[55].scan = -0x5b  // Left Win
    km[57].scan = 0x0e;  // “Left Space” as Backspace
    km[58].scan = 0x39;  // “Right Space” as Space
    km[59].scan = -0x38;  // Right Alt
    km[60].scan = -0x5c;  // Right Win
    km[61].scan = -0x5d;  // Menu
    km[62].scan = -0x1d;  // Right Ctrl
})();



// Key Map for Ergodox
KB.keyMap.ergodox = {};

// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.ergodox.s683_225 = {};
KB.keyMap.ergodox.s683_225.width = 935;
KB.keyMap.ergodox.s683_225.height = 360;
KB.keyMap.ergodox.s683_225.pixelsPerCm = 25.7894732;//26.315789;
KB.keyMap.ergodox.s683_225.split = true;
(function() {
    var ii,
        km = KB.keyMap.ergodox.s683_225,
        normKeySize = 50,
        row,
        // keyCount = [14,14,13,12,8],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.5,//2.5
        keyWidths = {};
        
    km.leftX = curX;
    km.leftY = curY;

    var sw = 46;
    var sh = 46;
    var sSpacing = 2;

    function keySpacing(key) {
        var keyOffset = {};
        keyOffset[7] = 214;
        keyOffset[21] = 214;
        keyOffset[34] = 214 + sw*2 + sSpacing*2;
        keyOffset[47] = 214;
        keyOffset[59] = 214 + sw*4 + sSpacing*4;

        // keys that begin a row
        keyOffset[0] = 0;
        keyOffset[14] = 0;
        keyOffset[28] = 0;
        keyOffset[40] = 0;
        keyOffset[54] = 23;

        var ret = (typeof keyOffset[key] !== 'undefined') ? keyOffset[key] : sSpacing;

        return ret;
    }

    var idx = 0;
    var yOffset = [
        [0, 0, -8, -12, -8, -5,    -5,    -5, -5, -8, -12, -8, 0, 0],
        [0, 0, -8, -12, -8, -5,    -5,    -5, -5, -8, -12, -8, 0, 0],
        [0, 0, -8, -12, -8, -5,               -5, -8, -12, -8, 0, 0],
        [0, 0, -8, -12, -8, -5, -5-23, -5-23, -5, -8, -12, -8, 0, 0],
        [0, 0, -8, -12, -8,                       -8, -12, -8, 0, 0]
    ];
    var scanCodes = [
        [0x0d, 0x02, 0x03,  0x04,  0x05, 0x06, 0x01,    -1, 0x07,  0x08,  0x09, 0x0a, 0x0b,  0x0c],
        [0x0f, 0x10, 0x11,  0x12,  0x13, 0x14,   -1,    -1, 0x15,  0x16,  0x17, 0x18, 0x19,  0x2b],
        [0x3a, 0x1e, 0x1f,  0x20,  0x21, 0x22,              0x23,  0x24,  0x25, 0x26, 0x27,  0x28],
        [0x2a, 0x2c, 0x2d,  0x2e,  0x2f, 0x30,   -1, -0x38, 0x31,  0x32,  0x33, 0x34, 0x35,  0x36],
        [  -1, 0x29, 0x56, -0x4b, -0x4d,                          -0x48, -0x50, 0x1a, 0x1b, -0x5d]
    ];

    var rowY = [
        13, 
        13 + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing + sh + sSpacing,
        13 + sh + sSpacing + sh + sSpacing + sh + sSpacing + sh + sSpacing 
    ];

    var keyWidth = {};
    keyWidth[0] = 69;
    keyWidth[13] = 69;
    keyWidth[14] = 69;
    keyWidth[27] = 69;
    keyWidth[28] = 69;
    keyWidth[39] = 69;
    keyWidth[40] = 69;
    keyWidth[53] = 69;
    var keyHeight = {}
    keyHeight[20] = sh + 23 + sSpacing;
    keyHeight[21] = sh + 23 + sSpacing;
    keyHeight[46] = sh + 23 + sSpacing;
    keyHeight[47] = sh + 23 + sSpacing;
    keyHeight[66] = sh*2+sSpacing;
    keyHeight[67] = sh*2+sSpacing;
    keyHeight[74] = sh*2+sSpacing;
    keyHeight[75] = sh*2+sSpacing;

    var rotation = {};

    var xOffset = 0;
    var yPos = 0;
    var row, col;
    var idx = 0;

    for (row = 0; row < yOffset.length; row++) {
        for (col = 0; col < yOffset[row].length; col++) {
            if (col === 0) {
                xOffset = 0;
            } else {
                xOffset = xOffset + (keyWidth[idx-1] || sw);
            } 
            xOffset += keySpacing(idx);

            km[idx] = {};
            km[idx].x = xOffset + 0.5;
            km[idx].y = rowY[row] + yOffset[row][col] + 0.5;
            km[idx].w = keyWidth[idx] || sw;
            km[idx].h = keyHeight[idx] || sh;
            km[idx].row = row;
            km[idx].scan = scanCodes[row][col];

            idx++;
        }
    }

    var tCoords = [
        {x: 378, y: 179, r: 0.45},
        {x: 422, y: 200, r: 0.45},
        {x: 313, y: 203, r: 0.45},
        {x: 357, y: 224, r: 0.45},
        {x: 401, y: 245, r: 0.45},
        {x: 380, y: 289, r: 0.45},

        {x: 466, y: 220, r: -0.45},
        {x: 510, y: 199, r: -0.45},
        {x: 487, y: 265, r: -0.45},
        {x: 508, y: 309, r: -0.45},
        {x: 531, y: 244, r: -0.45},
        {x: 575, y: 223, r: -0.45}
    ];
    scanCodes = [
        // lctrl, lalt, backspace, delete, home, end
        0x1d, 0x38, 0x0e, -0x53, -0x47, -0x4f,
        // lwin, rctrl, pgup, pgdn, enter, space
        -0x5b, -0x1d, -0x49, -0x51, 0x1c, 0x39
    ];
    for (ii = 0; ii < tCoords.length; ii++) {
        km[idx] = {};
        km[idx].x = tCoords[ii].x;
        km[idx].y = tCoords[ii].y;
        km[idx].w = keyWidth[idx] || sw;
        km[idx].h = keyHeight[idx] || sh;
        km[idx].row = 4;
        km[idx].coords = [
            {   x: km[idx].x,                 y: km[idx].y },
            {   x: km[idx].x + km[idx].w,     y: km[idx].y },
            {   x: km[idx].x + km[idx].w,     y: km[idx].y + km[idx].h},
            {   x: km[idx].x,                 y: km[idx].y + km[idx].h}
        ];
        rotation[idx] = tCoords[ii].r;
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[1]);
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[2]);
        rotatePoint(rotation[idx], km[idx].coords[0], km[idx].coords[3]);

        km[idx].mountPoint = {};
        km[idx].mountPoint["top"] = {};
        km[idx].mountPoint["right"] = {};
        km[idx].mountPoint["bottom"] = {};
        km[idx].mountPoint["left"] = {};
        
        var xSum = 0, ySum = 0;
        for (var cc = 0; cc < km[idx].coords.length; cc++) {
            xSum += km[idx].coords[cc].x;
            ySum += km[idx].coords[cc].y;
        }

        km[idx].mountPoint["top"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["top"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["right"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["right"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["bottom"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["bottom"].y = ySum / km[idx].coords.length;
        km[idx].mountPoint["left"].x = xSum / km[idx].coords.length;
        km[idx].mountPoint["left"].y = ySum / km[idx].coords.length;

        km[idx].scan = scanCodes[ii];

        idx++;
    }

    km.rotation = function(idx) {
        if (rotation[idx]) {
            return rotation[idx];
        }
        return 0;
    };

    for (index = 0; index < idx; index++) {

        if (km[index].coords) {
            var xSum = 0, ySum = 0;
            for (var cc = 0; cc < km[index].coords.length; cc++) {
                xSum += km[index].coords[cc].x;
                ySum += km[index].coords[cc].y;
            }
            km[index].cx = xSum / km[index].coords.length;
            km[index].cy = ySum / km[index].coords.length;
        } else {
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
        }
        
        // set the mount points - these are points where dialogs will attach to keys
        // all our keys are squares, so this is simple
        if (typeof km[index].mountPoint === 'undefined') {
            km[index].mountPoint = {};
            km[index].mountPoint["top"] = {};
            km[index].mountPoint["right"] = {};
            km[index].mountPoint["bottom"] = {};
            km[index].mountPoint["left"] = {};
            
            km[index].mountPoint["top"].x = km[index].x + (km[index].w/2);
            km[index].mountPoint["top"].y = km[index].y;
            km[index].mountPoint["right"].x = km[index].x + km[index].w;
            km[index].mountPoint["right"].y = km[index].y + (km[index].h/2);
            km[index].mountPoint["bottom"].x = km[index].x + (km[index].w/2);
            km[index].mountPoint["bottom"].y = km[index].y + km[index].h;
            km[index].mountPoint["left"].x = km[index].x;
            km[index].mountPoint["left"].y = km[index].y + (km[index].h/2);
        }
    }
})();

KB.keyMap.matrix = {};
// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.matrix.s683_225 = {};
KB.keyMap.matrix.s683_225.width = 12*50 + 4;
KB.keyMap.matrix.s683_225.height = 5*50 + 2;
KB.keyMap.matrix.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.matrix.s683_225.split = false;
(function() {
    var ii,
        km = KB.keyMap.matrix.s683_225,
        normKeySize = 50,
        row,
        keyCount = [12,12,12,12,12],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.0,//2.5
        maxW = KB.keyMap.matrix.s683_225.width;

    km.leftX = curX;
    km.leftY = 0;

    for (row = 0; row < 5; row++) {
        curX = km.leftX;
        var rowmax = keyCount[row];
        for (ii = 0; ii < rowmax; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;
            km[index].scan = index + row*2 + 1;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }

        curY += normKeySize;
    }
    km[0].scan = 0x29;  // OEM_3: `~
    km[23].scan = 0x0d;  // OEM_Plus: =+
    km[24].scan = 0x3a;  // Caps Lock
    km[36].scan = 0x2a;  // Left Shift
    var scanCodes = [
        // lctrl, lwin, lalt, oem5\|, backspace, [,
        0x1d, -0x5b, 0x38, 0x2b, 0x0e, 0x1a,
        // ], space, enter, ralt, menu, rctrl
        0x1b, 0x39, 0x1c, -0x38, -0x5d, -0x1d
    ];
    var row4start = 48;
    for (ii = 0; ii < scanCodes.length; ii++)
        km[row4start + ii].scan = scanCodes[ii];
})();

KB.keyMap.matrix_split = {};
// 50 pixels = 1.9cm
// 26.315789 pixels = 1cm
KB.keyMap.matrix_split.s683_225 = {};
KB.keyMap.matrix_split.s683_225.width = 12*50 + 3*50 + 4;
KB.keyMap.matrix_split.s683_225.height = 5*50 + 2;
KB.keyMap.matrix_split.s683_225.pixelsPerCm = 26.315789;
KB.keyMap.matrix_split.s683_225.split = true;
(function() {
    var ii,
        km = KB.keyMap.matrix_split.s683_225,
        normKeySize = 50,
        row,
        keyCount = [12,12,12,12,12],
        index = 0,
        curX = 0.5,//2.5
        curY = 0.0,//2.5
        maxW = KB.keyMap.matrix_split.s683_225.width;

    km.leftX = curX;
    km.leftY = 0;

    for (row = 0; row < 5; row++) {
        curX = km.leftX;
        var rowmax = keyCount[row];
        var halfrow = rowmax / 2;
        for (ii = 0; ii < halfrow; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }

        curX = maxW - ( halfrow * normKeySize ) - 6;
        for (ii = halfrow; ii < rowmax; ii++) {
            km[index] = {};
            km[index].x = curX;
            km[index].y = curY;
            km[index].w = normKeySize;
            km[index].h = normKeySize;
            km[index].cx = km[index].x + (km[index].w/2);
            km[index].cy = km[index].y + (km[index].h/2);
            km[index].row = row;

            // set the mount points - these are points where dialogs will attach to keys
            // all our keys are squares, so this is simple
            km[index].mountPoint = setMountPoints( km[index] );

            curX += km[index].w;
            index++;
        }
        curY += normKeySize;
    }
})();



