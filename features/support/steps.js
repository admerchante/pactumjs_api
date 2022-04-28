const pactum = require('pactum');
const { request, settings } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
var {setDefaultTimeout} = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});

Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
  spec[method.toLowerCase()](endpoint);
});

Given(/^I set path param (.*) to (.*)$/, function (key, value) {
  spec.withPathParams(key, value);
});

Given(/^I set query param (.*) to (.*)$/, function (key, value) {
  spec.withQueryParams(key, value);
});

Given(/^I set basic authentication credentials (.*) and (.*)$/, function (username, password) {
  spec.withAuth(username, password);
});

Given(/^I set header (.*) to (.*)$/, function (key, value) {
  spec.withHeaders(key, value);
});

Given(/I set body to/, function (body) {
  // try {
  //   spec.withJson(JSON.parse(body));
  // } catch(error) {
    // spec.withBody(body);
    //spec.withCookies('profile_id=94100010330600000001&profile_key=RwmeQKIxDfPGjvRrlNhHProWlYHkAoxi&transaction_type=C&card_number=345607014110874&transaction_amount=10&card_exp_date=1223&currency_code=840&cvv2=123');
    request.setDefaultHeaders({'Content-Type':'text/plain'} ),
    request.setDefaultHeaders({'Cookie':'TS01eaf442=015e4dcc5be43b06d2023cfe43231fc813bcf43f27d3cd13ffac1ecbe7a0a5fb25d91f947a363b1370061e6223320051e3ed38daec'});
    //spec.withBody(body);

    spec.withBody('profile_id=94100010330600000001&profile_key=RwmeQKIxDfPGjvRrlNhHProWlYHkAoxi&transaction_type=Z&card_number=345607014110874&transaction_amount=10&card_exp_date=1223&currency_code=840&cvv2=123');

});

Given(/^I upload file at (.*)$/, function (filePath) {
  spec.withFile(filePath);
});

Given(/^I set multi-part form param (.*) to (.*)$/, function (key, value) {
  spec.withMultiPartFormData(key, value);
});

When('I receive a response', async function () {
  await spec.toss();
});

Then('I expect response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then(/^I expect response header (.*) should be (.*)$/, function (key, value) {
  spec.response().should.have.header(key, value)
});

Then(/^I expect response header (.*) should have (.*)$/, function (key, value) {
  spec.response().should.have.headerContains(key, value)
});

Then(/^I expect response should have a json$/, function (json) {
  spec.response().should.have.json(JSON.parse(json));
});

Then(/^I expect response should have a json at (.*)$/, function (path, value) {
  spec.response().should.have.json(path, JSON.parse(value));
});

Then(/^I expect response should have a json like$/, function (json) {
  spec.response().should.have.jsonLike(JSON.parse(json));
});

Then(/^I expect response should have a json like at (.*)$/, function (path, value) {
  spec.response().should.have.jsonLike(path, JSON.parse(value));
});

Then(/^I expect response should have a json schema$/, function (json) {
  spec.response().should.have.jsonSchema(JSON.parse(json));
});

Then(/^I expect response should have a json schema at (.*)$/, function (path, value) {
  spec.response().should.have.jsonSchema(path, JSON.parse(value));
});

Then(/^I expect response should have a body$/, function (body) {
  spec.response().should.have.body(body);
});

Then('I expect response should have {string}', function (handler) {
  spec.response().should.have._(handler);
});

Then(/^I store response at (.*) as (.*)$/, function (path, name) {
  spec.stores(name, path);
});

After(() => {
  console.log('\n');
  console.log('\n');
  
  printBaseUrl()
  printRequestInfo()
  printResponseInfo()

  spec.end();
});




function printBaseUrl() {
  console.log('Base URL:',spec.inspect()._request.url);
}


function printRequestInfo() {
  console.log('---------->------REQUEST INFO--------->------->');
  console.log('Request Method:',spec.inspect()._request.method);
  console.log('Request Path  :',spec.inspect()._request.path);
  if (spec.inspect()._request.body==undefined){
  }else {
  console.log('Request Body  :',spec.inspect()._request.body);
  }
  console.log('--------->------REQUEST INFO--------->------->');
}

function printResponseInfo() {
  console.log('<-------<--------RESPONSE INFO--------<--------');
  console.log('Response Status Code  :',spec.inspect()._response.statusCode);
  console.log('Response Body         :',spec.inspect()._response.body);
  console.log('Response ResponseTime :',spec.inspect()._response.responseTime);
  console.log('<-------<--------RESPONSE INFO---------<-------');

}
