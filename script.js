(() => {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function nextWorkingDay(fromDate = new Date()) {
    const date = new Date(fromDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
    return date;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-NG", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(date);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  const bookingForm = document.getElementById("booking-form");
  const paymentSection = document.getElementById("payment");
  const bookingSummary = document.getElementById("booking-summary");
  const paymentReference = document.getElementById("payment-reference");
  const submitPayment = document.getElementById("submit-payment");
  const backToBooking = document.getElementById("back-to-booking");
  const confirmation = document.getElementById("appointment-confirmation");
  const confirmationMessage = document.getElementById("confirmation-message");
  const confirmedDate = document.getElementById("confirmed-date");
  const confirmationWhatsApp = document.getElementById("confirmation-whatsapp");

  let booking = null;

  if (bookingForm && paymentSection) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const data = new FormData(bookingForm);
      booking = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        service: String(data.get("service") || "").trim(),
        message: String(data.get("message") || "").trim(),
        appointmentDate: nextWorkingDay()
      };

      // Do not reveal the appointment date/time before payment confirmation.
      bookingSummary.innerHTML =
        `<strong>${escapeHtml(booking.name)}</strong>, your request is ready for payment. ` +
        `Complete the payment using the account details below, then enter your payment reference to confirm your appointment.`;

      paymentReference.value = "";
      confirmation.hidden = true;
      paymentSection.hidden = false;
      paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (submitPayment) {
    submitPayment.addEventListener("click", () => {
      if (!booking) return;
      const reference = paymentReference.value.trim();
      if (!reference) {
        paymentReference.focus();
        paymentReference.setCustomValidity("Please enter your payment reference.");
        paymentReference.reportValidity();
        return;
      }
      paymentReference.setCustomValidity("");

      confirmedDate.textContent = formatDate(booking.appointmentDate);
      confirmationMessage.innerHTML =
        `Thank you, <strong>${escapeHtml(booking.name)}</strong>. Your payment confirmation has been submitted. ` +
        `Your appointment is scheduled for the date and time shown below.`;

      const whatsappText =
        `Hello SCOUTEVA, I have completed my payment and submitted my appointment confirmation.%0A%0A` +
        `Name: ${encodeURIComponent(booking.name)}%0A` +
        `Email: ${encodeURIComponent(booking.email)}%0A` +
        `WhatsApp/Phone: ${encodeURIComponent(booking.phone)}%0A` +
        `Service: ${encodeURIComponent(booking.service)}%0A` +
        `Payment reference: ${encodeURIComponent(reference)}%0A` +
        `Appointment: 12:00 PM, ${encodeURIComponent(formatDate(booking.appointmentDate))}`;

      confirmationWhatsApp.href = `https://wa.me/2349014651396?text=${whatsappText}`;
      confirmation.hidden = false;
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (backToBooking && paymentSection && bookingForm) {
    backToBooking.addEventListener("click", () => {
      paymentSection.hidden = true;
      bookingForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
