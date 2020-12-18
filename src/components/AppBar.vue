<template>
  <nav>
    <v-app-bar light flat dense app color="#f1c40f">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><img
          class="header-image"
          alt="Major Education – Học Tiếng Anh Thật Dễ Dàng"
          src="http://hoctienganh.vn/wp-content/uploads/2016/09/cropped-logo2.png"
          title="Major Education – Học Tiếng Anh Thật Dễ Dàng"
      /></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
            <v-badge color="red" overlap>
              <template v-slot:badge>
                {{ numberNoti }}
              </template>

              <v-icon color="#262261">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list :tile="false" nav>
          <div>
            <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
              <v-list-item-title v-text="n" />
            </app-bar-item>
          </div>
        </v-list>
      </v-menu>
      <v-menu
        :open-on-click="openOnClick"
        :close-on-content-click="closeOnContentClick"
        :offset-y="offsetY"
        :offset-x="offsetX"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
            <v-icon color="#262261">mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  :alt="currentUser.fullName"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Thao Nguyen</v-list-item-title>
                <v-list-item-subtitle
                  >thaonguyen@truongvietanh.com</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card class="mx-auto" max-width="400" tile>
            <v-list dense shaped flat rounded>
              <v-list-item-group color="primary">
                <v-list-item @click="logout">
                  <v-list-item-title>
                    Logout
                    <v-icon color="#262261">mdi-logout</v-icon>
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="#262261">
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title-drawer"
              >Thao Nguyen</v-list-item-title
            >
            <v-list-item-subtitle class="subtitle-drawer"
              >thaonguyen@truongvietanh.com</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#f1c40f">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title-drawer">Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#f1c40f">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title-drawer">Account</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#f1c40f">mdi-timetable</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title-drawer"
              >Timetable</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#f1c40f">mdi-frequently-asked-questions</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title-drawer">Request</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#f1c40f">mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title-drawer">History</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
         <template v-slot:append>
           <v-card class="mx-auto" max-width="400" tile color="#262261">
            <v-list dense shaped flat rounded>
              <v-list-item-group color="primary">
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon color="#f1c40f">mdi-logout</v-icon>
                  </v-list-item-icon>
                   <v-list-item-title class="title-drawer">LOGOUT</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
    </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { VHover, VListItem } from 'vuetify/lib'
// import { mapActions } from 'vuex'
export default {
  name: 'META-AppBar',
  components: {
    AppBarItem: {
      render (h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              )
            }
          }
        })
      }
    }
  },
  data () {
    return {
      currentUser: {},
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        "You're now friends with Andrew",
        'Another Notification',
        'Another one'
      ],
      openOnClick: true,
      closeOnContentClick: true,
      offsetY: true,
      offsetX: true,
      numberNoti: 0,
      drawer: false
    }
  },
  mounted () {
    this.numberNoti = this.notifications.length
    // this.currentUser = JSON.parse(localStorage.getItem('UserInfo'))
  },
  methods: {
    // ...mapActions('auth', ['_logout']),
    onSidebarChanged () {},
    logout () {
      this._logout()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="css" scoped>
.header-image {
  height: 38px;
  display: block;
}
.title-drawer {
  color: #f1c40f;
  font-weight: bold !important;
}
.subtitle-drawer {
  color: #f1c40f !important;
  opacity: 0.8;
}
.v-list-item__content {
  width: 18vw;
}
.v-card > .v-card__progress + :not(.v-btn):not(.v-chip),
.v-card > :first-child:not(.v-btn):not(.v-chip) {
  border-radius: 0;
}
</style>
