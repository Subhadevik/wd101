const userForm = document.getElementById("userForm");
let userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];

const saveUserData = (event) => {
  event.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const checkBox = document.getElementById("tox").checked;

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
    return;
  }

  const entry = {
    username,
    email,
    dob,
    password,
    checkBox,
  };

  userEntries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(userEntries));

  userForm.reset();
  displayEntries();
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const retrieveUserData = () => {
  const entries = localStorage.getItem("userEntries");
  return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
  const entries = retrieveUserData();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td>${entry.username}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const toxCell = `<td>${entry.checkBox}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${toxCell}</tr>`;
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

  let details = document.getElementById("userEntries");
  details.innerHTML = table;
};

userForm.addEventListener("submit", saveUserData);
displayEntries();

const password_Input = document.getElementById("password");
password_Input.addEventListener("input", () => {
  validatePassword(password_Input);
});

const email_Input = document.getElementById("email");
email_Input.addEventListener("input", () => {
  validateEmail(email_Input);
});

function validateEmail(email_Input) {
  if (email_Input.validity.typeMismatch) {
    email_Input.setCustomValidity("Email is not in the right format!");
    email_Input.reportValidity();
  } else {
    email_Input.setCustomValidity("");
  }
}

function validatePassword(password_Input) {
  if (password_Input.value.length < 8) {
    password_Input.setCustomValidity("Minimum 8 characters must be present!");
    password_Input.reportValidity();
  } else {
    password_Input.setCustomValidity("");
  }
}
