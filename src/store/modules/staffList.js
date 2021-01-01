// import METAScore from '../../services/METACore'
// const API_URL = ''
export const staffList = {
  namespaced: true,
  state: {
    _listOfStaff: [
      {
        id: '1',
        username: 'duongdvt',
        fullName: 'Duong Dang',
        email: 'duongdang4654@gmail.com',
        phoneNumber: '0908335207',
        address: 'HCM'
      }
    ],
    _listOfRole: ['AC', 'AM', 'Teacher', 'Teacher Assistant', 'Unassigned Teacher']
  },
  getters: {
    _getListOfStaff (state) {
      return state._listOfStaff
    }
  },
  mutations: {
    _setListOfstaff (state, _listOfStaff) {
      state._listOfStaff = _listOfStaff
    },
    _addstaffMutation (state, staff) {
      state._listOfStaff.push(staff)
    },
    async _updatestaffMutation (state, staff) {
      const edtObj = await state._listOfStaff.find(
        x => x.id === staff.id
      )
      edtObj.username = staff.username
      edtObj.fullName = staff.fullName
      edtObj.phoneNumber = staff.phoneNumber
      edtObj.address = staff.address
      edtObj.email = staff.email
    },
    async _deletestaffMutation (state, staffId) {
      const edtObj = await state._listOfStaff.find(
        x => x.id === staffId
      )
      edtObj.isDeleted = !edtObj.isDeleted
    }
  },
  actions: {
    _getAllStaff (context) {
    },
    _addstaff (context, staff) {
    },
    _updatestaff (context, staff) {
    },
    _deletestaff (context, staff) {
    }
  }
}
