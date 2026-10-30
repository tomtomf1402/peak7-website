/* Zwei-Klick-Videoeinbettung
   Vor dem Klick wird nichts von YouTube/Vimeo geladen – nur das lokale Vorschaubild.
   Erst „Video laden" erzeugt den iframe. */

(function () {
  var providers = {
    youtube: {
      name: 'YouTube (Google)',
      src: function (id) {
        return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      }
    },
    vimeo: {
      name: 'Vimeo',
      src: function (id, hash) {
        return 'https://player.vimeo.com/video/' + encodeURIComponent(id) +
          '?dnt=1&autoplay=1' + (hash ? '&h=' + encodeURIComponent(hash) : '');
      }
    }
  };

  document.querySelectorAll('.video').forEach(function (box) {
    var provider = providers[box.dataset.provider] || providers.youtube;
    var title = box.dataset.title || 'Video';

    var consent = document.createElement('div');
    consent.className = 'video__consent';

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'video__load';
    button.textContent = 'Video laden';
    button.setAttribute('aria-label', title + ' laden und abspielen');

    var note = document.createElement('p');
    note.innerHTML = 'Mit Klick wird das Video von ' + provider.name +
      ' geladen. Dabei werden Daten an den Anbieter übermittelt. ' +
      '<a href="datenschutz.html#videos">Datenschutz</a>';

    consent.appendChild(button);
    consent.appendChild(note);
    box.appendChild(consent);

    button.addEventListener('click', function () {
      if (!box.dataset.id) {
        button.textContent = 'Video-Link fehlt';
        return;
      }
      var iframe = document.createElement('iframe');
      iframe.src = provider.src(box.dataset.id, box.dataset.hash);
      iframe.title = title;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
    });
  });
})();
