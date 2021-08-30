const formElement = document.getElementById("contact-form");
const mainElement = document.querySelectorAll("main")[0];

// Fields
const emailElement = document.getElementsByName("email")[0];
const emailValidCheckmark = document.getElementById("id-valid-checkmark");
const nameElement = document.getElementsByName("name")[0];
const phoneElement = document.getElementsByName("phone")[0];
const subjectElement = document.getElementsByName("subject")[0];
const messageElement = document.getElementsByName("message")[0];

const validateEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Show a small checkmark and make the field green
// if email is valid
emailElement.addEventListener("input", (evt) => {
  // Get field value
  const email = evt.target.value;
  const isEmailValid = validateEmail(email);
  console.log(email);

  if (isEmailValid) {
    emailElement.classList.add("is-success");
    emailValidCheckmark.style.display = "flex";
  } else {
    emailElement.classList.remove("is-success");
    emailValidCheckmark.style.display = "none";
  }
});

// Form OnSubmit
formElement.addEventListener("submit", (evt) => {
  // Prevent page from reloading
  evt.preventDefault();
  const [name, email, phone, subject, message] = [
    nameElement.value,
    emailElement.value,
    phoneElement.value,
    subjectElement.value,
    messageElement.value,
  ];

  const createElement = () => {
    const el = document.createElement("p");
    el.id = "required-error";
    el.classList.add("help", "is-danger");
    el.innerText = "This field is required!";
    return el;
  };

  const errorElement = document.getElementById("required-error");
  errorElement?.remove();

  if (!name) {
    const el = createElement();
    nameElement.parentNode.parentNode.appendChild(el);
    return;
  }

  if (!email) {
    const el = createElement();
    emailValidCheckmark.parentNode.parentNode.appendChild(el);
    return;
  }

  if (!subject) {
    const el = createElement();
    subjectElement.parentNode.parentNode.appendChild(el);
    return;
  }

  if (!message) {
    const el = createElement();
    messageElement.parentNode.parentNode.appendChild(el);
    return;
  }

  const notification = document.createElement("div");
  notification.classList.add("notification", "is-success", "is-light");
  notification.innerHTML = `
    <button class="delete" onclick="dismissNotification()"></button>
    Message sent successfully!
  `;

  mainElement.prepend(notification);
});

const dismissNotification = () => {
  const notificationElement = document.querySelectorAll(".notification");
  notificationElement[0]?.parentNode.removeChild(notificationElement[0]);
};
