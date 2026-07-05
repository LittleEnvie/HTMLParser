
  // ── 
  // ──   LAST EDIT 2026.07.05.Sun.15.
  // ── 


/* ── fun_render.js — convert raw HTML div tree into interactive block nodes ── */

var fun_render_selectedWrapper = null;

/* ── hue helpers ── */
function fun_render_hueOf(wrapper) {
  return parseInt(wrapper.dataset.divhue) || 0;
}
function fun_render_hsl(hue, s, l, a) {
  return a !== undefined
    ? 'hsla('+hue+','+s+'%,'+l+'%,'+a+')'
    : 'hsl('+hue+','+s+'%,'+l+'%)';
}

/* ── child index badges ── */
function fun_render_clearChildIndexBadges(wrapper) {
  if (!wrapper) return;
  wrapper.querySelectorAll(':scope > .fun-children-zone > .fun-block-wrapper > .fun-child-index-badge')
    .forEach(function(el) { el.remove(); });
}

function fun_render_showChildIndexBadges(wrapper) {
  if (!wrapper) return;
  var zone = wrapper.querySelector(':scope > .fun-children-zone');
  if (!zone) return;
  var children = Array.from(zone.querySelectorAll(':scope > .fun-block-wrapper'));
  children.forEach(function(child, i) {
    var hue = fun_render_hueOf(child);
    var badge = document.createElement('div');
    badge.className = 'fun-child-index-badge';
    badge.textContent = i;
    Object.assign(badge.style, {
      position:      'absolute',
      left:          '-26px',
      top:           '50%',
      transform:     'translateY(-50%)',
      minWidth:      '18px',
      padding:       '1px 4px',
      background:    fun_render_hsl(hue, 70, 18, 0.55),
      border:        '1px solid ' + fun_render_hsl(hue, 80, 55, 0.8),
      color:         fun_render_hsl(hue, 90, 78),
      fontSize:      '10px',
      fontFamily:    'monospace',
      fontWeight:    'bold',
      borderRadius:  '3px',
      pointerEvents: 'none',
      zIndex:        '999',
      textAlign:     'center',
      lineHeight:    '1.6',
      whiteSpace:    'nowrap',
    });
    child.style.position = 'relative';
    child.appendChild(badge);
  });
}

/* ── hue application ── */
function fun_render_applyHue(wrapper) {
  var block = wrapper.querySelector('.fun-block-header > .block');
  if (!block) return;
  if (wrapper.dataset.divhue === undefined) {
    var parent = wrapper.parentElement && wrapper.parentElement.closest('.fun-block-wrapper');
    var parentHue = parent && parent.dataset.divhue !== undefined ? parseInt(parent.dataset.divhue) : null;
    wrapper.dataset.divhue = parentHue !== null
      ? (parentHue + 15 + Math.floor(Math.random() * 16)) % 360
      : Math.floor(Math.random() * 256);
  }
  var hue = fun_render_hueOf(wrapper);
  block.style.borderColor = fun_render_hsl(hue, 55, 38);
  block.style.color       = fun_render_hsl(hue, 70, 78);

  /* re-tint the guide line */
  var guideLine = wrapper.querySelector(':scope > .fun-children-zone > .fun-guide-line');
  if (guideLine) {
    guideLine.style.background = fun_render_hsl(hue, 70, 45, 0.35);
    guideLine.style.boxShadow  = '0 0 3px ' + fun_render_hsl(hue, 80, 55, 0.2);
  }

  /* re-tint the collapse button if it already exists */
  var btn = block.querySelector('.fun-collapse-btn');
  if (btn) {
    btn.style.background  = fun_render_hsl(hue, 40, 12);
    btn.style.borderColor = fun_render_hsl(hue, 50, 30);
    btn.style.color       = fun_render_hsl(hue, 90, 72);
    btn.style.boxShadow   = '0 0 4px ' + fun_render_hsl(hue, 80, 45, 0.5);
  }
}

/* ── collapse button — absolutely positioned over block top-left corner ── */
function fun_render_syncCollapse(wrapper) {
  var zone    = wrapper.querySelector(':scope > .fun-children-zone');
  var header  = wrapper.querySelector(':scope > .fun-block-header');
  var block   = header.querySelector('.block');
  var hasKids = zone && zone.querySelector(':scope > .fun-block-wrapper');
  var btn     = block && block.querySelector('.fun-collapse-btn');
  var hue     = fun_render_hueOf(wrapper);

  /* remove legacy in-flow spacer if still present */
  var spacer = header.querySelector('.fun-collapse-spacer');
  if (spacer) spacer.remove();

  if (hasKids) {
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'fun-collapse-btn';
      Object.assign(btn.style, {
        position:       'absolute',
        top:            '0px',
        left:           '0px',
        width:          '18px',
        height:         '18px',
        zIndex:         '10',
        background:     fun_render_hsl(hue, 40, 12),
        border:         '1px solid ' + fun_render_hsl(hue, 50, 30),
        borderRadius:   '0 0 4px 0',
        color:          fun_render_hsl(hue, 90, 72),
        boxShadow:      '0 0 4px ' + fun_render_hsl(hue, 80, 45, 0.5),
        fontSize:       '13px',
        lineHeight:     '16px',
        textAlign:      'center',
        cursor:         'pointer',
        userSelect:     'none',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '0',
        transition:     'background 0.15s, box-shadow 0.15s',
      });
      btn.addEventListener('mouseenter', function() {
        btn.style.background = fun_render_hsl(hue, 60, 22);
        btn.style.boxShadow  = '0 0 8px ' + fun_render_hsl(hue, 90, 60, 0.7);
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.background = fun_render_hsl(hue, 40, 12);
        btn.style.boxShadow  = '0 0 4px ' + fun_render_hsl(hue, 80, 45, 0.5);
      });
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        wrapper.classList.toggle('fun-collapsed');
        btn.textContent    = wrapper.classList.contains('fun-collapsed') ? '+' : '−';
        zone.style.display = wrapper.classList.contains('fun-collapsed') ? 'none' : '';
      });
      /* anchor inside .block so it sits at the block's own top-left */
      block.style.position = 'relative';
      block.appendChild(btn);
    }
    btn.textContent = wrapper.classList.contains('fun-collapsed') ? '+' : '−';
  } else {
    if (btn) btn.remove();
  }
}

/* ── block factory ── */
function fun_render_createBlock(contentHTML) {
  var wrapper = document.createElement('div');
  wrapper.className = 'fun-block-wrapper';
  wrapper.dataset.divhue = Math.floor(Math.random() * 256);
  Object.assign(wrapper.style, {
    position:     'relative',
    marginBottom: '5px',
    borderRadius: '4px',
    fontFamily:   "'Space Mono',monospace",
  });

  var header = document.createElement('div');
  header.className = 'fun-block-header';
  /* button is absolute now — no flex layout needed */
  Object.assign(header.style, {
    display:  'block',
    position: 'relative',
  });

  var block = document.createElement('div');
  block.className = 'block';
  Object.assign(block.style, {
    background:   'rgba(17,17,17,0.82)',
    border:       '4px solid #2a2a2a',
    borderRadius: '4px',
    padding:      '10px 14px',
    fontSize:     '13px',
    lineHeight:   '1.6',
    wordBreak:    'break-word',
    fontWeight:   '700',
    position:     'relative',
    zIndex:       '1',
    cursor:       'pointer',
    minWidth:     '0',
    whiteSpace:   'pre-wrap',
    color:        '#e8e8e8',
  });
  block.innerHTML = contentHTML;

  /* resize media to fit */
  ['img','video','iframe','canvas','svg'].forEach(function(tag) {
    Array.from(block.querySelectorAll(tag)).forEach(function(el) {
      el.style.maxWidth = '100%';
      el.style.width    = 'auto';
      el.style.height   = 'auto';
      el.style.display  = 'block';
    });
  });
  Array.from(block.querySelectorAll('audio')).forEach(function(el) {
    el.style.maxWidth = '100%';
    el.style.width    = '100%';
  });

  header.appendChild(block);
  wrapper.appendChild(header);

  var zone = document.createElement('div');
  zone.className = 'fun-children-zone';
  Object.assign(zone.style, {
    paddingLeft: '22px',
    paddingTop:  '4px',
    position:    'relative',
  });

  var guideLine = document.createElement('div');
  guideLine.className = 'fun-guide-line';
  var hue = parseInt(wrapper.dataset.divhue) || 0;
  guideLine.style.background = fun_render_hsl(hue, 70, 45, 0.35);
  guideLine.style.boxShadow  = '0 0 3px ' + fun_render_hsl(hue, 80, 55, 0.2);
  zone.appendChild(guideLine);

  wrapper.appendChild(zone);

  /* selection — outline tinted by wrapper's own hue */
  wrapper.addEventListener('click', function(e) {
    e.stopPropagation();
    var prev = fun_render_selectedWrapper;

    if (prev) {
      prev.querySelector(':scope > .fun-block-header > .block').style.outline = '';
      fun_render_clearChildIndexBadges(prev);
      fun_render_selectedWrapper = null;
    }

    if (prev !== wrapper) {
      var hue = fun_render_hueOf(wrapper);
      block.style.outline = '2px solid ' + fun_render_hsl(hue, 95, 72);
      fun_render_selectedWrapper = wrapper;
      fun_render_showChildIndexBadges(wrapper);
    }
  });

  fun_render_applyHue(wrapper);
  return wrapper;
}

/* ── import existing node tree ── */
function fun_render_importNode(rawDiv, depth) {
  var childDivs = Array.from(rawDiv.children).filter(function(c){ return c.tagName === 'DIV'; });
  var clone = rawDiv.cloneNode(true);
  Array.from(clone.children).filter(function(c){ return c.tagName === 'DIV'; }).forEach(function(c){ c.remove(); });
  var contentHTML = clone.innerHTML.trim();

  var _fakeBlock = document.createElement('div');
  _fakeBlock.className = 'block';
  _fakeBlock.innerHTML = contentHTML;
  if (typeof flattenBlockContent === 'function') {
    var _flat = flattenBlockContent(_fakeBlock);
  }

  var wrapper = fun_render_createBlock(contentHTML || '&nbsp;');

  if (rawDiv.dataset.divhue !== undefined) {
    wrapper.dataset.divhue = rawDiv.dataset.divhue;
    fun_render_applyHue(wrapper);
  }
  if (rawDiv.dataset.divcreated !== undefined) wrapper.dataset.divcreated = rawDiv.dataset.divcreated;

  var zone = wrapper.querySelector(':scope > .fun-children-zone');
  childDivs.forEach(function(child, i) {
    var childWrapper = fun_render_importNode(child, depth + 1);
    var badge = childWrapper.querySelector(':scope > .fun-index-badge');
    if (badge) badge.textContent = i;
    zone.appendChild(childWrapper);
  });

  fun_render_syncCollapse(wrapper);
  return wrapper;
}

/* ── inject guide-line styles once ── */
(function() {
  if (document.getElementById('fun-render-styles')) return;
  var s = document.createElement('style');
  s.id = 'fun-render-styles';
  s.textContent = [
    '.fun-guide-line {',
    '  position: absolute;',
    '  left: 8px;',
    '  top: 0;',
    '  bottom: 4px;',
    '  width: 1px;',
    '  border-radius: 1px;',
    '  transition: background 0.2s, box-shadow 0.2s;',
    '  pointer-events: none;',
    '}',
    '.fun-children-zone:hover > .fun-guide-line {',
    '  filter: brightness(2);',
    '}',
  ].join('\n');
  document.head.appendChild(s);
})();

/* ── fewlines: spacer div with 5 empty lines, skipped on export ── */
function fun_render_makeFewlines() {
  var el = document.createElement('div');
  el.className = 'fun-fewlines';
  el.innerHTML = '<br><br><br><br><br>';
  Object.assign(el.style, {
    pointerEvents: 'none',
    userSelect:    'none',
  });
  return el;
}

/* ── cocainer content helper — strips fewlines before export ── */
function fun_cocainer_content() {
  var cocainer = document.getElementById('div_Cocainer');
  if (!cocainer) return '';
  var clone = cocainer.cloneNode(true);
  clone.querySelectorAll('.fun-fewlines').forEach(function(el) { el.remove(); });
  return clone.innerHTML;
}

/* ── entry point ── */
function fun_render(htmlString, targetEl) {
  targetEl.innerHTML = '';

  /* top spacer */
  targetEl.appendChild(fun_render_makeFewlines());

  var tmp = document.createElement('div');
  tmp.innerHTML = htmlString;
  var rootDivs = Array.from(tmp.children).filter(function(c){ return c.tagName === 'DIV'; });
  rootDivs.forEach(function(div, i) {
    var wrapper = fun_render_importNode(div, 0);
    var badge = wrapper.querySelector(':scope > .fun-index-badge');
    if (badge) badge.textContent = i;
    targetEl.appendChild(wrapper);
  });

  /* bottom spacer */
  targetEl.appendChild(fun_render_makeFewlines());
}
