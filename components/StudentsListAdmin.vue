<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div class="flex gap-2">
      <div class="btn btn-primary" @click="getData()">
        <i class="bi bi-arrow-clockwise text-xl"></i>
      </div>
      <div class="btn btn-primary">
        <i class="bi bi-filetype-csv text-xl"></i>
      </div>
    </div>

    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="เลือกคอลัมน์"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="ค้นหา"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="สิ่งที่อยู่ในตาราง"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">ล้าง</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="จำนวนต่อหนึ่งหน้า"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div>
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        :responsive="true"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(grade)="row">
          <div class="flex gap-1">
            ม.{{ row.value.grade }}/{{ row.value.room }}
          </div>
        </template>
        <template #cell(name)="row">
          <div class="flex gap-1">
            {{ row.value.first_name }} {{ row.value.last_name }}
          </div>
        </template>
        <template #cell(open)="row">
          <span v-if="row.value === 1" class="badge bg-success"
            >เปิดรับสมัคร</span
          >
          <span v-if="row.value === 0" class="badge bg-danger"
            >ปิดรับสมัคร</span
          >
        </template>

        <template #cell(actions)="row">
          <div class="flex flex-nowrap">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              แก้ไข
            </b-button>
            <b-button
              @click="deleteList(row.item)"
              size="sm"
              class="mr-1"
              variant="danger"
            >
              ลบ
            </b-button>
          </div>
        </template>
      </b-table>
    </div>

    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @hidden="getData()"
      hide-footer
    >
      {{infoModal.content}}
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true, sortDirection: 'desc' },
        { key: 'student_code', label: 'รหัสนักเรียน', sortable: true },
        { key: 'name', label: 'ชื่อ-สกุล', sortable: true },
        { key: 'grade', label: 'ระดับชั้น', sortable: true },
        { key: 'select_club_id', label: 'เลือกชุมนุม', sortable: true },
        {
          key: 'assessment_results',
          label: 'ผลการประเมิน',
          sortable: true,
        },
        // { key: 'max', label: 'รับสูงสุด (คน)', sortable: true },
        // { key: 'open', label: 'สถานะ', sortable: true },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal-studens',
        title: '',
        content: '',
      },
      dataSelectModal: null,
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.getData()
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `${item.name.first_name} ${item.name.last_name} | ม.${item.grade.grade}/${item.grade.room} | ${item.student_code}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    onEditClubForm(val) {
      if (val.length === 0) return
      this.dataSelectModal = val
    },
    async AddData() {
      let { data } = await this.$axios.post('/api/students/add', {
        student_code,
        citizen_id,
        first_name,
        last_name,
        grade,
        room,
        token,
      })
      if (data.error) return
      this.$swal.fire({
        title: 'เพิ่มข้อมูลสำเร็จ',
        icon: 'success',
        timer: 700,
      })
    },
    async deleteList(item) {
      const { id } = item
      console.log(id)
      let result = await this.$swal({
        title: 'ต้องการลบหรือไม่ ?',
        text: item.title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
      })
      if (result.isConfirmed) {
        let { data } = await this.$axios.post('/api/students/delete', {
          id,
        })
        if (data.error) return
        this.$swal.fire({
          title: 'ลบสำเร็จ',
          icon: 'success',
          timer: 700,
        })
        this.getData()
      }
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async getData() {
      let { data } = await this.$axios.get('/api/students')
      this.totalRows = data.data.length
      this.items = data.data
    },
    handleOk() {
      console.log(this.dataSelectModal)
    },
  },
}
</script>
