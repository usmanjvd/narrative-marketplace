<template>
<div
  class="flex justify-center"
>
  <img
    :width="size"
    :height="size"
    :src="loading"
    alt="Loading"
  />
</div>
</template>

<script>
import loading from '@/assets/loading.gif';

export default {
  name: 'Loading',
  props: {
    size: {
      default: 40,
      type: Number,
    },
  },
  data() {
    return {
      loading,
    };
  },
};
</script>
