const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(() => {
  request.setBaseUrl('https://testapi.merchante-solutions.com');
  settings.setReporterAutoRun(false);
});