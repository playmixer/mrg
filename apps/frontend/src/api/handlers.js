import {notify} from "../components/Notification";

export const errorHanding = (err) => {
  console.log(err.message)
  notify(err.response.data?.detail, 'warning')
}
