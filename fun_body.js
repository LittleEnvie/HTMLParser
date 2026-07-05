
  // ── 
  // ──   LAST EDIT 2026.07.05.Sun.15.
  // ── 

function fun_body() {
  if (document.getElementById('div_Cocainer')) {
    console.log('[fun_body] div_Cocainer already exists, skipping.');
    return;
  }

  // ── div_htmlsource ── snapshot of everything in <body> before we touch anything
  const div_htmlsource = document.createElement("div");
  div_htmlsource.id = "div_htmlsource";
  div_htmlsource.style.display = "none";
  div_htmlsource.innerHTML = document.body.innerHTML;
  document.body.appendChild(div_htmlsource);

  // ── div_Background ── behind everything
  const div_Background = document.createElement("div");
  div_Background.id = "div_Background";
  Object.assign(div_Background.style, {
    position:   "fixed",
    inset:      "0",
    zIndex:     "0",
    background: "#23272a",
  });
  document.body.appendChild(div_Background);

  // ── div_Cocainer ── centered content container, 900px wide
  const div_Cocainer = document.createElement("div");
  div_Cocainer.id = "div_Cocainer";
  Object.assign(div_Cocainer.style, {
    position:  "fixed",
    zIndex:    "1",
    width:     "900px",
    height:    "90vh",
    top:       "50%",
    left:      "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    padding:   "8px",
    margin:    "8px",
  });
  document.body.appendChild(div_Cocainer);

  // ── div_coc_source ── copy of original body HTML, lives inside div_Cocainer
  const div_coc_source = document.createElement("div");
  div_coc_source.id = "div_coc_source";
  div_coc_source.innerHTML = div_htmlsource.innerHTML;
  div_Cocainer.appendChild(div_coc_source);

  // ── div_HotKeys ── fixed bar above everything, buttons 0-4
  const div_HotKeys = document.createElement("div");
  div_HotKeys.id = "div_HotKeys";
  Object.assign(div_HotKeys.style, {
    position:       "fixed",
    top:            "0",
    left:           "50%",
    transform:      "translateX(-50%)",
    zIndex:         "999997",
    width:          "512px",
    height:         "64px",
    background:     "rgba(0,0,0,0.5)",
    borderRadius:   "0 0 12px 12px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "12px",
  });

  ["0","1","2","3","4"].forEach(function(label) {
    const btn = document.createElement("button");
    btn.innerHTML = label;
    btn.dataset.hotkey = label;
    Object.assign(btn.style, {
      width:        "48px",
      height:       "48px",
      padding:      "0",
      fontSize:     "18px",
      fontWeight:   "bold",
      cursor:       "pointer",
      borderRadius: "8px",
      border:       "2px solid rgba(255,255,255,0.3)",
      background:   "rgba(242, 88, 88, 0.7)",
      color:        "white",
      flexShrink:   "0",
      transition:   "all 0.1s ease",
    });
    btn.addEventListener('mouseenter',  function() { if(typeof fun_HotKeys==='function') fun_HotKeys(+label, 'Hover',   null); });
    btn.addEventListener('mouseleave',  function() { if(typeof fun_HotKeys==='function') fun_HotKeys(+label, 'Default', null); });
    btn.addEventListener('mousedown',   function() { if(typeof fun_HotKeys==='function') fun_HotKeys(+label, 'Hold',    null); });
    btn.addEventListener('mouseup',     function() {
      if(typeof fun_HotKeys==='function') {
        fun_HotKeys(+label, 'Press', null);
        setTimeout(function(){ fun_HotKeys(+label, 'Hover', null); }, 150);
      }
      var fn = window['key_' + label];
      if (typeof fn === 'function') fn();
    });
    div_HotKeys.appendChild(btn);
  });

  document.body.appendChild(div_HotKeys);

  // ── fun_print button ── bottom center
  const btn = document.createElement("button");
  btn.innerHTML = "3";
  Object.assign(btn.style, {
    position:     "fixed",
    bottom:       "40px",
    left:         "50%",
    transform:    "translateX(-50%)",
    zIndex:       "999998",
    padding:      "16px 32px",
    fontSize:     "32px",
    fontWeight:   "bold",
    cursor:       "pointer",
    borderRadius: "12px",
    border:       "3px solid white",
    background:   "rgba(0,0,0,0.85)",
    color:        "white",
    boxShadow:    "0 0 20px rgba(255,255,255,0.4)",
  });
  btn.onclick = function() { fun_print(fun_date()); };
  document.body.appendChild(btn);

  // ── div_modlist ── draggable floating panel, visible immediately ──────────
  const div_modlist = document.createElement("div");
  div_modlist.id = "div_modlist";
  Object.assign(div_modlist.style, {
    position:     "fixed",
    top:          "80px",
    right:        "20px",
    zIndex:       "999999",
    width:        "340px",
    maxHeight:    "70vh",
    overflowY:    "auto",
    background:   "#1e2124",
    border:       "1px solid rgba(255,255,255,0.18)",
    borderRadius: "10px",
    boxShadow:    "0 8px 32px rgba(0,0,0,0.8)",
    fontFamily:   "monospace",
    color:        "#ddd",
    userSelect:   "none",
  });

  // Header — rendered immediately, acts as drag handle
  const div_modlist_header = document.createElement("div");
  div_modlist_header.id = "div_modlist_header";
  Object.assign(div_modlist_header.style, {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    padding:        "8px 12px",
    background:     "rgba(242,88,88,0.25)",
    borderRadius:   "10px 10px 0 0",
    borderBottom:   "1px solid rgba(255,255,255,0.1)",
    cursor:         "grab",
    fontSize:       "13px",
    fontWeight:     "bold",
    color:          "#fff",
    letterSpacing:  "0.05em",
  });
  div_modlist_header.innerHTML =
    '<span>&#128230; MODLIST</span>' +
    '<span style="font-size:10px;opacity:0.5;font-weight:normal;">drag me</span>';
  div_modlist.appendChild(div_modlist_header);

  // Placeholder body — fun_modlist() will replace this with real rows
  const div_modlist_body = document.createElement("div");
  div_modlist_body.id = "div_modlist_body";
  div_modlist_body.style.padding = "10px 12px";
  div_modlist_body.style.fontSize = "11px";
  div_modlist_body.style.opacity = "0.5";
  div_modlist_body.style.color = "#aaa";
  div_modlist_body.textContent = "Loading modules…";
  div_modlist.appendChild(div_modlist_body);

  document.body.appendChild(div_modlist);

  // ── Drag logic ── mouse drag on div_modlist_header ────────────────────────
  (function() {
    var dragging = false;
    var startX, startY, origLeft, origTop;

    div_modlist_header.addEventListener('mousedown', function(e) {
      e.preventDefault();
      dragging = true;
      div_modlist_header.style.cursor = 'grabbing';

      var rect = div_modlist.getBoundingClientRect();
      origLeft = rect.left;
      origTop  = rect.top;
      startX   = e.clientX;
      startY   = e.clientY;

      // Switch from right-anchor to left/top so movement math works
      div_modlist.style.left   = origLeft + 'px';
      div_modlist.style.top    = origTop  + 'px';
      div_modlist.style.right  = 'auto';

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup',   onUp);
    });

    function onMove(e) {
      if (!dragging) return;
      div_modlist.style.left = (origLeft + (e.clientX - startX)) + 'px';
      div_modlist.style.top  = (origTop  + (e.clientY - startY)) + 'px';
    }

    function onUp() {
      dragging = false;
      div_modlist_header.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    }
  })();

  // ── Load fun_render.js then fun_modlist.js ────────────────────────────────
  // fun_list stops iterating once div_Cocainer exists so we self-load here.
  function _loadScript(src, cb) {
    // GitHub raw URLs return Content-Type: text/plain which browsers reject as
    // a <script src>. Use fetch + inline eval to bypass that restriction.
    fetch(src)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function(code) {
        var s = document.createElement('script');
        s.textContent = code;
        document.head.appendChild(s);
        cb();
      })
      .catch(function(err) {
        console.error('[fun_body] failed to load:', src, err);
        cb();
      });
  }

  function _runRender() {
    if (typeof fun_render === 'function') {
      fun_render(div_htmlsource.innerHTML, div_coc_source);
    } else {
      console.warn('[fun_body] fun_render not available after load.');
    }
  }

  function _runModlist() {
    if (typeof fun_modlist === 'function') fun_modlist();
  }

  function _afterRender() {
    _runRender();
    if (typeof fun_modlist === 'function') {
      _runModlist();
    } else {
      _loadScript(
        'http://192.168.192.121:3000/2026.06.HTMLParser/2026.06.27.Sat.09.54.36%20base_on_these/fun_modlist.js',
        _runModlist
      );
    }
  }

  if (typeof fun_render === 'function') {
    _afterRender();
  } else {
    _loadScript(
      'https://raw.githubusercontent.com/LittleEnvie/HTMLParser/refs/heads/HTMLParser/fun_render.js',
      _afterRender
    );
  }
}
