// Fetch user records from localStorage
const getUserData = () => {
    try {
        const data = localStorage.getItem("user-details");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error retrieving data from localStorage:", err);
        return [];
    }
};

// Render user entries in the HTML table
const renderEntries = () => {
    const users = getUserData();
    const userRows = users.map((user) => `
        <tr>
            <td class="border px-4 py-2">${user.fullName}</td>
            <td class="border px-4 py-2">${user.userEmail}</td>
            <td class="border px-4 py-2">********</td> <!-- Mask password -->
            <td class="border px-4 py-2">${new Date(user.birthDate).toLocaleDateString()}</td> <!-- Format date -->
            <td class="border px-4 py-2">${user.termsAccepted ? 'Yes' : 'No'}</td>
        </tr>
    `).join("");

    document.getElementById("registrationTableBody").innerHTML = userRows;
};

// Validate date of birth (must be between 18 and 55 years)
const checkAgeValidity = (dobInput) => {
    const birthDate = new Date(dobInput);
    const currentAge = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (currentAge < 18 || currentAge > 55) {
        alert("The age must be between 18 and 55 years.");
        return false;
    }
    return true;
};

// Check if email already exists in the user data
const doesEmailExist = (email) => {
    const users = getUserData();
    return users.some(user => user.userEmail === email);
};

// Check password strength (at least 6 characters with a number)
const validatePasswordStrength = (pwd) => {
    const pwdPattern = /^(?=.*\d).{6,}$/;
    if (!pwdPattern.test(pwd)) {
        alert("Password should be at least 6 characters long and include a number.");
        return false;
    }
    return true;
};

// Handle form submission, validate inputs, and save user data
const processFormSubmission = (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const pwd = document.getElementById("password").value;
    const birthDate = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        alert("Enter a valid email address.");
        return;
    }

    // Check if email already registered
    if (doesEmailExist(userEmail)) {
        alert("This email is already registered. Please use a different one.");
        return;
    }

    // Validate password strength
    if (!validatePasswordStrength(pwd)) {
        return;
    }

    // Validate date of birth
    if (!checkAgeValidity(birthDate)) {
        return;
    }

    // Create new user object
    const newUser = {
        fullName,
        userEmail,
        pwd,  // In a real application, hash the password
        birthDate,
        termsAccepted,
    };

    // Fetch existing user data, add the new user, and save to localStorage
    const userData = getUserData();
    userData.push(newUser);

    try {
        localStorage.setItem("user-details", JSON.stringify(userData));
        renderEntries(); // Refresh the table with new data
        alert("User registered successfully!"); // Success message
    } catch (err) {
        console.error("Error saving user data to localStorage:", err);
    }

    // Clear form fields after submission
    e.target.reset();
};

// Bind form submit event to the handler function
document.getElementById("registrationForm").addEventListener("submit", processFormSubmission);

// Show user entries on page load
renderEntries();
