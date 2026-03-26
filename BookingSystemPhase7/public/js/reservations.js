// Global state to track if we are editing
let isEditing = false;

// 1. Immediate Auth Check: Kick out users without a token
const token = localStorage.getItem("token"); 
if (!token) {
    window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", () => {
    fetchReservations();

    const form = document.getElementById("reservation-form");
    const cancelBtn = document.getElementById("cancel-edit");

    // Handle Form Submission (Create or Update)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const reservationId = document.getElementById("reservation-id").value;
        const data = {
            resourceId: parseInt(document.getElementById("resourceId").value),
            userId: parseInt(document.getElementById("userId").value),
            startTime: document.getElementById("startTime").value,
            endTime: document.getElementById("endTime").value,
            note: document.getElementById("note").value,
            status: document.getElementById("status").value
        };

        try {
            const url = isEditing ? `/api/reservations/${reservationId}` : "/api/reservations";
            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Added Auth Header
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showMessage(isEditing ? "Updated successfully!" : "Created successfully!", "text-brand-green");
                resetForm();
                fetchReservations();
            } else {
                const err = await response.json();
                showMessage(`Error: ${err.error || "Operation failed"}`, "text-brand-primary");
            }
        } catch (error) {
            showMessage("Server error. Please try again.", "text-brand-primary");
        }
    });

    cancelBtn.addEventListener("click", resetForm);
});

// --- API Functions ---

async function fetchReservations() {
    try {
        const response = await fetch("/api/reservations", {
            headers: { "Authorization": `Bearer ${token}` } // Added Auth Header
        });
        
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }

        const reservations = await response.json();
        renderTable(reservations);
    } catch (error) {
        console.error("Failed to fetch reservations", error);
    }
}

async function deleteReservation(id) {
    if (!confirm("Are you sure you want to delete this reservation?")) return;

    try {
        const response = await fetch(`/api/reservations/${id}`, { 
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` } // Added Auth Header
        });

        if (response.ok) {
            fetchReservations();
            showMessage("Deleted successfully", "text-brand-orange");
        }
    } catch (error) {
        showMessage("Delete failed", "text-brand-primary");
    }
}

// --- UI Helpers ---

function renderTable(reservations) {
    const tbody = document.getElementById("reservations-table-body");
    tbody.innerHTML = "";

    reservations.forEach(res => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="py-3 px-2 font-medium">#${res.id} (Res: ${res.resourceId})</td>
            <td class="py-3 px-2 text-xs text-black/60">
                ${new Date(res.startTime).toLocaleString()}<br>
                ${new Date(res.endTime).toLocaleString()}
            </td>
            <td class="py-3 px-2">
                <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusClass(res.status)}">
                    ${res.status}
                </span>
            </td>
            <td class="py-3 px-2 text-right space-x-2">
                <button onclick="editReservation(${JSON.stringify(res).replace(/"/g, '&quot;')})" 
                    class="text-brand-blue hover:underline font-semibold text-xs">Edit</button>
                <button onclick="deleteReservation(${res.id})" 
                    class="text-brand-primary hover:underline font-semibold text-xs">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.editReservation = (res) => {
    isEditing = true;
    document.getElementById("form-title").innerText = "Edit Reservation #" + res.id;
    document.getElementById("reservation-id").value = res.id;
    document.getElementById("resourceId").value = res.resourceId;
    document.getElementById("userId").value = res.userId;
    
    // Format dates for datetime-local input (YYYY-MM-DDTHH:MM)
    const start = new Date(res.startTime);
    const end = new Date(res.endTime);
    document.getElementById("startTime").value = new Date(start.getTime() - start.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById("endTime").value = new Date(end.getTime() - end.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    
    document.getElementById("note").value = res.note || "";
    document.getElementById("status").value = res.status;
    
    document.getElementById("submit-btn").innerText = "Update Reservation";
    document.getElementById("cancel-edit").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function resetForm() {
    isEditing = false;
    document.getElementById("reservation-form").reset();
    document.getElementById("form-title").innerText = "Create Reservation";
    document.getElementById("submit-btn").innerText = "Save Reservation";
    document.getElementById("cancel-edit").style.display = "none";
}

function showMessage(text, colorClass) {
    const area = document.getElementById("message-area");
    area.innerText = text;
    area.className = `mt-4 text-sm font-medium ${colorClass}`;
    setTimeout(() => area.innerText = "", 5000);
}

function getStatusClass(status) {
    switch(status) {
        case 'active': return 'bg-brand-green/10 text-brand-green';
        case 'pending': return 'bg-brand-orange/10 text-brand-orange';
        case 'cancelled': return 'bg-brand-rose/10 text-brand-rose';
        default: return 'bg-gray-100 text-gray-500';
    }
}