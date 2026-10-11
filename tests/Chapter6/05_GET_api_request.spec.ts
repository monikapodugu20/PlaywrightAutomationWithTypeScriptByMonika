// Import playwright module
import { test, expect } from '@playwright/test';

import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper';

import { faker } from '@faker-js/faker';

test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create and Get api request in playwright & typescript', async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, totalPrice,
        true, "breakfast", "2025-01-25", "2025-01-27");//it calls the function from APIHelper.ts file and returns the POST API request body with dynamic values

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });

    // Print JSON API response
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    // Validating api response
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Validate propert/key names
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');

    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');

    // Validate API response body
    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName);
    expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName);

    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-25');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-27');

    //Get API Request
    const bookingId = jsonPOSTAPIResponse.bookingid;
    console.log('Booking ID : ' + bookingId);
    const getAPIResponse = await request.get(`/booking/${bookingId}`);
    // Print JSON API response
    const jsonGETAPIResponse = await getAPIResponse.json();
    console.log('GET API Response : ' + JSON.stringify(jsonGETAPIResponse, null, 2));

    // Validating GET api response
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');
    expect(getAPIResponse.headers()['content-type']).toContain('application/json');
    
    // Validate GET API response body
    expect(jsonGETAPIResponse).toHaveProperty('firstname', firstName);
    expect(jsonGETAPIResponse).toHaveProperty('lastname', lastName);
    expect(jsonGETAPIResponse).toHaveProperty('totalprice', totalPrice);
    expect(jsonGETAPIResponse).toHaveProperty('depositpaid', true);
    expect(jsonGETAPIResponse).toHaveProperty('additionalneeds', "breakfast");
    expect(jsonGETAPIResponse.bookingdates).toHaveProperty('checkin', "2025-01-25");
    expect(jsonGETAPIResponse.bookingdates).toHaveProperty('checkout', "2025-01-27");
});