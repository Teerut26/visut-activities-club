<template lang="">
  <div>
    <div
      v-if="data !== null"
      class="bg-light p-3 flex flex-col items-center w-full gap-4"
    >
      <div class="w-full flex flex-col md:flex-row gap-3">
        <div
          class="alert-info flex justify-center items-center w-full px-3 py-2 rounded-lg"
        >
          <div class="flex flex-col gap-2">
            <div class="text-lg font-bold">{{ data.title }}</div>
            <div class="flex flex-col pl-3">
              <div class="flex gap-1">
                <div class="text-gray-500">สถานที่:</div>
                <div class="font-bold">{{ data.location }}</div>
              </div>
              <div class="flex gap-1">
                <div class="text-gray-500">ผู้ดูแล:</div>
                <div class="font-bold">{{ data.owner.join(', ') }}</div>
              </div>
              <div class="flex gap-1">
                <div class="text-gray-500">รับสมัคร:</div>
                <div class="font-bold">
                  {{ data.grade.join(', ') }}
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex gap-1">
                <div class="text-gray-500">สถานะกิจกรรม:</div>
                <div class="font-bold">
                  <span v-if="data.open == 1" class="badge bg-success"
                    >เปิดรับสมัคร</span
                  >
                  <span v-else class="badge bg-danger"
                    >ปิดรับสมาชิก</span
                  >
                </div>
              </div>
              <div class="flex gap-1">
                <div class="text-gray-500">จำนวนคนที่สมัคร:</div>
                <div class="font-bold">
                  {{ data.students.length }}/{{ data.max }} คน
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          v-if="data.open == 1"
          class="flex flex-col gap-2 border p-3 rounded-lg w-full"
          v-on:submit="submit"
        >
          <div></div>
          <div>
            <label for="exampleInputEmail1" class="form-label"
              >รหัสประจำตัวนักเรียน</label
            >
            <b-form-input
              v-model="student_code"
              :state="studentCodeState"
              placeholder="รหัสประจำตัวนักเรียน"
              type="number"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              รหัสนักเรียนต้องมี 5 หลัก
            </b-form-invalid-feedback>
          </div>
          <div>
            <label for="exampleInputEmail1" class="form-label"
              >รหัสบัตรประชาชน</label
            >
            <b-form-input
              v-model="citizen_id"
              :state="citizenIdState"
              placeholder="รหัสบัตรประชาชน"
              type="number"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              รหัสบัตรประชาชนต้องมี 13 หลัก
            </b-form-invalid-feedback>
          </div>
          <div class="self-center">
            <recaptcha />
          </div>
          <button type="submit" class="btn btn-primary w-full">
            ยืนยันการสมัคร
          </button>
        </form>
      </div>
      <!-- <hr> -->
      <div class="w-full">
        <ListMembers :datas="data" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'WithNavbar',
  async asyncData({ $axios, route }) {
    let { id } = route.params
    let { data } = await $axios.get(
      `${process.env.BASE_URL}/api/club/detail/${id}`
    )
    if (data.error) return
    if (data.data.length === 0) return { data: null }
    return { data: data.data[0] }
  },
  data() {
    return {
      student_code: '',
      citizen_id: '',
    }
  },
  computed: {
    studentCodeState() {
      return this.student_code.length === 5 ? true : false
    },
    citizenIdState() {
      return this.citizen_id.length === 13 ? true : false
    },
  },
  methods: {
    async getData() {
      let { data } = await this.$axios.get(
        `/api/club/detail/${this.$route.params.id}`
      )
      this.data = data.data[0]
    },
    async submit(e) {
      e.preventDefault()
      try {
        const token = await this.$recaptcha.getResponse()
        let { data } = await this.$axios.post(`/api/club/register`, {
          student_code: this.student_code,
          select_club_id: this.data.id,
          citizen_id: this.citizen_id,
          token,
        })

        if (data.error) {
          if (data.message === 'Invalid token') {
            location.reload()
          }
          return this.$swal({
            title: data.message,
            icon: 'error',
          })
        }

        this.$swal({
          title: 'ยืนยันสำเร็จ',
          html: `<h5>รายละเอียดการยืนยัน</h5>
<p>ชื่อ: ${data.data.first_name} ${data.data.last_name}</p>
<p>รหัสนักเรียน: ${this.student_code}</p>
<p>กิจกรรม: ${this.data.title}</p>
<p>สถานที่: ${this.data.location}</p>
<p>ผู้ดูแล: ${this.data.owner.join(', ')}</p>
<p>เวลา: ${new Date().toLocaleString('th-TH')}</p>
          `,
          icon: 'success',
        })
        this.getData()
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('Login error:', error)
      }
    },
  },
}
</script>
<style lang=""></style>
