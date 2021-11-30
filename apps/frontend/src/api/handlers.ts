import {notify} from "../components/Notification";


export const errorHanding = (err: RequestError) => {
  console.log(err.message)
  notify(err.response.data?.detail, 'warning')
}
