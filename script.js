document.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.getElementById('name');
  let originalText = nameElement.innerText;
  let particles = [];

  nameElement.addEventListener('mouseover', () => {
      // Text in einzelne Buchstaben aufteilen
      particles = originalText.split('').map((char, i) => {
          return {
              char: char,
              x: 0,
              y: 0,
              originalX: i * 20, // Abstand zwischen Buchstaben
              originalY: 0,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10
          };
      });

      // Animation starten
      animate();
  });

  nameElement.addEventListener('mouseout', () => {
      // Text zurücksetzen
      nameElement.innerText = originalText;
  });

  function animate() {
      nameElement.innerHTML = '';
      let finished = true;

      particles.forEach(particle => {
          // Bewegung der Partikel
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Zurück zur Originalposition
          particle.vx *= 0.95;
          particle.vy *= 0.95;
          particle.x += (particle.originalX - particle.x) * 0.1;
          particle.y += (particle.originalY - particle.y) * 0.1;

          // Span-Element für jeden Buchstaben erstellen
          const span = document.createElement('span');
          span.innerText = particle.char;
          span.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
          span.style.display = 'inline-block';
          nameElement.appendChild(span);

          // Prüfen ob Animation noch läuft
          if (Math.abs(particle.vx) > 0.1 || Math.abs(particle.vy) > 0.1) {
              finished = false;
          }
      });

      if (!finished) {
          requestAnimationFrame(animate);
      }
  }
});
