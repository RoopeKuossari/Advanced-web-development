const form = document.getElementById('customer-form-element');
const customerIdInput = document.getElementById('customer-id');
const submitBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('delete-btn');
const cancelBtn = document.getElementById('cancel-btn');
const container = document.getElementById('customer-list');

async function loadCustomers() {
  try {
    const res = await fetch('/api/persons');
    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<p>No customers found.</p>';
      return;
    }

    data.forEach(person => {
      const div = document.createElement('div');
      div.className = 'customer-card';
      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        <small>${person.email}</small>
      `;

      div.addEventListener('click', () => populateForm(person));
      container.appendChild(div);
    });
  } catch (err) {
      console.error("Load Error:", err);
      container.innerHTML = '<p style="color:red;">Error loading registry data.</p>';
  }
}

function populateForm(person) {
  customerIdInput.value = person.id;
  document.getElementById('first_name').value = person.first_name;
  document.getElementById('last_name').value = person.last_name;
  document.getElementById('email').value = person.email;
  document.getElementById('phone').value = person.phone || '';
  
  // Format date correctly for input[type="date"]
  if (person.birth_date) {
    document.getElementById('birth_date').value = person.birth_date.split('T')[0];
  } else {
    document.getElementById('birth_date').value = '';
  }

  submitBtn.textContent = 'Update Customer';
  deleteBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';
}

function resetForm() {
  form.reset();
  customerIdInput.value = '';
  submitBtn.textContent = 'Add Customer';
  deleteBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = customerIdInput.value;
  const customerData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value || null,
    birth_date: document.getElementById('birth_date').value || null
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/persons/${id}` : '/api/persons';

  try {
    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });

    const result = await res.json();

    if (res.ok) {
      resetForm();
      loadCustomers();
    } else {
      alert('Error: ' + (result.error || 'Failed to save record'));
    }
  } catch (err) {
    console.error('Save Error:', err);
    alert('Server communication error.');
  }
});

deleteBtn.addEventListener('click', async () => {
  const id = customerIdInput.value;
  if (!id) return;

  if (!confirm('Are you sure you want to delete this record?')) return;

  try {
    const res = await fetch(`/api/persons/${id}`, { method: 'DELETE' });
    if (res.ok) {
      resetForm();
      loadCustomers();
    } else {
      const result = await res.json();
      alert('Delete failed: ' + result.error);
    }
  } catch (err) {
    console.error('Delete Error:', err);
  }
});

cancelBtn.addEventListener('click', resetForm);

// Initial load
loadCustomers();