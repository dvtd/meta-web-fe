<template>
  <div>
    <v-autocomplete
      v-model="search"
      label="Search"
      :item="teachers.fullName"
      outlined
      chips
      clearable
      solo
    >
    </v-autocomplete>

    <v-tabs v-model="tab" centered>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Teachers</v-tab>
      <v-tab>Schools</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <vue-custom-scrollbar class="scroll-area" :settings="settings">
            <v-list>
              <v-list-item-group v-model="selectedItem">
                <v-list-item
                  v-for="(item, i) in teachers"
                  :key="i">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.hours"></v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </vue-custom-scrollbar>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <vue-custom-scrollbar class="scroll-area" :settings="settings">
            <v-list>
              <v-list-item-group v-model="selectedItem">
                <v-list-item
                  v-for="(item, i) in schools"
                  :key="i">
                  <v-list-item-icon>
                    <v-icon>mdi-school</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.hours"></v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </vue-custom-scrollbar>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'

export default {
  name: 'TeacherAndSchoolTab',
  components: {
    vueCustomScrollbar
  },
  data: () => ({
    tab: null,
    selectedItem: 0,
    teachers: [
      { title: 'ANNA', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', hours: '15 hours' },
      { title: 'BON', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', hours: '18 hours' },
      { title: 'ADAM', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', hours: '20 hours' },
      { title: 'HOPE', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', hours: '15 hours' },
      { title: 'JOE', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '17 hours' },
      { title: 'KYE', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', hours: '25 hours' },
      { title: 'ONA', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', hours: '30 hours' },
      { title: 'LUKE', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', hours: '25 hours' },
      { title: 'ARI', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', hours: '15 hours' },
      { title: 'GUS', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '24 hours' },
      { title: 'GUS', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '24 hours' },
      { title: 'GUS', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '24 hours' },
      { title: 'GUS', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '24 hours' },
      { title: 'GUS', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', hours: '24 hours' }
    ],
    schools: [
      { title: 'Nguyễn An Ninh High School', hours: '15 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '18 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '20 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '15 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '17 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '25 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '30 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '25 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '15 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' },
      { title: 'Nguyễn An Ninh High School', hours: '24 hours' }
    ],
    settings: {
      suppressScrollY: false,
      suppressScrollX: true,
      wheelPropagation: false
    }
  })
}
</script>

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 350px;
  height: 500px;
}
</style>
