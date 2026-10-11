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

Expected path: "firstname"

Expected value: "playwright typescript by testers talk1"
Received value: "playwright typescript by testers talk"
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
  18 |     // Validate propert/key names
  19 |     expect(jsonpostapiresponse).toHaveProperty('bookingid');
  20 |     expect(jsonpostapiresponse).toHaveProperty('booking');
  21 |     expect(jsonpostapiresponse.bookingid).toBeGreaterThan(0);
  22 |     // const bookingidObject = jsonpostapiresponse.bookingid;
  23 |     // console.log(`Booking ID : ${bookingidObject}`);
  24 |     // expect(jsonpostapiresponse.booking).toHaveProperty('bookingid', bookingidObject);
> 25 |     expect(jsonpostapiresponse.booking).toHaveProperty('firstname', 'playwright typescript by testers talk1');
     |                                         ^ Error: expect(received).toHaveProperty(path, value)
  26 |     expect(jsonpostapiresponse.booking).toHaveProperty('lastname', 'playwright javascript by testers talk');
  27 |     expect(jsonpostapiresponse.booking).toHaveProperty('totalprice', 1000);
  28 |     expect(jsonpostapiresponse.booking).toHaveProperty('depositpaid', true);
  29 |     expect(jsonpostapiresponse.booking).toHaveProperty('bookingdates');
  30 |     expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkin', '2025-01-15');
  31 |     expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkout', '2025-01-17');
  32 |     expect(jsonpostapiresponse.booking).toHaveProperty('additionalneeds', 'breakfast');
  33 | });
```