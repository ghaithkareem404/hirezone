
// Tabs switch + autofocus
(function(){
  const tabs = document.querySelectorAll('.tabs .tab');
  const seeker = document.getElementById('form-seeker');
  const company = document.getElementById('form-company');
  if (tabs.length){
    tabs.forEach(t=>t.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const isSeeker = t.dataset.tab === 'seeker';
      seeker?.classList.toggle('visible', isSeeker);
      company?.classList.toggle('visible', !isSeeker);
      // autofocus أول حقل
      const targetForm = isSeeker ? seeker : company;
      const firstInput = targetForm?.querySelector('input');
      firstInput && firstInput.focus();
    }));
  }
})();

// IntersectionObserver reveal + counter animation
(function(){
  const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-delay]');
  const counters = document.querySelectorAll('.count');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const delay = e.target.getAttribute('data-reveal-delay')||0;
        setTimeout(()=>{
          e.target.style.transition = 'opacity .5s ease, transform .5s ease';
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
        }, +delay);
        io.unobserve(e.target);
      }
    });
  },{threshold:.15});
  revealTargets.forEach(el=>io.observe(el));

  // number counter
  const countIo = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const to = +el.dataset.to || 0;
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const dur = 1200;
        function frame(now){
          const p = Math.min((now-start)/dur,1);
          const eased = 1 - Math.pow(1-p,3);
          const val = Math.floor(to*eased);
          el.textContent = val.toLocaleString('ar-EG') + suffix;
          if(p<1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        countIo.unobserve(el);
      }
    });
  },{threshold:.6});
  counters.forEach(c=>countIo.observe(c));
})();

// Small hover magnetic effect on buttons
(function(){
  const mags = document.querySelectorAll('.btn, .login-card');
  mags.forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left)/r.width - 0.5)*6; // -3..3 deg
      const y = ((e.clientY - r.top)/r.height - 0.5)*-6;
      el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-1px)`;
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = '';
    });
  });
})();
