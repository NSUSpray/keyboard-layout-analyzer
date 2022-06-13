"use strict";
/*
    This file defines the basic elements of the KB name space
    
*/

var KB = KB || {}; // define namespace

// supported keysets

KB.keySet = {};
KB.keySet.standard = {};
KB.keySet.european = {};
KB.keySet.european_ss = {};
KB.keySet.ergodox = {};
KB.keySet.matrix = {};
KB.keySet.matrix_split = {};


KB.keySet.standard.inital = {
    label: "",
    author: "",
    moreInfoUrl: "",
    moreInfoText: "",
    fingerStart: {
        1: 29, 2: 30, 3: 31, 4: 32, 5: 56,
        6: 56, 7: 35, 8: 36, 9: 37, 10: 38,
        11: 56
    },
    keyboardType: "standard",
    keys: [
        { id: 0, finger: KB.finger.LEFT_PINKY },
        { id: 1, finger: KB.finger.LEFT_PINKY },
        { id: 2, finger: KB.finger.LEFT_RING },
        { id: 3, finger: KB.finger.LEFT_MIDDLE },
        { id: 4, finger: KB.finger.LEFT_INDEX },
        { id: 5, finger: KB.finger.LEFT_INDEX },
            { id: 6, finger: KB.finger.RIGHT_INDEX },
            { id: 7, finger: KB.finger.RIGHT_INDEX },
            { id: 8, finger: KB.finger.RIGHT_MIDDLE },
            { id: 9, finger: KB.finger.RIGHT_RING },
            { id: 10, finger: KB.finger.RIGHT_PINKY },
            { id: 11, finger: KB.finger.RIGHT_PINKY },
            { id: 12, finger: KB.finger.RIGHT_PINKY },
            { id: 13, finger: KB.finger.RIGHT_PINKY },

        { id: 14, finger: KB.finger.LEFT_PINKY },
        { id: 15, finger: KB.finger.LEFT_PINKY },
        { id: 16, finger: KB.finger.LEFT_RING },
        { id: 17, finger: KB.finger.LEFT_MIDDLE },
        { id: 18, finger: KB.finger.LEFT_INDEX },
        { id: 19, finger: KB.finger.LEFT_INDEX },
            { id: 20, finger: KB.finger.RIGHT_INDEX },
            { id: 21, finger: KB.finger.RIGHT_INDEX },
            { id: 22, finger: KB.finger.RIGHT_MIDDLE },
            { id: 23, finger: KB.finger.RIGHT_RING },
            { id: 24, finger: KB.finger.RIGHT_PINKY },
            { id: 25, finger: KB.finger.RIGHT_PINKY },
            { id: 26, finger: KB.finger.RIGHT_PINKY },
            { id: 27, finger: KB.finger.RIGHT_PINKY },

        { id: 28, finger: KB.finger.LEFT_PINKY },
        { id: 29, finger: KB.finger.LEFT_PINKY },
        { id: 30, finger: KB.finger.LEFT_RING },
        { id: 31, finger: KB.finger.LEFT_MIDDLE },
        { id: 32, finger: KB.finger.LEFT_INDEX },
        { id: 33, finger: KB.finger.LEFT_INDEX },
            { id: 34, finger: KB.finger.RIGHT_INDEX },
            { id: 35, finger: KB.finger.RIGHT_INDEX },
            { id: 36, finger: KB.finger.RIGHT_MIDDLE },
            { id: 37, finger: KB.finger.RIGHT_RING },
            { id: 38, finger: KB.finger.RIGHT_PINKY },
            { id: 39, finger: KB.finger.RIGHT_PINKY },
            { id: 40, finger: KB.finger.RIGHT_PINKY },

        { id: 41, finger: KB.finger.LEFT_PINKY },
        { id: 42, finger: KB.finger.LEFT_PINKY },
        { id: 43, finger: KB.finger.LEFT_RING },
        { id: 44, finger: KB.finger.LEFT_MIDDLE },
        { id: 45, finger: KB.finger.LEFT_INDEX },
        { id: 46, finger: KB.finger.LEFT_INDEX },
            { id: 47, finger: KB.finger.RIGHT_INDEX },
            { id: 48, finger: KB.finger.RIGHT_INDEX },
            { id: 49, finger: KB.finger.RIGHT_MIDDLE },
            { id: 50, finger: KB.finger.RIGHT_RING },
            { id: 51, finger: KB.finger.RIGHT_PINKY },
            { id: 52, finger: KB.finger.RIGHT_PINKY },

        { id: 53, finger: KB.finger.LEFT_THUMB },
        { id: 54, finger: KB.finger.LEFT_THUMB },
        { id: 55, finger: KB.finger.LEFT_THUMB },
        { id: 56, finger: KB.finger.LEFT_THUMB },
            { id: 57, finger: KB.finger.RIGHT_THUMB },
            { id: 58, finger: KB.finger.RIGHT_THUMB },
            { id: 59, finger: KB.finger.RIGHT_THUMB },
            { id: 60, finger: KB.finger.RIGHT_THUMB }
    ]
};


KB.keySet.european.inital = {
    label: "",
    author: "",
    moreInfoUrl: "",
    moreInfoText: "",
    fingerStart: {
        1: 29, 2: 30, 3: 31, 4: 32, 5: 57,
        6: 57, 7: 35, 8: 36, 9: 37, 10: 38,
        11: 57
    },
    keyboardType: "european",
    keys: [
        { id: 0, finger: KB.finger.LEFT_PINKY },
        { id: 1, finger: KB.finger.LEFT_PINKY },
        { id: 2, finger: KB.finger.LEFT_RING },
        { id: 3, finger: KB.finger.LEFT_MIDDLE },
        { id: 4, finger: KB.finger.LEFT_INDEX },
        { id: 5, finger: KB.finger.LEFT_INDEX },
            { id: 6, finger: KB.finger.RIGHT_INDEX },
            { id: 7, finger: KB.finger.RIGHT_INDEX },
            { id: 8, finger: KB.finger.RIGHT_MIDDLE },
            { id: 9, finger: KB.finger.RIGHT_RING },
            { id: 10, finger: KB.finger.RIGHT_PINKY },
            { id: 11, finger: KB.finger.RIGHT_PINKY },
            { id: 12, finger: KB.finger.RIGHT_PINKY },
            { id: 13, finger: KB.finger.RIGHT_PINKY },

        { id: 14, finger: KB.finger.LEFT_PINKY },
        { id: 15, finger: KB.finger.LEFT_PINKY },
        { id: 16, finger: KB.finger.LEFT_RING },
        { id: 17, finger: KB.finger.LEFT_MIDDLE },
        { id: 18, finger: KB.finger.LEFT_INDEX },
        { id: 19, finger: KB.finger.LEFT_INDEX },
            { id: 20, finger: KB.finger.RIGHT_INDEX },
            { id: 21, finger: KB.finger.RIGHT_INDEX },
            { id: 22, finger: KB.finger.RIGHT_MIDDLE },
            { id: 23, finger: KB.finger.RIGHT_RING },
            { id: 24, finger: KB.finger.RIGHT_PINKY },
            { id: 25, finger: KB.finger.RIGHT_PINKY },
            { id: 26, finger: KB.finger.RIGHT_PINKY },
            { id: 27, finger: KB.finger.RIGHT_PINKY },

        { id: 28, finger: KB.finger.LEFT_PINKY },
        { id: 29, finger: KB.finger.LEFT_PINKY },
        { id: 30, finger: KB.finger.LEFT_RING },
        { id: 31, finger: KB.finger.LEFT_MIDDLE },
        { id: 32, finger: KB.finger.LEFT_INDEX },
        { id: 33, finger: KB.finger.LEFT_INDEX },
            { id: 34, finger: KB.finger.RIGHT_INDEX },
            { id: 35, finger: KB.finger.RIGHT_INDEX },
            { id: 36, finger: KB.finger.RIGHT_MIDDLE },
            { id: 37, finger: KB.finger.RIGHT_RING },
            { id: 38, finger: KB.finger.RIGHT_PINKY },
            { id: 39, finger: KB.finger.RIGHT_PINKY },
            { id: 40, finger: KB.finger.RIGHT_PINKY },

        { id: 41, finger: KB.finger.LEFT_PINKY },
        { id: 42, finger: KB.finger.LEFT_PINKY },
        { id: 43, finger: KB.finger.LEFT_PINKY },
        { id: 44, finger: KB.finger.LEFT_RING },
        { id: 45, finger: KB.finger.LEFT_MIDDLE },
        { id: 46, finger: KB.finger.LEFT_INDEX },
        { id: 47, finger: KB.finger.LEFT_INDEX },
            { id: 48, finger: KB.finger.RIGHT_INDEX },
            { id: 49, finger: KB.finger.RIGHT_INDEX },
            { id: 50, finger: KB.finger.RIGHT_MIDDLE },
            { id: 51, finger: KB.finger.RIGHT_RING },
            { id: 52, finger: KB.finger.RIGHT_PINKY },
            { id: 53, finger: KB.finger.RIGHT_PINKY },
        
        { id: 54, finger: KB.finger.LEFT_THUMB },
        { id: 55, finger: KB.finger.LEFT_THUMB },
        { id: 56, finger: KB.finger.LEFT_THUMB },
        { id: 57, finger: KB.finger.LEFT_THUMB },
            { id: 58, finger: KB.finger.RIGHT_THUMB },
            { id: 59, finger: KB.finger.RIGHT_THUMB },
            { id: 60, finger: KB.finger.RIGHT_THUMB },
            { id: 61, finger: KB.finger.RIGHT_THUMB }
    ]
};


KB.keySet.european_ss.inital = {
    label: "",
    author: "",
    moreInfoUrl: "",
    moreInfoText: "",
    fingerStart: {
        1: 29, 2: 30, 3: 31, 4: 32, 5: 57,
        6: 58, 7: 35, 8: 36, 9: 37, 10: 38,
        11: 57
    },
    keyboardType: "european_ss",
    keys: [
        { id: 0, finger: KB.finger.LEFT_PINKY },
        { id: 1, finger: KB.finger.LEFT_PINKY },
        { id: 2, finger: KB.finger.LEFT_RING },
        { id: 3, finger: KB.finger.LEFT_MIDDLE },
        { id: 4, finger: KB.finger.LEFT_INDEX },
        { id: 5, finger: KB.finger.LEFT_INDEX },
            { id: 6, finger: KB.finger.RIGHT_INDEX },
            { id: 7, finger: KB.finger.RIGHT_INDEX },
            { id: 8, finger: KB.finger.RIGHT_MIDDLE },
            { id: 9, finger: KB.finger.RIGHT_RING },
            { id: 10, finger: KB.finger.RIGHT_PINKY },
            { id: 11, finger: KB.finger.RIGHT_PINKY },
            { id: 12, finger: KB.finger.RIGHT_PINKY },
            { id: 13, finger: KB.finger.RIGHT_PINKY },

        { id: 14, finger: KB.finger.LEFT_PINKY },
        { id: 15, finger: KB.finger.LEFT_PINKY },
        { id: 16, finger: KB.finger.LEFT_RING },
        { id: 17, finger: KB.finger.LEFT_MIDDLE },
        { id: 18, finger: KB.finger.LEFT_INDEX },
        { id: 19, finger: KB.finger.LEFT_INDEX },
            { id: 20, finger: KB.finger.RIGHT_INDEX },
            { id: 21, finger: KB.finger.RIGHT_INDEX },
            { id: 22, finger: KB.finger.RIGHT_MIDDLE },
            { id: 23, finger: KB.finger.RIGHT_RING },
            { id: 24, finger: KB.finger.RIGHT_PINKY },
            { id: 25, finger: KB.finger.RIGHT_PINKY },
            { id: 26, finger: KB.finger.RIGHT_PINKY },
            { id: 27, finger: KB.finger.RIGHT_PINKY },

        { id: 28, finger: KB.finger.LEFT_PINKY },
        { id: 29, finger: KB.finger.LEFT_PINKY },
        { id: 30, finger: KB.finger.LEFT_RING },
        { id: 31, finger: KB.finger.LEFT_MIDDLE },
        { id: 32, finger: KB.finger.LEFT_INDEX },
        { id: 33, finger: KB.finger.LEFT_INDEX },
            { id: 34, finger: KB.finger.RIGHT_INDEX },
            { id: 35, finger: KB.finger.RIGHT_INDEX },
            { id: 36, finger: KB.finger.RIGHT_MIDDLE },
            { id: 37, finger: KB.finger.RIGHT_RING },
            { id: 38, finger: KB.finger.RIGHT_PINKY },
            { id: 39, finger: KB.finger.RIGHT_PINKY },
            { id: 40, finger: KB.finger.RIGHT_PINKY },

        { id: 41, finger: KB.finger.LEFT_PINKY },
        { id: 42, finger: KB.finger.LEFT_PINKY },
        { id: 43, finger: KB.finger.LEFT_PINKY },
        { id: 44, finger: KB.finger.LEFT_RING },
        { id: 45, finger: KB.finger.LEFT_MIDDLE },
        { id: 46, finger: KB.finger.LEFT_INDEX },
        { id: 47, finger: KB.finger.LEFT_INDEX },
            { id: 48, finger: KB.finger.RIGHT_INDEX },
            { id: 49, finger: KB.finger.RIGHT_INDEX },
            { id: 50, finger: KB.finger.RIGHT_MIDDLE },
            { id: 51, finger: KB.finger.RIGHT_RING },
            { id: 52, finger: KB.finger.RIGHT_PINKY },
            { id: 53, finger: KB.finger.RIGHT_PINKY },
        
        { id: 54, finger: KB.finger.LEFT_THUMB },
        { id: 55, finger: KB.finger.LEFT_THUMB },
        { id: 56, finger: KB.finger.LEFT_THUMB },
        { id: 57, finger: KB.finger.LEFT_THUMB },
            { id: 58, finger: KB.finger.RIGHT_THUMB },
            { id: 59, finger: KB.finger.RIGHT_THUMB },
            { id: 60, finger: KB.finger.RIGHT_THUMB },
            { id: 61, finger: KB.finger.RIGHT_THUMB },
            { id: 62, finger: KB.finger.RIGHT_THUMB }
    ]
};


KB.keySet.ergodox.inital = {
    label: "",
    author: "",
    moreInfoUrl: "",
    moreInfoText: "",
    fingerStart: {
        1: 29, 2: 30, 3: 31, 4: 32, 5: 66,
        6: 75, 7: 35, 8: 36, 9: 37, 10: 38,
        11: -1
    },
    keyboardType: "ergodox",
    keys: [
        { id: 0, finger: KB.finger.LEFT_PINKY },
        { id: 1, finger: KB.finger.LEFT_PINKY },
        { id: 2, finger: KB.finger.LEFT_RING },
        { id: 3, finger: KB.finger.LEFT_MIDDLE },
        { id: 4, finger: KB.finger.LEFT_INDEX },
        { id: 5, finger: KB.finger.LEFT_INDEX },
        { id: 6, finger: KB.finger.LEFT_INDEX },
            { id: 7, finger: KB.finger.RIGHT_INDEX },
            { id: 8, finger: KB.finger.RIGHT_INDEX },
            { id: 9, finger: KB.finger.RIGHT_INDEX },
            { id: 10, finger: KB.finger.RIGHT_MIDDLE },
            { id: 11, finger: KB.finger.RIGHT_RING },
            { id: 12, finger: KB.finger.RIGHT_PINKY },
            { id: 13, finger: KB.finger.RIGHT_PINKY },

        { id: 14, finger: KB.finger.LEFT_PINKY },
        { id: 15, finger: KB.finger.LEFT_PINKY },
        { id: 16, finger: KB.finger.LEFT_RING },
        { id: 17, finger: KB.finger.LEFT_MIDDLE },
        { id: 18, finger: KB.finger.LEFT_INDEX },
        { id: 19, finger: KB.finger.LEFT_INDEX },
        { id: 20, finger: KB.finger.LEFT_INDEX },
            { id: 21, finger: KB.finger.RIGHT_INDEX },
            { id: 22, finger: KB.finger.RIGHT_INDEX },
            { id: 23, finger: KB.finger.RIGHT_INDEX },
            { id: 24, finger: KB.finger.RIGHT_MIDDLE },
            { id: 25, finger: KB.finger.RIGHT_RING },
            { id: 26, finger: KB.finger.RIGHT_PINKY },
            { id: 27, finger: KB.finger.RIGHT_PINKY },
            
        { id: 28, finger: KB.finger.LEFT_PINKY },
        { id: 29, finger: KB.finger.LEFT_PINKY },
        { id: 30, finger: KB.finger.LEFT_RING },
        { id: 31, finger: KB.finger.LEFT_MIDDLE },
        { id: 32, finger: KB.finger.LEFT_INDEX },
        { id: 33, finger: KB.finger.LEFT_INDEX },
            { id: 34, finger: KB.finger.RIGHT_INDEX },
            { id: 35, finger: KB.finger.RIGHT_INDEX },
            { id: 36, finger: KB.finger.RIGHT_MIDDLE },
            { id: 37, finger: KB.finger.RIGHT_RING },
            { id: 38, finger: KB.finger.RIGHT_PINKY },
            { id: 39, finger: KB.finger.RIGHT_PINKY },
            
        { id: 40, finger: KB.finger.LEFT_PINKY },
        { id: 41, finger: KB.finger.LEFT_PINKY },
        { id: 42, finger: KB.finger.LEFT_RING },
        { id: 43, finger: KB.finger.LEFT_MIDDLE },
        { id: 44, finger: KB.finger.LEFT_INDEX },
        { id: 45, finger: KB.finger.LEFT_INDEX },
        { id: 46, finger: KB.finger.LEFT_INDEX },
            { id: 47, finger: KB.finger.RIGHT_INDEX },
            { id: 48, finger: KB.finger.RIGHT_INDEX },
            { id: 49, finger: KB.finger.RIGHT_INDEX },
            { id: 50, finger: KB.finger.RIGHT_MIDDLE },
            { id: 51, finger: KB.finger.RIGHT_RING },
            { id: 52, finger: KB.finger.RIGHT_PINKY },
            { id: 53, finger: KB.finger.RIGHT_PINKY },
            
        { id: 54, finger: KB.finger.LEFT_PINKY },
        { id: 55, finger: KB.finger.LEFT_PINKY },
        { id: 56, finger: KB.finger.LEFT_RING },
        { id: 57, finger: KB.finger.LEFT_MIDDLE },
        { id: 58, finger: KB.finger.LEFT_INDEX },
            { id: 59, finger: KB.finger.RIGHT_INDEX },
            { id: 60, finger: KB.finger.RIGHT_MIDDLE },
            { id: 61, finger: KB.finger.RIGHT_RING },
            { id: 62, finger: KB.finger.RIGHT_PINKY },
            { id: 63, finger: KB.finger.RIGHT_PINKY },
            
        { id: 64, finger: KB.finger.LEFT_THUMB },
        { id: 65, finger: KB.finger.LEFT_THUMB },
        { id: 66, finger: KB.finger.LEFT_THUMB },
        { id: 67, finger: KB.finger.LEFT_THUMB },
        { id: 68, finger: KB.finger.LEFT_THUMB },
        { id: 69, finger: KB.finger.LEFT_THUMB },
            { id: 70, finger: KB.finger.RIGHT_THUMB },
            { id: 71, finger: KB.finger.RIGHT_THUMB },
            { id: 72, finger: KB.finger.RIGHT_THUMB },
            { id: 73, finger: KB.finger.RIGHT_THUMB },
            { id: 74, finger: KB.finger.RIGHT_THUMB },
            { id: 75, finger: KB.finger.RIGHT_THUMB }
    ]
}


KB.keySet.matrix.inital = {
    label: "",
    author: "",
    moreInfoUrl: "",
    moreInfoText: "",
    fingerStart: {
        1: 25, 2: 26, 3: 27, 4: 28, 5: 52,
        6: 55, 7: 31, 8: 32, 9: 33, 10: 34,
        11: -1
    },
    keyboardType: "matrix",
    keys: [
        { id: 0, finger: KB.finger.LEFT_PINKY },
        { id: 1, finger: KB.finger.LEFT_PINKY },
        { id: 2, finger: KB.finger.LEFT_RING },
        { id: 3, finger: KB.finger.LEFT_MIDDLE },
        { id: 4, finger: KB.finger.LEFT_INDEX },
        { id: 5, finger: KB.finger.LEFT_INDEX },
            { id: 6, finger: KB.finger.RIGHT_INDEX },
            { id: 7, finger: KB.finger.RIGHT_INDEX },
            { id: 8, finger: KB.finger.RIGHT_MIDDLE },
            { id: 9, finger: KB.finger.RIGHT_RING },
            { id: 10, finger: KB.finger.RIGHT_PINKY },
            { id: 11, finger: KB.finger.RIGHT_PINKY },

        { id: 12, finger: KB.finger.LEFT_PINKY },
        { id: 13, finger: KB.finger.LEFT_PINKY },
        { id: 14, finger: KB.finger.LEFT_RING },
        { id: 15, finger: KB.finger.LEFT_MIDDLE },
        { id: 16, finger: KB.finger.LEFT_INDEX },
        { id: 17, finger: KB.finger.LEFT_INDEX },
            { id: 18, finger: KB.finger.RIGHT_INDEX },
            { id: 19, finger: KB.finger.RIGHT_INDEX },
            { id: 20, finger: KB.finger.RIGHT_MIDDLE },
            { id: 21, finger: KB.finger.RIGHT_RING },
            { id: 22, finger: KB.finger.RIGHT_PINKY },
            { id: 23, finger: KB.finger.RIGHT_PINKY },
            
        { id: 24, finger: KB.finger.LEFT_PINKY },
        { id: 25, finger: KB.finger.LEFT_PINKY },
        { id: 26, finger: KB.finger.LEFT_RING },
        { id: 27, finger: KB.finger.LEFT_MIDDLE },
        { id: 28, finger: KB.finger.LEFT_INDEX },
        { id: 29, finger: KB.finger.LEFT_INDEX },
            { id: 30, finger: KB.finger.RIGHT_INDEX },
            { id: 31, finger: KB.finger.RIGHT_INDEX },
            { id: 32, finger: KB.finger.RIGHT_MIDDLE },
            { id: 33, finger: KB.finger.RIGHT_RING },
            { id: 34, finger: KB.finger.RIGHT_PINKY },
            { id: 35, finger: KB.finger.RIGHT_PINKY },
            
        { id: 36, finger: KB.finger.LEFT_PINKY },
        { id: 37, finger: KB.finger.LEFT_PINKY },
        { id: 38, finger: KB.finger.LEFT_RING },
        { id: 39, finger: KB.finger.LEFT_MIDDLE },
        { id: 40, finger: KB.finger.LEFT_INDEX },
        { id: 41, finger: KB.finger.LEFT_INDEX },
            { id: 42, finger: KB.finger.RIGHT_INDEX },
            { id: 43, finger: KB.finger.RIGHT_INDEX },
            { id: 44, finger: KB.finger.RIGHT_MIDDLE },
            { id: 45, finger: KB.finger.RIGHT_RING },
            { id: 46, finger: KB.finger.RIGHT_PINKY },
            { id: 47, finger: KB.finger.RIGHT_PINKY },
            
        { id: 48, finger: KB.finger.LEFT_THUMB },
        { id: 49, finger: KB.finger.LEFT_THUMB },
        { id: 50, finger: KB.finger.LEFT_THUMB },
        { id: 51, finger: KB.finger.LEFT_THUMB },
        { id: 52, finger: KB.finger.LEFT_THUMB },
        { id: 53, finger: KB.finger.LEFT_THUMB },
            { id: 54, finger: KB.finger.RIGHT_THUMB },
            { id: 55, finger: KB.finger.RIGHT_THUMB },
            { id: 56, finger: KB.finger.RIGHT_THUMB },
            { id: 57, finger: KB.finger.RIGHT_THUMB },
            { id: 58, finger: KB.finger.RIGHT_THUMB },
            { id: 59, finger: KB.finger.RIGHT_THUMB }
    ]
}


KB.keySet.standard.qwerty = {
    label: "QWERTY",
    author: "C. L. Sholes, E. Remington",
    moreInfoUrl: "https://en.wikipedia.org/wiki/QWERTY", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [ 
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


// ----------------------------------------------------------------------------
// standard Simplified Dvorak
// ----------------------------------------------------------------------------

KB.keySet.standard.simplifiedDvorak = {
    label: "Simplified Dvorak",
    author: "August Dvorak",
    moreInfoUrl: "https://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard", 
    moreInfoText: "Wikipedia Entry",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"'",   shift:"\"",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:";",  shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// standard Colemak
// ----------------------------------------------------------------------------

KB.keySet.standard.colemak = {
    label: "Colemak",
    author: "Shai Coleman",
    moreInfoUrl: "http://colemak.com/", 
    moreInfoText: "colemak.com",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.LEFT_INDEX},
        {primary:"j",   shift:"J",  finger:KB.finger.RIGHT_INDEX},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_INDEX},
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_RING},
        {primary:";",   shift:":",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:8 ,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"t",  shift:"T",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},
        {primary:"e",  shift:"E",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"i",  shift:"I",  finger:KB.finger.RIGHT_RING},
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_PINKY},
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// standard Capewell
// ----------------------------------------------------------------------------

KB.keySet.standard.capewell = {
    label: "Capewell",
    author: "Michael Capewell",
    moreInfoUrl: "http://www.michaelcapewell.com/projects/keyboard/", 
    moreInfoText: "michaelcapewell.com",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"`",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"@",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:"#",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:".",   shift:">",  finger:KB.finger.LEFT_PINKY},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_RING},
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"d",   shift:"D",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.LEFT_INDEX},
        {primary:"j",   shift:"J",  finger:KB.finger.RIGHT_INDEX},
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_INDEX},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_RING},
        {primary:"q",   shift:"Q",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_RING},
        {primary:"r",  shift:"R",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_INDEX},
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_INDEX},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"i",  shift:"I",  finger:KB.finger.RIGHT_RING},
        {primary:"o",  shift:"O",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_PINKY},
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_RING},
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},
        {primary:";",  shift:":",  finger:KB.finger.LEFT_INDEX},
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_RING},
        {primary:"'",  shift:"\"",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


// ----------------------------------------------------------------------------
// standard Programmer Dvorak
// ----------------------------------------------------------------------------

KB.keySet.standard.programmerDvorak = {
    label: "Programmer Dvorak",
    author: "Roland Kaufmann",
    moreInfoUrl: "http://www.kaufmann.no/roland/dvorak/", 
    moreInfoText: "kaufmann.no",
    fingerStart: {},
    keyboardType: "standard",
    keys: [
        {primary:"$",   shift:"~",  finger:KB.finger.LEFT_PINKY},//0
        {primary:"&",   shift:"%",  finger:KB.finger.LEFT_PINKY},
        {primary:"[",   shift:"7",  finger:KB.finger.LEFT_RING},
        {primary:"{",   shift:"5",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"}",   shift:"3",  finger:KB.finger.LEFT_INDEX},
        {primary:"(",   shift:"1",  finger:KB.finger.LEFT_INDEX},
        {primary:"=",   shift:"9",  finger:KB.finger.RIGHT_INDEX},
        {primary:"*",   shift:"0",  finger:KB.finger.RIGHT_INDEX},
        {primary:")",   shift:"2",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"+",   shift:"4",  finger:KB.finger.RIGHT_RING},
        {primary:"]",   shift:"6",  finger:KB.finger.RIGHT_PINKY},
        {primary:"!",   shift:"8",  finger:KB.finger.RIGHT_PINKY},
        {primary:"#",   shift:"`",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:";",   shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"@",   shift:"^",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\\",  shift:"|",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:"'",  shift:"\"",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};


// ----------------------------------------------------------------------------
// european AZERTY
// ----------------------------------------------------------------------------

KB.keySet.european.azerty = {
   "label":"AZERTY",
   "fingerStart":{
      "1":29,
      "2":30,
      "3":31,
      "4":32,
      "5":57,
      "6":57,
      "7":35,
      "8":36,
      "9":37,
      "10":38,
      "11":57,
      "false":-1
   },
   "keyboardType":"european",
   "author":"Jean-François Moser",
   "moreInfoText":"Wikipedia Entry",
   "moreInfoUrl":"http://en.wikipedia.org/wiki/AZERTY",
   "keys":[
      {"primary":178,   "finger":1,     "id":0},
      {"primary":38,    "shift":49,     "finger":1,     "id":1},
      {"primary":233,   "shift":50,     "finger":2,     "id":2,     "altGr":126},
      {"primary":34,    "shift":51,     "finger":3,     "id":3,     "altGr":35},
      {"primary":39,    "shift":52,     "finger":4,     "id":4,     "altGr":123},
      {"primary":40,    "shift":53,     "finger":4,     "id":5,     "altGr":91},
      {"primary":45,    "shift":54,     "finger":7,     "id":6,     "altGr":124},
      {"primary":232,   "shift":55,     "finger":7,     "id":7,     "altGr":96},
      {"primary":95,    "shift":56,     "finger":8,     "id":8,     "altGr":92},
      {"primary":231,   "shift":57,     "finger":9,     "id":9,     "altGr":94},
      {"primary":224,   "shift":48,     "finger":10,    "id":10,    "altGr":64},
      {"primary":41,    "shift":176,    "finger":10,    "id":11,    "altGr":93},
      {"primary":61,    "shift":43,     "finger":10,    "id":12,    "altGr":125},
      {"primary":8,     "finger":10,    "id":13},
      {"primary":9,     "finger":1,     "id":14},
      {"primary":97,    "shift":65,     "finger":1,     "id":15},
      {"primary":122,   "shift":90,     "finger":2,     "id":16},
      {"primary":101,   "shift":69,     "finger":3,     "id":17,    "altGr":8364},
      {"primary":114,   "shift":82,     "finger":4,     "id":18},
      {"primary":116,   "shift":84,     "finger":4,     "id":19},
      {"primary":121,   "shift":89,     "finger":7,     "id":20},
      {"primary":117,   "shift":85,     "finger":7,     "id":21},
      {"primary":105,   "shift":73,     "finger":8,     "id":22},
      {"primary":111,   "shift":79,     "finger":9,     "id":23},
      {"primary":112,   "shift":80,     "finger":10,    "id":24},
      {"primary":94,    "shift":168,    "finger":10,    "id":25},
      {"primary":36,    "shift":163,    "finger":10,    "id":26,    "altGr":164},
      {"primary":13,    "finger":10,    "id":27},
      {"primary":20,    "finger":1,     "id":28},
      {"primary":113,   "shift":81,     "finger":1,     "id":29},
      {"primary":115,   "shift":83,     "finger":2,     "id":30},
      {"primary":100,   "shift":68,     "finger":3,     "id":31},
      {"primary":102,   "shift":70,     "finger":4,     "id":32},
      {"primary":103,   "shift":71,     "finger":4,     "id":33},
      {"primary":104,   "shift":72,     "finger":7,     "id":34},
      {"primary":106,   "shift":74,     "finger":7,     "id":35},
      {"primary":107,   "shift":75,     "finger":8,     "id":36},
      {"primary":108,   "shift":76,     "finger":9,     "id":37},
      {"primary":109,   "shift":77,     "finger":10,    "id":38},
      {"primary":249,   "shift":37,     "finger":10,    "id":39},
      {"primary":42,    "shift":181,    "finger":10,    "id":40},
      {"primary":16,    "finger":1,     "id":41},
      {"primary":60,    "shift":62,     "finger":1,     "id":42},
      {"primary":119,   "shift":87,     "finger":1,     "id":43},
      {"primary":120,   "shift":88,     "finger":2,     "id":44},
      {"primary":99,    "shift":67,     "finger":3,     "id":45},
      {"primary":118,   "shift":86,     "finger":4,     "id":46},
      {"primary":98,    "shift":66,     "finger":4,     "id":47},
      {"primary":110,   "shift":78,     "finger":7,     "id":48},
      {"primary":44,    "shift":63,     "finger":7,     "id":49},
      {"primary":59,    "shift":46,     "finger":8,     "id":50},
      {"primary":58,    "shift":47,     "finger":9,     "id":51},
      {"primary":33,    "shift":167,    "finger":10,    "id":52},
      {"primary":-16,   "finger":10,    "id":53},
      {"primary":17,    "finger":5,     "id":54},
      {"primary":-91,   "finger":5,     "id":55},
      {"primary":18,    "finger":5,     "id":56},
      {"primary":32,    "finger":5,     "id":57},
      {"primary":-18,   "finger":6,     "id":58},
      {"primary":-91,   "finger":6,     "id":59},
      {"primary":-93,   "finger":6,     "id":60
      },
      {"primary":17,    "finger":6,     "id":61}
   ]
}


// ----------------------------------------------------------------------------
// european Simplified Dvorak
// ----------------------------------------------------------------------------

KB.keySet.european.simplifiedDvorak = {
    label: "Simplified Dvorak",
    author: "August Dvorak",
    authorUrl: "",
    fingerStart: {},
    keyboardType: "european",
    keys: [
        {primary:"`",   shift:172,  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},
        {primary:"2",   shift:"\"",  finger:KB.finger.LEFT_RING},
        {primary:"3",   shift:163,  finger:KB.finger.LEFT_MIDDLE},
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"'",   shift:"@",  finger:KB.finger.LEFT_PINKY},
        {primary:",",   shift:"<",  finger:KB.finger.LEFT_RING},
        {primary:".",   shift:">",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"p",   shift:"P",  finger:KB.finger.LEFT_INDEX},
        {primary:"y",   shift:"Y",  finger:KB.finger.LEFT_INDEX},
        {primary:"f",   shift:"F",  finger:KB.finger.RIGHT_INDEX},
        {primary:"g",   shift:"G",  finger:KB.finger.RIGHT_INDEX},
        {primary:"c",   shift:"C",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"r",   shift:"R",  finger:KB.finger.RIGHT_RING},
        {primary:"l",   shift:"L",  finger:KB.finger.RIGHT_PINKY},
        {primary:"/",   shift:"?",  finger:KB.finger.RIGHT_PINKY},
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},
        {primary:"o",  shift:"O",  finger:KB.finger.LEFT_RING},
        {primary:"e",  shift:"E",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"u",  shift:"U",  finger:KB.finger.LEFT_INDEX},
        {primary:"i",  shift:"I",  finger:KB.finger.LEFT_INDEX},
        {primary:"d",  shift:"D",  finger:KB.finger.RIGHT_INDEX},
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},
        {primary:"t",  shift:"T",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_RING},
        {primary:"s",  shift:"S",  finger:KB.finger.RIGHT_PINKY},
        {primary:"-",  shift:"_",  finger:KB.finger.RIGHT_PINKY},
        {primary:"\r",               finger:KB.finger.RIGHT_PINKY},//40
        
        {primary:16,               finger:KB.finger.LEFT_PINKY},//41
        {primary:";",  shift:":",  finger:KB.finger.LEFT_PINKY},
        {primary:"q",  shift:"Q",  finger:KB.finger.LEFT_RING},
        {primary:"j",  shift:"J",  finger:KB.finger.LEFT_MIDDLE},
        {primary:"k",  shift:"K",  finger:KB.finger.LEFT_INDEX},
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_INDEX},
        {primary:"b",  shift:"B",  finger:KB.finger.RIGHT_INDEX},
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},
        {primary:"w",  shift:"W",  finger:KB.finger.RIGHT_MIDDLE},
        {primary:"v",  shift:"V",  finger:KB.finger.RIGHT_RING},
        {primary:"z",  shift:"Z",  finger:KB.finger.RIGHT_PINKY},
        {primary:-16,              finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},
        {primary:18,               finger:KB.finger.LEFT_THUMB},
        {primary:" ",              finger:KB.finger.LEFT_THUMB},
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// european Colemak
// ----------------------------------------------------------------------------

KB.keySet.european.colemak = {
    "label": "Colemak",
    "author": "Shai Coleman",
    "moreInfoUrl": "https://colemak.com/",
    "moreInfoText": "Colemak",
    "fingerStart": {
        "1": 29,
        "2": 30,
        "3": 31,
        "4": 32,
        "5": 57,
        "6": 57,
        "7": 35,
        "8": 36,
        "9": 37,
        "10": 38,
        "11": 57,
        "false": -1
    },
    "keyboardType": "european",
    "keys": [
        {
            "primary": 96,
            "shift": 172,
            "finger": 1,
            "id": 0
        },
        {
            "primary": 49,
            "shift": 33,
            "finger": 1,
            "id": 1
        },
        {
            "primary": 50,
            "shift": 34,
            "finger": 2,
            "id": 2
        },
        {
            "primary": 51,
            "shift": 163,
            "finger": 3,
            "id": 3
        },
        {
            "primary": 52,
            "shift": 36,
            "finger": 4,
            "id": 4
        },
        {
            "primary": 53,
            "shift": 37,
            "finger": 4,
            "id": 5
        },
        {
            "primary": 54,
            "shift": 94,
            "finger": 7,
            "id": 6
        },
        {
            "primary": 55,
            "shift": 38,
            "finger": 7,
            "id": 7
        },
        {
            "primary": 56,
            "shift": 42,
            "finger": 8,
            "id": 8
        },
        {
            "primary": 57,
            "shift": 40,
            "finger": 9,
            "id": 9
        },
        {
            "primary": 48,
            "shift": 41,
            "finger": 10,
            "id": 10
        },
        {
            "primary": 45,
            "shift": 95,
            "finger": 10,
            "id": 11
        },
        {
            "primary": 61,
            "shift": 43,
            "finger": 10,
            "id": 12
        },
        {
            "primary": 8,
            "finger": 10,
            "id": 13
        },
        {
            "primary": 9,
            "finger": 1,
            "id": 14
        },
        {
            "primary": 113,
            "shift": 81,
            "finger": 1,
            "id": 15
        },
        {
            "primary": 119,
            "shift": 87,
            "finger": 2,
            "id": 16
        },
        {
            "primary": 102,
            "shift": 70,
            "finger": 3,
            "id": 17
        },
        {
            "primary": 112,
            "shift": 80,
            "finger": 4,
            "id": 18
        },
        {
            "primary": 103,
            "shift": 71,
            "finger": 4,
            "id": 19
        },
        {
            "primary": 106,
            "shift": 74,
            "finger": 7,
            "id": 20
        },
        {
            "primary": 108,
            "shift": 76,
            "finger": 7,
            "id": 21
        },
        {
            "primary": 117,
            "shift": 85,
            "finger": 8,
            "id": 22
        },
        {
            "primary": 121,
            "shift": 89,
            "finger": 9,
            "id": 23
        },
        {
            "primary": 59,
            "shift": 58,
            "finger": 10,
            "id": 24
        },
        {
            "primary": 91,
            "shift": 123,
            "finger": 10,
            "id": 25
        },
        {
            "primary": 93,
            "shift": 125,
            "finger": 10,
            "id": 26
        },
        {
            "primary": 13,
            "finger": 10,
            "id": 27
        },
        {
            "primary": 8,
            "finger": 1,
            "id": 28
        },
        {
            "primary": 97,
            "shift": 65,
            "finger": 1,
            "id": 29
        },
        {
            "primary": 114,
            "shift": 82,
            "finger": 2,
            "id": 30
        },
        {
            "primary": 115,
            "shift": 83,
            "finger": 3,
            "id": 31
        },
        {
            "primary": 116,
            "shift": 84,
            "finger": 4,
            "id": 32
        },
        {
            "primary": 100,
            "shift": 68,
            "finger": 4,
            "id": 33
        },
        {
            "primary": 104,
            "shift": 72,
            "finger": 7,
            "id": 34
        },
        {
            "primary": 110,
            "shift": 78,
            "finger": 7,
            "id": 35
        },
        {
            "primary": 101,
            "shift": 69,
            "finger": 8,
            "id": 36
        },
        {
            "primary": 105,
            "shift": 73,
            "finger": 9,
            "id": 37
        },
        {
            "primary": 111,
            "shift": 79,
            "finger": 10,
            "id": 38
        },
        {
            "primary": 39,
            "shift": 64,
            "finger": 10,
            "id": 39
        },
        {
            "primary": 35,
            "shift": 126,
            "finger": 10,
            "id": 40
        },
        {
            "primary": 16,
            "finger": 1,
            "id": 41
        },
        {
            "primary": 92,
            "shift": 124,
            "finger": 1,
            "id": 42
        },
        {
            "primary": 122,
            "shift": 90,
            "finger": 1,
            "id": 43
        },
        {
            "primary": 120,
            "shift": 88,
            "finger": 2,
            "id": 44
        },
        {
            "primary": 99,
            "shift": 67,
            "finger": 3,
            "id": 45
        },
        {
            "primary": 118,
            "shift": 86,
            "finger": 4,
            "id": 46
        },
        {
            "primary": 98,
            "shift": 66,
            "finger": 4,
            "id": 47
        },
        {
            "primary": 107,
            "shift": 75,
            "finger": 7,
            "id": 48
        },
        {
            "primary": 109,
            "shift": 77,
            "finger": 7,
            "id": 49
        },
        {
            "primary": 44,
            "shift": 60,
            "finger": 8,
            "id": 50
        },
        {
            "primary": 46,
            "shift": 62,
            "finger": 9,
            "id": 51
        },
        {
            "primary": 47,
            "shift": 63,
            "finger": 10,
            "id": 52
        },
        {
            "primary": -16,
            "finger": 10,
            "id": 53
        },
        {
            "primary": 17,
            "finger": 5,
            "id": 54
        },
        {
            "primary": -91,
            "finger": 5,
            "id": 55
        },
        {
            "primary": 18,
            "finger": 5,
            "id": 56
        },
        {
            "primary": 32,
            "finger": 5,
            "id": 57
        },
        {
            "primary": -18,
            "finger": 6,
            "id": 58
        },
        {
            "primary": -91,
            "finger": 6,
            "id": 59
        },
        {
            "primary": -93,
            "finger": 6,
            "id": 60
        },
        {
            "primary": 17,
            "finger": 6,
            "id": 61
        }
    ]
}

KB.keySet.european.colemak_dh = {
    "label": "Colemak-DH",
    "author": "SteveP",
    "moreInfoUrl": "https://colemakmods.github.io/mod-dh/",
    "moreInfoText": "Colemak Mod-DH",
    "fingerStart": {
        "1": 29,
        "2": 30,
        "3": 31,
        "4": 32,
        "5": 57,
        "6": 57,
        "7": 35,
        "8": 36,
        "9": 37,
        "10": 38,
        "11": 57,
        "false": -1
    },
    "keyboardType": "european",
    "keys": [
        {
            "primary": 96,
            "shift": 172,
            "finger": 1,
            "id": 0
        },
        {
            "primary": 49,
            "shift": 33,
            "finger": 1,
            "id": 1
        },
        {
            "primary": 50,
            "shift": 34,
            "finger": 2,
            "id": 2
        },
        {
            "primary": 51,
            "shift": 163,
            "finger": 3,
            "id": 3
        },
        {
            "primary": 52,
            "shift": 36,
            "finger": 3,
            "id": 4
        },
        {
            "primary": 53,
            "shift": 37,
            "finger": 4,
            "id": 5
        },
        {
            "primary": 54,
            "shift": 94,
            "finger": 4,
            "id": 6
        },
        {
            "primary": 55,
            "shift": 38,
            "finger": 7,
            "id": 7
        },
        {
            "primary": 56,
            "shift": 42,
            "finger": 8,
            "id": 8
        },
        {
            "primary": 57,
            "shift": 40,
            "finger": 8,
            "id": 9
        },
        {
            "primary": 48,
            "shift": 41,
            "finger": 9,
            "id": 10
        },
        {
            "primary": 45,
            "shift": 95,
            "finger": 10,
            "id": 11
        },
        {
            "primary": 61,
            "shift": 43,
            "finger": 10,
            "id": 12
        },
        {
            "primary": 8,
            "finger": 10,
            "id": 13
        },
        {
            "primary": 9,
            "finger": 1,
            "id": 14
        },
        {
            "primary": 113,
            "shift": 81,
            "finger": 1,
            "id": 15
        },
        {
            "primary": 119,
            "shift": 87,
            "finger": 2,
            "id": 16
        },
        {
            "primary": 102,
            "shift": 70,
            "finger": 3,
            "id": 17
        },
        {
            "primary": 112,
            "shift": 80,
            "finger": 4,
            "id": 18
        },
        {
            "primary": 98,
            "shift": 66,
            "finger": 4,
            "id": 19
        },
        {
            "primary": 106,
            "shift": 74,
            "finger": 7,
            "id": 20
        },
        {
            "primary": 108,
            "shift": 76,
            "finger": 7,
            "id": 21
        },
        {
            "primary": 117,
            "shift": 85,
            "finger": 8,
            "id": 22
        },
        {
            "primary": 121,
            "shift": 89,
            "finger": 9,
            "id": 23
        },
        {
            "primary": 59,
            "shift": 58,
            "finger": 10,
            "id": 24
        },
        {
            "primary": 91,
            "shift": 123,
            "finger": 10,
            "id": 25
        },
        {
            "primary": 93,
            "shift": 125,
            "finger": 10,
            "id": 26
        },
        {
            "primary": 13,
            "finger": 10,
            "id": 27
        },
        {
            "primary": 8,
            "finger": 1,
            "id": 28
        },
        {
            "primary": 97,
            "shift": 65,
            "finger": 1,
            "id": 29
        },
        {
            "primary": 114,
            "shift": 82,
            "finger": 2,
            "id": 30
        },
        {
            "primary": 115,
            "shift": 83,
            "finger": 3,
            "id": 31
        },
        {
            "primary": 116,
            "shift": 84,
            "finger": 4,
            "id": 32
        },
        {
            "primary": 103,
            "shift": 71,
            "finger": 4,
            "id": 33
        },
        {
            "primary": 109,
            "shift": 77,
            "finger": 7,
            "id": 34
        },
        {
            "primary": 110,
            "shift": 78,
            "finger": 7,
            "id": 35
        },
        {
            "primary": 101,
            "shift": 69,
            "finger": 8,
            "id": 36
        },
        {
            "primary": 105,
            "shift": 73,
            "finger": 9,
            "id": 37
        },
        {
            "primary": 111,
            "shift": 79,
            "finger": 10,
            "id": 38
        },
        {
            "primary": 39,
            "shift": 64,
            "finger": 10,
            "id": 39
        },
        {
            "primary": 35,
            "shift": 126,
            "finger": 10,
            "id": 40
        },
        {
            "primary": 16,
            "finger": 1,
            "id": 41
        },
        {
            "primary": 122,
            "shift": 90,
            "finger": 1,
            "id": 42
        },
        {
            "primary": 120,
            "shift": 88,
            "finger": 2,
            "id": 43
        },
        {
            "primary": 99,
            "shift": 67,
            "finger": 3,
            "id": 44
        },
        {
            "primary": 100,
            "shift": 68,
            "finger": 4,
            "id": 45
        },
        {
            "primary": 118,
            "shift": 86,
            "finger": 4,
            "id": 46
        },
        {
            "primary": 92,
            "shift": 124,
            "finger": 4,
            "id": 47
        },
        {
            "primary": 107,
            "shift": 75,
            "finger": 7,
            "id": 48
        },
        {
            "primary": 104,
            "shift": 72,
            "finger": 7,
            "id": 49
        },
        {
            "primary": 44,
            "shift": 60,
            "finger": 8,
            "id": 50
        },
        {
            "primary": 46,
            "shift": 62,
            "finger": 9,
            "id": 51
        },
        {
            "primary": 47,
            "shift": 63,
            "finger": 10,
            "id": 52
        },
        {
            "primary": -16,
            "finger": 10,
            "id": 53
        },
        {
            "primary": 17,
            "finger": 5,
            "id": 54
        },
        {
            "primary": -91,
            "finger": 5,
            "id": 55
        },
        {
            "primary": 18,
            "finger": 5,
            "id": 56
        },
        {
            "primary": 32,
            "finger": 5,
            "id": 57
        },
        {
            "primary": -18,
            "finger": 6,
            "id": 58
        },
        {
            "primary": -91,
            "finger": 6,
            "id": 59
        },
        {
            "primary": -93,
            "finger": 6,
            "id": 60
        },
        {
            "primary": 17,
            "finger": 6,
            "id": 61
        }
    ]
}

KB.keySet.european.qwerty = {
    label: "QWERTY",
    author: "C. L. Sholes, E. Remington",
    moreInfoUrl: "http://en.wikipedia.org/wiki/Qwerty", 
    moreInfoText: "Wikipedia Entry",
   "fingerStart":{
      "1":29,
      "2":30,
      "3":31,
      "4":32,
      "5":57,
      "6":58,
      "7":35,
      "8":36,
      "9":37,
      "10":38,
      "11":57,
      "false":-1
   },
    keyboardType: "european",
    keys: [ 
        {primary:"`",   shift:172,  finger:KB.finger.LEFT_PINKY},//0
        {primary:"1",   shift:"!",  finger:KB.finger.LEFT_PINKY},//1
        {primary:"2",   shift:"\"",  finger:KB.finger.LEFT_RING},//2
        {primary:"3",   shift:163,  finger:KB.finger.LEFT_MIDDLE},//3
        {primary:"4",   shift:"$",  finger:KB.finger.LEFT_INDEX},//4
        {primary:"5",   shift:"%",  finger:KB.finger.LEFT_INDEX},//5
        {primary:"6",   shift:"^",  finger:KB.finger.RIGHT_INDEX},//6
        {primary:"7",   shift:"&",  finger:KB.finger.RIGHT_INDEX},//7
        {primary:"8",   shift:"*",  finger:KB.finger.RIGHT_MIDDLE},//8
        {primary:"9",   shift:"(",  finger:KB.finger.RIGHT_RING},//9
        {primary:"0",   shift:")",  finger:KB.finger.RIGHT_PINKY},//10
        {primary:"-",   shift:"_",  finger:KB.finger.RIGHT_PINKY},//11
        {primary:"=",   shift:"+",  finger:KB.finger.RIGHT_PINKY},//12
        {primary:8,                 finger:KB.finger.RIGHT_PINKY},//13
    
        {primary:9,                 finger:KB.finger.LEFT_PINKY},//14
        {primary:"q",   shift:"Q",  finger:KB.finger.LEFT_PINKY},//15
        {primary:"w",   shift:"W",  finger:KB.finger.LEFT_RING},//16
        {primary:"e",   shift:"E",  finger:KB.finger.LEFT_MIDDLE},//17
        {primary:"r",   shift:"R",  finger:KB.finger.LEFT_INDEX},//18
        {primary:"t",   shift:"T",  finger:KB.finger.LEFT_INDEX},//19
        {primary:"y",   shift:"Y",  finger:KB.finger.RIGHT_INDEX},//20
        {primary:"u",   shift:"U",  finger:KB.finger.RIGHT_INDEX},//21
        {primary:"i",   shift:"I",  finger:KB.finger.RIGHT_MIDDLE},//22
        {primary:"o",   shift:"O",  finger:KB.finger.RIGHT_RING},//23
        {primary:"p",   shift:"P",  finger:KB.finger.RIGHT_PINKY},//24
        {primary:"[",   shift:"{",  finger:KB.finger.RIGHT_PINKY},//25
        {primary:"]",   shift:"}",  finger:KB.finger.RIGHT_PINKY},//26
        {primary:"\r",  finger:KB.finger.RIGHT_PINKY},//27
        
        {primary:20,               finger:KB.finger.LEFT_PINKY},//28
        {primary:"a",  shift:"A",  finger:KB.finger.LEFT_PINKY},//29
        {primary:"s",  shift:"S",  finger:KB.finger.LEFT_RING},//30
        {primary:"d",  shift:"D",  finger:KB.finger.LEFT_MIDDLE},//31
        {primary:"f",  shift:"F",  finger:KB.finger.LEFT_INDEX},//32
        {primary:"g",  shift:"G",  finger:KB.finger.LEFT_INDEX},//33
        {primary:"h",  shift:"H",  finger:KB.finger.RIGHT_INDEX},//34
        {primary:"j",  shift:"J",  finger:KB.finger.RIGHT_INDEX},//35
        {primary:"k",  shift:"K",  finger:KB.finger.RIGHT_MIDDLE},//36
        {primary:"l",  shift:"L",  finger:KB.finger.RIGHT_RING},//37
        {primary:";",  shift:":",  finger:KB.finger.RIGHT_PINKY},//38
        {primary:"'",  shift:"@",  finger:KB.finger.RIGHT_PINKY},//39
        {primary:"#",  shift:"~",  finger:KB.finger.RIGHT_PINKY},//39
        
        
        {primary:16,                finger:KB.finger.LEFT_PINKY},//41
        {primary:"|",  shift:"\\", finger:KB.finger.LEFT_PINKY},//42
        {primary:"z",  shift:"Z",  finger:KB.finger.LEFT_PINKY},//42
        {primary:"x",  shift:"X",  finger:KB.finger.LEFT_RING},//43
        {primary:"c",  shift:"C",  finger:KB.finger.LEFT_MIDDLE},//44
        {primary:"v",  shift:"V",  finger:KB.finger.LEFT_INDEX},//45
        {primary:"b",  shift:"B",  finger:KB.finger.LEFT_INDEX},//46
        {primary:"n",  shift:"N",  finger:KB.finger.RIGHT_INDEX},//47
        {primary:"m",  shift:"M",  finger:KB.finger.RIGHT_INDEX},//48
        {primary:",",  shift:"<",  finger:KB.finger.RIGHT_MIDDLE},//49
        {primary:".",  shift:">",  finger:KB.finger.RIGHT_RING},//50
        {primary:"/",  shift:"?",  finger:KB.finger.RIGHT_PINKY},//51
        {primary:16,               finger:KB.finger.RIGHT_PINKY},//52
        
        {primary:17,               finger:KB.finger.LEFT_THUMB},//53
        {primary:-91,              finger:KB.finger.LEFT_THUMB},//54
        {primary:18,               finger:KB.finger.LEFT_THUMB},//55
        {primary:" ",              finger:KB.finger.LEFT_THUMB},//56
        {primary:-18,              finger:KB.finger.RIGHT_THUMB},//57
        {primary:-91,              finger:KB.finger.RIGHT_THUMB},//58
        {primary:-93,              finger:KB.finger.RIGHT_THUMB},//59
        {primary:17,               finger:KB.finger.RIGHT_THUMB}//60
    ]
};

// ----------------------------------------------------------------------------
// Update Key Sets
// ----------------------------------------------------------------------------

/*
    The below code converts the raw characters to numbers.
*/
// set ID of each key in the main layouts
(function() {
    var ii,
        jj,
        pp,
        prop,
        props,
        klen,
        layout,
        key,
        layouts = [],
        llen = layouts.length,
        keySetName;
    
    for (keySetName in KB.keySet) {
        layouts = [];
        for (jj in KB.keySet[keySetName]) {
            if ( KB.keySet[keySetName].hasOwnProperty(jj) ) {
                layouts.push(jj);
            }
        }
        llen = layouts.length;
        
        for (jj = 0; jj < llen; jj++) {
            layout = layouts[jj];
            klen = KB.keySet[keySetName][layout].keys.length;
            for (ii = 0; ii < klen; ii++) {
                key = KB.keySet[keySetName][layout].keys[ii]; 
                key.id=ii;
                props = ["primary","shift","altGr","shiftAltGr"];
                for (pp = 0, prop = props[pp]; pp < props.length; prop = props[++pp]) {
                    if (typeof key[prop] === "string" && key[prop].length !== 0) {
                       key[prop] = key[prop].charCodeAt(0);
                    }
                }
            }
            
            var fs = KB.keySet[keySetName][layout].fingerStart;
            var spaceKey = 56;
            if (keySetName === 'european' || keySetName === 'european_ss') {
                spaceKey = 57;
            } else if (keySetName === 'ergodox') {
                spaceKey = 66;
            }

            fs[KB.finger.LEFT_PINKY] = (typeof fs[KB.finger.LEFT_PINKY] === "undefined") ? 29 : fs[KB.finger.LEFT_PINKY];
            fs[KB.finger.LEFT_RING] = (typeof fs[KB.finger.LEFT_RING] === "undefined") ? 30 : fs[KB.finger.LEFT_RING];
            fs[KB.finger.LEFT_MIDDLE] = (typeof fs[KB.finger.LEFT_MIDDLE] === "undefined") ? 31 : fs[KB.finger.LEFT_MIDDLE];
            fs[KB.finger.LEFT_INDEX] = (typeof fs[KB.finger.LEFT_INDEX] === "undefined") ? 32 : fs[KB.finger.LEFT_INDEX];
            fs[KB.finger.LEFT_THUMB] = (typeof fs[KB.finger.LEFT_THUMB] === "undefined") ? spaceKey : fs[KB.finger.LEFT_THUMB];
            fs[KB.finger.RIGHT_THUMB] = (typeof fs[KB.finger.RIGHT_THUMB] === "undefined") ? spaceKey : fs[KB.finger.RIGHT_THUMB];
            fs[KB.finger.RIGHT_INDEX] = (typeof fs[KB.finger.RIGHT_INDEX] === "undefined") ? 35 : fs[KB.finger.RIGHT_INDEX];
            fs[KB.finger.RIGHT_MIDDLE] = (typeof fs[KB.finger.RIGHT_MIDDLE] === "undefined") ? 36 : fs[KB.finger.RIGHT_MIDDLE];
            fs[KB.finger.RIGHT_RING] = (typeof fs[KB.finger.RIGHT_RING] === "undefined") ? 37 : fs[KB.finger.RIGHT_RING];
            fs[KB.finger.RIGHT_PINKY] = (typeof fs[KB.finger.RIGHT_PINKY] === "undefined") ? 38 : fs[KB.finger.RIGHT_PINKY];
            fs[KB.finger.BOTH_THUMBS] =  (typeof fs[KB.finger.BOTH_THUMBS] === "undefined") ? spaceKey : fs[KB.finger.BOTH_THUMBS];
        }
    }
})();
