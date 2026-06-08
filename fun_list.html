var fun_list_current_list = [
  ['fun_body.js', 'https://cdn.jsdelivr.net/gh/LittleEnvie/HTMLParser@main/fun_body.js', 'fun_body.js', `fun_body();`],
];

var fun_list_loaded = {};
var fun_list_index  = 0;

function fun_list() {
  if (fun_list_index >= fun_list_current_list.length) {
    console.log('[fun_list] All entries processed.');
    return;
  }

  var entry      = fun_list_current_list[fun_list_index];
  var file       = entry[0];
  var url        = entry[1];
  var expression = entry[3];
  fun_list_index++;

  if (fun_list_loaded[file]) {
    console.log('[fun_list] Already loaded:', file, '— executing:', expression);
    try { eval(expression); } catch(e) { console.error('[fun_list] eval error:', e); }
    fun_list();
    return;
  }

  var script = document.createElement('script');
  script.src = url;

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
