// src/routes/api/mpesa/stkpush/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const consumerKey = 'I00TIhZfJrzoD1R6hCmelV98SSNVZG9DBlUe5EkRhvguoDKH';
const consumerSecret = 'M143HFdbmW84dNl9G0gqz8Z9deAxBkyFwqSmxWJTc0mDdxOh6eNnYyvfCt0jcyrN';
const shortcode = '174379';
const passkey = 'bfb279f9aa9bdbcf15e97dd71a467cd2c2c09fbd63bd2a8fddc49c1b1f84c5c8';
const callbackUrl = 'https://mydomain.com/api/mpesa/callback'; // Replace with your tunnel URL in dev

async function getAccessToken() {
	const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
	const res = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
		headers: {
			Authorization: `Basic ${credentials}`
		}
	});
	const data = await res.json();
	return data.access_token;
}

export const POST: RequestHandler = async ({ request }) => {
	const { phone, amount } = await request.json();

	if (!phone || !amount) {
		return json({ error: 'Phone and amount are required' }, { status: 400 });
	}

	const accessToken = await getAccessToken();

	const timestamp = new Date()
		.toISOString()
		.replace(/[-T:\.Z]/g, '')
		.slice(0, 14); // Format: YYYYMMDDHHMMSS

	const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

	const payload = {
		BusinessShortCode: shortcode,
		Password: password,
		Timestamp: timestamp,
		TransactionType: 'CustomerPayBillOnline',
		Amount: amount,
		PartyA: phone,
		PartyB: shortcode,
		PhoneNumber: phone,
		CallBackURL: callbackUrl,
		AccountReference: 'DONATION',
		TransactionDesc: 'Donation Payment'
	};

	const res = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	const result = await res.json();
	console.log(result);

	return json(result);
};
