// "Tools" flyout for the static pages (index.html, partners.html).
// Reads the same list as the Next.js pages: /tools.json. Markup it expects:
//   <div class="tools-menu" data-tools-menu>
//     <button class="tools-trigger" aria-expanded="false" aria-controls="toolsFlyout">Tools …</button>
//     <div class="tools-flyout" id="toolsFlyout" hidden></div>
//   </div>
(function () {
  var PER_CATEGORY = 6;
  var menus = document.querySelectorAll('[data-tools-menu]');
  if (!menus.length) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render(data) {
    var cols = data.categories.map(function (cat) {
      var tools = data.tools.filter(function (t) { return t.category === cat.id; });
      var items = tools.slice(0, PER_CATEGORY).map(function (t) {
        return '<li><a href="/tools/' + esc(t.slug) + '">' + esc(t.name) +
          (t.live ? '' : '<span class="soon">Soon</span>') + '</a></li>';
      }).join('');
      var more = tools.length - PER_CATEGORY;
      return '<div class="tf-col">' +
        '<a class="tf-cat" href="/tools#' + esc(cat.id) + '">' + esc(cat.name) + '</a>' +
        '<ul>' + items + '</ul>' +
        (more > 0 ? '<a class="tf-more" href="/tools#' + esc(cat.id) + '">+' + more + ' more</a>' : '') +
        '</div>';
    }).join('');
    return '<div class="container">' +
      '<div class="tf-grid">' + cols + '</div>' +
      '<div class="tf-foot"><span>Free · No sign-up · Nothing you enter is stored</span>' +
      '<a class="btn btn-primary" href="/tools">View all ' + data.tools.length + ' free tools →</a></div>' +
      '</div>';
  }

  function setup(menu, data) {
    var trigger = menu.querySelector('.tools-trigger');
    var panel = menu.querySelector('.tools-flyout');
    var timer = null;
    panel.innerHTML = render(data);

    function setOpen(open) {
      panel.hidden = !open;
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('open', open);
    }
    function isOpen() { return !panel.hidden; }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!isOpen());
    });

    // Hover opens on wide screens with a real pointer; phones and tablets use the tap toggle.
    var canHover = window.matchMedia('(hover: hover) and (min-width: 861px)');
    menu.addEventListener('mouseenter', function () {
      if (!canHover.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { setOpen(true); }, 80);
    });
    menu.addEventListener('mouseleave', function () {
      if (!canHover.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { setOpen(false); }, 180);
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); trigger.focus(); }
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        setOpen(false);
        var nav = menu.closest('nav.links');
        if (nav) nav.classList.remove('open');
      }
    });
  }

  fetch('/tools.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { menus.forEach(function (m) { setup(m, data); }); })
    .catch(function () {
      // If the list can't load, the trigger simply goes to the tools page.
      menus.forEach(function (m) {
        m.querySelector('.tools-trigger').addEventListener('click', function () { location.href = '/tools'; });
      });
    });
})();
