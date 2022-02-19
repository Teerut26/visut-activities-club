<template>
  <div>
    <b-form-tags
      v-model="value"
      size="lg"
      class="mb-2"
      add-on-change
      no-outer-focus
    >
      <template
        v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }"
      >
        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
          <li v-for="tag in tags" :key="tag" class="list-inline-item">
            <b-form-tag
              @remove="removeTag(tag)"
              :title="tag"
              :disabled="disabled"
              variant="info"
              >{{ tag }}</b-form-tag
            >
          </li>
        </ul>
        <b-form-select
          v-bind="inputAttrs"
          v-on="inputHandlers"
          :disabled="disabled || availableOptions.length === 0"
          :options="availableOptions"
        >
          <template #first>
            <!-- This is required to prevent bugs with Safari -->
            <option disabled value="">เพิ่มชั้น</option>
          </template>
        </b-form-select>
      </template>
    </b-form-tags>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      options: ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6'],
      value: [],
    }
  },
  computed: {
    availableOptions() {
      return this.options.filter((opt) => this.value.indexOf(opt) === -1)
    },
  },
  watch: {
    value: function (val) {
      this.$emit('onPickGrade', val)
    },
  },
  mounted() {
    if (this.data) {
      this.value = this.data
    }
  },
}
</script>
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css';
</style>
