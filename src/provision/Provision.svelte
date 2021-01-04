<script>
  import { selected } from "../store";
  import { createEventDispatcher, onMount } from "svelte";
  import StaticProfile from "../profile/StaticProfile.svelte";

  const DEFAULT_PRICE_TEXT = "enter price";
  const DEFAULT_DESCRIPTION_TEXT = "enter name";
  export let provision = {
    description: "",
    price: "",
    crewmate: [],
    id: null,
  };

  const { description, price, crewmate, id } = provision;

  let priceInput, descriptionInput;
  const dispatch = createEventDispatcher();

  const handleBlur = () => {
    const price = priceInput.textContent;
    const description = descriptionInput.textContent;
    if (id) {
      dispatch("edit", { price, description });
    } else if (
      price !== DEFAULT_PRICE_TEXT &&
      description !== DEFAULT_DESCRIPTION_TEXT
    ) {
      dispatch("add", { price, description });
    }
  };

  const handleSelect = () => {
    if (id) {
      const remove =
        $selected != null && crewmate && crewmate.includes($selected?.name);
      dispatch("select", { remove });
    }
  };

  onMount(() => {
    const descriptionObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        provision.description = mutation.target.textContent;
      });
    });

    const priceObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        provision.price = mutation.target.textContent;
      });
    });
    descriptionObserver.observe(descriptionInput, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    priceObserver.observe(priceInput, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
  });

  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch("remove");
  };
  const possiblePlacements = [
    ["left-1/2", "-rotate-12", "top-full", "-mt-6", "-mr-2"],
    ["right-1/2", "rotate-12", "top-full", "-mt-8", "-mr-2"],
    ["right-1/2", "rotate-12"],
    ["left-1/2", "-rotate-12"],
    ["top-full", "-mt-1"],
  ];
</script>

<div class="relative h-32 w-32">
  <svg
    on:click={handleSelect}
    class="h-32 w-32 absolute"
    enable-background="new 0 0 512 512"
    height="100%"
    viewBox="0 0 512 512"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"><path
      d="m41.238 98.473h143.174v315.055h-143.174z"
      fill="#e1b89a" />
    <path d="m327.587 98.473h143.174v315.055h-143.174z" fill="#e1b89a" />
    <path d="m184.413 98.473h143.175v315.055h-143.175z" fill="#f2d1a5" />
    <path d="m184.413 368.569h143.175v44.958h-143.175z" fill="#f2bb88" />
    <path
      d="m479.695 7.5h-447.39c-13.699 0-24.805 11.106-24.805 24.806v41.362c0 13.7 11.106 24.805 24.805 24.805h447.389c13.7 0 24.805-11.106 24.805-24.805v-41.362c.001-13.7-11.105-24.806-24.804-24.806z"
      fill="#f2d1a5" />
    <path
      d="m479.695 413.527h-447.39c-13.7 0-24.805 11.106-24.805 24.805v41.362c0 13.7 11.106 24.805 24.805 24.805h447.389c13.7 0 24.805-11.106 24.805-24.805v-41.362c.001-13.699-11.105-24.805-24.804-24.805z"
      fill="#f2d1a5" />
    <path
      d="m32.305 7.5c-13.699 0-24.805 11.106-24.805 24.806v41.362c0 13.699 11.106 24.805 24.805 24.805h106.73c-16.15-21.54-24.515-68.029-14.962-90.973h-91.768z"
      fill="#f2bb88" />
    <path
      d="m32.305 413.527c-13.699 0-24.805 11.106-24.805 24.806v41.362c0 13.699 11.106 24.805 24.805 24.805h106.73c-16.15-21.54-24.515-68.029-14.962-90.973z"
      fill="#f2bb88" />
    <path
      d="m96.507 143.431h87.906v-44.958h-143.175v315.055h143.174v-44.958h-47.399c-29.534-54.21-45.903-129.684-40.506-225.139z"
      fill="#d2996f" />
    <path d="m184.413 98.473h143.175v44.958h-143.175z" fill="#f2bb88" />
    <path d="m327.587 98.473h143.174v44.958h-143.174z" fill="#d2996f" />
    <path
      d="m459.755 98.473-315.055 315.054h-88.77l315.055-315.054z"
      fill="#8eafe2" />
    <ellipse cx="174.084" cy="67.251" fill="#fff" rx="30.226" ry="24.07" />
    <ellipse cx="337.916" cy="67.251" fill="#fff" rx="30.226" ry="24.07" />
    <path d="m327.587 368.569h143.174v44.958h-143.174z" fill="#d2996f" />
    <g fill="#6a96d7">
      <path d="m340.035 129.423h88.77l30.95-30.95h-88.77z" />
      <path d="m175.65 382.577h-88.77l-30.95 30.95h88.77z" />
      <circle cx="256" cy="256" r="10.386" />
      <ellipse
        cx="343.808"
        cy="168.192"
        rx="10.386"
        ry="10.386"
        transform="matrix(.973 -.231 .231 .973 -29.534 83.884)" />
      <ellipse
        cx="168.192"
        cy="343.808"
        rx="10.386"
        ry="10.386"
        transform="matrix(.973 -.231 .231 .973 -74.804 48.096)" />
    </g>
    <path
      d="m405.828 455.437c-51.393-12.6-108.466 15.37-160.066 49.063h27.388c13.519-8.1 27.881-15.856 42.385-22.115 33.9-14.63 62.299-18.819 86.825-12.806 19.555 4.794 36.642 16.508 51.032 34.921h17.968c-17.595-26.219-39.572-42.699-65.532-49.063z"
      fill="#f2bb88" />
    <path
      d="m225.796 413.527c-31.438 31.351-57.612 46.138-77.998 44.005-21.663-2.273-35.409-23.491-47.211-44.005h-16.764c.318.559.635 1.115.956 1.679 13.563 23.857 30.443 53.548 61.5 56.807 1.8.189 3.62.283 5.465.283 26.354 0 57.35-19.322 94.31-58.77h-20.258z"
      fill="#f2bb88" />
    <path
      d="m86.402 47.487c-26.474-9.117-59.191 5.606-78.902 20.995v5.185c0 4.156 1.027 8.07 2.834 11.511 15.111-14.611 48.058-31.94 71.326-23.924 13.27 4.572 21.668 17.058 25.091 37.218h14.651c-3.377-21.885-12.688-43.297-35-50.985z"
      fill="#f2d1a5" />
    <path
      d="m504.5 32.306c0-.946-.058-1.878-.161-2.796-27.191 16.804-54.2 21.692-78.406 14.105-21.243-6.658-36.3-21.524-45.14-36.114h-16.587c11.398 23.472 32.834 42.316 57.373 50.008 7.561 2.37 16.779 4.148 27.418 4.148 15.675 0 34.433-3.867 55.504-15.388v-13.963z"
      fill="#f2bb88" />
    <path
      d="m184.199 32.565v10.674c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-10.674c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5zm83.1 6.22c-2.853 3.273-6.971 5.15-11.299 5.15s-8.446-1.877-11.299-5.15c-2.722-3.122-7.46-3.447-10.582-.727-3.122 2.722-3.448 7.46-.726 10.582 5.702 6.543 13.942 10.295 22.606 10.295 8.665 0 16.904-3.752 22.606-10.295 2.722-3.122 2.397-7.86-.726-10.582-3.121-2.72-7.859-2.396-10.58.727zm45.502-6.22v10.674c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-10.674c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5zm166.894 73.408c17.813 0 32.305-14.492 32.305-32.305v-41.362c0-12.235-6.781-23.278-17.698-28.82-3.692-1.877-8.207-.4-10.082 3.292-1.875 3.693-.401 8.208 3.292 10.083 5.852 2.972 9.488 8.89 9.488 15.445v41.362c0 9.542-7.763 17.305-17.305 17.305h-447.39c-9.542 0-17.305-7.763-17.305-17.305v-41.362c0-9.542 7.763-17.306 17.305-17.306h423.59c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-423.59c-17.813 0-32.305 14.492-32.305 32.306v41.362c0 17.813 14.492 32.305 32.305 32.305h1.433v300.055h-1.433c-17.813-.001-32.305 14.492-32.305 32.305v41.361c0 17.814 14.492 32.306 32.305 32.306h25.6c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-25.6c-9.542 0-17.305-7.764-17.305-17.306v-41.361c0-9.542 7.763-17.306 17.305-17.306h447.39c9.542 0 17.305 7.764 17.305 17.306v41.361c0 9.542-7.763 17.306-17.305 17.306h-385.625c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h385.625c17.813 0 32.305-14.492 32.305-32.306v-41.361c0-17.814-14.492-32.306-32.305-32.306h-.834v-300.054zm-144.608 0h17.79l-17.79 17.79zm-143.174 0h128.175v32.79l-128.175 128.175zm-143.175 300.054v-300.054h128.174v175.965l-124.089 124.089zm128.175 0h-14.105l14.105-14.105zm2.193-37.513-37.513 37.513h-67.556l300.055-300.055h67.556l-262.535 262.536zm140.981 37.513h-128.174v-29.105l128.175-128.175v157.28zm143.774 0h-128.774v-172.28l127.774-127.774h.999v300.054z" /></svg>
  {#if crewmate}
    {#each crewmate as crew, i (crew)}
      <div
        class={`transform origin-top scale-50 absolute ${possiblePlacements[i].join(' ')}`}>
        <StaticProfile crewmate={crew} />
      </div>
    {/each}
  {/if}
  <div
    contenteditable
    placeholder={DEFAULT_PRICE_TEXT}
    bind:this={priceInput}
    on:blur={handleBlur}
    class="transform -translate-y-1/2 text-center absolute w-full top-1/2 border-4 border-gray-900 bg-green-500 text-white center-self text-xl font-medium bg-orange-500 rounded-lg">
    {price}
  </div>
  <div
    bind:this={descriptionInput}
    contenteditable
    placeholder={DEFAULT_DESCRIPTION_TEXT}
    on:blur={handleBlur}
    class="text-center absolute bottom-0 w-full text-md font-medium text-black truncate">
    {description}
  </div>
</div>
