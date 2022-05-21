angular.module('kla').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partials/about.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <h1>About</h1>\n" +
    "    </div>\n" +
    "    <p>\n" +
    "        This application allows you to analyze and visualize the typing patterns you create when you use different keyboard layouts, such as the\n" +
    "        <a href=\"https://en.wikipedia.org/wiki/QWERTY\">QWERTY</a>, <a href=\"http://www.theworldofstuff.com/dvorak/\">Dvorak</a>, and\n" +
    "        <a href=\"http://colemak.com/\">Colemak</a> layouts.\n" +
    "    </p>\n" +
    "    <hr/>\n" +
    "    <p>\n" +
    "    This version of the app was <a href=\"https://github.com/stevep99/keyboard-layout-analyzer\">forked by SteveP</a> from the original <a href=\"http://patorjk.com/keyboard-layout-analyzer/\">Keyboard Layout Analyzer</a> by patorjk.\n" +
    "    </p>\n" +
    "    <p>A number of changes are made in this version with the aim of making the analyzer more useful and accurate, particularly in regard to the scoring calculation. \n" +
    "    The changes are detailed below, so you can evaluate the merits of these changes yourself. A huge thanks to Patrick (patorjk) for releasing his source code, making this forked version possible!\n" +
    "    </p>\n" +
    "\n" +
    "    <h2>Scoring Algorithm</h2>\n" +
    "    <p>\n" +
    "        I have studied the source code in the original app to understand how the analyzer and scoring systems work. The following is my best interpretation of its methodology:\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Layouts are scored according to four weighted elements:<br/>\n" +
    "        - distance fingers moved (33%)<br/>\n" +
    "        - distribution of work among fingers (33%)<br/>\n" +
    "        - same-finger bigrams (17%)<br/>\n" +
    "        - hand alternation (17%)<br/>\n" +
    "    </p>\n" +
    "    <p>I now present a critique of each of these elements, and where relevant, describe the changes I have made in this version of the app:</p>\n" +
    "    \n" +
    "    <h3>Element 1: Distance calculation</h3>\n" +
    "\n" +
    "    <p>The distance calculation works by simulating the typing of the input text and measuring the distance between successive keys. These distances are summed up, and a score is calculated based on the average distance moved across all key presses. This method works reasonably well but is overly simplistic. I have identified three flaws with it:<br/>\n" +
    "    </p>\n" +
    "    <p><b>Flaw 1</b>: no consideration is taken into account of the type of movement.</p>\n" +
    "\n" +
    "    <img src=\"./img/kb-j-arrows.png\" width=\"142\" height=\"150\" style=\"float: left; margin-right: 10px;\"/>\n" +
    "\n" +
    "    <p>Consider if you start with your right hand in the home position (using Qwerty), and type JH, JU, and JM. It is more difficult to move from J to H than it is from J to U or J to H. This is because the index finger can easily stretch outward to the U or curl inward to the M. However, to type the H, the finger has to splay outwards, or the whole hand has to move. Consequently, more effort is required for this type of lateral motion. This phenomenon is well-documented in the justification behind both the Workman and Colemak-DH layouts.</p>\n" +
    "\n" +
    "    <p>If you simply measure distance between J and its nearby keys however, then due to the keyboard stagger, JH is a shorter distance than JU or JM. In such cases, the default algorithm rewards motions involving more difficult (but slightly nearer) keys. What would be desired to fix this problem, is to replace the pure distance measure with a distance penalty, in which horizontal movements are given a higher penalty than vertical ones for the same distance moved.</p>\n" +
    "\n" +
    "    <p>Also, the raw distance measurement does not take into account that some fingers are stronger than others, especially for motions that involve simple curling inward/outward that don't require the whole hand to move.</p>\n" +
    "\n" +
    "    <p><b>Flaw 2</b>: Even with a directional penalty added, notice that the distance between JM and JN is the same. In reality though, again because of the stagger on standard boards, the JM movement is easier. To address this issue, we need to consider that the hands approach the keyboard at an angle. On the right-hand side of the keyboard, the arms approach the keyboard in the same direction as the stagger, but on the left-side, the stagger is effectively the wrong way around. A more accurate algorithm should aim to take this effect into account.</p>\n" +
    "\n" +
    "    <p><b>Flaw 3</b>: The distance penalty should not linear, but rather logarithmic, as observed by <a href=\"https://en.wikipedia.org/wiki/Fitts%27s_law\">Fitts's Law</a>.\n" +
    "    Fitts's Law is a predictive model of human movement which can be used to estimate the time or effort it takes to perform a variety of actions, based on the distance and size of the target.</p>\n" +
    "\n" +
    "    <p><b><u>Fixes:</u></b> This version of the app applies fixes to the algorithm to address all these flaws.<br/>\n" +
    "        - The simple distance calculation is replaced by a \"distance penalty\".<br/> \n" +
    "        - The penalty is finger-dependent for actions that require a simple inward/outward curling of the finger, for example to reach upward with the middle finger from <i>K to I</i> (in Qwerty).<br/>\n" +
    "        - The penalty is larger for horizontal movements, recognising that this component requires the whole hand to move or for fingers to splay out awkwardly, for example the motion of the index finger from <i>F to G</i> (in Qwerty).<br/>\n" +
    "        - The coordinate system for movement vectors is rotated to align with the angle of approach of the hands. This currently set to a 10° angle, and is applied clockwise for the left hand, anticlockwise for the right hand.<br/>\n" +
    "        - Fitts's Law is incorporated in this version of the analyzer so both horizontal and vertical components are appropriately scaled.</p>\n" +
    "\n" +
    "    <table style=\"display: inline-block; margin-left:40px\" border=\"1\" cellpadding=\"2\">\n" +
    "        <tbody>\n" +
    "        <tr><th>finger</th><th>effort</th></tr>\n" +
    "        <tr>\n" +
    "            <td>index¹</td><td>1.0</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>middle¹</td><td>1.1</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>ring¹</td><td>1.3</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>pinky¹</td><td>1.6</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>horizontal motions²</td><td>2.0</td>\n" +
    "        </tr>\n" +
    "        <td colspan=\"2\">\n" +
    "            ¹ Relative effort for vertical finger curling motion.<br/>\n" +
    "            ² Relative effort for whole hand horizontal motion.\n" +
    "            </td>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <!--\n" +
    "    <p>The effect of the new distance penalty model compared to the raw physical distance:</p>\n" +
    "    \n" +
    "    <table style=\"display: inline-block; margin-left:40px\" border=\"1\" cellpadding=\"2\">\n" +
    "        <tbody>\n" +
    "        <tr><th>keys</th><th>distance¹</th><th>penalty²</th></tr>\n" +
    "        <tr>\n" +
    "        <td>JU</td><td>1.03u</td><td>1.04</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "        <td>JH</td><td>1.00u</td><td>1.99</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "        <td>JN</td><td>1.12u</td><td>1.74</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "        <td>JM</td><td>1.12u</td><td>1.32</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "        <tfoot>\n" +
    "        <tr>\n" +
    "        <td colspan=\"3\">\n" +
    "        ¹ Actual physical distance in key units<br/>\n" +
    "        ² Distance penalty as calculated in this version of the app by applying the fixes.\n" +
    "        </td>\n" +
    "        </tr>\n" +
    "        </tfoot>\n" +
    "    </table>    \n" +
    "    -->\n" +
    "    <p>With these fixes, this element of the scoring system is now more highly prioritised, increasing from 33% to 50%.</p>\n" +
    "            \n" +
    "    <h3>Element 2: Finger distribution</h3>\n" +
    "\n" +
    "    <p>The original algorithm defines a score value for each finger as follows:<br/>\n" +
    "        PINKY: 0.5<br/>\n" +
    "        RING: 1.0<br/>\n" +
    "        MIDDLE: 4.0<br/>\n" +
    "        INDEX: 2.0<br/>\n" +
    "        THUMB: 0.5<br/>\n" +
    "    </p>\n" +
    "    <p>Then, it calculates what proportion of typing is done on each finger, subject to a maximum of 20% per finger. The final score is proportional to this sum over all fingers:\n" +
    "    (finger-score) x (finger-frequency)</p>\n" +
    "    <p>The consequence of this algorithm is that middle finger is heavily favoured, even compared to the index finger. Layouts deemed high scoring would be those that assign 20% of the work to favoured fingers - middle especially followed by index - but with very little or none on pinkies and thumbs. I think this method may be flawed in that it too heavily weights the middle finger, and encourages loading of favoured fingers upto the seemingly arbitrary 20%. However, I accept that this element of the algorithm may in fact be counter-balanced by the distance algorithm, which would reward all home key usage (including pinkies and thumbs where defined), by assigning a movement distance of zero in those cases.</p>\n" +
    "\n" +
    "    <p><b><u>Fix:</u></b> A simpler effort calculation is employed based on the finger weightings in the table above, representing the relative strength of each finger.\n" +
    "        Additionally, a small finger-imbalance factor has been introduced to this element, recognising that a good layout should assign rougly equal work symmetrically to fingers of both left and right hands. \n" +
    "        That is, if the left-index finger performs 15% of key presses, the right-index finger should do similarly.</p>\n" +
    "\n" +
    "    <p>I have reduced the weighting of this element of the scoring from 33% to 20%.</p>\n" +
    "    \n" +
    "    <h3>Element 3: Same-finger bigrams</h3>\n" +
    "    <p>The original app simply counts what proportion of each key presses and done with the same finger as the previous one. It then calculates a percentage score based on the same-finger ratio in the range 0 to 10%. In other worlds, a layout with a 5% same-finger ratio, would score 50% in this element.</p>\n" +
    "    <p><b><u>Fix:</u></b> No fix needed. The weighting of this element of the calculation is increased from 17% to 30%.<br/>\n" +
    "\n" +
    "    <h3>Element 4: Hand alternation</h3>\n" +
    "    <p>Similar to the same-finger count, it simply counts which proportion of key presses were with same hand as the previous one. This favours heavily alternating layouts. However, in my view this flawed, as no account is taken that some same-hand combinations are actually some of the most comfortable bigrams of all: the Colemak ST and NE, or the Dvorak TH, for examples. Perhaps this element could be improved, for example to detect longer same-hand sequences which would be detrimental. In it's current form though, I don't see much value in this element.</p>\n" +
    "    <p><b><u>Fix:</u></b> Removed from the scoring calculation.<br/>\n" +
    "\n" +
    "    <h2>Other changes made from the original repo</h2>\n" +
    "\n" +
    "    <ul>\n" +
    "        <li>There were a lot of seemingly random, unrecognised layouts. I removed most of them. The list now only contains layouts that are at least semi-well-known in the community.</li>\n" +
    "        <li>The Colemak-DH layout variants have been added.</li>\n" +
    "        <li>Number of layouts in the comparison changed from 5 to 6.</li>\n" +
    "        <li>Removed the generated 'Personalized Layout' as I considered it to not really have any value.</li>\n" +
    "        <li>Added support for additional keyboard types.</li>\n" +
    "        <li>Various other input texts have been added, these were obtained from from <a href=\"https://bitbucket.org/Shenafu/keyboard-layout-analyzer/src/master/\">shenafu's fork</a> of the same app.</li>\n" +
    "        <li>Disabled the API functionality (e.g. link to results) as github hosting does not support php.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <h2>Bugs</h2>\n" +
    "\n" +
    "    <p>Please report bugs at the <a href=\"https://github.com/stevep99/keyboard-layout-analyzer/issues\">issue tracker</a> on github.</p>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('partials/config.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <div class='control-group kla-run-button'>\n" +
    "            <div class='controls'>\n" +
    "                <button class=\"btn btn-large\" type=\"button\" ng-click=\"generateOutput(data.text, settings.simplify, settings.ctrlKeys)\" title=\"See which layout is best (Ctrl+Enter)\">Run</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h1>Layouts</h1>\n" +
    "        <p class=\"lead\"><strong>Click</strong> or <strong>Drag</strong> the keys on the keyboard below<p>\n" +
    "    </div>\n" +
    "    <p></p>\n" +
    "\n" +
    "    <div id='kb-config-container'>\n" +
    "\n" +
    "        <keyboardeditor name=\"0\" current=\"current\"></keyboardeditor>\n" +
    "        <keyboardeditor name=\"1\" current=\"current\"></keyboardeditor>\n" +
    "        <keyboardeditor name=\"2\" current=\"current\"></keyboardeditor>\n" +
    "        <keyboardeditor name=\"3\" current=\"current\"></keyboardeditor>\n" +
    "        <keyboardeditor name=\"4\" current=\"current\"></keyboardeditor>\n" +
    "        <keyboardeditor name=\"5\" current=\"current\"></keyboardeditor>\n" +
    "\n" +
    "        <table class=\"kb-config-table\">\n" +
    "            <thead>\n" +
    "                <th>\n" +
    "                    Properties\n" +
    "                </th>\n" +
    "                <th>\n" +
    "                    Data\n" +
    "                </th>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr>\n" +
    "                    <td class=\"kb-config-td\">\n" +
    "                        <div class=\"kb-config-editor\">\n" +
    "                            <form class='form-horizontal'>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label' for=\"kb-config-name\">Name:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <input id=\"kb-config-name\" class=\"kb-config-name\" type=\"text\" ng-model=\"keyboards.getLayout(current).keySet.label\"/>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label' for=\"kb-config-kbtype\">Author:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <div style='padding:5px 7px;'>{{keyboards.getLayout(current).keySet.author}}</div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label' for=\"kb-config-kbtype\">More Info:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <div ng-hide='keyboards.getLayout(current).keySet.moreInfoUrl' style='padding:5px 7px;'>    None</div>\n" +
    "                                        <div ng-show='keyboards.getLayout(current).keySet.moreInfoUrl' style='padding:5px 7px;'>\n" +
    "                                            <a href='{{keyboards.getLayout(current).keySet.moreInfoUrl}}'>{{keyboards.getLayout(current).keySet.moreInfoText}}</a>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"kb-config-td\">\n" +
    "\n" +
    "                        <div class=\"kb-config-editor\">\n" +
    "                            <form class='form-horizontal'>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label'>Load/Save:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <button class=\"kb-config-copy btn\" ng-click=\"copyJson()\" title=\"Copy this layout to clipboard (Ctrl+C)\">Copy</button>\n" +
    "                                        <button class=\"kb-config-import btn\" ng-click=\"showImportDialog()\" title=\"Load some layout here (Ctrl+V)\">Import</button>\n" +
    "                                        <!-- <input type=\"file\" class=\"kb-config-import btn\" ng-click=\"importJson()\" title=\"Load some layout data from computer\">Import</button> -->\n" +
    "                                        <a class=\"kb-config-export btn\" ng-click=\"exportJson()\" title=\"Save this layout to file\">Export</a>\n" +
    "                                        <!-- <button class=\"kb-config-export btn\" ng-click=\"showExportDialog()\">Export</button> -->\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label' for=\"kb-config-select-list\">Preset:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <select id=\"kb-config-select-list\" class=\"kb-config-select-list\">\n" +
    "                                            <option value=\"none\">[Select Layout]</option>\n" +
    "                                            <optgroup label=\"Latin: ANSI Keyboards\">\n" +
    "                                                <option value=\"standard.abcdef\">ABCDEF</option>\n" +
    "                                                <option value=\"standard.arensito\">Arensito</option>\n" +
    "                                                <option value=\"standard.adnw\">AdnW</option>\n" +
    "                                                <option value=\"standard.asset\">Asset</option>\n" +
    "                                                <option value=\"standard.capewell\">Capewell</option>\n" +
    "                                                <option value=\"standard.carpalxq\">CarpalxQ</option>\n" +
    "                                                <option value=\"standard.colemak\">Colemak</option>\n" +
    "                                                <option value=\"standard.tarmak1\">Colemak - Tarmak 1</option>\n" +
    "                                                <option value=\"standard.tarmak2\">Colemak - Tarmak 2</option>\n" +
    "                                                <option value=\"standard.tarmak3\">Colemak - Tarmak 3</option>\n" +
    "                                                <option value=\"standard.tarmak4\">Colemak - Tarmak 4</option>\n" +
    "                                                <option value=\"standard.colemak_dh\">Colemak-DH (Mod-DH)</option>\n" +
    "                                                <option value=\"standard.tarmak1_dh\">Colemak-DH - Tarmak 1</option>\n" +
    "                                                <option value=\"standard.tarmak2_dh\">Colemak-DH - Tarmak 2</option>\n" +
    "                                                <option value=\"standard.tarmak3_dh\">Colemak-DH - Tarmak 3</option>\n" +
    "                                                <option value=\"standard.tarmak4_dh\">Colemak-DH - Tarmak 4</option>\n" +
    "                                                <option value=\"standard.simplifiedDvorak\">Dvorak (Simplified)</option>\n" +
    "                                                <option value=\"standard.programmerDvorak\">Dvorak (Programmer)</option>\n" +
    "                                                <option value=\"standard.spanish-dvorak\">Dvorak (Spanish)</option>\n" +
    "                                                <option value=\"standard.ohdvorakl\">One-handed Dvorak (Left)</option>\n" +
    "                                                <option value=\"standard.ohdvorakr\">One-handed Dvorak (Right)</option>\n" +
    "                                                <option value=\"standard.klausler\">Klausler</option>\n" +
    "                                                <option value=\"standard.minimak8key\">Minimak 8-key</option>\n" +
    "                                                <option value=\"standard.minimak12key\">Minimak 12-key</option>\n" +
    "                                                <option value=\"standard.mtgap\">MTGAP</option>\n" +
    "                                                <option value=\"standard.neo2\">Neo 2 (v1)</option>\n" +
    "                                                <option value=\"standard.neo2_new\">Neo 2 (v2)</option>\n" +
    "                                                <option value=\"standard.niro\">Niro</option>\n" +
    "                                                <option value=\"standard.norman\">Norman</option>\n" +
    "                                                <option value=\"standard.qgmlwy\">QGMLWY</option>\n" +
    "                                                <option value=\"standard.qwerfj\">QWERFJ</option>\n" +
    "                                                <option value=\"standard.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"standard.qwertywm\">QWERTY - Wide Mod</option>\n" +
    "                                                <option value=\"standard.qwpr\">QWPR</option>\n" +
    "                                                <option value=\"standard.soul\">Soul</option>\n" +
    "                                                <option value=\"standard.workman\">Workman</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"Latin: ISO Keyboards\">\n" +
    "                                                <option value=\"european.azerty\">AZERTY</option>\n" +
    "                                                <option value=\"european.bepo\">BÉPO</option>\n" +
    "                                                <option value=\"european.colemak\">Colemak</option>\n" +
    "                                                <option value=\"european_ss.colemak\">Colemak split-space</option>\n" +
    "                                                <option value=\"european.colemak_dh\">Colemak-DH (Mod-DH)</option>\n" +
    "                                                <option value=\"european_ss.colemak_dh\">Colemak-DH (Mod-DH) split-space</option>\n" +
    "                                                <option value=\"european.tarmak1_dh\">Colemak-DH - Tarmak 1</option>\n" +
    "                                                <option value=\"european.tarmak2_dh\">Colemak-DH - Tarmak 2</option>\n" +
    "                                                <option value=\"european.tarmak3_dh\">Colemak-DH - Tarmak 3</option>\n" +
    "                                                <option value=\"european.tarmak4_dh\">Colemak-DH - Tarmak 4</option>\n" +
    "                                                <option value=\"european.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"european_ss.qwerty\">QWERTY split-space</option>\n" +
    "                                                <option value=\"european.qwerty-spanish\">QWERTY (Spanish)</option>\n" +
    "                                                <option value=\"european.qwerty-estonian\">QWERTY (Estonian)</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"Latin: Matrix Keyboards\">\n" +
    "                                                <option value=\"matrix.colemak\">Colemak</option>\n" +
    "                                                <option value=\"matrix.colemak_dh\">Colemak-DH (Mod-DH)</option>\n" +
    "                                                <option value=\"matrix.dvorak\">Dvorak</option>\n" +
    "                                                <option value=\"matrix.norman\">Norman</option>\n" +
    "                                                <option value=\"matrix.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"matrix.workman\">Workman</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"Latin: Ergodox Keyboards\">\n" +
    "                                                <option value=\"ergodox.colemak\">Colemak</option>\n" +
    "                                                <option value=\"ergodox.colemak-thumbshift\">Colemak thumbshift</option>\n" +
    "                                                <option value=\"ergodox.kinesis-advantage-colemak\">Colemak (Kinesis Advantage)</option>\n" +
    "                                                <option value=\"ergodox.colemak_dh\">Colemak-DH (Mod-DH) thumbshift</option>\n" +
    "                                                <option value=\"ergodox.maltron\">Maltron</option>\n" +
    "                                                <option value=\"ergodox.mtgap\">MTGAP</option>\n" +
    "                                                <option value=\"ergodox.mtgap-thumbshift\">MTGAP thumbshift</option>\n" +
    "                                                <option value=\"ergodox.norman\">Norman</option>\n" +
    "                                                <option value=\"ergodox.qgmlwbcub\">QGMLWB</option>\n" +
    "                                                <option value=\"ergodox.qgmlwycub\">QGMLWY</option>\n" +
    "                                                <option value=\"ergodox.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"ergodox.qwerty-thumbshift\">QWERTY thumbshift</option>\n" +
    "                                                <option value=\"ergodox.rsthd\">RSTHD</option>\n" +
    "                                                <option value=\"ergodox.workman\">Workman</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"Cyrillic\">\n" +
    "                                                <option value=\"standard.bulgarian\">Bulgarian</option>\n" +
    "                                                <option value=\"standard.russian_diktor\">Diktor</option>\n" +
    "                                                <option value=\"standard.russian_zubachev\">Zubachev</option>\n" +
    "                                                <option value=\"standard.russian\">ЙЦУКЕН</option>\n" +
    "                                                <option value=\"standard.russiannm\">ЙЦУКЕН - Narrow Mod</option>\n" +
    "                                                <option value=\"standard.russian_typewriter\">ЙЦУКЕН (Typewriter)</option>\n" +
    "                                                <option value=\"standard.russian_typographic\">ЙЦУКЕН (Typographic)</option>\n" +
    "                                                <option value=\"standard.russian_yvam-told-2\">ЫВАМ ТОЛД 2.0</option>\n" +
    "                                            </optgroup>\n" +
    "                                        </select>\n" +
    "                                        <button class=\"kb-config-load btn\" ng-click=\"loadLayout()\">Load</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "<!--\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label'>Share:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <button class=\"btn\" ng-click=\"submitDialog()\">Submit Layout</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "-->\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "        <paginate start=\"1\" stop=\"6\" handler=\"switchLayout\"></paginate>\n" +
    "\n" +
    "        <!-- import modal -->\n" +
    "        <div id='kb-config-import-dialog' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='resultLabel' aria-hidden='true'>\n" +
    "            <div class='modal-header'>\n" +
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\n" +
    "                <h3 id='resultLabel'>Import Layout</h3>\n" +
    "            </div>\n" +
    "            <div class='modal-body'>\n" +
    "\n" +
    "                <textarea class='input-block-level kb-config-dialog-txt'></textarea>\n" +
    "                <p class='text-left'>\n" +
    "                    Paste the text of a previously copied/exported layout in the textbox above and press \"Import\" to load the layout.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class='modal-footer'>\n" +
    "                <button class=\"btn\" ng-click=\"importLayout()\">Import</button>\n" +
    "                <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- import modal -->\n" +
    "        <div id='kb-config-export-dialog' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='resultLabel' aria-hidden='true'>\n" +
    "            <div class='modal-header'>\n" +
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\n" +
    "                <h3 id='resultLabel'>Export Layout</h3>\n" +
    "            </div>\n" +
    "            <div class='modal-body'>\n" +
    "\n" +
    "                <textarea class='input-block-level kb-config-dialog-txt'></textarea>\n" +
    "                <p class='text-left'>\n" +
    "                    The above text represents the keyboard layout. You can come back to the app later and load this layout with this text using the \"Import\" feature.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class='modal-footer'>\n" +
    "                <button class=\"btn\" ng-click=\"selectAllExportText()\">Select All</button>\n" +
    "                <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- submit modal -->\n" +
    "        <div id='kb-config-submit-dialog' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='resultLabel' aria-hidden='true'>\n" +
    "            <div class='modal-header'>\n" +
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\n" +
    "                <h3 id='resultLabel'>Submit Layout</h3>\n" +
    "            </div>\n" +
    "            <div class='modal-body'>\n" +
    "                <form class='form-horizontal' ng-show='!submitter.submitting'>\n" +
    "                    <div class='control-group'>\n" +
    "                        <label class='control-label' for='sub-name'>Name:</label>\n" +
    "                        <div class='controls'>\n" +
    "                            <input id='sub-name' class='input-block-level' type='text' ng-model='submitter.name'>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='control-group'>\n" +
    "                        <label class='control-label' for='sub-email'>Email:</label>\n" +
    "                        <div class='controls'>\n" +
    "                            <input id='sub-email' class='input-block-level' type='text' ng-model='submitter.email'>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='control-group'>\n" +
    "                        <label class='control-label' for='sub-url'>URL:</label>\n" +
    "                        <div class='controls'>\n" +
    "                            <input id='sub-url' class='input-block-level' type='text' ng-model='submitter.url'>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "\n" +
    "                <div ng-show='submitter.submitting'>\n" +
    "                    <p>\n" +
    "                        <img src='img/loading2.gif'>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "                <p class='text-left'>\n" +
    "                    Fill out the above information and then press \"Submit\". After submitting, you're layout will be evaluated and then placed into the \"Preset\" option.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class='modal-footer'>\n" +
    "                <button class=\"btn\" ng-click=\"submitLayout()\">Submit</button>\n" +
    "                <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('partials/load.htm',
    "<div class='loading-container text-center'>\n" +
    "    <p>\n" +
    "    	<img src='http://patorjk.com/images/qwerty.png'/>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "    	<img src='img/loading2.gif'>\n" +
    "    </p>\n" +
    "    Loading, one moment please...\n" +
    "</div>"
  );


  $templateCache.put('partials/main.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <div class='control-group kla-run-button'>\n" +
    "            <div class='controls'>\n" +
    "                <button class=\"btn btn-large\" type=\"button\" ng-click=\"generateOutput(data.text, settings.simplify, settings.ctrlKeys)\" title=\"See which layout is best (Ctrl+Enter)\">Run</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h1>Analyzer</h1>\n" +
    "        <p class=\"lead\"><strong>Choose</strong> a sample text or <strong>Adjust</strong> the engine settings<p>\n" +
    "    </div>\n" +
    "    <form id='text-input-form'>\n" +
    "        <div class='control-group'>\n" +
    "            <label class='control-label' for='text-presets'>Text Presets:</label>\n" +
    "            <div class='controls'>\n" +
    "                <select id='text-presets' size='2' ng-model='data.textPreset' ng-change=\"applyPreset()\">\n" +
    "                    <optgroup label='English Prose'>\n" +
    "                        <option value='alice-ch1'>Alice in Wonderland, Chapter 1</option>\n"     +
    "                        <option value='magna-carta-english'>Magna Carta</option>\n"     +
    "                        <option value='nineteen-eighty-four-ch1'>1984, Chapter 1</option>\n"     +
    "                        <option value='tarzan-of-the-apes'>Tarzan Of The Apes</option>\n"     +
    "                        <option value='jungle-book'>Jungle Book</option>\n"     +
    "                        <option value='quotes'>Quotes</option>\n"     +
    "                        <option value='daode-jing'>Tao te Ching / DaodeJing</option>\n"     +
    "                    </optgroup>\n" +
    "                    <optgroup label='English Academic'>\n" +
    "                        <option value='academic-1'>Cost Optimization Model</option>\n"     +
    "                        <option value='academic-2'>Contractors' Performance in Construction</option>\n"     +
    "                        <option value='academic-3'>Binary Logistic Analysis</option>\n"     +
    "                    </optgroup>\n" +
    "                    <optgroup label='English Vocabulary'>\n" +
    "                        <option value='common-english-words'>List of the most commonly used words</option>\n"     +
    "                        <option value='common-sat-words'>Most commonly used SAT words</option>\n"     +
    "                        <option value='difficultwords'>Difficult words</option>\n"     +
    "                        <option value='medical'>Medical words</option>\n"     +
    "                        <option value='bigrams'>Bigrams</option>\n"     +
    "                    </optgroup>\n" +
    "                    <optgroup label='Non-English'>\n" +
    "                        <option value='lorem'>Latín: Lorem Ipsum</option>\n" +
    "                        <option value='crime-and-punishment-ch1'>Russian: Crime and Punishment, Chapter 1</option>\n" +
    "                        <option value='gol'>Tech: Game of Life</option>\n" +
    "                        <option value='pi1000'>Tech: Pi 1000</option>\n" +
    "                        <option value='pptt'>Tech: Programming Punctuation Torture Test</option>\n" +
    "                    </optgroup>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class='control-group'>\n" +
    "            <label class='control-label' for='txt-input'>Load or paste some text that reflects what you type on a daily basis</label>\n" +
    "            <div class='controls'>\n" +
    "                <textarea id='txt-input' class='input-block-level' ng-model='data.text' ng-trim='false'></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='control-group'>\n" +
    "            <label class='control-label' for='typographics'>Enrich:</label>\n" +
    "            <div id='typographics' class='controls'>\n" +
    "               <button class=\"btn\" type=\"button\" ng-click=\"typographic('en')\" title=\"Convert ASCII punctuation to English typographic marks\">EN</button>\n" +
    "               <button class=\"btn\" type=\"button\" ng-click=\"typographic('ru')\" title=\"Convert ASCII punctuation to Russian typographic marks\">RU</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "    <label title='Replace characters with their ASCII counterparts if they are not present in the target layout: from (— – “ ” „ ‘ ’ ′ ″ ‴ « » ‹ › 〈 〉 × · © ® ™) to (-- \" &apos; < > * (c) (R) TM)'>\n" +
    "        <input class=\"kla-result-checkbox ng-pristine ng-valid\" ng-model=\"settings.simplify\" type=\"checkbox\"> Simplify punctuation for non-typographic layouts\n" +
    "    </label>\n" +
    "    <label title='Interpret char sequences like &lt;u:8&gt;, &lt;u:1b&gt; and &lt;u:11&gt; as Backspace, Esc and Ctrl (8, 1b and 11 are hex codes of this keys)'>\n" +
    "        <input class=\"kla-result-checkbox ng-pristine ng-valid\" ng-model=\"settings.ctrlKeys\" type=\"checkbox\"> Allow modifier/control keys in input text\n" +
    "    </label>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/paginate.htm',
    "<div class=\"pagination pagination\">\n" +
    "    <ul>\n" +
    "\n" +
    "        <li ng-repeat='ii in [start, stop] | makeRange' \n" +
    "            ng-class=\"{switcher: true, active: ($index === current)}\" \n" +
    "            num=\"$index\" ng-click=\"handleNav($event, start*1, $index)\">\n" +
    "            <a href=\"javascript:void(0);\" title=\"{{keyboards.getLayout($index).keySet.label}}\">" +
    "                {{shorten(keyboards)[$index]}}" +
    "            </a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"switcher\" num=\"prev\" ng-click=\"handleNav($event, start*1,'prev')\">\n" +
    "            <a href=\"javascript:void(0);\" title=\"Previous layout (←Ctrl)\">🡠</a>\n" +
    "        </li>\n" +
    "        <li class=\"switcher\" num=\"next\" ng-click=\"handleNav($event, start*1, 'next')\">\n" +
    "            <a href=\"javascript:void(0);\" title=\"Next layout (Ctrl→)\">🡢</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('partials/result-options.htm',
    "<div class='text-center kla-result-opts'>\n" +
    "    <!--<h4 class='text-center kla-display-opts-header'>Result Table Display Options</h4>-->\n" +
    "    <div class=\"btn-group text-left\">\n" +
    "        <button data-toggle=\"dropdown\" class=\"btn dropdown-toggle\"  data-placeholder=\"false\">Units: {{source.units}}<span class=\"caret\"></span></button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"curUnit in source.allowedUnits\">\n" +
    "                <input type=\"radio\" name='kla-opt{{settings.id}}-unit-radio' id=\"kla-opt{{settings.id}}-units-{{$index}}\" ng-model=\"source.units\" value='{{curUnit}}' /><label for=\"kla-opt{{settings.id}}-units-{{$index}}\" >{{curUnit}}</label>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div> \n" +
    "\n" +
    "    <div class=\"btn-group text-left\" style='display:{{settings.showDisplayType}}'>\n" +
    "        <button data-toggle=\"dropdown\" class=\"btn dropdown-toggle\"  data-placeholder=\"false\">Display: {{source.displayType}}<span class=\"caret\"></span></button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"(dType, dValue) in source.displayData track by $index\">\n" +
    "                <input type=\"radio\" name='kla-opt{{settings.id}}-unit-radio' id=\"kla-opt{{settings.id}}-d-{{$index}}\" ng-model=\"source.displayType\" value='{{dType}}' /><label for=\"kla-opt{{settings.id}}-d-{{$index}}\" >{{dType}}</label>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div> \n" +
    "\n" +
    "    <div class=\"btn-group text-left\">\n" +
    "        <button data-toggle=\"dropdown\" class=\"btn dropdown-toggle\"  data-placeholder=\"false\">Keyboards <span class=\"caret\"></span></button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"layout in source.seriesData.allSeriesLabels\">\n" +
    "                <input type=\"checkbox\" id=\"kla-opt{{settings.id}}-dd-{{$index}}\" ng-model=\"source.rawSeriesData[$index].visible\" /><label for=\"kla-opt{{settings.id}}-dd-{{$index}}\" >{{layout}}</label>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('partials/result-table.htm',
    "<table class='kla-table-data'>\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th>\n" +
    "            </th>\n" +
    "            <th ng-repeat=\"header in source.displayData[source.displayType]\">\n" +
    "                <div class='text-right kla-table-data-text kla-padding-left'>{{header.label}}</div>\n" +
    "            </th>\n" +
    "            <th>\n" +
    "                <div class='text-right kla-table-data-text kla-padding-left'>Total</div>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"layout in source.seriesData.seriesLabels\">\n" +
    "            <td><div class='text-right'>{{layout}}</div></td>\n" +
    "            <td class='kla-table-data-text' ng-repeat=\"dataPoint in source.seriesData[$index] track by $id($index)\">\n" +
    "                <div class='text-right'>{{format(dataPoint)}}</div>\n" +
    "            </td>\n" +
    "            <td class='kla-table-data-text'>\n" +
    "                <div class='text-right kla-padding-left-total'>{{format(source.seriesData[$index].total)}}</div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('partials/results.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <h1>Results</h1>\n" +
    "        <p class=\"lead\">See each tab for detailed analysis<p>\n" +
    "    </div>\n" +
    "    <ul class='nav nav-pills' id='main-output-tabs'>\n" +
    "        <li class='kla-pill active'><a ng-click='tabSwitch($event, \"summary\")' href='#summary'>Summary</a></li>\n" +
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"distance\")' href='#distance'>Distance</a></li>\n" +
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"fingerUsage\")' href='#fingerUsage'>Finger Usage</a></li>\n" +
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"rowUsage\")' href='#rowUsage'>Row Usage</a></li>\n" +
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"heatMaps\")' href='#heatMaps'>Heat Maps</a></li>\n" +
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"miscellaneous\")' href='#miscellaneous'>Miscellaneous</a></li>\n" +
    "        <!-- <li class='kla-pill'><a ng-click='tabSwitch($event, \"personalized\")' href='#personalized'>Personalized</a></li> -->\n" +
    "    </ul>\n" +
    "    <div class='tab-content'>\n" +
    "        <div class='tab-pane active' id='summary'>\n" +
    "            <div style='text-align:center; position:relative;'>\n" +
    "                <img src='./img/trophy-32.png' style='display:inline-block; position:relative; top:-4px;margin-right:6px;'>\n" +
    "                <div style='display:inline-block' class='best-layout'>{{results.summary.bestLayout}}</div>\n" +
    "                \n" +
    "            </div>\n" +
    "            <p>\n" +
    "                <div class=\"kla-result-table\">\n" +
    "\n" +
    "                    <table class='kla-table-data kla-table-data-narrow'>\n" +
    "                        <thead>\n" +
    "                            <tr>\n" +
    "                                <th width=\"50px\">\n" +
    "                                    <div class='text-right'>Rank</div>\n" +
    "                                </th>\n" +
    "                                <th width=\"20px\">\n" +
    "                                </th>\n" +
    "                                <th>\n" +
    "                                    <div class='text-left'>Type</div>\n" +
    "                                </th>\n" +
    "                                <th>\n" +
    "                                    <div class='text-left'>Layout</div>\n" +
    "                                </th>\n" +
    "                                <th>\n" +
    "                                    <div class='text-right'>Score</div>\n" +
    "                                </th>\n" +
    "                                <th></th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "    \n" +
    "                            <tr ng-repeat=\"layout in results.summary.rankedLayouts\" >\n" +
    "                                <td><div class='text-right'>#{{$index + 1}}</div></td>\n" +
    "                                <td></td>\n" +
    "                                <td><div class='text-left'>{{layout.hardwareType}}</div></td>\n" +
    "                                <td><div class='text-left'>{{layout.layoutName}}</div></td>\n" +
    "                                <td><div class='text-right'>{{layout.score.toFixed(2)}}</div></td>\n" +
    "                                <td class='chart-bar'><div style=\"width:{{layout.score}}px;\"></div></td>\n" +
    "                            </tr>\n" +
    "                    \n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "\n" +
    "                </div>\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                The layout score is based on a weighed calculation that factors in\n" +
    "                a distance penalty due to how much your fingers moved (50%), \n" +
    "                how often you use particular fingers (20%),\n" +
    "                and how often you switch fingers while typing (30%).\n" +
    "                See the About page for detailed information.\n" +
    "            </p>\n" +
    "            <!--\n" +
    "            <p>\n" +
    "                <div class='text-center' ng-show='share.showSection'>\n" +
    "                    <button class='btn' style='position:relative;margin-top:-12px;margin-right:10px;' ng-click='getUrlToShare()'>Get URL to Share Results →</button>\n" +
    "                    <input type='text' ng-model='share.url' style='width:475px;' />\n" +
    "                </div>\n" +
    "            </p>\n" +
    "            -->\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='distance' style='position:relative'>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.distance\"></seriesbarchart>\n" +
    "            <resulttable source='results.distance'></resulttable>\n" +
    "            <resultoptions source='results.distance'></resultoptions>\n" +
    "\n" +
    "            <div class='kla-piecharts'>\n" +
    "                <h4 class='text-center kla-pie-header'>Pie Chart Visualizations</h4>\n" +
    "\n" +
    "                <div ng-repeat=\"layout in results.distance.seriesData.seriesLabels track by $id($index)\" class='kla-pie-container'>\n" +
    "                    <piechart width=\"400px\" height=\"330px\" source=\"results.distance\" series=\"$index\"></piechart>\n" +
    "                    <div class='kla-pie-label'>{{layout}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='fingerUsage'>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.fingerUsage\"></seriesbarchart>\n" +
    "            <resulttable source='results.fingerUsage'></resulttable>\n" +
    "            <resultoptions source='results.fingerUsage'></resultoptions>\n" +
    "\n" +
    "            <div class='kla-piecharts'>\n" +
    "                <h4 class='text-center kla-display-opts-header'>Pie Chart Visualizations</h4>\n" +
    "\n" +
    "                <div ng-repeat=\"layout in results.fingerUsage.seriesData.seriesLabels track by $id($index)\" class='kla-pie-container'>\n" +
    "                    <piechart width=\"400px\" height=\"330px\" source=\"results.fingerUsage\" series=\"$index\"></piechart>\n" +
    "                    <div class='kla-pie-label'>{{layout}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='rowUsage'>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.rowUsage\"></seriesbarchart>\n" +
    "            <resulttable source='results.rowUsage'></resulttable>\n" +
    "            <resultoptions source='results.rowUsage'></resultoptions>\n" +
    "\n" +
    "            <div class='kla-piecharts'>\n" +
    "                <h4 class='text-center kla-display-opts-header'>Pie Chart Visualizations</h4>\n" +
    "\n" +
    "                <div ng-repeat=\"layout in results.rowUsage.seriesData.seriesLabels track by $id($index)\" class='kla-pie-container'>\n" +
    "                    <piechart width=\"400px\" height=\"330px\" source=\"results.rowUsage\" series=\"$index\"></piechart>\n" +
    "                    <div class='kla-pie-label'>{{layout}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='heatMaps'>\n" +
    "            <div class='text-center'>\n" +
    "                <div id='heatmap-{{$index}}' ng-repeat='layout in results.layouts' class=\"keyboard\">\n" +
    "                    <keyboardheatmap current=\"currentHeatmap\" myindex=\"{{$index}}\" layout=\"layout\" keydata=\"results.keyData[$index]\"></keyboardheatmap>\n" +
    "                </div>\n" +
    "\n" +
    "                <paginate start=\"1\" stop=\"6\" handler=\"switchHeatmap\"></paginate>\n" +
    "\n" +
    "                <table class=\"table table-striped\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Rank</th>\n" +
    "                            <th>Key</th>\n" +
    "                            <th>Presses</th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "\n" +
    "                        <tr ng-repeat=\"key in results.keyData[currentHeatmap]  | orderBy:['-count', 'primary']\">\n" +
    "                            <td>\n" +
    "                                #{{$index+1}}\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                {{getKeyLabel(key.primary, key.shift, key.altGr, key.shiftAltGr)}}\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                {{key.count}}\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='miscellaneous'>\n" +
    "            <div class=\"kla-misc-box\">\n" +
    "                <strong>Consecutive Finger Use</strong> - \n" +
    "                How often the same finger is used to type a key as was used to type the previous key.\n" +
    "                An example of this would be typing \"fg\" on QWERTY. When looking at \"g\", the program notes that  the index finger\n" +
    "                was also previously used to type \"f\". The lower the number the better.\n" +
    "                <p></p>\n" +
    "                <label><input class='kla-result-checkbox' ng-model=\"settings.cfuIgnoreDups\" type=\"checkbox\" /> Include instances of the same key being pressed twice in a row (example: typing \"ff\").</label>\n" +
    "            </div>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.consecFingerPress\"></seriesbarchart>\n" +
    "            <resulttable source='results.consecFingerPress'></resulttable>\n" +
    "            <resultoptions source='results.consecFingerPress' displayopts=false></resultoptions>\n" +
    "\n" +
    "            <div class='kla-misc-spacing'></div>\n" +
    "\n" +
    "            <div class=\"kla-misc-box\">\n" +
    "                <strong>Consecutive Hand and Thumb Use</strong> - \n" +
    "                How often the same hand was used to type a key as was used to type the previous key (thumbs are grouped as a separate entity). An example of this would be typing \"af\" on QWERTY. When looking at \"f\", the program notes that the left hand was also previously used to type \"a\". The lower the number the better.\n" +
    "                <p></p>\n" +
    "                <label><input class='kla-result-checkbox' ng-model=\"settings.chuIgnoreDups\" type=\"checkbox\" /> Include instances of the same key being pressed twice in a row (example: typing \"ff\").</label>\n" +
    "            </div>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.consecHandPress\"></seriesbarchart>\n" +
    "            <resulttable source='results.consecHandPress'></resulttable>\n" +
    "            <resultoptions source='results.consecHandPress' displayopts=false></resultoptions>\n" +
    "\n" +
    "            <div class='kla-misc-spacing'></div>\n" +
    "\n" +
    "            <div class=\"kla-misc-box\">\n" +
    "                <strong>Modifier Key Use</strong> - \n" +
    "                How often the Shift, AltGr, and Shift+AltGr modifiers are used with characters in the text.\n" +
    "            </div>\n" +
    "            <seriesbarchart width=\"940px\" height=\"300px\" source=\"results.modifierUse\"></seriesbarchart>\n" +
    "            <resulttable source='results.modifierUse'></resulttable>\n" +
    "            <resultoptions source='results.modifierUse' displayopts=false></resultoptions>\n" +
    "            <div style='padding:30px;font-size:16px;' class='text-center'>\n" +
    "                <p>\n" +
    "                    Additional statistics will be coming to this section later this year. \n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    I hate these sort of place holder messages, however, I figured I'd make a note so you'd know where to look in coming updates.\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    If you have any suggestions feel free to email me.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='tab-pane' id='personalized'>\n" +
    "            <div class='text-center'>\n" +
    "                <keyboarddisplay layout='results.personalized' class='show-inline'><keyboarddisplay>\n" +
    "            </div>\n" +
    "            <div style='margin:0 auto;width:750px'>\n" +
    "                <p >\n" +
    "                    <h3 class='text-center'>Personalized Layout</h3>\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    And now just for fun, here is what the optimal layout of your keyboard would be if it were tailored to fit the way you type. This personalized layout is based only on a frequency analysis. It places your most commonly typed characters in the most optimal spots and your least typed characters in the least optimal spots - however, for practical reasons, I have frozen certain keys. The more you type, the more accurate this layout will be. I should note that the generated design does not take into account how often you switch hands while typing or how close together common letter pairings are. Most modern layouts take into account ergonomic considerations as well as key usage.\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    Initially I was going to leave out this feature for the latest version of the analyzer, but I had some requests to keep it so I did. Since a complete ergonomic analysis isn't taken into account, the generated layout should be taken with a grain of salt, but it can give you some ideas of good key placements.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='text-center try-again-btn'>\n" +
    "        <button class=\"btn btn-large\" type=\"button\" ng-click=\"returnToInput()\">Try Another Input</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );

}]);
