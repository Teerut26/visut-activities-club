<template>
  <div class="p-3 bg-light">
    <div class="flex flex-col md:flex-row md:gap-3 justify-center duration-500">
      <div class="small-box bg-primary2 text-white w-full relative duration-500">
        <div class="inner">
          <h3 class="duration-500">{{ data.students }}</h3>
          <p class="duration-500 text-md">จำนวนนักเรียนที่สมัครแล้ว</p>
        </div>
        <div class="absolute right-[2rem] top-0 bottom-0 hidden md:block">
          <div class="flex flex-col justify-center">
            <div class="text-[#00000026]">
              <i class="bi bi-people-fill text-[5rem]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="small-box bg-primary2 text-white w-full relative duration-500">
        <div class="inner">
          <h3 class="duration-500">{{ data.clubs }}</h3>
          <p class="duration-500 text-md">จำนวนชุมนุม</p>
        </div>
        <div class="absolute right-[2rem] top-0 bottom-0 hidden md:block">
          <div class="flex flex-col justify-center">
            <div class="text-[#00000026]">
              <i class="bi bi-people-fill text-[5rem]"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center max-w-xl mx-auto">
      <NuxtLink to="/activities" type="button" class="btn btn-lg btn-info w-full">
        <i class="bi bi-check2-square"></i> เลือกกิจกรรม
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'WithNavbar',
  name: 'IndexPage',
  async asyncData({ $axios }) {
    let { data } = await $axios.get(`${process.env.BASE_URL}/api/info`)
    return { data: data.data }
  },
}
</script>
