// import METAScore from '../../services/METACore'
// const API_URL = ''

export const requestList = {
  namespaced: true,
  state: {
    _listOfRequest: [
      {
        requestID: 'abc',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'Accepted'
      },
      {
        requestID: '123',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'Accepted'
      },
      {
        requestID: '4567',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'Rejected'
      },
      {
        requestID: '312312',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'Rejected'
      },
      {
        requestID: '31232',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'In-Progress'
      },
      {
        requestID: '312312',
        serviceNm: 'xyz',
        content: 'meomeomeo',
        sendAtTime: '22/12/2020',
        status: 'In-Progress'
      }
    ]
  },
  getters: {
    _getListOfRequest (state) {
      return state._listOfRequest
    }
  },
  mutations: {
    _setRequestListOfDepartment (state, _listOfRequest) {
      state._listOfRequest = _listOfRequest
    }
  },
  actions: {}
}
