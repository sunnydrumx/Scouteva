/* =========================
   SCOUTEVA MENU
========================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    toggle.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );
    });
  });
}


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================
   NEXT WORKING DAY
   Monday - Friday
========================= */

function getNextWorkingDay() {

  const date = new Date();

  // Start from tomorrow
  date.setDate(date.getDate() + 1);

  // 0 = Sunday
  // 6 = Saturday

  while (
    date.getDay() === 0 ||
    date.getDay() === 6
  ) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}


/* =========================
   BOOKING FORM
========================= */

const bookingForm =
  document.getElementById('bookingForm');

const bookingSuccess =
  document.getElementById('bookingSuccess');

const newBooking =
  document.getElementById('newBooking');


if (bookingForm) {

  bookingForm.addEventListener('submit', function(event) {

    event.preventDefault();


    /*
      The consultation is automatically assigned
      to the next working day at 12:00 PM.

      The date is calculated here but is not displayed
      as a public "appointment" on the website.
    */

    const nextWorkingDay =
      getNextWorkingDay();

    const appointmentDate =
      nextWorkingDay.toISOString().split('T')[0];

    const appointmentTime =
      '12:00 PM';


    /* Collect form information */

    const formData = new FormData(bookingForm);

    const bookingData = {

      name: formData.get('clientName'),

      email: formData.get('clientEmail'),

      clientType: formData.get('clientType'),

      project: formData.get('project'),

      paymentReference:
        formData.get('paymentReference'),

      appointmentDate:
        appointmentDate,

      appointmentTime:
        appointmentTime,

      submittedAt:
        new Date().toISOString()

    };


    /*
      Save the booking locally.

      This makes the form actually process the
      information in the browser.

      When you later connect a backend, email service
      or Paystack, this same bookingData object can
      be sent to it.
    */

    localStorage.setItem(
      'scoutevaLatestBooking',
      JSON.stringify(bookingData)
    );


    /* Hide form */

    bookingForm.hidden = true;


    /* Show success */

    if (bookingSuccess) {
      bookingSuccess.hidden = false;

      bookingSuccess.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

  });

}


/* =========================
   NEW BOOKING
========================= */

if (newBooking) {

  newBooking.addEventListener('click', () => {

    if (bookingForm) {
      bookingForm.reset();
      bookingForm.hidden = false;
    }

    if (bookingSuccess) {
      bookingSuccess.hidden = true;
    }

    if (bookingForm) {
      bookingForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

  });

}
