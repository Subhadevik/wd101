document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Age validation for Date of Birth
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    // Add data to the table
    const tableBody = document.getElementById('registrationTableBody');
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = password; // Note: You might want to handle passwords securely
    newRow.insertCell(3).textContent = dob;
    newRow.insertCell(4).textContent = acceptedTerms;

    // Create Delete button
    const deleteCell = newRow.insertCell(5);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = function() {
        tableBody.deleteRow(newRow.rowIndex - 1); // Remove the row from the table
        // Optionally remove from local storage here if you are storing the data
    };
    deleteCell.appendChild(deleteButton);

    // Clear form fields
    document.getElementById('registrationForm').reset();
});
