// Import playwright module
import { test, expect } from '@playwright/test';

import { formatAPIRequest } from '../../src/utils/APIHelper';

import path from 'path';
import fs from 'fs';

import { faker } from '@faker-js/faker';

test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create POST API Request using dynamic api request body values in playwright & typescript', async ({ request }) => {

    // Reading json file
    const filePath = path.join(__dirname, '../../test-data/api_requests/POST_dynamicRequest.json');//loading json file from test-data folder
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');//reading json file content and storing into variable
    
    const firstName = faker.person.firstName();//passing first name value using faker library
    const lastName = faker.person.lastName();//passing last name value using faker library
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });//passing total price value using faker library

    const values = [firstName, lastName, totalPrice];

    // Updating POST API request body
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`, { data: JSON.parse(postAPIRequest) });

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

    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');
});