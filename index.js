const userForm = document.getElementById("user-form");
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Save user data to localStorage and update the table
const saveUserData = (event) => {
  event.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const checkBox = document.getElementById("tac").checked;

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const entry = {
    username,
    email,
    dob,
    password,
    checkBox,
  };

  // Add the new entry to the list of user entries
  userEntries.push(entry);

  // Save the updated entries to localStorage
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  // Reset the form after submission
  userForm.reset();

  // Display the updated table with new entry
  displayEntries();
};

// Calculate age based on the date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Retrieve user data from localStorage
const retrieveUserData = () => {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

// Display all user entries in the table
const displayEntries = () => {
  const entries = retrieveUserData();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td>${entry.username}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const tacCell = `<td>${entry.checkBox ? "Yes" : "No"}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${tacCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
      </tr>
      ${tableEntries}
    </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

// Listen for form submission and call saveUserData
userForm.addEventListener("submit", saveUserData);

// Display entries when the page loads
displayEntries();
