<template lang="">
  <div
    class=""
  >
    <div class="max-w-7xl mx-auto">
      <div class="relative">
        <div class="hidden sm:block">
          <div
            class="absolute bottom-0 left-0 top-0 right-0 bg-black/70 flex flex-col justify-center items-center"
          >
            <div class="flex items-center gap-2">
              <div>
                <img class="w-16" src="/logo.png" alt="" />
              </div>
              <div class="flex flex-col">
                <div class="text-2xl text-white">
                  ระบบลงทะเบียนกิจกรรมชุมนุมออนไลน์
                </div>
                <div class="text-2xl text-white">
                  โรงเรียนวิสุทธรังษี จังหวัดกาญจนบุรี
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          class="w-full object-cover hidden md:block md:h-[10rem]"
          src="/3.jpg"
          alt=""
        />
      </div>
      <Navbar />
      <div class="border-b-2"></div>
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>
<script>
export default {
  name: 'WithNavbar',
}
</script>
<style lang=""></style>
