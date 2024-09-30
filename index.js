document.addEventListener('DOMContentLoaded', function() {
    loadRegistrations();
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("You must be between 18 to 55 years old.");
        return;
    }

    const registration = { name, email, password, dob, acceptedTerms };
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    document.getElementById('registrationForm').reset();

    loadRegistrations();
});

function loadRegistrations() {
    const tableBody = document.getElementById('registrationTableBody');
    tableBody.innerHTML = ''; 

    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

    registrations.forEach((registration, index) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = registration.name;
        newRow.insertCell(1).textContent = registration.email;
        newRow.insertCell(2).textContent = registration.password;
        newRow.insertCell(3).textContent = registration.dob;
        newRow.insertCell(4).textContent = registration.acceptedTerms ? 'Yes' : 'No';

        
    });
}
