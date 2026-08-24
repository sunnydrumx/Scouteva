/* =========================
   MOBILE MENU
========================= */

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    toggle.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    toggle.textContent = open ? "✕" : "☰";
  });
}


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    if (nav) {
      nav.classList.remove("open");
    }

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.textContent = "☰";
    }

  });

});


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================
   NEXT WORKING DAY
   Monday - Friday
========================= */

function getNextWorkingDay() {

  const date = new Date();

  // Move to the next day first
  date.setDate(date.getDate() + 1);

  // Saturday = 6
  // Sunday = 0

  while (
    date.getDay() === 0 ||
    date.getDay() === 6
  ) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}


/* =========================
   FORMAT DATE
========================= */

function formatAppointmentDate(date) {

  return date.toLocaleDateString(
    "en-NG",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

}


/* =========================
   APPOINTMENT FORM
========================= */

const appointmentForm =
  document.getElementById("appointmentForm");

const paymentCard =
  document.getElementById("paymentCard");

const paymentCompleteBtn =
  document.getElementById("paymentCompleteBtn");

const appointmentResult =
  document.getElementById("appointmentResult");


let clientInformation = null;


if (appointmentForm) {

  appointmentForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const formData =
        new FormData(appointmentForm);

      clientInformation = {

        name:
          formData.get("clientName").trim(),

        email:
          formData.get("clientEmail").trim(),

        phone:
          formData.get("clientPhone").trim(),

        service:
          formData.get("service"),

        details:
          formData.get("projectDetails").trim()

      };


      /*
        Move the user to the payment section
      */

      if (paymentCard) {

        paymentCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }
  );

}


/* =========================
   PAYMENT COMPLETED
========================= */

if (paymentCompleteBtn) {

  paymentCompleteBtn.addEventListener(
    "click",
    function() {

      /*
        Make sure the client filled the form first.
      */

      if (!clientInformation) {

        alert(
          "Please complete the consultation form first."
        );

        const booking =
          document.getElementById("booking");

        if (booking) {

          booking.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

        return;

      }


      /*
        Automatically calculate the
        next Monday-Friday.
      */

      const appointmentDate =
        getNextWorkingDay();

      const formattedDate =
        formatAppointmentDate(appointmentDate);


      /*
        Appointment is ALWAYS 12 PM.
      */

      const appointmentTime =
        "12:00 PM";


      /*
        Build WhatsApp message.
      */

      const message =
`Hello SCOUTEVA,

I have completed my payment and would like to confirm my consultation request.

Name: ${clientInformation.name}
Email: ${clientInformation.email}
Phone/WhatsApp: ${clientInformation.phone}

Service: ${clientInformation.service}

Project details:
${clientInformation.details}

Requested appointment:
${formattedDate} at ${appointmentTime}

I have my payment confirmation available.

Thank you.`;


      const whatsappURL =
        "https://wa.me/2349014651396?text=" +
        encodeURIComponent(message);


      /*
        Show confirmation.
      */

      if (appointmentResult) {

        appointmentResult.innerHTML = `
          <strong>Request ready.</strong><br><br>
          Your appointment request is for
          <strong>${formattedDate}</strong>
          at <strong>${appointmentTime}</strong>.<br><br>
          Tap the button below to send your payment confirmation
          and appointment request to SCOUTEVA on WhatsApp.
          <br><br>

          <a
            class="btn btn-primary full-btn"
            href="${whatsappURL}"
            target="_blank"
            rel="noopener"
          >
            Send request on WhatsApp ↗
          </a>
        `;

        appointmentResult.classList.add("show");

        appointmentResult.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }
  );

}


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach((link) => {

  link.addEventListener("click", function(event) {

    const targetID =
      this.getAttribute("href");

    if (!targetID || targetID === "#") {
      return;
    }

    const target =
      document.querySelector(targetID);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
