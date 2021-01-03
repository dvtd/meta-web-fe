<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <teacherAndSchoolTab></teacherAndSchoolTab>
      </v-col>
      <v-col cols="8">
        <timetable></timetable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timetable from '@/components/Timetable'
import TeacherAndSchoolTab from '@/components/TeacherAndSchoolTab'

export default {
  components: {
    timetable: Timetable,
    teacherAndSchoolTab: TeacherAndSchoolTab
  }
}
</script>
