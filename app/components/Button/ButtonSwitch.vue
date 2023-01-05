<template>
  <div
    :class="`button__switch${activeButton ? ' active' : ''}`"
    @click="handleClick"
  >
    <div class="button__switch_slider round"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

interface Props {
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false
});

const emit = defineEmits(["clickButton"]);

const activeButton = ref<boolean>(false);

watch(
  () => props.active,
  (newValue: boolean) => {
    activeButton.value = newValue;
  }
);

// Methods
const handleClick = () => {
  activeButton.value = !activeButton.value;
  emit("clickButton");
};
</script>

<style scoped lang="scss">
.button__switch {
  display: block;
  position: relative;
  font-size: 10px;
  width: 2.5em;
  height: 1.3125em;
  margin-bottom: 0;
  top: unset;

  .button__switch_slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cccccc;
    cursor: pointer;
    transition: 0.4s;
  }

  .button__switch_slider.round {
    border-radius: 2.125em;
  }

  &.active .button__switch_slider {
    background-color: #2196f3;
  }

  .button__switch_slider:before {
    content: "";
    position: absolute;
    height: 0.9375em;
    width: 0.9375em;
    left: 0.2em;
    bottom: 0.1875em;
    background-color: white;
    transition: 0.4s;
  }

  &.active .button__switch_slider:before {
    transform: translateX(1.2em);
  }

  .button__switch_slider.round:before {
    border-radius: 50%;
  }
}
</style>
