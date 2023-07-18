import constraints from "../constraints";

function validateEmail(email: String) {
  return fetch(`${constraints.SERVER_URL}/user/validation/email`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
  }).then(response => response.json());
}

export { validateEmail };
