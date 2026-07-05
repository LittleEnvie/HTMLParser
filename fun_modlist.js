
  // ── 
  // ──   LAST EDIT 2026.07.05.Sun.15.
  // ── 




// ── fun_modlist ──────────────────────────────────────────────────────────────
// Registry of all loaded modules.
// Each entry: [function_call, link, dependentOnOtherFunction, whatDoesItDo, MMSSadded]
// ─────────────────────────────────────────────────────────────────────────────

var fun_modlist_entries = [
  [
    'fun_body()',
    'https://raw.githubusercontent.com/LittleEnvie/HTMLParser/refs/heads/HTMLParser/fun_body.js',
    null,
    'Builds core DOM: div_Background, div_Cocainer, div_HotKeys (buttons 0-4), print button, draggable div_modlist panel.',
    '09:54'
  ],
  [
    'fun_modlist()',
    'https://raw.githubusercontent.com/LittleEnvie/HTMLParser/refs/heads/HTMLParser/fun_modlist.js',
    'fun_body()',
    'Module registry. Stores and renders metadata for every loaded script into div_modlist_body.',
    '09:54'
  ],
  [
    'fun_render(htmlString, targetEl)',
    'https://raw.githubusercontent.com/LittleEnvie/HTMLParser/refs/heads/HTMLParser/fun_render.js',
    'fun_body()',
    'Converts a raw HTML string into an interactive collapsible block tree inside targetEl. Each DIV becomes a hue-tinted node with a collapse button, guide line, child index badges on click-to-select, and spacer fewlines at top/bottom.',
    '09:54'
  ],
];

function fun_modlist() {
  var body = document.getElementById('div_modlist_body');

  // If div_modlist_body doesn't exist yet, fun_body hasn't run —
  // inject a minimal script tag to load fun_body.js first, then retry.
  if (!body) {
    console.warn('[fun_modlist] div_modlist_body not found. Trying to load fun_body first...');
    var s = document.createElement('script');
    s.src = fun_modlist_entries[0][1]; // fun_body.js URL
    s.onload = function() { if(typeof fun_body==='function') { fun_body(); fun_modlist(); } };
    document.head.appendChild(s);
    return;
  }

  // Clear placeholder / previous render
  body.innerHTML = '';
  body.style.padding = '0';
  body.style.opacity = '1';
  body.style.color   = '#ddd';

  // Update header badge
  var header = document.getElementById('div_modlist_header');
  if (header) {
    var spans = header.querySelectorAll('span');
    if (spans[0]) spans[0].textContent = '\uD83D\uDCE6 MODLIST (' + fun_modlist_entries.length + ')';
  }

  fun_modlist_entries.forEach(function(entry, i) {
    var call = entry[0];
    var link = entry[1];
    var dep  = entry[2];
    var desc = entry[3];
    var mmss = entry[4];

    var row = document.createElement('div');
    Object.assign(row.style, {
      padding:    '8px 12px',
      borderTop:  '1px solid rgba(255,255,255,0.07)',
      fontSize:   '11px',
      lineHeight: '1.5',
      color:      '#ccc',
      background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
    });

    row.innerHTML =
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">' +
        '<span style="background:rgba(242,88,88,0.85);color:#fff;border-radius:50%;width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:bold;flex-shrink:0;">' + i + '</span>' +
        '<span style="color:#7ecfff;font-weight:bold;font-size:12px;">' + call + '</span>' +
      '</div>' +
      '<div style="margin-bottom:4px;">' + desc + '</div>' +
      '<div style="display:flex;gap:10px;font-size:10px;opacity:0.5;">' +
        '<span>' + (dep ? 'dep: ' + dep : 'no dep') + '</span>' +
        '<span>added ' + mmss + '</span>' +
        '<a href="' + link + '" target="_blank" style="color:#88aaff;text-decoration:none;">src \u2197</a>' +
      '</div>';

    body.appendChild(row);
  });

  console.log('[fun_modlist] Rendered', fun_modlist_entries.length, 'entries.');
}
