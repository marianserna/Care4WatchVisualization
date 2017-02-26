(function(window, document) {
  const intro = document.getElementById('intro');
  let height = 0;

  for (let row = 4; row > 0; row--) {
    for (let col = row; col > 0; col--) {
      const logo = document.createElement('img');
      logo.setAttribute('src', 'img/logo.png');
      logo.classList.add('logo');
      logo.style.top = `${height * 75}px`;
      logo.style.left = `${(row - col) * 75}px`
      intro.appendChild(logo);
    }
    height++;
  }

  TweenMax.to('.logo', 3, {
    rotation: 720,
    opacity: 1,
    width: '70px',
    height: '70px',
    ease: Sine.easeInOut,
    onComplete: () => {
      TweenMax.to('.logo', 1.5, {opacity: 0});
      TweenMax.to('#intro .name', 2.5, {opacity: 1, ease: Sine.easeInOut});
      TweenMax.to('#intro ul', 2.5, {opacity: 1, ease: Sine.easeInOut, delay: 0.5});


    }
  });
})(window, document);
