# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter6\01_POST_api_request_staticjson.spec.ts >> Create POST API Request using static file in Plywright Typescript
- Location: tests\Chapter6\01_POST_api_request_staticjson.spec.ts:6:5

# Error details

```
Error: expect(received).toHaveProperty(path, value)

Expected path: "bookingid"
Received path: []

Expected value: 2813
Received value: 2813
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import PostApiRequest from '../../test-data/api_requests/POST_request.json';
  3  | 
  4  | test.use({ baseURL: process.env.BASE_API_URL });//Accessing the base url from .env file
  5  | // write test
  6  | test('Create POST API Request using static file in Plywright Typescript', async ({ request }) => {
  7  | 
  8  |     //create post api request
  9  |     const postapiresponse = await request.post('/booking', { data: PostApiRequest });
  10 |     const jsonpostapiresponse = await postapiresponse.json();//will convert postapi response into json format
  11 |     console.log(`POST API Response : ${JSON.stringify(jsonpostapiresponse)}`);//will print after converting into string
  12 |     
  13 |     // Validating api response
  14 |     expect(postapiresponse.status()).toBe(200);
  15 |     expect(postapiresponse.statusText()).toBe('OK');
  16 |     expect(postapiresponse.headers()['content-type']).toContain('application/json');
  17 | 
  18 |     // Validate json response properties
  19 |     expect(jsonpostapiresponse).toHaveProperty('bookingid');
  20 |     expect(jsonpostapiresponse).toHaveProperty('booking');
  21 |     expect(jsonpostapiresponse.bookingid).toBeGreaterThan(0);
  22 |     const bookingId = jsonpostapiresponse.bookingid;
  23 |     console.log(`Booking ID : ${bookingId}`);
> 24 |     expect(jsonpostapiresponse.bookingid).toHaveProperty('bookingid', bookingId);
     |                                           ^ Error: expect(received).toHaveProperty(path, value)
  25 |     expect(jsonpostapiresponse.booking).toHaveProperty('firstname', 'playwright typescript by testers talk');
  26 |     expect(jsonpostapiresponse.booking).toHaveProperty('lastname', 'playwright javascript by testers talk');
  27 |     expect(jsonpostapiresponse.booking).toHaveProperty('totalprice', 1000);
  28 |     expect(jsonpostapiresponse.booking).toHaveProperty('depositpaid', true);
  29 |     expect(jsonpostapiresponse.booking).toHaveProperty('bookingdates');
  30 | 
  31 |     // Validate nested json object properties
  32 |     expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkin', '2025-01-15');
  33 |     expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkout', '2025-01-17');
  34 |     expect(jsonpostapiresponse.booking).toHaveProperty('additionalneeds', 'breakfast');
  35 | });
```