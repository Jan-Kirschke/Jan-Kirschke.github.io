document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  const skillBars = document.querySelectorAll('.skill-bar');
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const barTop = bar.getBoundingClientRect().top;
      if (barTop < window.innerHeight) {
        bar.style.width = `${bar.dataset.skill}%`;
      }
    });
  };
  
  window.addEventListener('scroll', animateSkills);
  animateSkills();
  
  const fadeElems = document.querySelectorAll('.fade-in');
  const fadeIn = () => {
    fadeElems.forEach(elem => {
      const elemTop = elem.getBoundingClientRect().top;
      if (elemTop < window.innerHeight) {
        elem.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', fadeIn);
  fadeIn();