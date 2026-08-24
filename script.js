/* =========================
   MOBILE NAVIGATION
========================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute(
      'aria-label',
      open ? 'Close menu' : 'Open menu'
    );
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
}


/* =========================
   COPYRIGHT YEAR
========================= */

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================
   CONSULTATION REQUEST
========================= */

const consultationForm =
  document.getElementById('consultationForm');

if (consultationForm) {

  consultationForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const name =
      document.getElementById('clientName')?.value.trim();

    const contact =
      document.getElementById('clientContact')?.value.trim();

    const email =
      document.getElementById('clientEmail')?.value.trim();

    const service =
      document.getElementById('service')?.value;

    const message =
      document.getElementById('message')?.value.trim();

    if (!name || !contact || !service || !message) {
      alert('Please complete all required fields.');
      return;
    }

    const whatsappMessage =
`Hello SCOUTEVA,

I would like to request a consultation.

Name: ${name}

Phone / WhatsApp: ${contact}

Email: ${email || 'Not provided'}

Area of interest: ${service}

Project / Request:
${message}

I understand that SCOUTEVA will first review my request and communicate an available consultation time. I will confirm the proposed time before proceeding with payment and the consultation.`;

    const whatsappURL =
      'https://wa.me/2349014651396?text=' +
      encodeURIComponent(whatsappMessage);

    window.open(
      whatsappURL,
      '_blank',
      'noopener,noreferrer'
    );
  });
}
