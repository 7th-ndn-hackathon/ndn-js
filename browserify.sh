browserify --debug --ignore-missing --standalone ndn browser.js -o build/ndn.js
echo 'for (var k in ndn){ window[k] = ndn[k]; }' >> build/ndn.js
