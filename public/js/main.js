(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function showPassword() {
  var button = document.getElementById("show-password");
  var password = document.getElementById("validationCustomPassword");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function showConfirmPassword() {
  var button = document.getElementById("show-confirmpassword");
  var password = document.getElementById("validationCustomConfirmPassword");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
