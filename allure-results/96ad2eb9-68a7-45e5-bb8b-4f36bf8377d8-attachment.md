# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Chapter6\06_QueryParameters_GET_api_request.spec.ts >> Create and Get api request using query parameters in playwright & typescript
- Location: tests\Chapter6\06_QueryParameters_GET_api_request.spec.ts:12:5

# Error details

```
Error: expect(received).toHaveProperty(path, value)

Expected path: "firstname"
Received path: []

Expected value: "Dolly"
Received value: [{"bookingid": 3272}]
```

# Test source

```ts
  1  | // Import playwright module
  2  | import { test, expect } from '@playwright/test';
  3  | 
  4  | import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper';
  5  | 
  6  | import { faker } from '@faker-js/faker';
  7  | 
  8  | test.use({
  9  |     baseURL: process.env.BASE_API_URL,
  10 | })
  11 | 
  12 | test('Create and Get api request using query parameters in playwright & typescript', async ({ request }) => {
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
  51 |      const getAPIResponse = await request.get(`/booking/`, {
  52 |         params: {
  53 |             firstname: firstName,
  54 |             lastname: lastName
  55 |         },
  56 |     });
  57 |     // Print JSON API response
  58 |     const jsonGETAPIResponse = await getAPIResponse.json();
  59 |     console.log('GET API Response : ' + JSON.stringify(jsonGETAPIResponse, null, 2));
  60 | 
  61 |     // Validating GET api response
  62 |     expect(getAPIResponse.status()).toBe(200);
  63 |     expect(getAPIResponse.statusText()).toBe('OK');
  64 |     expect(getAPIResponse.headers()['content-type']).toContain('application/json');
  65 |     
  66 |     // Validate GET API response body
> 67 |     expect(jsonGETAPIResponse).toHaveProperty('firstname', firstName);
     |                                ^ Error: expect(received).toHaveProperty(path, value)
  68 |     expect(jsonGETAPIResponse).toHaveProperty('lastname', lastName);
  69 |     expect(jsonGETAPIResponse).toHaveProperty('totalprice', totalPrice);
  70 |     expect(jsonGETAPIResponse).toHaveProperty('depositpaid', true);
  71 |     expect(jsonGETAPIResponse).toHaveProperty('additionalneeds', "breakfast");
  72 |     expect(jsonGETAPIResponse.bookingdates).toHaveProperty('checkin', "2025-01-25");
  73 |     expect(jsonGETAPIResponse.bookingdates).toHaveProperty('checkout', "2025-01-27");
  74 | });
```