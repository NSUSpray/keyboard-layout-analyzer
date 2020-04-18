angular.module('kla').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partials/about.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <h1>Keyboard Layouts 101</h1>\n" +
    "        <p class=\"lead\">A brief introduction<p>\n" +
    "    </div>\n" +
    "    <p>\n" +
    "        This application allows you to analyze and visualize the typing patterns you create when you use different keyboard layouts, such as the\n" +
    "        <a href=\"http://home.earthlink.net/~dcrehr/\">QWERTY</a>, <a href=\"http://www.theworldofstuff.com/dvorak/\">Dvorak</a>, and\n" +
    "        <a href=\"http://colemak.com/\">Colemak</a> layouts.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        If you have no idea what I'm talking about, the key layout on your keyboard isn't the only one that's out there, and not all \n" +
    "        keyboard layouts are created equal. Some are better for your wrists and allow you to type faster and with more comfort. \n" +
    "        Here are the three most popular keyboard layouts (which I also mentioned above):\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        <div style=\"text-align: center;\">\n" +
    "            <img src=\"http://patorjk.com/images/qwerty.png\" alt=\"\" />\n" +
    "            <br/>  \n" +
    "            <strong>QWERTY</strong>\n" +
    "        </div>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        <div style=\"text-align: center;\">\n" +
    "            <img src=\"http://patorjk.com/images/dvorak.png\" alt=\"\" />\n" +
    "            <br/>\n" +
    "            <strong>Dvorak (Simplified)</strong>\n" +
    "        </div>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        <div style=\"text-align: center;\">\n" +
    "            <img src=\"http://patorjk.com/images/colemak.png\" alt=\"\" />\n" +
    "            <br/>\n" +
    "            <strong>Colemak</strong>\n" +
    "        </div>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        My interest in keyboard layouts came after I read a Discover magazine article entitled <a href=\"http://discovermagazine.com/1997/apr/thecurseofqwerty1099\">\"The Curse of QWERTY\"</a>. The article tells the story of the QWERTY and Dvorak keyboard layouts and makes a compelling case for switching from a QWERTY layout to a Dvorak layout. Here is a quick summary of its most important points:\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        <ul>\n" +
    "            <li>The QWERTY layout was created in the early 1870's before touch typing and without speed or comfort in mind.</li>\n" +
    "            <li>The Dvorak layout was created in the 1930's and is based on years of research. It takes speed and comfort into account.</li>\n" +
    "            <li>On average, the left hand does 56% of the typing when a QWERTY layout is used. With a Dvorak layout, the right hand does 56% of the typing.</li>\n" +
    "            <li>The Dvorak layout forces you to alternate hands more frequently when typing, this causes you to type faster.</li>\n" +
    "            <li>Users type fastest on the home row. With a QWERTY layout, only 32% of your typing occurs on the home row. With a Dvorak layout, 70% of your typing occurs on the home row.</li>\n" +
    "            <li>It's hypothesized that the Dvorak layout will make it less likely that you'll develop <a href=\"http://en.wikipedia.org/wiki/Carpal_tunnel_syndrome\">Carpal Tunnel Syndrome (CTS)</a>.</li>\n" +
    "            <li>Anecdotally, people who develop carpal tunnel syndrome seem to find relief when they switch from a QWERTY layout to Dvorak layout.</li>\n" +
    "        </ul>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        There are more reasons, but those were the ones that stuck with me. I was so convinced by what I read that I switched my work and home keyboard layouts to a Dvorak layout by configuring some Windows XP settings in the control panel (to see how <a href=\"http://kb.iu.edu/data/aepk.html\">click here</a>). This lasted for about 6 days (3 of those were over the Labor Day weekend), and then I had to switch back since learning the Dvorak layout was slowing me down at work. I also discovered that the Dvorak layout made all the nice QWERTY keyboard shortcuts (Undo, Cut, Copy and Paste) virtually unusable. This was a big minus since I use those shortcuts constantly. The Dvorak layout also over worked my right pinky. I found myself having to take typing breaks, something I hadn't done since high school.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        After talking to someone who had Carpal Tunnel Syndrome (something I'm worried about getting), I learned about yet another improved keyboard \n" +
    "        layout that preserved QWERTY's bottom row short cuts and didn't put massive amounts of stress on the right pinky. This layout was known as \n" +
    "        the Colemak. Unlike the Dvorak, the Colemak layout is relatively new (developed within the last 5 years), doesn't have a lot of research \n" +
    "        behind it, and it doesn't have a very large following (online estimates put the number of users between 650 and 1,300).  \n" +
    "        However, the layout looks pretty promising.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        All of this research is what motivated me to create this application. I wanted to visually compare my typing patterns with the different \n" +
    "        layouts and get some stats on what hand and which fingers I was using the most.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Hopefully the user interface and output is straight forward enough. I had a lot of fun writing this application, hopefully some of you out \n" +
    "        there will find it useful.\n" +
    "    </p>\n" +
    "    <h3>Copyright</h3>\n" +
    "    <p>\n" +
    "        All images used and generated by this app are released under <a href=\"http://creativecommons.org/licenses/by/4.0/\">Creative Commons Attribution 4.0 license</a>. In short: feel free to use the images generated by this app however you want. I honestly don't care that much about attribution, so a footnote or mention somewhere in the document they're used in is fine.\n" +
    "    </p>\n" +
    "    <h3>Older Versions of the App</h3>\n" +
    "    <p>\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <a href='/keyboard-layout-analyzer/v1/'>Version 1.0</a> - The original version I created in 2008.\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href='/keyboard-layout-analyzer/v2/'>Version 2.0</a> - An overhauled re-write that I did in 2012.\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href='/keyboard-layout-analyzer/'>Version 3.0</a> - The current version. I kept the core analysis code I did in 2012, and the code I did for the keyboard UI elements. The rest of the app was redesigned though, and the front-end code was re-architecuted to work with AngularJS, plus several features were added.\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </p>\n" +
    "</div>"
  );


  $templateCache.put('partials/config.htm',
    "<div>\n" +
    "    <div class=\"jumbotron subhead\">\n" +
    "        <h1>Configuration</h1>\n" +
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
    "                                    <label class='control-label' for=\"kb-config-kbtype\">Submitted By:</label>\n" +
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
    "                                        <button class=\"kb-config-import btn\" ng-click=\"showImportDialog()\">Import</button>\n" +
    "                                        <button class=\"kb-config-export btn\" ng-click=\"showExportDialog()\">Export</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label' for=\"kb-config-select-list\">Preset:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <select id=\"kb-config-select-list\" class=\"kb-config-select-list\">\n" +
    "                                            <option value=\"none\">[Select Layout]</option>\n" +
    "                                            <optgroup label=\"ANSI Keyboards\">\n" +
    "                                                <option value=\"standard.abcdef\">ABCDEF</option>\n" +
    "                                                <option value=\"standard.arensito\">Arensito</option>\n" +
    "                                                <option value=\"standard.asset\">Asset</option>\n" +
    "                                                <option value=\"standard.capewell\">Capewell</option>\n" +
    "                                                <option value=\"standard.carpalxq\">CarpalxQ</option>\n" +
    "                                                <option value=\"standard.colemak\">Colemak</option>\n" +
    "                                                <option value=\"standard.colemak_dh\">Colemak-DH (Mod-DH)</option>\n" +
    "                                                <option value=\"standard.colemak_dhm\">Colemak-DHm (Mod-DH)</option>\n" +
    "                                                <option value=\"standard.tarmak1\">Colemak - Tarmak 1</option>\n" +
    "                                                <option value=\"standard.tarmak2\">Colemak - Tarmak 2</option>\n" +
    "                                                <option value=\"standard.tarmak3\">Colemak - Tarmak 3</option>\n" +
    "                                                <option value=\"standard.tarmak4\">Colemak - Tarmak 4</option>\n" +
    "                                                <option value=\"standard.simplifiedDvorak\">Dvorak (Simplified)</option>\n" +
    "                                                <option value=\"standard.programmerDvorak\">Dvorak (Programmer)</option>\n" +
    "                                                <option value=\"standard.spanish-dvorak\">Dvorak (Spanish)</option>\n" +
    "                                                <option value=\"standard.klausler\">Klausler</option>\n" +
    "                                                <option value=\"standard.minimak8key\">Minimak 8-key</option>\n" +
    "                                                <option value=\"standard.minimak12key\">Minimak 12-key</option>\n" +
    "                                                <option value=\"standard.mtgap\">MTGAP</option>\n" +
    "                                                <option value=\"standard.neo2\">Neo 2 (v1)</option>\n" +
    "                                                <option value=\"standard.neo2_new\">Neo 2 (v2)</option>\n" +
    "                                                <option value=\"standard.norman\">Norman</option>\n" +
    "                                                <option value=\"standard.ohdvorakl\">One-handed Dvorak (Left)</option>\n" +
    "                                                <option value=\"standard.ohdvorakr\">One-handed Dvorak (Right)</option>\n" +
    "                                                <option value=\"standard.qgmlwy\">QGMLWY</option>\n" +
    "                                                <option value=\"standard.qwerfj\">QWERFJ</option>\n" +
    "                                                <option value=\"standard.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"standard.qwertywm\">QWERTY - Wide Mod</option>\n" +
    "                                                <option value=\"standard.qwpr\">QWPR</option>\n" +
    "                                                <option value=\"standard.russian\">Russian</option>\n" +
    "                                                <option value=\"standard.workman\">Workman</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"ISO Keyboards\">\n" +
    "                                                <option value=\"european.azerty\">AZERTY</option>\n" +
    "                                                <option value=\"european.bepo\">BÉPO</option>\n" +
    "                                                <option value=\"european.colemak\">Colemak</option>\n" +
    "                                                <option value=\"european.colemak_dh\">Colemak-DH (Mod-DH)</option>\n" +
    "                                                <option value=\"european.colemak_dhm\">Colemak-DHm (Mod-DH)</option>\n" +
    "                                                <option value=\"european.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"european.qwerty-spanish\">QWERTY (Spanish)</option>\n" +
    "                                                <option value=\"european.qwerty-estonian\">QWERTY (Estonian)</option>\n" +
    "                                            </optgroup>\n" +
    "                                            <optgroup label=\"Ergodox Keyboards\">\n" +
    "                                                <option value=\"ergodox.colemak2\">Colemak</option>\n" +
    "                                                <option value=\"ergodox.colemak_dhm\">Colemak-DHm (Mod-DH)</option>\n" +
    "                                                <option value=\"ergodox.qgmlwbcub\">QGMLWB/Cub</option>\n" +
    "                                                <option value=\"ergodox.qgmlwycub\">QGMLWY/Cub</option>\n" +
    "                                                <option value=\"ergodox.qwerty\">QWERTY</option>\n" +
    "                                                <option value=\"ergodox.norman\">Norman</option>\n" +
    "                                                <option value=\"ergodox.workman\">Workman</option>\n" +
    "                                                <option value=\"ergodox.kinesis-advantage-colemak\">Colemak (Kinesis Advantage)</option>\n" +
    "                                            </optgroup>\n" +
    "\n" +
    "                                        </select>\n" +
    "                                        <button class=\"kb-config-load btn\" ng-click=\"loadLayout()\">Load</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "<!--\n" +
    "                                <div class='control-group'>\n" +
    "                                    <label class='control-label'>Share:</label>\n" +
    "                                    <div class='controls'>\n" +
    "                                        <button class=\"btn\" ng-click=\"submitDialog()\">Submit Layout</button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "-->\n" +
    "\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "        <paginate start=\"1\" stop=\"5\" handler=\"switchLayout\"></paginate>\n" +
    "\n" +
    "        <!-- import modal -->\n" +
    "        <div id='kb-config-import-dialog' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='resultLabel' aria-hidden='true'>\n" +
    "            <div class='modal-header'>\n" +
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>x</button>\n" +
    "                <h3 id='resultLabel'>Import Layout</h3>\n" +
    "            </div>\n" +
    "            <div class='modal-body'>\n" +
    "\n" +
    "                <textarea class='input-block-level kb-config-dialog-txt'></textarea>\n" +
    "                <p class='text-left'>\n" +
    "                    Paste the text of a previously exported layout in the textbox above and press \"Import\" to load the layout.\n" +
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
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>x</button>\n" +
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
    "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>x</button>\n" +
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
    "        This is <a href=\"https://github.com/ColemakMods/keyboard-layout-analyzer\">SteveP's fork</a> of patorjk's <a href=\"https://github.com/patorjk/keyboard-layout-analyzer\">Keyboard Layout Analyzer</a>. See the <a href=\"#/about\">About Page</a> [@todo] for explanation.\n" +
    "        <br/>\n" +
    "        <br/>\n" +
    "        <h1>Analyze Text Input</h1>\n" +
    "        <p class=\"lead\">See which layout is best for your input text<p>\n" +
    "    </div>\n" +
    "    <form class='form-horizontal'>\n" +
    "        <div class='control-group'>\n" +
    "            <label class='control-label' for='txt-input'>Text to Analyze:</label>\n" +
    "            <div class='controls'>\n" +
    "                <textarea id='txt-input' class='input-block-level' ng-model='data.text'></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class='control-group'>\n" +
    "            <label class='control-label' for='text-presets'>Text Presets:</label>\n" +
    "            <div class='controls'>\n" +
    "                <select id='text-presets' ng-model='data.textPreset'>\n" +
    "                    <option value='' selected>[Select Text to Load]</option>\n" +
    "                    <option value='alice-ch1' selected>English: Alice in Wonderland, Chapter 1</option>\n" +
    "                    <option value='common-english-words'>English: List of the most commonly used words</option>\n" +
    "                    <option value='common-sat-words'>English: Most commonly used SAT words</option>\n" +
    "                    <option value='magna-carta-english'>English: Magna Carta</option>\n" +
    "                    <option value='classiccollection'>English: Classics collection</option>\n" +
    "                    <option value='1984-chapter-1'>English: 1984 Chapter 1</option>\n" +
    "                    <option value='animalfarm'>English: Animal Farm</option>\n" +
    "                    <option value='tarzan-of-the-apes'>English: Tarzan Of The Apes</option>\n" +
    "                    <option value='jungle-book'>English: Jungle Book</option>\n" +
    "                    <option value='difficultwords'>English: Difficult words</option>\n" +
    "                    <option value='medical'>English: Medical words</option>\n" +
    "                    <option value='quotes'>English: Quotes</option>\n" +
    "                    <option value='daode-jing'>English: Tao te Ching / DaodeJing</option>\n" +
    "                    <option value='poems'>English: Poems</option>\n" +
    "                    <option value='bigrams'>English: Bigrams</option>\n" +
    "                    <option value='trigrams'>English: Trigrams</option>\n" +
    "                    <option value='quadgrams'>English: Quadgrams</option>\n" +
    "                    <option value='typing-champ-1'>English: Typing Championship 1</option>\n" +
    "                    <option value='academic-1'>Academic: Cost Optimization Model</option>\n" +
    "                    <option value='academic-2'>Academic: Contractors' Performance in Construction</option>\n" +
    "                    <option value='academic-3'>Academic: Binary Logistic Analysis</option>\n" +
    "                    <option value='academic-4'>Academic: Preformulation Studies Of Carbamazepine</option>\n" +
    "                    <option value='academic-5'>Academic: Spectral studies of Divalent Metal of Co, Ni, Cu and Zn</option>\n" +
    "                    <option value='academic-6'>Academic: Phytochemical studies on Cocculus Hirsutus</option>\n" +
    "                    <option value='lorem'>Lorem Ipsum</option>\n" +
    "                    <option value='www.google.com.htm'>Tech: Google home page</option>\n" +
    "                    <option value='hanoi-a-m'>Tech: Towers of Hanoi A-M</option>\n" +
    "                    <option value='hanoi-n-z'>Tech: Towers of Hanoi N-Z</option>\n" +
    "                    <option value='kle.html'>Tech: Keyboard Layout Editor</option>\n" +
    "                    <option value='gol'>Tech: Game of Life</option>\n" +
    "                    <option value='pi1000'>Tech: Pi 1000</option>\n" +
    "                    <option value='pptt'>Tech: Programming Punctuation Torture Test</option>\n" +
    "                </select>\n" +
    "                <button class='btn' type='button' ng-click='applyPreset()'>Apply</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class='control-group'>\n" +
    "            <div class='controls'>\n" +
    "                <button class=\"btn btn-large\" type=\"button\" ng-click=\"generateOutput(data.text)\">See Which Layout is Best</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <br/>\n" +
    "            <p>Preset source texts are from <a href=\"https://github.com/patorjk/keyboard-layout-analyzer\">patorjk's original repo</a> and from <a href=\"https://bitbucket.org/Shenafu/keyboard-layout-analyzer/src/master/\">sheenafu's fork</a>.</p>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/paginate.htm',
    "<div class=\"pagination pagination\">\n" +
    "    <ul>\n" +
    "        <li class=\"switcher\" num=\"prev\" ng-click=\"handleNav($event, start*1,'prev')\">\n" +
    "            <a href=\"javascript:void(0);\" >←</a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li ng-repeat='ii in [start, stop] | makeRange' \n" +
    "            ng-class=\"{switcher: true, active: ($index === current)}\" \n" +
    "            num=\"$index\" ng-click=\"handleNav($event, start*1, $index)\">\n" +
    "            <a href=\"javascript:void(0);\" >{{start*1+$index}}</a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"switcher\" num=\"next\" ng-click=\"handleNav($event, start*1, 'next')\">\n" +
    "            <a href=\"javascript:void(0);\" >→</a>\n" +
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
    "                <input type=\"radio\" name='kla-opt{{settings.id}}-unit-radio' id=\"kla-opt{{settings.id}}-units-{{$index}}\" ng-model=\"source.units\" value='{{curUnit}}'><label for=\"kla-opt{{settings.id}}-units-{{$index}}\" >{{curUnit}}</label>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div> \n" +
    "\n" +
    "    <div class=\"btn-group text-left\" style='display:{{settings.showDisplayType}}'>\n" +
    "        <button data-toggle=\"dropdown\" class=\"btn dropdown-toggle\"  data-placeholder=\"false\">Display: {{source.displayType}}<span class=\"caret\"></span></button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"(dType, dValue) in source.displayData track by $index\">\n" +
    "                <input type=\"radio\" name='kla-opt{{settings.id}}-unit-radio' id=\"kla-opt{{settings.id}}-d-{{$index}}\" ng-model=\"source.displayType\" value='{{dType}}'><label for=\"kla-opt{{settings.id}}-d-{{$index}}\" >{{dType}}</label>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div> \n" +
    "\n" +
    "    <div class=\"btn-group text-left\">\n" +
    "        <button data-toggle=\"dropdown\" class=\"btn dropdown-toggle\"  data-placeholder=\"false\">Keyboards <span class=\"caret\"></span></button>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"layout in source.seriesData.allSeriesLabels\">\n" +
    "                <input type=\"checkbox\" id=\"kla-opt{{settings.id}}-dd-{{$index}}\" ng-model=\"source.rawSeriesData[$index].visible\"><label for=\"kla-opt{{settings.id}}-dd-{{$index}}\" >{{layout}}</label>\n" +
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
    "        <li class='kla-pill'><a ng-click='tabSwitch($event, \"personalized\")' href='#personalized'>Personalized</a></li>\n" +
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
    "                                    <div class='text-left'>Layout</div>\n" +
    "                                </th>\n" +
    "                                <th>\n" +
    "                                    <div class='text-right'>Score</div>\n" +
    "                                </th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "    \n" +
    "                            <tr ng-repeat=\"layout in results.summary.rankedLayouts\" >\n" +
    "                                <td ><div class='text-right'>#{{$index + 1}}</div></td>\n" +
    "                                <td></td>\n" +
    "                                <td ><div class='text-left'>{{layout.layoutName}}</div></td>\n" +
    "                                <td><div class='text-right'>{{layout.score.toFixed(2)}}</div></td>\n" +
    "                            </tr>\n" +
    "                    \n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "\n" +
    "                </div>\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                The optimal layout score is based on a weighed calculation that factors in the \n" +
    "                distance your fingers moved (33%), \n" +
    "                how often you use particular fingers (33%),\n" +
    "                and how often you switch fingers and hands while typing (34%).\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                <div class='text-center' ng-show='share.showSection'>\n" +
    "                    <button class='btn' style='position:relative;margin-top:-12px;margin-right:10px;' ng-click='getUrlToShare()'>Get URL to Share Results →</button>\n" +
    "                    <input type='text' ng-model='share.url' style='width:475px;' />\n" +
    "                </div>\n" +
    "            </p>\n" +
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
    "</div>"
  );

}]);
