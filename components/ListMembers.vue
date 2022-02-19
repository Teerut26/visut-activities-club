<template lang="">
  <div class="flex flex-col gap-2">
    <div class="text-2xl font-bold">รายชื่อนักเรียน</div>
    <div class="flex px-2">
      <div class="flex flex-col">
        <div class="flex gap-1">
          <div class="text-gray-500">กิจกรรม:</div>
          <div class="font-bold">{{ datas.title }}</div>
        </div>
        <div class="flex gap-1">
          <div class="text-gray-500">ครูผู้ดูแลกิจกรรม:</div>
          <div class="font-bold">{{ datas.owner.join(', ') }}</div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <thead class="">
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">รหัสนักเรียน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datas.students" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ item.student_code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['datas'],
}
</script>
<style lang=""></style>
