<template>
  <input
    class="form-suggestion-input w-full"
    type="text"
    :list="datalist"
    v-model="formRef[field]"
  />
</template>
<script>
import { defineComponent, toRef } from "vue";

export default defineComponent({
  props: {
    // To sustain reactive on form object,
    // we use parent object not primitive directly
    // and access attribute by 'field' props.
    form: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    datalist: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const formRef = toRef(props, "form");
    return {
      formRef,
    };
  },
});
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  opacity: 0;
}

.form-suggestion-input {
  padding: 0.429rem 0.429rem;
  font-size: 1rem;
  display: inline-block;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;

  /* To format height with other primevue component, use this attribute. */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.form-suggestion-input:hover {
  border-color: #212121;
}

.form-suggestion-input:focus {
  outline: 0;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2rem #8dcdff;
  border-color: #007ad9;
}
</style>
