<template lang="">
  <div>
    <div v-if="success" class="alert alert-success" role="alert">
      เพิ่มข้อมูลสำเร็จ
    </div>
    <form class="flex flex-col gap-3" v-on:submit="submit">
      <div class="flex gap-2">
        <div class="w-full">
          <label class="form-label">ชื่อชุมนุม</label>
          <input v-model="title" type="text" class="form-control" />
        </div>
        <div class="w-full">
          <label class="form-label">รับสูงสุด</label>
          <input v-model="max" type="number" class="form-control" />
        </div>
        <div class="w-full">
          <label class="form-label">สถานที่</label>
          <input v-model="location" type="text" class="form-control" />
        </div>
      </div>
      <div>
        <label class="form-label">ผู้ดูแล</label>
        <PickOwner v-on:onPickOwner="onPickOwner($event)" />
      </div>
      <div>
        <label class="form-label">รับสมัคร</label>
        <PickGrade v-on:onPickGrade="onPickGrade($event)" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddClub',
  data() {
    return {
      title: '',
      owner: [],
      location: '',
      max: 0,
      grade: [],
      success: false,
    }
  },

  methods: {
    onPickGrade(list) {
      this.grade = list
    },
    onPickOwner(list) {
      this.owner = list
    },
    clearForm() {
      this.title = ''
      this.owner = []
      this.location = ''
      this.max = 0
      this.grade = []
    },
    async submit(e) {
      e.preventDefault()
      console.log(5555)
      if (
        this.title.length === 0 ||
        this.location.length === 0 ||
        this.max === 0 ||
        this.grade.length === 0
      )
        return
      const { data } = await this.$axios({
        method: 'post',
        url: '/api/club/add',
        data: {
          title: this.title,
          owner: this.owner,
          location: this.location,
          max: this.max,
          grade: this.grade,
        },
      })
      if (data.error) return
      this.success = true
      this.clearForm()
      setTimeout(() => {
        this.success = false
      }, 1500)
    },
  },
}
</script>
<style lang=""></style>
