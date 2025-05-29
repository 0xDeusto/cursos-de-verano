(function() {
  const ghostUrl = '/cursos-de-verano/2025/assets/img/ghost.png'; // change path if needed
  const ghostCount = 2; // how many ghosts at once
  const moveDuration = 15000; // ms ghost moves
  const fadeDuration = 3000; // ms fade in/out

  function createGhost() {
    const ghost = document.createElement('div');
    Object.assign(ghost.style, {
      position: 'fixed',
      width: '64px',
      height: '64px',
      backgroundImage: `url(${ghostUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
      opacity: '0',
      transition: `opacity ${fadeDuration}ms ease-in-out, transform ${moveDuration - fadeDuration}ms linear`,
      zIndex: 10000,
      willChange: 'transform, opacity',
    });
    document.body.appendChild(ghost);
    return ghost;
  }

  function randomPosition() {
    return {
      x: Math.random() * (window.innerWidth - 64),
      y: Math.random() * (window.innerHeight - 64),
    };
  }

  function animateGhost(ghost, delay = 0) {
  setTimeout(() => {
    const start = randomPosition();
    const end = randomPosition();

    // Start fully transparent at start position
    ghost.style.opacity = '0';
    ghost.style.top = `${start.y}px`;
    ghost.style.left = `${start.x}px`;
    ghost.style.transform = ''; // reset transform

    // Fade in
    ghost.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
    ghost.offsetWidth; // force reflow
    ghost.style.opacity = '1';

    // Move to end position smoothly
    setTimeout(() => {
      ghost.style.transition = `top ${moveDuration - fadeDuration}ms linear, left ${moveDuration - fadeDuration}ms linear, opacity ${fadeDuration}ms ease-in-out`;
      ghost.style.top = `${end.y}px`;
      ghost.style.left = `${end.x}px`;
    }, fadeDuration);

    // Fade out near end
    setTimeout(() => {
      ghost.style.opacity = '0';
    }, moveDuration - fadeDuration);

    // Loop
    setTimeout(() => {
      animateGhost(ghost);
    }, moveDuration);

  }, delay);
}


  window.addEventListener('load', () => {
    for(let i = 0; i < ghostCount; i++) {
      const ghost = createGhost();
      animateGhost(ghost, i * (moveDuration / ghostCount)); // stagger start times
    }
  });
})();

