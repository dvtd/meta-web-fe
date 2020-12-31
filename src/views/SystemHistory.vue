<template>
  <v-container id="regular-tables" fluid tag="section">
    <meta-history-grid :headerTable="headers" :dataTable="Users"> </meta-history-grid>
    <div class="py-3" />
  </v-container>
</template>

<script>
import HistoryGrid from '@/components/HistoryGrid'
export default {
  components: {
    'meta-history-grid': HistoryGrid
  },
  data: function () {
    return {
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'user'
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Action', value: 'action' },
        { text: 'Time', value: 'time' }
      ],
      Users: [
        {
          user: 'thaonguyen@truongvietanh.com',
          name: 'Thao Nguyen',
          email: 'thaonguyen@truongvietanh.com',
          role: 'admin',
          action: 'create user',
          time: new Date(Date.now() - 3600000 * 1).toUTCString()
        },
        {
          user: 'thaonguyen@truongvietanh.com',
          name: 'Thao Nguyen',
          email: 'thaonguyen@truongvietanh.com',
          role: 'admin',
          action: 'update user',
          time: new Date(Date.now() - 3600000 * 2).toUTCString()
        },
        {
          user: 'thaonguyen@truongvietanh.com',
          name: 'Thao Nguyen',
          email: 'thaonguyen@truongvietanh.com',
          role: 'admin',
          action: 'remove user',
          time: new Date(Date.now() - 3600000 * 3).toUTCString()
        },
        {
          user: 'Dan@truongvietanh.com',
          name: 'Dan',
          email: 'Dan@truongvietanh.com',
          role: 'teacher',
          action: 'Logged in the device',
          time: new Date(Date.now() - 3600000 * 4).toUTCString()
        },
        {
          user: 'thaonguyen@truongvietanh.com',
          name: 'Thao Nguyen',
          email: 'thaonguyen@truongvietanh.com',
          role: 'admin',
          action: 'Approved a report',
          time: new Date(Date.now() - 3600000 * 5).toUTCString()
        },
        {
          user: 'thaonguyen@truongvietanh.com',
          name: 'Thao Nguyen',
          email: 'thaonguyen@truongvietanh.com',
          role: 'admin',
          action: 'Disapproved a report',
          time: new Date(Date.now() - 3600000 * 6).toUTCString()
        },
        {
          user: 'Michelle@truongvietanh.com',
          name: 'Michelle',
          email: 'Michelle@truongvietanh.com',
          role: 'teacher',
          action: 'Logged in the Website',
          time: new Date(Date.now() - 3600000 * 7).toUTCString()
        },
        {
          user: 'Michelle@truongvietanh.com',
          name: 'Michelle',
          email: 'Michelle@truongvietanh.com',
          role: 'teacher',
          action: 'Created a request',
          time: new Date(Date.now() - 3600000 * 8).toUTCString()
        }
      ]
    }
  }
}
</script>

<style></style>
