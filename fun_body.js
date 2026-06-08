function fun_body() {
  const html = document.body.innerHTML;
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
  div_Cocainer.innerHTML = html;

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

  // Buttons 0–4 (ESC=0, F1=1, F2=2, F3=3, F4=4)
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

    // Mouse hover/hold/press via fun_HotKeys if loaded
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
}
