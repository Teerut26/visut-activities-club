<template lang="">
  <div class="bg-light p-3">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="border-2 py-2 px-3 flex flex-col gap-3"
      >
        <div class="text-xl">{{ item.title }}</div>
        <div class="flex flex-col pl-3">
          <div class="flex gap-1">
            <div class="text-gray-500">รับสูงสุด:</div>
            <div class="font-bold">{{ item.max }} คน</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">สถานที่:</div>
            <div class="font-bold">{{ item.location }}</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">ผู้ดูแล:</div>
            <div class="font-bold">{{ item.owner.join(", ") }}</div>
          </div>
          <div class="flex gap-1">
            <div class="text-gray-500">รับสมัคร:</div>
            <div class="text-rose-700 font-bold">{{ item.grade.join(", ") }}</div>
          </div>
           <div class="flex gap-1">
            <NuxtLink :to="'/activities/register/'+item.id" class="text-blue-500">ข้อมูลเพิ่มเติม...</NuxtLink>
          </div>
        </div>
        <NuxtLink :to="'/activities/register/'+item.id" v-if="item.open == 1" class="btn btn-success">สมัคร</NuxtLink>
        <div v-if="item.open == 0" class="btn btn-secondary disabled" >ปิดรับแล้ว</div>
        <!-- <div class="flex gap-1">
            <div>รับสูงสุด:</div>
            <div>{{ item.max }}</div>
        </div> -->
        <!-- {{ item }} -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'WithNavbar',
  async asyncData({ $axios }) {
    let { data } = await $axios.get(`${process.env.BASE_URL}/api/club`)
    return { lists: data.data }
  },
}
</script>
<style lang=""></style>
