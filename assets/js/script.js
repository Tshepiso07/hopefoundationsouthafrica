/* Hope Foundation South Africa - shared interactive behaviour */
document.addEventListener("DOMContentLoaded", () => {
  // Keep the copyright year current.
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation: open and close the menu accessibly.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("open")) {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.focus();
      }
    });
  }

  // Programme search filters the cards without reloading the page.
  const search = document.querySelector("#programme-search");
  const programmeCards = [...document.querySelectorAll(".searchable")];
  const noResults = document.querySelector("#no-results");
  if (search && programmeCards.length) {
    search.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      let visibleCount = 0;
      programmeCards.forEach((card) => {
        const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
        const matches = searchableText.includes(term);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  }

  // Preselect an enquiry interest when a visitor follows a programme link.
  const interestSelect = document.querySelector("#interest");
  if (interestSelect) {
    const requestedInterest = new URLSearchParams(window.location.search).get("interest");
    if (requestedInterest) {
      const option = [...interestSelect.options].find((item) => item.text === requestedInterest);
      if (option) interestSelect.value = option.value;
    }
  }

  // Shared validation and email preparation for the enquiry and contact forms.
  const formConfigs = [
    { id: "enquiry-form", feedbackId: "enquiry-feedback", recipient: "hello@hopefoundation.example", subject: "Website enquiry - Hope Foundation South Africa", kind: "enquiry" },
    { id: "contact-form", feedbackId: "contact-feedback", recipient: "hello@hopefoundation.example", subject: "Website message - Hope Foundation South Africa", kind: "contact" }
  ];

  formConfigs.forEach((config) => {
    const form = document.getElementById(config.id);
    if (!form) return;
    const feedback = document.getElementById(config.feedbackId);

    // Clear field errors as the visitor corrects an input.
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => clearFieldError(field));
      field.addEventListener("change", () => clearFieldError(field));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;
      const requiredFields = [...form.querySelectorAll("[required]")];

      requiredFields.forEach((field) => {
        let valid = field.checkValidity();
        if (field.type === "checkbox") valid = field.checked;
        if (!valid) {
          showFieldError(field, field.type === "checkbox" ? "Please confirm this statement." : getValidationMessage(field));
          if (!firstInvalid) firstInvalid = field;
        } else {
          clearFieldError(field);
        }
      });

      // Validate an optional telephone number only when the visitor enters one.
      const phone = form.querySelector('input[type="tel"]');
      if (phone && phone.value.trim() && !phone.checkValidity()) {
        showFieldError(phone, "Please enter a valid telephone number.");
        if (!firstInvalid) firstInvalid = phone;
      }

      if (firstInvalid) {
        if (feedback) feedback.textContent = "Please check the highlighted fields and try again.";
        firstInvalid.focus();
        return;
      }

      const values = Object.fromEntries(new FormData(form).entries());
      let body = "";
      if (config.kind === "enquiry") {
        body = `Interest: ${values.interest}\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "Not supplied"}\nAvailability: ${values.availability || "Not supplied"}\n\nMessage:\n${values.message}`;
        if (feedback) feedback.textContent = "Your details are valid. Your email application will open with the enquiry prepared. No data is stored by this demo website.";
      } else {
        body = `Name: ${values.name}\nEmail: ${values.email}\nMessage type: ${values.type}\n\nMessage:\n${values.message}`;
        if (feedback) feedback.textContent = "Your details are valid. Your email application will open with the message prepared. No data is stored by this demo website.";
      }

      const mailto = `mailto:${config.recipient}?subject=${encodeURIComponent(config.subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  });

  function showFieldError(field, message) {
    const wrapper = field.closest(".field");
    if (!wrapper) return;
    wrapper.classList.add("invalid");
    const error = wrapper.querySelector(".error-message");
    if (error) {
      if (!error.id) error.id = `${field.id}-error`;
      error.textContent = message;
      field.setAttribute("aria-describedby", error.id);
    }
    field.setAttribute("aria-invalid", "true");
  }

  function clearFieldError(field) {
    const wrapper = field.closest(".field");
    if (!wrapper) return;
    wrapper.classList.remove("invalid");
    const error = wrapper.querySelector(".error-message");
    if (error) error.textContent = "";
    field.removeAttribute("aria-invalid");
    if (error && field.getAttribute("aria-describedby") === error.id) {
      field.removeAttribute("aria-describedby");
    }
  }

  function getValidationMessage(field) {
    if (field.validity.valueMissing) return "This field is required.";
    if (field.validity.typeMismatch) return "Please enter a valid email address.";
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    if (field.validity.patternMismatch) return "Please use the requested format.";
    return "Please check this field.";
  }
});