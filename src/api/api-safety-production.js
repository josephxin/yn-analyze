import builder from './api-common';

/* 安全生产评估 */
export const safeIndex = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/industry/safe-index',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 行业安全生产评估排行 */
export const industrySafety = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/industry/industry-safety',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 行业安全生产评估排行 */
export const areaIndustrySafety = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/area/industry-safety',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 区域 - 安全生产评估分布 */
export const exponentialDistribution = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/area/exponential-distribution',
  method: 'GET',
  simulation: false,
  simulator: ''
});
/* 行业 - 主要行业安全生产评估分析 */
export const indexAnalysis = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/industry/indexAnalysis',
  method: 'GET',
  simulation: false,
  simulator: ''
});

/* 获取用户所属区域 */
export const getUserArea = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/safety-production/industry/getAreaOfUser',
  method: 'GET',
  simulation: false,
  simulator: ''
});
