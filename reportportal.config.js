module.exports = {
  endpoint: 'http://localhost:8080/api/v1',
  apiKey: 'test_elfrHvBLRD6Jf3fXjeUdLpIUWN068IKuctFnu6-y_djY8LY_-atmYxztDfLrbpiE',
  project: 'superadmin_personal',
  launch: process.env.RP_LAUNCH_NAME || 'Ejecución Playwright Default',
  description: 'Ejecución local desde Playwright con ReportPortal',
  attributes: [
    { key: 'tipo', value: 'UI' },
    { value: 'Playwright' }
  ],
  mode: 'DEFAULT'
};
