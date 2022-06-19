/*
	Service for computing keyboard efficiency

    It is simply a wrapper around the KLA.Analyzer singleton
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('analyzer', [
	function() {
        return KLA.Analyzer;
	}

])
/*
	Service for maintaining the keyboards
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('keyboards', [

	function() {
        var me = {},
            layouts = [];

        // setup layouts
    
        layouts[0] = {};
        layouts[0].keySet = $.extend(true, {}, KB.keySet.standard.qwerty);
        layouts[0].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[0].keyboard = null;
        
        layouts[1] = {};
        layouts[1].keySet = $.extend(true, {}, KB.keySet.european.azerty);
        layouts[1].keyMap = $.extend(true, {}, KB.keyMap.european.s683_225);
        layouts[1].keyboard = null;

        layouts[2] = {};
        layouts[2].keySet = $.extend(true, {}, KB.keySet.standard.simplifiedDvorak);
        layouts[2].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[2].keyboard = null;

        layouts[3] = {};
        layouts[3].keySet = $.extend(true, {}, KB.keySet.standard.programmerDvorak);
        layouts[3].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[3].keyboard = null;

        layouts[4] = {};
        layouts[4].keySet = $.extend(true, {}, KB.keySet.standard.colemak);
        layouts[4].keyMap = $.extend(true, {}, KB.keyMap.standard.s683_225);
        layouts[4].keyboard = null;
        
        layouts[5] = {};
        layouts[5].keySet = $.extend(true, {}, KB.keySet.european.colemak_dh);
        layouts[5].keyMap = $.extend(true, {}, KB.keyMap.european.s683_225);
        layouts[5].keyboard = null;
        
        // public functions

        me.registerKeyboard = function(index, elmId) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            layouts[index].keyboard = new KB.Keyboard({
                container: elmId,
                layout: layouts[index]
            });
        };

        me.forEach = function(cb) {
            var ii = 0;
            for (ii = 0; ii < layouts.length; ii++) {
                cb(layouts[ii]);
            }
        };

        me.getKeyMapFromKeyboardType = function(keyboardType) {
            if ( typeof KB.keyMap[keyboardType] === 'undefined'
                    || typeof KB.keyMap[keyboardType].s683_225 === 'undefined' ) {
                throw Error("Invalid keyboard type.");
            }

            return KB.keyMap[keyboardType].s683_225;
        };

        /*
            keys - array of keys ordered from most popular to least
        */
        me.createPersonalLayout = function(keys, refKeySet) {

            var topQwertyKeys = [31, 36, 32, 35, 30, 37, 33, 34, 29, 38, 18, 21, 17, 22, 16, 23, 45, 47, 48, 19, 39, 15, 24, 44, 20, 46, 25, 26, 42, 43, 49, 50, 51, 27], 
                tqkLookup = {},
                ii = 0, 
                jj,
                key,
                orderedKeys = [];
            for (ii = 0; ii < topQwertyKeys.length; ii++) {
                tqkLookup[ topQwertyKeys[ii] ] = true;
            }

            var pKeySet = $.extend(true, {}, refKeySet);
            pKeySet.label = "Personalized";
            
            for (ii = 0; ii < keys.length; ii++) {
                if (tqkLookup[ keys[ii].index ] && keys[ii].count > 0) {
                    orderedKeys.push(pKeySet.keys[keys[ii].index]);
                    orderedKeys[orderedKeys.length-1].index = keys[ii].index;
                }
            }
            
            for (ii = 0; ii < orderedKeys.length; ii++) {
                var kIndex = topQwertyKeys[ii];
                for (jj = 0; jj < keys.length; jj++) {
                    if ( keys[jj].index === kIndex && keys[jj].count === 0) {
                        orderedKeys.push(pKeySet.keys[keys[jj].index]);
                        orderedKeys[orderedKeys.length-1].index = keys[jj].index;
                    }
                }
            }
            
            for (ii = 0; ii < orderedKeys.length; ii++) {
                pKeySet.keys[ topQwertyKeys[ii] ] = orderedKeys[ ii ];
            }

            // copy over finger information
            for (ii = 0; ii < pKeySet.keys.length; ii++) {
                pKeySet.keys[ii].finger = refKeySet.keys[ii].finger;
                pKeySet.keys[ii].id = ii;
            }
            
            return pKeySet;
        };

        me.getLayouts = function() {
            return layouts;
        }

        me.getLayout = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index];
        };

        me.setLayoutAutoKeyMap = function(index, keySet, filter="all") {
            return me.setLayout(index, {
                keySet: $.extend(true, {}, keySet),
                keyMap: $.extend(true, {}, me.getKeyMapFromKeyboardType(keySet.keyboardType))
            }, filter);
        }

        me.setLayout = function(index, layout, filter="all") {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }
            var mismatchError = {valid: false, reason: "Keyboard type mismatch"};
            if (layout.keySet.keyboardType !== layouts[index].keySet.keyboardType
                    && filter !== "all")
                return mismatchError;

            // layouts[index].keySet = layout.keySet;
            var ks = layout.keySet,
                nks = $.extend(true, {}, layouts[index].keySet);
                sameType = ks.keyboardType === nks.keyboardType,
                keys = ks.keys;

            var isLetter = function(code) {
                return String.fromCharCode(code).toUpperCase() !==
                        String.fromCharCode(code).toLowerCase();
            }
            
            for (prop of ['label', 'author', 'authorUrl', 'moreInfoUrl',
                    'moreInfoText', 'fingerStart', 'keyboardType'])
                if (!sameType && ks[prop] === KB.Key.IGNORE)
                    return mismatchError;
                else if (filter === "all")
                    if (typeof ks[prop] !== "undefined" && ks[prop] !== KB.Key.IGNORE)
                        nks[prop] = ks[prop];
                    else if (typeof ks[prop] === 'undefined' && typeof nks[prop] !== 'undefined')
                        delete nks[prop];

            nks.keys = nks.keys.filter(
                function(k) {
                    return keys.map(function(kk) { return kk.id; }).includes(k.id);
                }
            );
            var ii, jj, key, found, oc, nc;
            for (ii = 0; ii < keys.length; ii++) {  // each key of loadable layout

                // find target key with same id
                found = false;
                for (jj = 0; jj < nks.keys.length; jj++)  
                    if (nks.keys[jj].id === keys[ii].id) { found = true; break; }
                if (!found) { nks.keys.push(keys[ii]); continue; }

                key = keys[ii];
                for (prop of ['primary', 'shift', 'altGr', 'shiftAltGr', 'finger']) {
                    if (key[prop] === KB.Key.IGNORE)
                        if (sameType) continue;
                        else return mismatchError;
                    if (filter === 'altGr' && prop !== 'altGr' && prop !== 'shiftAltGr')
                        continue;
                    if (filter === 'non-letters'
                            && ( isLetter(nks.keys[jj][prop]) || isLetter(key[prop]) || prop === 'finger' )
                    ) continue;
                    if (typeof key[prop] === "undefined" || key[prop] === -1) {
                        if (typeof nks.keys[jj][prop] !== 'undefined')
                            delete nks.keys[jj][prop];
                    } else
                        nks.keys[jj][prop] = key[prop];
                }
            }

            layouts[index].keySet = nks;
            layouts[index].keyMap = layout.keyMap;
            if (layouts[index].keyboard !== null) {
                layouts[index].keyboard.setLayout( layouts[index] );
            }
            return {valid: true};
        };

        me.convertType = function(index) {
            var keySet = layouts[index].keySet;
            var keyMap = layouts[index].keyMap;

            var newType = keySet.keyboardType;
            var initalKeySet = KB.keySet[newType].inital;

            var newKeySet = $.extend(true, {}, keySet);
            newKeySet.fingerStart = $.extend(true, {}, initalKeySet.fingerStart);
            newKeySet.keys = [];
            var newKeyMap = KB.keyMap[newType].s683_225;
            var newLength = Object.keys(newKeyMap)
                    .filter(function(k) { return !isNaN(k); }).length;

            var scan, id, sourceKeySet, newKey, initalFinger, startFingers;
            for (var ii = 0; ii < newLength; ii++) {

                // translate id: from ii (target) to id (current)
                scan = newKeyMap[ii].scan;
                id = Object.keys(keyMap).find(function(id) {
                    return keyMap[id].scan === scan;
                });

                sourceKeySet = (id !== undefined)? keySet : initalKeySet;

                newKey = sourceKeySet.keys
                        .find(function(k) { return k.id == (id||ii); });
                newKey = $.extend(true, {}, newKey);
                newKey.id = ii;
                initalFinger = initalKeySet.keys[ii].finger;
                if (id !== undefined
                        && newKeyMap[ii].row === keyMap[id].row
                        && KB.finger.sameGroup(newKey.finger, initalFinger)) {
                    // keep finger and arrange finger start if present
                    startFingers = Object.keys(sourceKeySet.fingerStart)
                            .filter(function(finger) {
                                return sourceKeySet.fingerStart[finger] == id;
                            });
                    for (var startFinger of startFingers)
                        newKeySet.fingerStart[startFinger] = ii;
                } else
                    newKey.finger = initalFinger;
                newKeySet.keys.push(newKey);
            }
            layouts[index].keySet = newKeySet;
            layouts[index].keyMap = newKeyMap;
            if (layouts[index].keyboard !== null) {
                layouts[index].keyboard.setLayout( layouts[index] );
            }
        }

        me.getKeySet = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet;
        };

        me.setLayoutName = function(index, name) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            layouts[index].keySet.label = name;
        };
        me.getLayoutName = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.label;
        };

        me.getMoreInfoUrl = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.moreInfoUrl;
        };
        me.getMoreInfoText = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.moreInfoText;
        };

        me.getKeyboardType = function(index) {
            if (typeof layouts[index] === 'undefined') {
                throw Error("keyboards service: Invalid index");
            }

            return layouts[index].keySet.keyboardType;
        };

        me.parseKeySets = function(txt) {
            try {
                var nn = JSON.parse(txt);
            } catch (err) {
                return {
                    valid: false,
                    reason: "Invalid input."
                };
            }
            if (Array.isArray(nn.layouts)) {
                var n, res, vv = [];
                for (n of nn.layouts) {
                    res = me.parseKeySet(n);
                    if (!res.valid) return res;
                    vv.push(res.keySet);
                }
                return {
                    valid: true,
                    keySet: vv
                };
            } else return me.parseKeySet(nn);
        }

        me.parseKeySet = function(nn) {
            var vv = {}, prop, ii, valid = true;
            if (typeof nn.label === "string" || nn.label === KB.Key.IGNORE) {
                vv.label = nn.label;
            } else {
                return {
                    valid: false,
                    reason: "Label not a string."
                };
            }
            if (typeof nn.fingerStart === "object") {
                vv.fingerStart = {};
                for (prop in nn.fingerStart) {
                    if (typeof nn.fingerStart[prop] === "number") {
                        vv.fingerStart[prop] = nn.fingerStart[prop];
                    } else {
                        return {
                            valid: false,
                            reason: "Finger start is not a number."
                        };
                    }
                }
            } else {
                return {
                    valid: false,
                    reason: "Finger start is not a object."
                };
            }
            if (typeof nn.keyboardType === "string" || nn.keyboardType === KB.Key.IGNORE) {
                vv.keyboardType = nn.keyboardType;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard type is not a string."
                };
            }
            if (typeof nn.author === "string" || typeof nn.author === 'undefined') {
                vv.author = nn.author || 'Unknown';
            } else if (nn.author === KB.Key.IGNORE) {
                vv.author = nn.author;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard author is defined and is not a string."
                };
            }

            // deprecated, ignore
            if (typeof nn.authorUrl === "string" || typeof nn.authorUrl === 'undefined') {
                vv.authorUrl = nn.authorUrl || '';
            } else if (nn.authorUrl === KB.Key.IGNORE) {
                vv.authorUrl = nn.authorUrl;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard authorUrl is defined and is not a string."
                };
            }


            if (typeof nn.moreInfoUrl === "string" || typeof nn.moreInfoUrl === 'undefined') {
                vv.moreInfoUrl = nn.moreInfoUrl || '';
            } else if (nn.moreInfoUrl === KB.Key.IGNORE) {
                vv.moreInfoUrl = nn.moreInfoUrl;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard moreInfoUrl is defined and is not a string."
                };
            }
            if (typeof nn.moreInfoText === "string" || typeof nn.moreInfoText === 'undefined') {
                vv.moreInfoText = nn.moreInfoText || '';
            } else if (nn.moreInfoText === KB.Key.IGNORE) {
                vv.moreInfoText = nn.moreInfoText;
            } else {
                return {
                    valid: false,
                    reason: "Keyboard moreInfoText is defined and is not a string."
                };
            }

            if (typeof nn.keys === "object" && typeof nn.keys.length === "number") {
                vv.keys = [];
                outterloop: for (ii = 0; ii < nn.keys.length; ii++) {
                    if (typeof nn.keys[ii] === "object") {
                        for (prop in nn.keys[ii]) {
                            if (typeof nn.keys[ii][prop] !== "string" && typeof nn.keys[ii][prop] !== "number") {
                                return {
                                    valid: false,
                                    reason: "Key prop is not a string or number."
                                };
                            }
                        }
                        vv.keys.push(nn.keys[ii]);
                    } else {
                        return {
                            valid: false,
                            reason: "Key item is not an object."
                        };
                    }
                }
            } else {
                return {
                    valid: false,
                    reason: "Keys are not an array."
                };
            }
            
            return {
                valid: true,
                keySet: vv
            };
        }; // end function

        return me;
	}

])

/*
    Service for storing globally available data
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('library', [
    function() {
        var me = {},
            data = {};

        me.get = function(prop) {
            if (typeof prop === 'undefined') {
                return data;
            } else {
                return data[prop];
            }
        };

        me.set = function(prop, val) {
            data[prop] = val;
        };

        return me;
    }

])
/*
	Generates and formats the results
*/

var appServices = appServices || angular.module('kla.services', []);

var shouldGeneratePersonalizedLayout = false;

appServices.factory('resultsGenerator', ['$log', 'keyboards', 'analyzer', 'library',

	function($log, keyboards, analyzer, library) {
        var me = {},
            layouts = []
            ;

        /*
			Throws an Error if it fails
        */
        me.go = function(txt, settings) {

            if (settings.ctrlKeys)
                txt = txt.replaceAll(/<u:-?[0-9A-Fa-f]+>/g, function(a) {
                    return String.fromCharCode(parseInt(a.slice(3, -1), 16));
                });

            if (settings.autoIndent !== "none") {
                var indents, taboids, taboidLengths,
                        hist = {}, weights = {}, tabWidth,
                        indent, dIndentLength, prevIndent = "", newIndent,
                        backspace = "\x08";
                indents = txt.replaceAll(/^[\t ]+$/gm, "").match(/^[\t ]+/gm);
                if (indents !== null) {
                    taboids = indents.join("\n").match(/ +/g);
                    if (taboids !== null) {

                        // get tab width
                        taboidLengths = taboids.map(function(t) { return t.length; });
                        taboidLengths.forEach(function(l) { hist[l] = (hist[l] + 1) || 1; });
                        Object.keys(hist).forEach(function(h) {
                            weights[h] = Object.keys(hist)
                                    .filter(function(k) { return k % h == 0; })
                                    .map(function(k) { return hist[k]; /* *Math.exp(h - k);*/ })
                                    .reduce(function(a, b) { return a + b; }) * (Math.log(h) + 1);
                        });
                        tabWidth = Number(Object.keys(weights).reduce(function(a, b) {
                            return (weights[a] > weights[b])? a : b;
                        }));
                        console.log("INDENT HIST:", hist);
                        console.log("INDENT WEIGHTS:", weights);
                        console.log("INTENDED TAB WIDTH: " + tabWidth);

                        tabInSpaces = new Array(tabWidth + 1).join(" ");

                        /*// replace taboids by tab characters
                        indents.forEach(function(i) {
                            var new_i = i.replaceAll(new RegExp(tabInSpaces, "g"), "\t");
                            txt = txt.replace(new RegExp("^" + i, "m"), new_i);
                        });*/
                        // replace tab characters by spaces
                        indents.forEach(function(i) {
                            var new_i = i.replaceAll(/\t/g, tabInSpaces);
                            txt = txt.replace(new RegExp("^" + i, "m"), new_i);
                        });

                        // process
                        switch (settings.autoIndent) {
                            case "simple":
                                txt = txt.split("\n");
                                for (ii = 0; ii < txt.length; ii++) {
                                    indent = txt[ii].match(/^ */)[0];
                                    dIndentLength = indent.length - prevIndent.length;
                                    if (dIndentLength >= 0)  // indent
                                        txt[ii] = txt[ii].slice(prevIndent.length);
                                    else  // unindent
                                        txt[ii] = Array(-dIndentLength + 1).join(backspace)
                                                + txt[ii].slice(indent.length);
                                    prevIndent = indent;

                                    if (tabWidth > 2 || true) {  // TODO: if (tabEffort < spaceEffort * tabWidth)
                                        indent = txt[ii].match(/^ */)[0];
                                        newIndent = indent.replaceAll(new RegExp(tabInSpaces, "g"), "\t");
                                        txt[ii] = txt[ii].replace(new RegExp("^" + indent, "m"), newIndent);
                                    }
                                }
                                txt = txt.join("\n");
                                // console.log(txt);
                                break;
                            case "smart":
                                txt = txt.replaceAll(/^ +/gm, ""); break;
                        }

                    }
                }
            }

            // --------------------------------------------------------------------
            // Create an analysis report on each layout

            var analysis = [];
            var kLayouts = [];
            keyboards.forEach(function(layout) {
                analysis[analysis.length] = analyzer.examine({
                    text: txt,
                    keyMap: layout.keyMap,
                    keySet: layout.keySet,
                    settings: settings,
                    reference: keyboards.getLayout(settings.refLayoutIndex)
                });

                var idx = kLayouts.length;
                kLayouts[idx] = {};
                kLayouts[idx].keyMap = layout.keyMap;
                kLayouts[idx].keySet = layout.keySet;
            });

            if (analysis.length === 0) {
                throw new Error('You must set at least 1 layout to display results.');
            }

            // ---------------------------------------------------------------------
            // create personal layout
        
            if (shouldGeneratePersonalizedLayout) {
                var qwertyAnalysis = analyzer.examine({
                    text: txt,
                    keyMap: KB.keyMap.standard.s683_225,
                    keySet: KB.keySet.standard.qwerty,
                    settings: settings
                });
                
                var qKeys = Array.prototype.sort.call(qwertyAnalysis.keyData, function(a, b) {
                    return b.count - a.count;
                });
                var pKeys = keyboards.createPersonalLayout(qKeys, KB.keySet.standard.qwerty);
                
                var newLayout = {};
                newLayout.keySet = pKeys;
                newLayout.keyMap = KB.keyMap.standard.s683_225;
                
                analysis[analysis.length] = analyzer.examine({
                    text: txt,
                    keyMap: newLayout.keyMap,
                    keySet: newLayout.keySet,
                    settings: settings
                });
                
                library.set('personalized', newLayout);
                library.set('inputText', txt);

                kLayouts.push(newLayout);

                $log.info( analysis );
            }

            // --------------------------------------------------------------------
            // Compute best layout
            
            var scores = analyzer.scoreLayouts(analysis);
            library.set('summary', {
                settings: $.extend(true, {}, settings),
                rankedLayouts: scores.finalList,
                isNew: true
            });

            // --------------------------------------------------------------------
            // Prepare charts

            var displayData = {};
            displayData['All'] = [  
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]},
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]} 
            ];
            displayData['Fingers'] = [
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},    
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]}, 
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]},
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]},  
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Left Hand'] =  [
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]}
            ];
            displayData['Right Hand'] = [
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Left Fingers vs Right Fingers vs Thumbs'] = [ 
                {label: 'Left Fingers', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY,  KB.finger.LEFT_RING,   KB.finger.LEFT_MIDDLE,  KB.finger.LEFT_INDEX]}, 
                {label: 'Right Fingers',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX, KB.finger.RIGHT_MIDDLE, KB.finger.RIGHT_RING, KB.finger.RIGHT_PINKY]},
                {label: 'Thumbs',       color: 'rgba(204,204,204,0.5)', data: [KB.finger.LEFT_THUMB,KB.finger.RIGHT_THUMB]}
            ];
            displayData['Hand vs Hand'] = [ 
                {label: 'Left Hand', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY,  KB.finger.LEFT_RING,   KB.finger.LEFT_MIDDLE,  KB.finger.LEFT_INDEX, KB.finger.LEFT_THUMB]}, 
                {label: 'Right Hand',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX, KB.finger.RIGHT_MIDDLE, KB.finger.RIGHT_RING, KB.finger.RIGHT_PINKY, KB.finger.RIGHT_THUMB]}
            ];
            displayData['Pinky vs Pinky'] = [ 
                {label: 'Left Pinky', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_PINKY]}, 
                {label: 'Right Pinky',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_PINKY]}
            ];
            displayData['Ring vs Ring'] = [ 
                {label: 'Left Ring', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]}, 
                {label: 'Right Ring',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_RING]}
            ];
            displayData['Middle vs Middle'] = [ 
                {label: 'Left Middle', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_MIDDLE]}, 
                {label: 'Right Middle',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}
            ];
            displayData['Index vs Index'] = [ 
                {label: 'Left Index', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Right Index',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}
            ];
            displayData['Thumb vs Thumb'] = [ 
                {label: 'Left Thumb', color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_THUMB]}, 
                {label: 'Right Thumb',color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_THUMB]}
            ];

            var rowDisplayData = {};
            rowDisplayData['All'] = [
                {label: 'Number Row',   color: 'rgba(  0,255,255,0.5)', data: [1]},
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]},
                {label: 'Spacebar Row', color: 'rgba(255,255,255,0.5)', data: [5]}
            ];
            rowDisplayData['Number, Top, Home, Bottom'] = [
                {label: 'Number Row',   color: 'rgba(  0,255,255,0.5)', data: [1]},
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]}
            ];
            rowDisplayData['Top, Home, Bottom'] = [
                {label: 'Top Row',      color: 'rgba(  0,  0,230,0.5)', data: [2]},
                {label: 'Home Row',     color: 'rgba(136,136,255,0.5)', data: [3]},
                {label: 'Bottom Row',   color: 'rgba(255,  0,255,0.5)', data: [4]}
            ];

            var unitConverter = function(rawVal, pixelsPerCm, unit) {
                var units = {};
                units["Centimeters"] = rawVal / pixelsPerCm;
                units["Meters"] = units["Centimeters"] * 0.01;
                units["Feet"] = units["Meters"] * 3.2808399;
                units["Miles"] = units["Meters"] * 0.000621371192;
                units['Key Presses'] = rawVal;
                return units[unit];
            }

            var displayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                for (idx = 0; idx < rawSeriesData.length; idx++) {
                    allSeriesLabels.push( rawSeriesData[idx].label );
                    if (!rawSeriesData[idx].visible) continue;

                    series = [];
                    seriesLabels.push( rawSeriesData[idx].label );
                    seriesColors.push( rawSeriesData[idx].color );

                    for (ii = 0; ii < displayData[displayType].length; ii++) {
                        items = displayData[displayType][ii].data;
                        val = 0;
                        for (jj = 0; jj < items.length; jj++) {
                            val += rawSeriesData[idx].data[ items[jj]-1 ];
                        }
                        series.push(val);
                    }

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;
                return seriesData;
            };


            var seriesColors = [
                'rgb(94, 121, 167)',
                'rgb(81, 121, 218)',
                'rgb(38, 155, 97)',
                'rgb(104, 190, 63)',
                'rgb(195, 105, 139)',
                'rgb(215, 166, 121)'
            ];
            var distSeriesData = [];
            var fuSeriesData = [];
            var rowSeriesData = [];
            var cfuSeriesData = [];
            var cfuidSeriesData = [];
            var chuSeriesData = [];
            var chuidSeriesData = [];
            var modSeriesData = [];
            var keyData = [];
            var ii, jj;

            for (ii = 0; ii < analysis.length; ii++) {
                keyData[ii] = [];
                for (jj = 0; jj < analysis[ii].keyData.length; jj++) {
                    var kData = {};
                    kData.count = analysis[ii].keyData[jj].count;
                    kData.cx = kLayouts[ii].keyMap[jj].cx;
                    kData.cy = kLayouts[ii].keyMap[jj].cy;
                    kData.primary = kLayouts[ii].keySet.keys[jj].primary;
                    kData.shift = kLayouts[ii].keySet.keys[jj].shift;
                    kData.altGr = kLayouts[ii].keySet.keys[jj].altGr;
                    kData.shiftAltGr = kLayouts[ii].keySet.keys[jj].shiftAltGr;
                    keyData[ii].push(kData);
                }
            }

            for (ii = 0; ii < analysis.length; ii++) {
                distSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].distance.slice(1),
                    visible: true
                });
                fuSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].fingerUsage.slice(1),
                    visible: true
                });
                rowSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].rowUsage.slice(0),
                    visible: true
                });
                cfuSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].consecFingerPress.slice(0),
                    visible: true
                });
                cfuidSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].consecFingerPressIgnoreDups.slice(0),
                    visible: true
                });
                chuSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].consecHandPress,
                    visible: true
                });
                chuidSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].consecHandPressIgnoreDups,
                    visible: true
                });
                modSeriesData.push({
                    label: analysis[ii].layoutTitle,
                    color: seriesColors[ii],
                    data: analysis[ii].modifierUse,
                    visible: true
                });
            }

            var cfuDisplayData = {};
            cfuDisplayData['nodups'] = [  
                {label: 'Left Pinky',   color: 'rgba(  0,255,255,0.5)', data: [KB.finger.LEFT_PINKY]},  
                {label: 'Left Ring',    color: 'rgba(  0,  0,230,0.5)', data: [KB.finger.LEFT_RING]},   
                {label: 'Left Middle',  color: 'rgba(136,136,255,0.5)', data: [KB.finger.LEFT_MIDDLE]},  
                {label: 'Left Index',   color: 'rgba(255,  0,255,0.5)', data: [KB.finger.LEFT_INDEX]}, 
                {label: 'Left Thumb',   color: 'rgba(255,255,255,0.5)', data: [KB.finger.LEFT_THUMB]},
                {label: 'Right Thumb',  color: 'rgba(204,204,204,0.5)', data: [KB.finger.RIGHT_THUMB]}, 
                {label: 'Right Index',  color: 'rgba(255,  0,  0,0.5)', data: [KB.finger.RIGHT_INDEX]}, 
                {label: 'Right Middle', color: 'rgba(255,136,  0,0.5)', data: [KB.finger.RIGHT_MIDDLE]}, 
                {label: 'Right Ring',   color: 'rgba(255,255,  0,0.5)', data: [KB.finger.RIGHT_RING]}, 
                {label: 'Right Pinky',  color: 'rgba(  0,255,  0,0.5)', data: [KB.finger.RIGHT_PINKY]} 
            ];
            cfuDisplayData['dups'] = cfuDisplayData['nodups'];

            var chuDisplayData = {};
            chuDisplayData['nodups'] = [  
                {label: 'Left Fingers', color: 'rgba(  0,  0,230,0.5)', data: ['left']}, 
                {label: 'Right Fingers',color: 'rgba(255,  0,  0,0.5)', data: ['right']},
                {label: 'Thumbs',       color: 'rgba(204,204,204,0.5)', data: ['thumbs']}
            ];
            chuDisplayData['dups'] = chuDisplayData['nodups'];

            var modDisplayData = {};
            modDisplayData['all'] = [  
                {label: 'Shift', color: 'rgba(  0,  0,230,0.5)', data: ['shift']}, 
                {label: 'AltGr', color: 'rgba(255,  0,  0,0.5)', data: ['altGr']},
                {label: 'Shift+AltGr',       color: 'rgba(204,204,204,0.5)', data: ['shiftAltGr']}
            ];

            var cfuDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData[displayType];
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = rawData[idx].data.slice(1);

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;
                return seriesData;
            }

            var chuDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData[displayType];
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = [];
                    series[0] = rawData[idx].data['left'];
                    series[1] = rawData[idx].data['right'];
                    series[2] = rawData[idx].data['thumbs'];
                    series.visible = rawData[idx].visible;

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;

                return seriesData;
            }

            var modDisplayFilter = function(displayType, unitType, rawSeriesData, displayData) {
                var idx, sIndex = 0, ii, jj, items, val,
                    seriesData = [], series,
                    labels = [], seriesLabels = [], allSeriesLabels = [],
                    colors = [], seriesColors = [];

                // separte out labels and colors
                for (ii = 0; ii < displayData[displayType].length; ii++) {
                    labels.push(displayData[displayType][ii].label);
                    colors.push(displayData[displayType][ii].color);
                }

                var rawData = rawSeriesData;
                for (idx = 0; idx < rawData.length; idx++) {
                    allSeriesLabels.push( rawData[idx].label );
                    if (!rawData[idx].visible) continue;

                    seriesLabels.push( rawData[idx].label );
                    seriesColors.push( rawData[idx].color );
                    series = [];
                    series[0] = rawData[idx].data['shift'];
                    series[1] = rawData[idx].data['altGr'];
                    series[2] = rawData[idx].data['shiftAltGr'];
                    series.visible = rawData[idx].visible;

                    var total = 0;
                    for (ii = 0; ii< series.length; ii++) {
                        total += series[ii];
                    }

                    for (ii = 0; ii< series.length; ii++) {
                        if ( unitType === 'Percent' ) {
                            series[ii] = (total > 0) ? (series[ii] / total) * 100 : 0;
                            series[ii] = (!isFinite(series[ii])) ? 0 : series[ii];
                        } else {
                            series[ii] = unitConverter(series[ii], analysis[idx].pixelsPerCm, unitType);
                        }
                    }
                    total = ( unitType === 'Percent' ) ? 100 : unitConverter(total, analysis[idx].pixelsPerCm, unitType);
                    series.total = total;
                    seriesData[sIndex] = series;
                    sIndex++;
                }
                seriesData.labels = labels;
                seriesData.colors = colors;
                seriesData.allSeriesLabels = allSeriesLabels;
                seriesData.seriesLabels = seriesLabels;
                seriesData.seriesColors = seriesColors;

                return seriesData;
            }

            // --------------------------------------------------------------------
            // Show results

            library.set('distance', {
                rawSeriesData: distSeriesData,
                displayFilter: displayFilter,
                displayType: 'All',
                displayData: displayData,
                units: 'Percent',
                allowedUnits: ['Percent']
            });

            library.set('fingerUsage', {
                rawSeriesData: fuSeriesData,
                displayFilter: displayFilter,
                displayType: 'Fingers',
                displayData: displayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('rowUsage', {
                rawSeriesData: rowSeriesData,
                displayFilter: displayFilter,
                displayType: 'All',
                displayData: rowDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('consecFingerPress', {
                rawSeriesData: {
                    'nodups': cfuSeriesData,
                    'dups': cfuidSeriesData,
                    0: {visible: true},
                    1: {visible: true},
                    2: {visible: true},
                    3: {visible: true},
                    4: {visible: true},
                    5: {visible: true},
                    length: 6
                },
                displayFilter: cfuDisplayFilter,
                displayType: 'nodups',
                displayData: cfuDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('consecHandPress', {
                rawSeriesData: {
                    'nodups': chuSeriesData,
                    'dups': chuidSeriesData,
                    0: {visible: true},
                    1: {visible: true},
                    2: {visible: true},
                    3: {visible: true},
                    4: {visible: true},
                    5: {visible: true},
                    length: 6
                },
                displayFilter: chuDisplayFilter,
                displayType: 'nodups',
                displayData: chuDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('modifierUse', {
                rawSeriesData: modSeriesData,
                displayFilter: modDisplayFilter,
                displayType: 'all',
                displayData: modDisplayData,
                units: 'Key Presses',
                allowedUnits: ['Key Presses', 'Percent']
            });

            library.set('layouts', kLayouts);
            library.set('keyData', keyData);

            return true;
        };

        return me;
	}

]);

/*
    Service for storing globally available data
*/

var appServices = appServices || angular.module('kla.services', []);

appServices.factory('textPresets', ['$http',
    function($http) {
        var service = {};

        service.load = function(preset) {
            var promise = $http.get('./presets/'+preset+'.txt').then(function (response) {
                return response.data;
            });
            return promise;
        };

        return service;
    }

])