<script>
  import { t } from "svelte-i18n";

  export const translate = (path) => {
    return t(`${$$self.constructor.name}.${path}`);
  };
</script>
