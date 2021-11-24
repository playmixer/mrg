import {notify} from "../components/Notification";
import {RequestError} from "../types/request";

export const errorHanding = (err: RequestError) => {
  console.log(err.message)
  notify(err.response.data?.detail, 'warning')
}
