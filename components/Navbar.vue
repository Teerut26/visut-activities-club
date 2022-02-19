<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid flex">
        <div class="navbar-brand">
          <div class="lg:hidden block text-[1rem]">
            ระบบลงทะเบียนกิจกรรมชุมนุมออนไลน์
          </div>
        </div>
        <button
          class="navbar-toggler self-end"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/"
                ><i class="bi bi-house-door"></i> Home</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/activities"
                ><i class="bi bi-check2-square"></i> เลือกกิจกรรม</NuxtLink
              >
            </li>
            <!-- <li class="nav-item">
              <NuxtLink class="nav-link" to="/news"
                ><i class="bi bi-bell"></i> ข่าวประกาศ</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/contact"
                ><i class="bi bi-telephone"></i> ติดต่อครู</NuxtLink
              >
            </li> -->
            <div v-if="$auth.user">
              <li v-if="$auth.user.level == 'a'" class="nav-item">
                <NuxtLink class="nav-link" to="/manage"
                  ><i class="bi bi-card-checklist"></i> จัดการ</NuxtLink
                >
              </li>
            </div>
          </ul>
          <form class="flex flex-col md:flex-row gap-2 justify-center">
            <NuxtLink v-if="!$auth.user" to="/login" class="pr-3 btn">
              <i class="bi bi-box-arrow-in-right"></i>
            </NuxtLink>

            <ul v-if="$auth.user" class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ $auth.user.username }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <div
                      @click="$auth.logout()"
                      class="dropdown-item cursor-pointer"
                    >
                      <i class="bi bi-box-arrow-right"></i> Sign Out
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- <div v-if="$auth.user" class="flex justify-center items-center">
              <i class="bi bi-person-circle text-gray-500 text-3xl"></i>
            </div> -->
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
}
</script>
<style lang=""></style>
