<template lang="">
  <div class="bg-light p-3 flex flex-col space-y-4 ">
    <div
      class="flex md:flex-row flex-col justify-between space-y-4 md:space-y-0"
    >
      <div>
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>
      <div>
        <div class="relative">
          <div class="absolute inset-y-0 left-2 flex flex-col justify-center">
            <i class="bi bi-search text-slate-800"></i>
          </div>
          <input
            class="text-center border text-black rounded-lg appearance-none w-full py-2 px-4 leading-tight"
            type="text"
            v-model="searchText"
            placeholder="ค้นหาชุมนุม"
          />
        </div>
      </div>
    </div>
    <div v-if="lists2.length !== 0" class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div
        v-for="(item, index) in lists2"
        :key="index"
        class="border-2 py-2 px-3 flex flex-col gap-3 rounded-lg border-gray-200"
      >
        <div class="text-lg">{{ index + 1 }}. {{ item.title }}</div>
        <div class="flex flex-col pl-3">
          <div class="flex gap-1">
            <div class="text-gray-500">รับสูงสุด:</div>
            <div class="font-bold">{{ item.max }} คน</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">รับแล้ว:</div>
            <div class="font-bold">{{ item.members_count }} คน</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">สถานที่:</div>
            <div class="font-bold">{{ item.location }}</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">ผู้ดูแล:</div>
            <div class="font-bold">{{ item.owner.join(', ') }}</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">รับสมัคร:</div>
            <div class="text-rose-700 font-bold">
              {{ item.grade.join(', ') }}
            </div>
          </div>
          <div class="flex gap-1">
            <NuxtLink
              :to="'/activities/register/' + item.id"
              class="text-blue-500"
              >ข้อมูลเพิ่มเติม...</NuxtLink
            >
          </div>
        </div>
        <NuxtLink
          :to="'/activities/register/' + item.id"
          v-if="item.open == 1"
          class="btn btn-success"
          ><i class="bi bi-check2-square"></i> สมัคร</NuxtLink
        >
        <div v-if="item.open == 0" class="btn btn-secondary disabled">
          ปิดรับแล้ว
        </div>
      </div>
    </div>
    <div v-if="lists2.length === 0" class="flex justify-center py-[4rem]">
      <div class="text-4xl font-extrabold">ไม่พบข้อมูล</div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'WithNavbar',
  data() {
    return {
      selected: 'all',
      searchText: '',
      options: [
        { value: 'all', text: 'แสดงทั้งหมด' },
        { value: 'ม.1', text: 'หาเฉพาะ ม.1' },
        { value: 'ม.2', text: 'หาเฉพาะ ม.2' },
        { value: 'ม.3', text: 'หาเฉพาะ ม.3' },
        { value: 'ม.4', text: 'หาเฉพาะ ม.4' },
        { value: 'ม.5', text: 'หาเฉพาะ ม.5' },
        { value: 'ม.6', text: 'หาเฉพาะ ม.6' },
      ],
    }
  },
  watch: {
    searchText: function (val) {
      this.filterClubs(val, this.selected)
    },
    selected: function (val) {
      this.filterClubs(this.searchText, val)
    },
  },
  methods: {
    filterClubs(searchText, selected) {
      if (searchText.length === 0) {
        if (selected === 'all') {
          return (this.lists2 = this.lists)
        } else {
          return (this.lists2 = this.lists.filter((item) =>
            item.grade.includes(selected)
          ))
        }
      }

      if (selected === 'all') {
        this.lists2 = this.lists.filter((item) =>
          item.title.toLowerCase().match(searchText.toLowerCase())
        )
      } else {
        let result = this.lists.filter((item) => item.grade.includes(selected))
        this.lists2 = result.filter((item) =>
          item.title.toLowerCase().match(searchText.toLowerCase())
        )
      }
    },
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get(`${process.env.BASE_URL}/api/club`)
    return { lists: data.data, lists2: data.data }
  },
}
</script>
<style lang=""></style>
