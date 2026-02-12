// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameContainer = document.getElementById("resourceNameContainer");

// Example roles
const role = "admin"; // "reserver" | "admin"

// Will hold a reference to the Create button so we can enable/disable it
let createButton = null;
let updateButton = null;
let deleteButton = null;

// ===============================
// 1a) Error message container
// ===============================
const errorContainer = document.createElement("div");
errorContainer.id = "formError";
errorContainer.className = "mb-4 text-sm text-red-600 hidden"; // hidden by default
actions.prepend(errorContainer);

// Helper to show/hide error
function showFormError(message) {
  if (!errorContainer) return;
  if (message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
  }
}

// ===============================
// 2) Button creation helpers
// ===============================
const BUTTON_BASE_CLASSES =
  "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";

const BUTTON_ENABLED_CLASSES =
  "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

const BUTTON_DISABLED_CLASSES =
  "cursor-not-allowed opacity-50";

function addButton({ label, type = "button", value, classes = "" }) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = label;
  btn.name = "action";
  if (value) btn.value = value;

  btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();

  actions.appendChild(btn);
  return btn;
}

function setButtonEnabled(btn, enabled) {
  if (!btn) return;

  btn.disabled = !enabled;

  btn.classList.toggle("cursor-not-allowed", !enabled);
  btn.classList.toggle("opacity-50", !enabled);

  if (!enabled) {
    btn.classList.remove("hover:bg-brand-dark/80");
  } else {
    if (btn.value === "create" || btn.textContent === "Create") {
      btn.classList.add("hover:bg-brand-dark/80");
    }
  }
}

// ===============================
// 3) Form validation functions
// ===============================
function isResourceNameValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
  return trimmed.length >= 5 && trimmed.length <= 30 && allowedPattern.test(trimmed);
}

function isDescriptionValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ .,!?-]*$/;
  return trimmed.length >= 10 && trimmed.length <= 50 && allowedPattern.test(trimmed);
}

function isPriceValid(value) {
  if (value === "") return false;
  const number = Number(value);
  return !isNaN(number) && number >= 0;
}

function isAvailabilityValid() {
  const checkbox = document.getElementById("resourceAvailable");
  return checkbox && checkbox.checked;
}

function isPriceUnitValid() {
  const checked = document.querySelector('input[name="resourcePriceUnit"]:checked');
  return !!checked;
}

function isFormValid() {
  const nameInput = document.getElementById("resourceName");
  const descriptionInput = document.getElementById("resourceDescription");
  const priceInput = document.getElementById("resourcePrice");

  if (!nameInput || !descriptionInput || !priceInput) return false;

  return (
    isResourceNameValid(nameInput.value) &&
    isDescriptionValid(descriptionInput.value) &&
    isPriceValid(priceInput.value) &&
    isAvailabilityValid() &&
    isPriceUnitValid()
  );
}

// Make globally accessible for form.js
window.isFormValid = isFormValid;

// Update Create button state
function updateCreateButtonState() {
  setButtonEnabled(createButton, isFormValid());
}

// ===============================
// 4) Render action buttons
// ===============================
function renderActionButtons(currentRole) {
  if (currentRole === "reserver") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      classes: BUTTON_ENABLED_CLASSES,
    });
  }

  if (currentRole === "admin") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      value: "create",
      classes: BUTTON_ENABLED_CLASSES,
    });

    updateButton = addButton({
      label: "Update",
      value: "update",
      classes: BUTTON_ENABLED_CLASSES,
    });

    deleteButton = addButton({
      label: "Delete",
      value: "delete",
      classes: BUTTON_ENABLED_CLASSES,
    });
  }

  setButtonEnabled(createButton, false);
  setButtonEnabled(updateButton, false);
  setButtonEnabled(deleteButton, false);
}

// ===============================
// 5) Input creation + validation visual
// ===============================
function createResourceNameInput(container) {
  const input = document.createElement("input");
  input.id = "resourceName";
  input.name = "resourceName";
  input.type = "text";
  input.placeholder = "e.g., Meeting Room A";

  input.className = `
    mt-2 w-full rounded-2xl border border-black/10 bg-white
    px-4 py-3 text-sm outline-none
    focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30
    transition-all duration-200 ease-out
  `;
  container.appendChild(input);
  return input;
}

function setInputVisualState(input, state) {
  input.classList.remove(
    "border-green-500", "bg-green-100", "focus:ring-green-500/30",
    "border-red-500", "bg-red-100", "focus:ring-red-500/30",
    "focus:border-brand-blue", "focus:ring-brand-blue/30"
  );

  input.classList.add("focus:ring-2");

  if (state === "valid") {
    input.classList.add("border-green-500", "bg-green-100", "focus:ring-green-500/30");
  } else if (state === "invalid") {
    input.classList.add("border-red-500", "bg-red-100", "focus:ring-red-500/30");
  }
}

// Attach validation for resource name
function attachResourceNameValidation(input) {
  const update = () => {
    const value = input.value;
    if (!value.trim()) {
      setInputVisualState(input, "neutral");
    } else {
      setInputVisualState(input, isResourceNameValid(value) ? "valid" : "invalid");
    }
    updateCreateButtonState();
  };
  input.addEventListener("input", update);
  update();
}

// Attach validation for resource description
function attachDescriptionValidation(input) {
  const update = () => {
    const value = input.value;
    if (!value.trim()) {
      setInputVisualState(input, "neutral");
    } else {
      setInputVisualState(input, isDescriptionValid(value) ? "valid" : "invalid");
    }
    updateCreateButtonState();
  };
  input.addEventListener("input", update);
  update();
}

// Other fields (price, availability, price unit)
function attachOtherFieldValidation() {
  const descriptionInput = document.getElementById("resourceDescription");
  const priceInput = document.getElementById("resourcePrice");
  const availabilityCheckbox = document.getElementById("resourceAvailable");
  const priceUnitRadios = document.querySelectorAll('input[name="resourcePriceUnit"]');

  if (descriptionInput) descriptionInput.addEventListener("input", updateCreateButtonState);
  if (priceInput) priceInput.addEventListener("input", updateCreateButtonState);
  if (availabilityCheckbox) availabilityCheckbox.addEventListener("change", updateCreateButtonState);
  priceUnitRadios.forEach((radio) => radio.addEventListener("change", updateCreateButtonState));
}

// ===============================
// 6) Form submission
// ===============================
function attachFormSubmit() {
  const form = document.getElementById("resourceForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showFormError("");

    if (!isFormValid()) {
      showFormError("Please fill in all fields correctly before submitting.");
      return;
    }

    setButtonEnabled(createButton, false);
    const originalText = createButton.textContent;
    createButton.textContent = "Submitting...";

    const payload = {
      action: "create",
      resourceName: document.getElementById("resourceName").value.trim(),
      resourceDescription: document.getElementById("resourceDescription").value.trim(),
      resourceAvailable: document.getElementById("resourceAvailable").checked,
      resourcePrice: Number(document.getElementById("resourcePrice").value),
      resourcePriceUnit: document.querySelector('input[name="resourcePriceUnit"]:checked')?.value || "",
    };

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("Server response:", data);

      form.reset();
      updateCreateButtonState();
      showFormError("");

      // Reset field visuals after successful submit
      setInputVisualState(document.getElementById("resourceName"), "neutral");
      setInputVisualState(document.getElementById("resourceDescription"), "neutral");

    } catch (err) {
      console.error("Submission error:", err);
      showFormError("Submission failed. Please try again.");
    } finally {
      createButton.textContent = originalText;
      updateCreateButtonState();
    }
  });
}

// ===============================
// 7) Bootstrapping
// ===============================
renderActionButtons(role);

// Resource Name
const resourceNameInput = createResourceNameInput(resourceNameContainer);
attachResourceNameValidation(resourceNameInput);

// Resource Description
const resourceDescriptionInput = document.getElementById("resourceDescription");
if (resourceDescriptionInput) {
  attachDescriptionValidation(resourceDescriptionInput);
}

// Other fields
attachOtherFieldValidation();

// Form submission
attachFormSubmit();

// Initial button state
updateCreateButtonState();
