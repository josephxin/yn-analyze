import builder from './api-common';

/* 该隐患相关企业规模分析 */
export const accidentScaleAnalysis = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis-item/accident-scale-analysis?',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 已发生该事故的企业画像 */
// export const analysiscompany = builder.build({
//   baseUrl: builder.BASEURL_02,
//   url: '/intelligent-analysis-item/analysis-company',
//   method: 'GET',
//   simulation: false,
//   simulator: ''
// });

/* 易发生该事故企业 */
export const accidentCompany = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis-item/accident-company-easy',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 该隐患相关企业执法分析 */
export const lawEnforce = builder.build({
  baseUrl: builder.BASEURL_02,
  url: '/intelligent-analysis-item/lawEnforce',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 该隐患相关企业安全分析 */
export const safeAnalysis = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis-item/safeAnalysis',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 该隐患相关企业排查分析 */
export const investigation = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/intelligent-analysis-item/investigation',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 该事故企业风险分析 */
export const analysiscompany = builder.build({
  baseUrl: builder.BASEURL_02,
  url: '/intelligent-analysis-item/analysis-safe-company',
  method: 'GET',
  simulation: false,
  simulator: ''
});
