import { toastr } from 'react-redux-toastr'

const errorToast = (err: any) => {
  if (err && err.response && err.response.data && err.response.data.message) {
    toastr.error('Error', err.response.data.message)
  } else {
    toastr.error('Error', '')
  }
}

export default errorToast
