// main.js - simple utilities and small interactions
document.addEventListener('DOMContentLoaded', function () {
  // set years across pages
  const years = document.querySelectorAll('#year,#year2,#year3,#year4,#year5');
  years.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if(toggle && mobileNav){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if(open){
        mobileNav.hidden = true;
      } else {
        mobileNav.hidden = false;
      }
    });
  }

  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      if(this.hash){
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if(target) target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // contact form handler
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = contactForm.dataset.endpoint;
      const status = document.getElementById('formStatus');

      if(!endpoint || endpoint === 'REPLACE_WITH_YOUR_ENDPOINT'){
        status.textContent = 'Form is not configured. Replace data-endpoint with your form endpoint.';
        return;
      }

      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((v,k)=>payload[k]=v);

      status.textContent = 'Sending…';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        if(res.ok){
          status.textContent = 'Thank you — your message has been sent.';
          contactForm.reset();
        } else {
          const txt = await res.text();
          status.textContent = 'There was an error sending your message.';
          console.error('Contact error', res.status, txt);
        }
      } catch(err){
        console.error(err);
        status.textContent = 'Network error — please try again later.';
      }
    });
  }
});

