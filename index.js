// Function to calculate age based on date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to check if age is valid (between 18 and 55)
function isValidAge(dob) {
    const age = calculateAge(dob);
    return age >= 18 && age <= 55;
}

// Function to add a user to the table
function addUserToTable(name, email, password, dob, acceptedTerms) {
    const table = document.getElementById('user-table-body');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${acceptedTerms ? "Yes" : "No"}</td>
    `;
}

// Function to save user data to localStorage
function saveToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to load user data from localStorage
function loadFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Load users from localStorage and add them to the table on page load
window.onload = function() {
    const users = loadFromLocalStorage();
    users.forEach(user => addUserToTable(user.name, user.email, user.password, user.dob, user.acceptedTerms));
};

// Handle form submission
document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Grab form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("terms").checked;

    // Validate email and age
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidAge(dob)) {
        alert("Age must be between 18 and 55 years old.");
        return;
    }

    // Add user to the table
    addUserToTable(name, email, password, dob, acceptedTerms);

    // Save user data
    let users = loadFromLocalStorage();
    users.push({ name, email, password, dob, acceptedTerms });
    saveToLocalStorage(users);

    // Clear form fields after submission
    document.getElementById("registration-form").reset();
});
