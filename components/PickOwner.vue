<template>
  <div>
    <b-form-tags placeholder="เพิ่มผู้ดูแล" v-model="value"></b-form-tags>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      value: [],
    }
  },
  watch: {
    value: function (val) {
      this.$emit('onPickOwner', val)
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
