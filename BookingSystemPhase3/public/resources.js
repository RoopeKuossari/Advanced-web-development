// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameCnt = document.getElementById("resourceNameCnt");
const resourceDescriptionCnt = document.getElementById("resourceDescriptionCnt");

const role = "admin"; // "reserver" | "admin"

let createButton = null;
// Initialize these as null to avoid errors if they aren't rendered
window.updateButton = null;
window.deleteButton = null;

let resourceNameValid = false;
let resourceDescriptionValid = false;

// ===============================
// 2) Button creation helpers
// ===============================

const BUTTON_BASE_CLASSES = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";
const BUTTON_ENABLED_CLASSES = "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

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
        btn.classList.add("hover:bg-brand-dark/80");
    }
}

function renderActionButtons(currentRole) {
    // FIX: All roles need a Create button
    createButton = addButton({
        label: "Create",
        type: "submit",
        value: "create",
        classes: BUTTON_ENABLED_CLASSES,
    });

    if (currentRole === "admin") {
        window.updateButton = addButton({
            label: "Update",
            type: "submit",
            value: "update",
            classes: BUTTON_ENABLED_CLASSES,
        });

        window.deleteButton = addButton({
            label: "Delete",
            type: "submit",
            value: "delete",
            classes: BUTTON_ENABLED_CLASSES,
        });
    }
} // <--- FIX: Added missing closing brace

// Helper to update all buttons at once
function updateAllButtons() {
    const isValid = resourceNameValid && resourceDescriptionValid;
    setButtonEnabled(createButton, isValid);
    setButtonEnabled(window.updateButton, isValid);
    setButtonEnabled(window.deleteButton, isValid);
}

// ===============================
// 3) Input creation + validation
// ===============================

function createResourceNameInput(container) {
    const input = document.createElement("input");
    input.id = "resourceName";
    input.name = "resourceName";
    input.type = "text";
    input.placeholder = "e.g., Meeting Room A";
    input.className = `mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 transition-all duration-200 ease-out`;
    container.appendChild(input);
    return input;
}

function createResourceDescriptionArea(container) {
    const textarea = document.createElement("textarea");
    textarea.id = "resourceDescription";
    textarea.name = "resourceDescription";
    textarea.rows = 5;
    textarea.className = `mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 transition-all duration-200 ease-out`;
    container.appendChild(textarea);
    return textarea;
}

function isResourceNameValid(value) {
    const trimmed = value.trim();
    const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
    return trimmed.length >= 5 && trimmed.length <= 30 && allowedPattern.test(trimmed);
}

function isResourceDescriptionValid(value) {
    const trimmed = value.trim();
    const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ><!\?\-\+\/\\]+$/;
    return trimmed.length >= 10 && trimmed.length <= 50 && allowedPattern.test(trimmed);
}

function setInputVisualState(input, state) {
    input.classList.remove("border-green-500", "bg-green-100", "border-red-500", "bg-red-100");
    if (state === "valid") input.classList.add("border-green-500", "bg-green-100");
    else if (state === "invalid") input.classList.add("border-red-500", "bg-red-100");
}

function attachResourceNameValidation(input) {
    input.addEventListener("input", () => {
        if (input.value.trim() === "") {
            setInputVisualState(input, "neutral");
            resourceNameValid = false;
        } else {
            resourceNameValid = isResourceNameValid(input.value);
            setInputVisualState(input, resourceNameValid ? "valid" : "invalid");
        }
        updateAllButtons(); // FIX: Call the global button updater
    });
}

function attachResourceDescriptionValidation(input) {
    input.addEventListener("input", () => {
        if (input.value.trim() === "") {
            setInputVisualState(input, "neutral");
            resourceDescriptionValid = false;
        } else {
            resourceDescriptionValid = isResourceDescriptionValid(input.value);
            setInputVisualState(input, resourceDescriptionValid ? "valid" : "invalid");
        }
        updateAllButtons(); // FIX: Call the global button updater
    });
}

// ===============================
// 4) Bootstrapping
// ===============================
renderActionButtons(role);
const nameInput = createResourceNameInput(resourceNameCnt);
const descArea = createResourceDescriptionArea(resourceDescriptionCnt);

attachResourceNameValidation(nameInput);
attachResourceDescriptionValidation(descArea);

// Initialize buttons as disabled
updateAllButtons();