<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import {
    phoneSignIn,
    recaptchaRender,
    recaptchaVerifierInvisible,
    verifyCode,
  } from "../phone-auth.js";
  import { announce } from "../store/index.js";
  import { db } from "../firebase.js";
  import { getShipName } from "../ship/ships.js";
  let phoneNumber, confirmationResult, confirmationInput, form;
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
    // this is admittedly worse than resetting (gcaptcha.reset()), but it doesn't WORK
    window.location.reload();
  };
  onMount(() => {
    recaptchaVerifierInvisible("submit", () => {
      phoneSignIn(phoneNumber.value)
        .then((response) => {
          confirmationResult = response;
        })
        .catch((error) => {
          addAnnouncement(error);
          handleReset();
        });
      return false;
    });
    recaptchaRender();
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
        <form bind:this={form}>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            bind:this={phoneNumber}
            class="text-2xl focus:shadow-none text-center focus:ring-opacity-0 focus:ring-transparent focus:ring-offset-transparent outline-none focus:border-transparent focus:outline-none focus:border-none bg-transparent text-gray-100 block w-full border-transparent rounded-md"
            placeholder="+1 (330) 907-5333"
          />
          <button id="submit">📞 text</button>
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
    text-align: center;
  }
</style>
