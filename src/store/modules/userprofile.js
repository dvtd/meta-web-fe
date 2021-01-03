// import METAScore from '../../services/METACore'
// const API_URL = ''

export const userprofile = {
  namespaced: true,
  state: {
    _userProfile: {
      username: 'duongdvt',
      email: 'duongdang4654@gmail.com',
      firstname: 'Duong',
      lastname: 'Dang Vu Tung',
      address: 'HCM',
      phone: '0589444654',
      country: 'Viet Nam',
      description: 'abcxyz'
    }
  },
  getters: {
    _getUserProfile (state) {
      return state._userProfile
    }
  },
  mutations: {
    _setUserProfile (state, _userProfile) {
      state._userProfile = _userProfile
    },
    _updateUserProfile (state, _userProfile) {}
  },
  actions: {
    _getInformationUser (context) {}
  }
}
