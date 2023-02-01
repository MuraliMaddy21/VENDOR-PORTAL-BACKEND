const express = require("express");
const parser = require("xml2js")
const fs = require("fs");
const bodyParser = require("body-parser");
var cors = require("cors")
const {response} = require('express')
const app = express();
const X2JS = require('x2js');
const { Server } = require("http");
const { exit } = require("process");
require('dotenv').config();
const accountSid = 'ACdbc551338855ad25fedecadf7207e3b2'; 
const authToken = process.env.AUTH; 
const client = require('twilio')(accountSid, authToken); 
const folderPath = "D:/payslip";
app.use(cors())



app.use(bodyParser.json())

var vendorid;
var password;
var auth;



app.post('/login',function(req,res) 
{
    console.log(req.body.vendorid)
    console.log(req.body.password)
    vendorid = req.body.vendorid
    password = req.body.password
    auth={
      "vid":vendorid
    };
    var result
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_VP_MD_LOGIN&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTIwNjA0MTUFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMjA2MDQxNTMxWjAjBgkqhkiG9w0BCQQxFgQUy6!mOY9OzgbYkcVOKV%2FJFGZiqG8wCQYHKoZIzjgEAwQwMC4CFQDBNNuUB!TvWSwxq!2yKB9X0ILqRgIVAJvcyLizavie%2FkCj5VaXQXfXxpoP; JSESSIONID=eWTrYJ4PMCzk0wUbKi2FLlUhYaXlhAF-Y2kA_SAPhWgNRkqxl0H2ABNyu5UWhlqj; JSESSIONMARKID=jNz5SAeukvrq2EgozGREuYN9jg4A8IFQGW1H5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_LOGIN_VP_MD>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_PASSWORD>${password}</I_PASSWORD>\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n      </urn:ZFM_LOGIN_VP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  var x2js = new X2JS();
  result = x2js.xml2js(response.body)
  result = JSON.stringify(result)
  console.log(result)
  var status = response.body;
  status = x2js.xml2js(status)
  status=status['Envelope']['Body']['ZFM_LOGIN_VP_MD.Response']['E_MESSAGE']
  console.log(status)
  // if(status == "S")
  // {
  //   client.messages 
  //     .create({ 
  //        body: 'Login Attempt Made!Login Successful!',  
  //        messagingServiceSid: 'MG3b1bb34d27f2176205c43dbd554b58e0',      
  //        to: '+919150064160' 
  //      }) 
  //     .then(message => console.log(message.sid)) 
  //     .done();
  // }
  // else{
  //   client.messages 
  //     .create({ 
  //        body: 'Login Attempt Made!Login Failure!Check Credentials',  
  //        messagingServiceSid: 'MG3b1bb34d27f2176205c43dbd554b58e0',      
  //        to: '+919150064160' 
  //      }) 
  //     .then(message => console.log(message.sid)) 
  //     .done();

  // }
  
  res.send(result);

 
 });

})

app.get('/getauth',function(req,res)
{

 
  res.json(auth)

})



app.get('/profile',(req,res)=>
{
    var result1;
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_PROFILE_VP_MD&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwNTA5NDIFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA1MDk0MjEwWjAjBgkqhkiG9w0BCQQxFgQUlcftTNW7W31j6DOFNmxjo%2FScz9QwCQYHKoZIzjgEAwQwMC4CFQDhx6dICa%2FkbJlY%2FGEeCBJkzv5sQwIVAMPn%2FI%2FyEyqFYk01DvqyHzRHxdDC; JSESSIONID=4XLTQkqw3ZG8fSIPhuNRX3GqSStHhAF-Y2kA_SAPl967BTs-IAwJmXmHW8yOkxow; JSESSIONMARKID=o_N6LAWZ6o1e9i7F1Ufj8fjTtizTZOagMuQH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_PROFILE_VP_MD>\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n      </urn:ZFM_PROFILE_VP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  var x2js = new X2JS();
    result1 = x2js.xml2js(response.body)
      result1 = JSON.stringify(result1)
    res.send(result1)
});

     
});


app.get('/invoice',(req,res)=>
{
    var result2;
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_INVOICE_VP_MD&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwNjE0MjYFAAQAAAAICgAIUE9VU0VSQDL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA2MTQyNjI2WjAjBgkqhkiG9w0BCQQxFgQUsY4BgcnYeq9K17jRcIt5OrlT3FYwCQYHKoZIzjgEAwQuMCwCFElZZ1Dy6pg0FyoryVyE!AIuh6XVAhRxCIHa6Gg8T!m2Ye1HRDNM6Np6jw%3D%3D; JSESSIONID=NCFGTlp9b_Zn9JAQRnqW1VyC6VVNhAF-Y2kA_SAPKSflhSgRd_BTthXo75L2ZEIL; JSESSIONMARKID=zcCeeQWHcKRDpmY8cNIcbIV6PVDl1of5qjnH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_INVOICE_VP_MD>\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n      </urn:ZFM_INVOICE_VP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result2 = x2js.xml2js(response.body)
    result2 = JSON.stringify(result2)
  res.send(result2)
});

})

app.get('/quotation',(req,res)=>
{
  var result3;
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_QUOTATION_MURALI&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
    'headers': {
      'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
      'Content-Type': 'text/xml;charset=UTF-8',
      'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwODA1NTEFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA4MDU1MTMyWjAjBgkqhkiG9w0BCQQxFgQUz8hlVMSruFaP2X9JgKu4WgDPXoswCQYHKoZIzjgEAwQvMC0CFQC4Dq5lQr!knMjBgS0P7wpWNIjl2AIUMFMH%2FIHkU9BqPgN!CxyX1Do85%2FU%3D; JSESSIONID=-W3QgWJ2B_s44z1Qjg2rLuNwN8tVhAF-Y2kA_SAPQcpisEPowymLDrfms1q2Cw14; JSESSIONMARKID=ud4XLQfcpiFmA73XJc6a0OdtxmxOy25IazHX5jaQA; saplb_*=(J2EE6906720)6906750'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_QUOTATION_MURALI>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n         <!--Optional:-->\r\n         <IT_QUOTATION>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_QUOTATION>\r\n      </urn:ZFM_QUOTATION_MURALI>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var x2js = new X2JS();
  result3 = x2js.xml2js(response.body)
    result3 = JSON.stringify(result3)
  res.send(result3)
  });
  

})

app.get('/purord',(req,res)=>
{
  var result4
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_PURORD_MURALI&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwODExMTQFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA4MTExNDA5WjAjBgkqhkiG9w0BCQQxFgQUdq%2F6XvWwOQiU441aecI00PfKEk4wCQYHKoZIzjgEAwQwMC4CFQCsbG0!hcJGSibicO3fSfG%2FK8S8uAIVAIyitF%2FPSdBrKO1Z9IN0uPUiFo6f; JSESSIONID=NZKEhsQ6eiiekW6Poa5LchZ2l_JWhAF-Y2kA_SAPwLEBn6hk-79tNu259uF6_OQU; JSESSIONMARKID=iscojAXGqmvRxa4U3YqrdcnYbO1Op6z5dOL35jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_PURORD_MURALI>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n         <IT_PH>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_PH>\r\n         <IT_PV>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_PV>\r\n      </urn:ZFM_PURORD_MURALI>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result4 = x2js.xml2js(response.body)
    result4 = JSON.stringify(result4)
  res.send(result4);
});

    
})



app.get('/gr',(req,res)=>
{

  var result5;
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_GR_MURALI_VP&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwODExMTQFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA4MTExNDA5WjAjBgkqhkiG9w0BCQQxFgQUdq%2F6XvWwOQiU441aecI00PfKEk4wCQYHKoZIzjgEAwQwMC4CFQCsbG0!hcJGSibicO3fSfG%2FK8S8uAIVAIyitF%2FPSdBrKO1Z9IN0uPUiFo6f; JSESSIONID=NZKEhsQ6eiiekW6Poa5LchZ2l_JWhAF-Y2kA_SAPwLEBn6hk-79tNu259uF6_OQU; JSESSIONMARKID=eFgcJgG1yLvtRue1zsVzMqzgnxvX9_yvwbMX5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_GR_MURALI>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n         <!--Optional:-->\r\n         <IT_GH>\r\n            <!--Zero or more repetitions:-->\r\n       \r\n         </IT_GH>\r\n         <!--Optional:-->\r\n         <IT_GI>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_GI>\r\n         <!--Optional:-->\r\n         <IT_RET>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </IT_RET>\r\n      </urn:ZFM_GR_MURALI>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result5 = x2js.xml2js(response.body)
    result5 = JSON.stringify(result5)
  res.send(result5);
});

})

app.get('/pa',(req,res)=>
{

  var result6;
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_PAYAGE_MURALI&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwODExMTQFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA4MTExNDA5WjAjBgkqhkiG9w0BCQQxFgQUdq%2F6XvWwOQiU441aecI00PfKEk4wCQYHKoZIzjgEAwQwMC4CFQCsbG0!hcJGSibicO3fSfG%2FK8S8uAIVAIyitF%2FPSdBrKO1Z9IN0uPUiFo6f; JSESSIONID=NZKEhsQ6eiiekW6Poa5LchZ2l_JWhAF-Y2kA_SAPwLEBn6hk-79tNu259uF6_OQU; JSESSIONMARKID=eFgcJgG1yLvtRue1zsVzMqzgnxvX9_yvwbMX5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_PAYAGE_MURALI>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n         <!--Optional:-->\r\n         <I_PAYAGE>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </I_PAYAGE>\r\n      </urn:ZFM_PAYAGE_MURALI>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result6 = x2js.xml2js(response.body)
    result6 = JSON.stringify(result6)
  res.send(result6);
});

})

app.get('/credit',(req,res)=>
{
  var result7;
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MURALI_VENDOR_PORTAL&receiverParty=&receiverService=&interface=SI_CREDIT_DEBIT_MEMO_VP&interfaceNamespace=http://VENDOR-PORTAL-MD.com',
  'headers': {
    'Content-Type': ' text/xml;charset=UTF-8',
    'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6VGVjaEAyMDIy',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIyMTEwODExMTQFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMTA4MTExNDA5WjAjBgkqhkiG9w0BCQQxFgQUdq%2F6XvWwOQiU441aecI00PfKEk4wCQYHKoZIzjgEAwQwMC4CFQCsbG0!hcJGSibicO3fSfG%2FK8S8uAIVAIyitF%2FPSdBrKO1Z9IN0uPUiFo6f; JSESSIONID=NZKEhsQ6eiiekW6Poa5LchZ2l_JWhAF-Y2kA_SAPwLEBn6hk-79tNu259uF6_OQU; JSESSIONMARKID=BBRhdA0bttKDM6lYUI_qjAPlVUmtW12XWkN35jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_CREDIT_DEBIT_MEMO_VP_MD>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <I_VEN_ID>${vendorid}</I_VEN_ID>\r\n         <I_CREDIT>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n               \r\n         </I_CREDIT>\r\n         <I_DEBIT>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n             \r\n         </I_DEBIT>\r\n      </urn:ZFM_CREDIT_DEBIT_MEMO_VP_MD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var x2js = new X2JS();
  result7 = x2js.xml2js(response.body)
    result6 = JSON.stringify(result7)
  res.send(result7);
});

})

app.get('/shutdown',function(req,res)
{

 
  exit();


})

app.get('/pdf',function(req,res)
{

 
  res.download(folderPath+'/invoice.pdf', function(err) {
    if(err) {
        console.log(err);
    }


  })

})




app.listen(3030,()=>
{
    console.log("server listening on port 3030")
});
