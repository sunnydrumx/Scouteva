document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {

    toggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      toggle.textContent = isOpen ? "×" : "☰";

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        toggle.textContent = "☰";

      });

    });

  }


  /* =========================
     COPYRIGHT YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     APPOINTMENT DATE
     NEXT WORKING DAY
     12:00 PM AUTOMATICALLY
  ========================= */

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


  const appointmentDate =
    document.getElementById("appointmentDate");

  const appointment =
    getNextWorkingDay();

  if (appointmentDate) {

    appointmentDate.textContent =
      formatAppointmentDate(appointment);

  }


  /* =========================
     PAYMENT REFERENCE
  ========================= */

  function createPaymentReference() {

    const now = new Date();

    const datePart =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const randomPart =
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    return `SCOUTEVA-${datePart}-${randomPart}`;

  }


  const paymentReference =
    document.getElementById("paymentReference");

  const generatedReference =
    createPaymentReference();

  if (paymentReference) {
    paymentReference.textContent =
      generatedReference;
  }


  /* =========================
     START REQUEST BUTTON
  ========================= */

  const openRequest =
    document.getElementById("openRequest");

  const requestSection =
    document.getElementById("request");

  if (openRequest && requestSection) {

    openRequest.addEventListener("click", () => {

      requestSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => {

        const nameInput =
          document.getElementById("clientName");

        if (nameInput) {
          nameInput.focus();
        }

      }, 700);

    });

  }


  /* =========================
     REQUEST FORM
  ========================= */

  const requestForm =
    document.getElementById("requestForm");

  const confirmation =
    document.getElementById("confirmation");

  const confirmationText =
    document.getElementById("confirmationText");

  const confirmationWhatsApp =
    document.getElementById("confirmationWhatsApp");


  if (requestForm) {

    requestForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* Get form values */

        const name =
          document
            .getElementById("clientName")
            .value
            .trim();

        const email =
          document
            .getElementById("clientEmail")
            .value
            .trim();

        const phone =
          document
            .getElementById("clientPhone")
            .value
            .trim();

        const service =
          document
            .getElementById("service")
            .value
            .trim();

        const message =
          document
            .getElementById("projectMessage")
            .value
            .trim();


        if (
          !name ||
          !email ||
          !phone ||
          !service ||
          !message
        ) {

          alert(
            "Please complete all required fields before submitting."
          );

          return;

        }


        /* Appointment */

        const appointmentText =
          formatAppointmentDate(appointment);


        /* Confirmation */

        if (confirmationText) {

          confirmationText.textContent =
            `Thank you, ${name}. Your request has been received. ` +
            `Your appointment is scheduled for ` +
            `${appointmentText} at 12:00 PM. ` +
            `Your payment reference is ${generatedReference}.`;

        }


        /* WhatsApp message */

        const whatsappMessage =
          `Hello SCOUTEVA, I have submitted a project request.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone/WhatsApp: ${phone}\n` +
          `Service: ${service}\n` +
          `Project: ${message}\n\n` +
          `Appointment: ${appointmentText} at 12:00 PM\n` +
          `Payment Reference: ${generatedReference}`;


        if (confirmationWhatsApp) {

          confirmationWhatsApp.href =
            `https://wa.me/2349014651396?text=` +
            encodeURIComponent(whatsappMessage);

        }


        /* Hide form */

        requestForm.hidden = true;


        /* Show confirmation */

        if (confirmation) {
          confirmation.hidden = false;

          confirmation.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

      }
    );

  }


  /* =========================
     SERVICE CARDS
     They are informational,
     so no fake links/actions.
  ========================= */

  /* =========================
     SMOOTH INTERNAL LINKS
     ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

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

});
