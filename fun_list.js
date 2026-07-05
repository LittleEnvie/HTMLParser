
  // ── 
  // ──   LAST EDIT 2026.07.05.Sun.15.
  // ── 

var fun_list_current_list = [
  ['http://192.168.192.121:3000/2026.06.HTMLParser/2026.06.27.Sat.09.54.36%20base_on_these/fun_body.js',          `fun_body();`],
  ['http://192.168.192.121:3000/2026.06.HTMLParser/2026.06.27.Sat.09.54.36%20base_on_these/fun_modlist.js',          `fun_modlist();`],
  ['http://192.168.192.121:3000/2026.06.HTMLParser/2026.06.27.Sat.09.54.36%20base_on_these/fun_body.js',          `fun_body();`],
  ['http://192.168.192.121:3000/2026.06.HTMLParser/2026.06.27.Sat.09.54.36%20base_on_these/fun_modlist.js',          `fun_modlist();`],
  
];

var fun_list_loaded = {};
var fun_list_index  = 0;

function fun_list() {
  if (document.getElementById('div_Cocainer')) {
    console.log('[fun_list] div_Cocainer already exists, skipping.');
    return;
  }

  if (fun_list_index >= fun_list_current_list.length) {
    console.log('[fun_list] All entries processed.');
    return;
  }

  var entry      = fun_list_current_list[fun_list_index];
  var file       = entry[0];
  var expression = entry[1];
  fun_list_index++;

  if (fun_list_loaded[file]) {
    console.log('[fun_list] Already loaded:', file, '— executing:', expression);
    try { eval(expression); } catch(e) { console.error('[fun_list] eval error:', e); }
    fun_list();
    return;
  }

  var script = document.createElement('script');
  script.src = file;

  script.onload = function() {
    fun_list_loaded[file] = true;
    console.log('[fun_list] Loaded:', file, '— executing:', expression);
    try { eval(expression); } catch(e) { console.error('[fun_list] eval error:', e); }
    fun_list();
  };

  script.onerror = function() {
    console.error('[fun_list] Failed to load:', file);
    fun_list();
  };

  document.head.appendChild(script);
}
