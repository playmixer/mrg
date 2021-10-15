import {useDispatch} from 'react-redux'

import * as apiHandle from '../../api/index';
import * as userStore from '../reducers/user'

// const dispatch = useDispatch();

export const login = (payload) => {
  apiHandle.authLogin(payload)
    .then(res => {
      if (res.statusCode == 200) {
        console.log(res)
      }
    })
    .catch(err => {
      console.log(err.message())
    })
}
