import builder from './api-common';

/* 所有事故  类型*/
export const accidentSelect = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-type-all',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 所有事故  行业*/
export const accidentIndustrySelect = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-type-allIndustry',
  method: 'GET',
  simulation: false,
  simulator: ''
});



/* 事故区域分析 */
export const accidentAreaAnalysis = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-area-analyze',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故信息-中心图 */
export const accidentOverview = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-overview',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故信息-周围的六个图 */
export const accidentOverviewInformation = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-overview-information',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故级别分布 */
export const accidentLevel = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-level',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故行业分布 */
export const accidentIndustry = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-distribution',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故时间趋势分析（月份，时间） */
export const accidentEventTrend = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-event-trend',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故天气分析-气温 */
export const accidentWeatherTrend = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-weather-trend',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 事故天气分析-天气状态 */
export const accidentWeatherTab = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/accident-weather-tab',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 弹窗-安全生产形势 */
export const bigDatazong = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/bigDatazong',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 弹窗-行业分析 */
export const bigDataIndustry = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/bigData-industry',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 弹窗-地区分析表格 */
export const districtAnalyze = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/year-on-area',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 弹窗-地区分析简述 */
export const districtAnalyzeIntro = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/year-on-areaOverview',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 弹窗-事故伤害类型*/
export const bigDataAccidentType = builder.build({
		baseUrl: builder.BASEURL_01,
		url: '/intelligent-analysis/bigData-accidentType',
		method: 'GET',
		simulation: false,
		simulator: ''
});
/* 弹窗-月度分析 */
export const monthAnalyze = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis/bigData-month',
  method: 'GET',
  simulation: false,
  simulator: ''
});
