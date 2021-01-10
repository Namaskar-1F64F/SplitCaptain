<script>
  import { voyage } from "./store";
  import { slide } from "svelte/transition";
  import copy from "copy-text-to-clipboard";
  import { t } from 'svelte-i18n';

  let open = false;
  const handleMouseEnter = () => {
    open = true;
    setTimeout(() => (open = false), 3500);
  };

  const [year, month] = new Date().toISOString().split("-");
</script>

<style>
  .open {
    transform: translateX(0%);
  }
</style>

{#if $voyage.id}
  <div
    in:slide
    on:click={(event) => {
      const url = `/?i=${$voyage.id}`;
      if (navigator.share) {
        navigator.share({ title: `Join my voyage!`, url }).catch(console.error);
      } else {
        copy(`${window.location.host}${url}`);
      }
      event.stopPropagation();
    }}>
    <svg
      class:open
      on:mouseenter={handleMouseEnter}
      class={`bottom-0 right-0 transition-all select-none h-64 cursor-pointer`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xml:space="preserve"><path
        d="M454.319,380.09H57.68c-27.536,0-49.859-22.323-49.859-49.86v-148.46
	c0-27.536,22.323-49.859,49.859-49.859h396.639c27.536,0,49.86,22.323,49.86,49.859v148.46
	C504.179,357.767,481.857,380.09,454.319,380.09z"
        style="fill: rgb(199, 178, 153);" />
      <path
        d="M59.181,131.91h393.637c28.365,0,51.361,22.995,51.361,51.361v12.685H7.821v-12.685
	C7.821,154.906,30.816,131.91,59.181,131.91z"
        style="fill: rgb(255, 29, 37);" />
      <rect
        x="239.993"
        y="308.034"
        width="128.094"
        height="56.041"
        style="fill: rgb(255, 255, 255);" />
      <rect x="375.919" y="163.715" width="15.642" height="16.684" />
      <rect x="375.919" y="187.699" width="15.642" height="16.684" />
      <rect x="375.919" y="211.682" width="15.642" height="16.684" />
      <rect x="375.919" y="235.666" width="15.642" height="16.684" />
      <rect x="375.919" y="259.65" width="15.642" height="16.684" />
      <rect x="375.919" y="283.633" width="15.642" height="16.684" />
      <rect x="375.919" y="307.617" width="15.642" height="16.684" />
      <rect x="375.919" y="331.601" width="15.642" height="16.684" />
      <path
        d="M452.312,124.09H59.688C26.776,124.09,0,150.866,0,183.778v144.445c0,32.912,26.776,59.688,59.688,59.688h392.624
	c32.913,0,59.688-26.776,59.688-59.688V183.778C512,150.866,485.224,124.09,452.312,124.09z M59.688,139.731h84.735v47.967H15.642
	v-3.921C15.642,159.491,35.401,139.731,59.688,139.731z M452.312,372.269H391.56v-16.684h-15.642v16.684H59.688
	c-24.287,0-44.047-19.759-44.047-44.047V203.34h351.935v-15.642H160.065v-47.967h215.853v16.684h15.642v-16.684h60.752
	c24.287,0,44.047,19.759,44.047,44.047v3.921h-96.456v15.642h96.456v124.882C496.358,352.509,476.599,372.269,452.312,372.269z" />
      <g>
        <rect
          x="40.147"
          y="156.415"
          width="87.593"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="175.707"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="199.69"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="223.674"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="247.658"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="271.642"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="295.625"
          y="156.415"
          width="16.684"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
      </g>
      <rect x="327.951" y="156.415" width="32.326" height="15.642" />
      <g>
        <text x="398.228" y="176.415" font-size="35">
          {month}/{year.substring(2, 4)}
        </text>
      </g>
      <rect x="247.658" y="315.959" width="15.642" height="39.625" />
      <rect x="272.684" y="315.959" width="15.642" height="39.625" />
      <rect x="296.668" y="315.959" width="15.642" height="39.625" />
      <rect x="320.652" y="315.959" width="15.642" height="39.625" />
      <rect x="344.635" y="315.959" width="15.642" height="39.625" />
      <g>
        <text x="40.147" y="247.367" font-size="55">
          {$t('ShareUrl.Title')}
        </text>
      </g>

      <rect x="40.147" y="260.692" width="104.277" height="15.642" />
      <g>
        <rect
          x="160.065"
          y="260.692"
          width="39.625"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="208.033"
          y="260.692"
          width="39.625"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="256"
          y="260.692"
          width="39.625"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
        <rect
          x="303.967"
          y="260.692"
          width="39.625"
          height="15.642"
          style="fill: rgb(255, 255, 255);" />
      </g>
      <rect x="40.147" y="345.976" width="15.642" height="15.642" />
      <rect x="64.13" y="345.976" width="15.642" height="15.642" />
      <rect x="88.114" y="345.976" width="15.642" height="15.642" />
      <rect x="112.098" y="345.976" width="15.642" height="15.642" />
      <rect x="136.081" y="345.976" width="15.642" height="15.642" />
      <rect x="160.065" y="345.976" width="15.642" height="15.642" />
      <text x="40.147" y="298.976" font-size="20">
        {$voyage.id || 'YJOl3AAiZ7ctsFwuGsVg'}
      </text>
      <rect x="408.244" y="228.367" width="63.609" height="15.642" />
      <rect
        x="408.244"
        y="252.35"
        width="63.609"
        height="15.642"
        style="fill: rgb(255, 255, 255);" />
      <rect x="408.244" y="276.334" width="63.609" height="15.642" />
      <rect
        x="408.244"
        y="300.318"
        width="63.609"
        height="15.642"
        style="fill: rgb(255, 255, 255);" />
      <rect x="408.244" y="324.301" width="63.609" height="15.642" />
    </svg>
  </div>
{/if}
