import * as appStore from '../reducers/application';

export const loading = payload => dispatch =>
  dispatch(appStore.loading(payload))
