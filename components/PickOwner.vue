<template>
  <div>
    <b-form-tags placeholder="เพิ่มผู้ดูแล" v-model="value"></b-form-tags>
  </div>
</template>

<script>
export default {
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
}
</script>
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css';
</style>
