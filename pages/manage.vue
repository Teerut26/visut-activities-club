<template lang="">
  <div class="p-3 bg-light">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="เพิ่มชุมนุม" active>
          <AddClub />
        </b-tab>
        <b-tab title="รายการชื่อชุมนุม" >
          <ClubsListAdmin />
        </b-tab>
        <b-tab title="รายชื่อนักเรียน" >
          <StudentsListAdmin />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'WithNavbar',
  middleware: 'auth'
}
</script>
<style lang=""></style>
