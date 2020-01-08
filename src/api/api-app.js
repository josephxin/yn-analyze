import builder from './api-common';

export const getJcYnPingtaiLogin = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/sgLogin/jcYnPingtaiLogin',
  method: 'GET',
  simulation: false,
  simulator: ''
});