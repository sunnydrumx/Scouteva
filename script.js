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

  // Returns the next working day, Monday-Friday.
  function nextWorkingDay(fromDate = new Date()) {
    const date = new Date(fromDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + 1);

    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  const bookingForm = document.getElementById("booking-form");
  const paymentSection = document.getElementById("payment");
  const bookingSummary = document.getElementById("booking-summary");
  const paymentWhatsApp = document.getElementById("payment-whatsapp");
  const backToBooking = document.getElementById("back-to-booking");

  if (bookingForm && paymentSection) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const formData = new FormData(bookingForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const appointmentDate = nextWorkingDay();

      bookingSummary.innerHTML =
        `<strong>${escapeHtml(name)}</strong>, your requested consultation slot is ` +
        `<strong>12:00 PM on ${escapeHtml(formatDate(appointmentDate))}</strong>. ` +
        `Complete the manual payment below, then send the payment confirmation on WhatsApp.`;

      const whatsappText =
        `Hello SCOUTEVA, I have completed my manual payment for my consultation.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Service: ${encodeURIComponent(service)}%0A` +
        `Appointment: 12:00 PM, ${encodeURIComponent(formatDate(appointmentDate))}%0A` +
        `Project: ${encodeURIComponent(message)}`;

      paymentWhatsApp.href = `https://wa.me/2349014651396?text=${whatsappText}`;

      paymentSection.hidden = false;
      paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (backToBooking && paymentSection && bookingForm) {
    backToBooking.addEventListener("click", () => {
      paymentSection.hidden = true;
      document.getElementById("booking").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }
})();
