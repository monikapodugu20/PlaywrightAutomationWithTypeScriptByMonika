import { test, expect } from '@playwright/test';
import PostApiRequest from '../../test-data/api_requests/POST_request.json';

test.use({ baseURL: process.env.BASE_API_URL });//Accessing the base url from .env file
// write test
test('Create POST API Request using static file in Plywright Typescript', async ({ request }) => {

    //create post api request
    const postapiresponse = await request.post('/booking', { data: PostApiRequest });
    const jsonpostapiresponse = await postapiresponse.json();//will convert postapi response into json format
    console.log(`POST API Response : ${JSON.stringify(jsonpostapiresponse)}`);//will print after converting into string
    
    // Validating api response
    expect(postapiresponse.status()).toBe(200);
    expect(postapiresponse.statusText()).toBe('OK');
    expect(postapiresponse.headers()['content-type']).toContain('application/json');

    // Validate json response properties
    expect(jsonpostapiresponse).toHaveProperty('bookingid');
    expect(jsonpostapiresponse).toHaveProperty('booking');
    expect(jsonpostapiresponse.bookingid).toBeGreaterThan(0);
    const bookingId = jsonpostapiresponse.bookingid;
    console.log(`Booking ID : ${bookingId}`);
    expect(jsonpostapiresponse.booking).toHaveProperty('firstname', 'playwright typescript by testers talk');
    expect(jsonpostapiresponse.booking).toHaveProperty('lastname', 'playwright javascript by testers talk');
    expect(jsonpostapiresponse.booking).toHaveProperty('totalprice', 1000);
    expect(jsonpostapiresponse.booking).toHaveProperty('depositpaid', true);
    expect(jsonpostapiresponse.booking).toHaveProperty('bookingdates');

    // Validate nested json object properties
    expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkin', '2025-01-15');
    expect(jsonpostapiresponse.booking.bookingdates).toHaveProperty('checkout', '2025-01-17');
    expect(jsonpostapiresponse.booking).toHaveProperty('additionalneeds', 'breakfast');
});