
// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

function logSection(title, data) {
  console.group(title);
  console.log(data);
  console.groupEnd();
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) {
    console.warn("resourceForm not found. Ensure the form has id=\"resourceForm\".");
    return;
  }

  form.addEventListener("submit", onSubmit);
});

function setButtonLoading(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;
  button.classList.toggle("cursor-not-allowed", isLoading);
  button.classList.toggle("opacity-50", isLoading);

  if (isLoading) {
    button.textContent = "Submitting..."; // show feedback
  } else {
    button.textContent = "Create"; // revert to original
  }
}


async function onSubmit(event) {
  event.preventDefault();

  if (!window.isFormValid || !window.isFormValid()) {
    console.warn("Form invalid. Submission blocked.");
    return;
  }

  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";

  // Clean values
  const resourceName = $("resourceName")?.value.trim();
  const resourceDescription = $("resourceDescription")?.value.trim();
  const resourceAvailable = $("resourceAvailable")?.checked;
  const resourcePrice = Number($("resourcePrice")?.value);
  const resourcePriceUnit = document.querySelector(
    'input[name="resourcePriceUnit"]:checked'
  )?.value;

  const payload = {
    action: actionValue,
    resourceName,
    resourceDescription,
    resourceAvailable,
    resourcePrice,
    resourcePriceUnit
  };

  logSection("Sending CLEAN payload to server", payload);

  try {
    // DISABLE BUTTON DURING REQUEST
    setButtonLoading(createButton, true);

    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.group("Server response");
    console.log(data.json);
    console.groupEnd();

    alert("Resource successfully created ✅");

  } catch (err) {
    console.error("POST error:", err);
    alert("Server error. Please try again.");
  } finally {
    // RE-ENABLE BUTTON
    setButtonLoading(createButton, false);
    // Re-evaluate form validity (in case user edited while waiting)
    updateCreateButtonState();
  }
}



  logSection("Sending payload to httpbin.org/post", payload);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();

    console.group("Response from httpbin.org");
    console.log("Status:", response.status);
    console.log("URL:", data.url);
    console.log("You sent (echo):", data.json);
    console.log("Headers (echoed):", data.headers);
    console.groupEnd();

  } catch (err) {
    console.error("POST error:", err);
  }
