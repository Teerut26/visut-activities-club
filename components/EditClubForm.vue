<template lang="">
  <div>
    <div v-if="this.success" class="alert alert-success" role="alert">
      อัพเดทข้อมูลสำเร็จ
    </div>
    <form class="flex flex-col gap-3" v-on:submit="submit">
      <div class="flex flex-col md:flex-row gap-2">
        <div class="w-full">
          <label class="form-label">ชื่อชุมนุม</label>
          <input v-model="data.title" type="text" class="form-control" />
        </div>
        <div class="w-full">
          <label class="form-label">รับสูงสุด</label>
          <input v-model="data.max" type="number" class="form-control" />
        </div>
        <div class="w-full">
          <label class="form-label">สถานที่</label>
          <input v-model="data.location" type="text" class="form-control" />
        </div>
      </div>
      <div>
        <label class="form-label">ผู้ดูแล</label>
        <PickOwner :data="data.owner" v-on:onPickOwner="onPickOwner($event)" />
      </div>
      <div>
        <label class="form-label">รับสมัคร</label>
        <PickGrade :data="data.grade" v-on:onPickGrade="onPickGrade($event)" />
      </div>
      <div>
        <label class="form-label">เปิดรับสมัคร</label>
        <b-form-checkbox v-model="isOpen" switch size="lg"></b-form-checkbox>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddClub',
  props: ['initData'],
  data() {
    return {
      data: {
        title: this.initData.title,
        owner: this.initData.owner,
        location: this.initData.location,
        max: this.initData.max,
        grade: this.initData.grade,
        open: this.initData.open,
      },
      success: false,
      isOpen: false,
    }
  },
  mounted() {
    if (this.initData.open == 1) {
      this.isOpen = true
    } else {
      this.isOpen = false
    }
  },
  watch: {
    isOpen: function (data) {
      if (data) {
        this.data.open = 1
      } else {
        this.data.open = 0
      }
    },
  },
  methods: {
    onPickGrade(list) {
      this.data.grade = list
    },
    onPickOwner(list) {
      this.data.owner = list
    },
    clearForm() {
      this.title = ''
      this.owner = []
      this.location = ''
      this.max = 0
      this.grade = []
    },
    beforeDestroy() {
      const el = document.querySelector(
        '.g-recaptcha-bubble-arrow'
      ).parentElement
      el.remove()
    },
    async submit(e) {
      e.preventDefault()
      try {
        // const token = await this.$recaptcha.getResponse()
        if (
          this.data.title.length === 0 ||
          this.data.location.length === 0 ||
          this.data.max === 0 ||
          this.data.grade.length === 0
        )
          return
        const res = await this.$axios({
          method: 'post',
          url: '/api/club/update',
          data: {
            id: this.initData.id,
            title: this.data.title,
            owner: this.data.owner,
            location: this.data.location,
            max: this.data.max,
            grade: this.data.grade,
            open: this.data.open,
            // token,
          },
        })
        if (res.data.error) return
        this.success = true
        this.clearForm()
        setTimeout(() => {
          this.success = false
        }, 1500)
        // await this.$recaptcha.reset()
      } catch (error) {
        console.log('Login error:', error)
      }
    },
  },
}
</script>
<style lang=""></style>
