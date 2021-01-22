<script>
  import { push } from "svelte-spa-router";
  import { onDestroy, onMount } from "svelte";
  import {
    phoneSignIn,
    recaptchaRender,
    recaptchaVerifierInvisible,
    verifyCode,
    onlyCountries,
  } from "../phone-auth.js";
  import { announce } from "../store/index.js";
  import { db } from "../firebase.js";
  import { getShipName } from "../ship/ships.js";
  import intlTelInput from "intl-tel-input";
  import "intl-tel-input/build/js/utils.js";
  import "intl-tel-input/build/css/intlTelInput.css";

  let phoneNumber,
    confirmationResult,
    confirmationInput,
    form,
    dropdownContainer;
  const addAnnouncement = (text) => {
    $announce = { text };
  };

  const handleVerifyInput = ({ target: { value } }) => {
    if (value.length < 6) return false;
    verifyCode(value.substring(0, 6), confirmationResult)
      .then(({ user: { uid } }) => {
        // this should be moved to a cloud function. when new user created, give name
        db.doc(`mariners/${uid}`)
          .get()
          .then((snapshot) => {
            if (!snapshot.exists) {
              snapshot.ref.set({ name: getShipName() });
            }
            push("/");
          });
      })
      .catch((err) => {
        confirmationInput.value = null;
        addAnnouncement(err);
      });
  };

  const handleReset = () => {
    // this is admittedly worse than resetting (gcaptcha.reset()), but it doesn't WORK since the element is destroyed i think
    window.location.reload();
  };

  let iti;
  onMount(() => {
    iti = intlTelInput(phoneNumber, {
      dropdownContainer,
      onlyCountries,

      preferredCountries: [
        "us",
        "hk",
        "tw",
        "in",
        "id",
        "br",
        "ng",
        "jp",
        "ru",
      ],
    });
    // This enables the recaptcha which is REQUIRED for firebase SMS
    recaptchaVerifierInvisible("submit", () => {
      // This callback is triggered on the form submit? Not sure how it works, but kinda inconvenient
      if (!iti.isValidNumber()) {
        // need to reset this otherwise it'll not let us click again
        grecaptcha.reset();
        return addAnnouncement(
          [
            "Invalid number",
            "Invalid country code",
            "Too short",
            "Too long",
            "Invalid number",
          ][iti.getValidationError()]
        );
      }
      phoneSignIn(iti.getNumber())
        .then((response) => {
          confirmationResult = response;
        })
        .catch((error) => {
          addAnnouncement(error);
          handleReset();
        });
      // don't submit the form
      return false;
    });
    recaptchaRender();
  });

  onDestroy(() => {
    iti.destroy();
  });
</script>

<div class="flex mt-16 flex-col align-middle">
  <div class="flex items-center justify-center">
    <img class="h-16" src="./icon-144x144.png" alt="Split Captain" />
  </div>
  <div class="ml-auto text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if !confirmationResult}
      <label for="phone_number" class="block font-medium text-gray-100 text-4xl"
        >set sail with your number</label
      >
      <div class="mt-1 text-white text-xl">
        <form class="flex justify-center" bind:this={form}>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            bind:this={phoneNumber}
            class="text-2xl focus:shadow-none focus:ring-opacity-0 focus:ring-transparent focus:ring-offset-transparent outline-none focus:border-transparent focus:outline-none focus:border-none bg-transparent text-gray-100 block w-full border-transparent rounded-md"
          /><br />
          <button class="text-2xl" id="submit">📲 text</button>
        </form>
        <i class="text-gray-300 text-xs text-center"
          >legal requirements vary, but as a best practice and to set
          expectations for your users, you should inform them that if they use
          phone sign-in, they might receive an sms message for verification and
          standard rates apply.</i
        >
      </div>
    {:else}
      <label
        for="verification_code"
        class="block font-medium text-gray-100 text-4xl"
        >start sailing with your verification code</label
      >
      <div class="mt-1 text-white text-xl">
        <input
          type="text"
          name="verification_code"
          id="verification_code"
          bind:this={confirmationInput}
          on:input={handleVerifyInput}
          class="text-2xl focus:shadow-none text-center focus:ring-opacity-0 focus:ring-transparent focus:ring-offset-transparent outline-none focus:border-transparent focus:outline-none focus:border-none bg-transparent text-gray-100 block w-full border-transparent rounded-md"
          placeholder="938271"
        />
        <button id="submit" on:click={handleReset}>📞 back</button>
      </div>
    {/if}
  </div>
</div>

<style>
  ::placeholder {
    color: lightgray;
  }
</style>
