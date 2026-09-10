/* ============================================================
   Ezo Imbiss u. Lebensmittel — Seitenlogik
   Dreizehn Stunden am Stück, sechs Tage, sonntags zu. Der Status
   sagt vor allem eins: ob man jetzt noch hinkommt.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var OPEN = 9, CLOSE = 22;
  var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  var now = new Date();
  var day = now.getDay();
  var dec = now.getHours() + now.getMinutes() / 60;
  var isSunday = day === 0;
  var open = !isSunday && dec >= OPEN && dec < CLOSE;

  var label;
  if (open) {
    var restMin = Math.round((CLOSE - dec) * 60);
    label = restMin <= 60
      ? 'Noch ' + restMin + ' Minuten offen — bis 22:00 Uhr'
      : 'Jetzt geöffnet — bis 22:00 Uhr';
  } else if (isSunday) {
    label = 'Sonntag geschlossen — morgen wieder ab 9:00 Uhr';
  } else if (dec < OPEN) {
    label = 'Noch geschlossen — heute ab 9:00 Uhr';
  } else {
    var tomorrow = (day + 1) % 7;
    label = tomorrow === 0
      ? 'Feierabend — Sonntag zu, am Montag wieder ab 9:00 Uhr'
      : 'Feierabend — morgen wieder ab 9:00 Uhr';
  }

  var badge = document.getElementById('statusBadge');
  var text = document.getElementById('statusText');
  if (badge && text) {
    badge.hidden = false;
    badge.classList.add(open ? 'is-open' : 'is-closed');
    text.textContent = label;
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = open ? 'offen bis 22:00' : 'gerade zu';
    if (open) headerStatus.classList.add('is-open');
  }

  var list = document.getElementById('hoursList');
  if (list) {
    var row = list.querySelector('[data-day="' + day + '"]');
    if (row) row.classList.add('is-today');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
