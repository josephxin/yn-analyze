import builder from './api-common';

/* 事故总览数据 */
export const overviewData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/overview-data',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故区域分布 */
export const accidentAreaAnalysisDialogs = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/accident-area-analysis-dialogs',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故级别分布-分布 */
export const accidentLevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/accident-level2',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故级别分布-同比 */
export const distribution = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/percentFrom',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故类型分布 */
export const accidentTypeData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/accident-type',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故同比 */
export const onYearBasie = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/year-on-year-basie',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故行业分布 */
export const accidentIndustryAnalysisDialogs = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/accident-overview/accident-industry-analysis-dialogs',
  method: 'GET',
  simulation: false,
  simulator: ''
});
