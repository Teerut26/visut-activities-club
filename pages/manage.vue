<template lang="">
  <div class="p-3 bg-light">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="เพิ่มชุมนุม" active>
          <AddClub />
        </b-tab>
        <b-tab title="รายการชุมนุม" >
          <ClubsListAdmin />
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
