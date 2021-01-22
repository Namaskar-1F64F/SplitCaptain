import { firebase } from "./firebase";

firebase.auth().useDeviceLanguage();

export function recaptchaVerifierInvisible(id, callback) {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(id, {
    size: "invisible",
    callback,
  });
}

export async function recaptchaRender() {
  const recaptchaVerifier = window.recaptchaVerifier;
  const widgetId = await recaptchaVerifier.render();
  window.recaptchaWidgetId = widgetId;
}

export function phoneSignIn(phoneNumber) {
  const appVerifier = window.recaptchaVerifier;
  return firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
}

export function verifyCode(code, confirmationResult) {
  return confirmationResult.confirm(code);
}
