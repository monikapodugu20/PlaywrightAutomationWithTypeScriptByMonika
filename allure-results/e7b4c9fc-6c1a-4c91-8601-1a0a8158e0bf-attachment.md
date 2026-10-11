# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter6\07_PUT_api_request.spec.ts >> Create and Get PUT api request in playwright & typescript
- Location: tests\Chapter6\07_PUT_api_request.spec.ts:12:5

# Error details

```
Error: expect(received).toHaveProperty(path, value)

Expected path: "firstname"

Expected value: "Lilyan"
Received value: "cypress by testers talk"
```

# Test source

```ts
  1  | // Import playwright module
  2  | import { test, expect } from '@playwright/test';
  3  | import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper';
  4  | import { faker } from '@faker-js/faker';
  5  | import tokenAPIRequest from '../../test-data/api_requests/TOKEN_Request.json'
  6  | import putAPIRequest from '../../test-data/api_requests/PUT_request.json'
  7  | 
  8  | test.use({
  9  |     baseURL: process.env.BASE_API_URL,
  10 | })
  11 | 
  12 | test('Create and Get PUT api request in playwright & typescript', async ({ request }) => {
  13 | 
  14 |     const firstName = faker.person.firstName();
  15 |     const lastName = faker.person.lastName();
  16 |     const totalPrice = faker.number.int({ min: 1000, max: 10000 });
  17 | 
  18 |     const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, totalPrice,
  19 |         true, "breakfast", "2025-01-25", "2025-01-27");//it calls the function from APIHelper.ts file and returns the POST API request body with dynamic values
  20 | 
  21 |     // Create POST API Request
  22 |     const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });
  23 | 
  24 |     // Print JSON API response
  25 |     const jsonPOSTAPIResponse = await postAPIResponse.json();
  26 |     console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));
  27 | 
  28 |     // Validating api response
  29 |     expect(postAPIResponse.status()).toBe(200);
  30 |     expect(postAPIResponse.statusText()).toBe('OK');
  31 |     expect(postAPIResponse.headers()['content-type']).toContain('application/json');
  32 | 
  33 |     // Validate propert/key names
  34 |     expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
  35 |     expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');
  36 | 
  37 |     expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
  38 |     expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');
  39 | 
  40 |     // Validate API response body
  41 |     expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
  42 |     expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName);
  43 |     expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName);
  44 | 
  45 |     expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-25');
  46 |     expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-27');
  47 | 
  48 |     //Get API Request
  49 |     const bookingId = jsonPOSTAPIResponse.bookingid;
  50 |     console.log('Booking ID : ' + bookingId);
  51 |     const getAPIResponse = await request.get(`/booking/${bookingId}`);
  52 |     // Print JSON API response
  53 |     const jsonGETAPIResponse = await getAPIResponse.json();
  54 |     console.log('GET API Response : ' + JSON.stringify(jsonGETAPIResponse, null, 2));
  55 | 
  56 |     
  57 |     //Token api
  58 |     const tokenAPIResponse = await request.post(`/auth`, { data: tokenAPIRequest });
  59 |     // Validate status code, status text
  60 |     expect(tokenAPIResponse.status()).toBe(200);
  61 |     expect(tokenAPIResponse.statusText()).toBe('OK');
  62 | 
  63 |     const tokenAPIJSONResponse = await tokenAPIResponse.json();
  64 |     const token = tokenAPIJSONResponse.token;
  65 |     console.log('Token : ' + token);
  66 | 
  67 |     // Create PUT API Request
  68 |     const putAPIResponse = await request.put(`/booking/${bookingId}`, {
  69 |         headers: {
  70 |             "Content-Type": "application/json",
  71 |             "Cookie": `token=${token}`
  72 |         },
  73 |         data: putAPIRequest,
  74 |     })
  75 | 
  76 |     // Validate status code, status text
  77 |     expect(putAPIResponse.status()).toBe(200);
  78 |     expect(putAPIResponse.statusText()).toBe('OK');
  79 | 
  80 |     // Print PUT API response
  81 |     const putAPIJSONResponse = await putAPIResponse.json();
  82 |     console.log('PUT API Response : ' + JSON.stringify(putAPIJSONResponse, null, 2));
  83 | 
  84 |     //Validate PUT Response
> 85 |     expect(putAPIJSONResponse).toHaveProperty('firstname', firstName);
     |                                ^ Error: expect(received).toHaveProperty(path, value)
  86 |     expect(putAPIJSONResponse).toHaveProperty('lastname', lastName);
  87 |     expect(putAPIJSONResponse).toHaveProperty('totalprice', totalPrice);
  88 |     expect(putAPIJSONResponse).toHaveProperty('depositpaid', true);
  89 |     expect(putAPIJSONResponse).toHaveProperty('additionalneeds', "breakfast");
  90 |     expect(putAPIJSONResponse.bookingdates).toHaveProperty('checkin', "2025-01-25");
  91 |     expect(putAPIJSONResponse.bookingdates).toHaveProperty('checkout', "2025-01-27");
  92 | 
  93 | 
  94 | });
```