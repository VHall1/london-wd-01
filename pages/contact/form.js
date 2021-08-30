const formElement = document.getElementById("contact-form");
const mainElement = document.querySelectorAll("main")[0];

// Fields
const emailElement = document.getElementsByName("email");
const emailValidCheckmark = document.getElementById("id-valid-checkmark");

const validateEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Show a small checkmark and make the field green
// if email is valid
emailElement[0].addEventListener("input", (evt) => {
  // Get field value
  const email = evt.target.value;
  const isEmailValid = validateEmail(email);
  console.log(email);

  if (isEmailValid) {
    emailElement[0].classList.add("is-success");
    emailValidCheckmark.style.display = "flex";
  } else {
    emailElement[0].classList.remove("is-success");
    emailValidCheckmark.style.display = "none";
  }
});

// Form OnSubmit
formElement.addEventListener("submit", (evt) => {
  // Prevent page from reloading
  evt.preventDefault();

  const message = document.createElement("div");
  message.classList.add("notification", "is-success", "is-light");
  message.innerHTML = `
    <button class="delete" onclick="dismissNotification()"></button>
    Message sent successfully!
  `;

  mainElement.prepend(message);
});

const dismissNotification = () => {
  const notificationElement = document.querySelectorAll(".notification")
  notificationElement[0]?.parentNode.removeChild(notificationElement[0]);
};
