/* =========================================
   SCOUTEVA NAVIGATION
========================================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {

  toggle.addEventListener('click', () => {

    const open = nav.classList.toggle('open');

    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

  });

}


document.querySelectorAll('.nav a').forEach(link => {

  link.addEventListener('click', () => {

    if (nav) {
      nav.classList.remove('open');
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }

  });

});


/* =========================================
   FOOTER YEAR
========================================= */

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================
   NEXT WORKING DAY
   Monday - Friday
========================================= */

function getNextWorkingDay() {

  const date = new Date();

  date.setHours(12, 0, 0, 0);

  do {
    date.setDate(date.getDate() + 1);
  } while (
    date.getDay() === 0 ||
    date.getDay() === 6
  );

  return date;
}


/* =========================================
   FORMAT DATE
========================================= */

function formatAppointmentDate(date) {

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

}


/* =========================================
   DISPLAY APPOINTMENT
========================================= */

const appointmentDate =
  document.getElementById('appointmentDate');

let appointmentDay = null;

if (appointmentDate) {

  appointmentDay = getNextWorkingDay();

  appointmentDate.textContent =
    formatAppointmentDate(appointmentDay);

}


/* =========================================
   BOOKING FORM
========================================= */

const bookingForm =
  document.getElementById('bookingForm');

const paymentBox =
  document.getElementById('paymentBox');

const whatsappBooking =
  document.getElementById('whatsappBooking');

const confirmationText =
  document.getElementById('confirmationText');


if (bookingForm) {

  bookingForm.addEventListener('submit', function(event) {

    event.preventDefault();


    const name =
      document.getElementById('clientName').value.trim();

    const email =
      document.getElementById('clientEmail').value.trim();

    const phone =
      document.getElementById('clientPhone').value.trim();

    const service =
      document.getElementById('service').value;

    const message =
      document.getElementById('projectMessage').value.trim();


    if (
      !name ||
      !email ||
      !phone ||
      !service ||
      !message
    ) {
      alert('Please complete all the booking fields.');
      return;
    }


    /* Recalculate in case the page stayed open overnight */

    appointmentDay = getNextWorkingDay();

    const formattedDate =
      formatAppointmentDate(appointmentDay);


    appointmentDate.textContent =
      formattedDate;


    /* Confirmation information */

    confirmationText.innerHTML = `
      <strong>${name}</strong><br>
      Service: ${service}<br>
      Consultation: ${formattedDate} at 12:00 PM<br>
      Email: ${email}<br>
      Phone: ${phone}
    `;


    /* WhatsApp booking message */

    const whatsappMessage =
      `Hello SCOUTEVA,

I would like to book a consultation.

Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Service: ${service}

Appointment date: ${formattedDate}
Appointment time: 12:00 PM

Project details:
${message}

I will make the manual payment to:

Access Bank
Account Number: 0717553338
Account Name: Sunday Samuel

I will send my payment confirmation here after payment.`;


    const whatsappURL =
      `https://wa.me/2349014651396?text=${encodeURIComponent(whatsappMessage)}`;


    whatsappBooking.href = whatsappURL;


    /* Show payment */

    paymentBox.hidden = false;


    /* Scroll payment into view */

    paymentBox.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  });

}


/* =========================================
   KEEP APPOINTMENT DAY VALID
========================================= */

setInterval(() => {

  const newDate = getNextWorkingDay();

  if (appointmentDate) {

    appointmentDate.textContent =
      formatAppointmentDate(newDate);

  }

}, 60000);
