// Import playwright module
import { test, expect } from '@playwright/test';
import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper';
import { faker } from '@faker-js/faker';
import tokenAPIRequest from '../../test-data/api_requests/TOKEN_Request.json'
import patchAPIRequest from '../../test-data/api_requests/PATCH_request.json'

test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create and Get Patch Delete api request in playwright & typescript',{ tag: ['@PlaywrightWithJenkins'] }, async ({ request }) => {

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

    
    //Token api
    const tokenAPIResponse = await request.post(`/auth`, { data: tokenAPIRequest });
    // Validate status code, status text
    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe('OK');

    const tokenAPIJSONResponse = await tokenAPIResponse.json();
    const token = tokenAPIJSONResponse.token;
    console.log('Token : ' + token);

    // Create PATCH API Request
    const patchAPIResponse = await request.patch(`/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        },
        data: patchAPIRequest,
    })

    // Validate status code, status text
    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.statusText()).toBe('OK');

    // Print PUT API response
    const patchAPIJSONResponse = await patchAPIResponse.json();
    console.log('PUT API Response : ' + JSON.stringify(patchAPIJSONResponse, null, 2));

    //Delete Api
    const deleteAPIResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        },
    })

    // Validate status code, status text
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe('Created');

    console.log('DELETE API Response : ' + await deleteAPIResponse.body());

});