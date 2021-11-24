import * as appStore from '../reducers/application';

export const loading = (payload: object) => (dispatch: any) =>
  dispatch(appStore.loading(payload))
