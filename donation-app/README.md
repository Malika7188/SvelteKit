# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

## 💸 M-Pesa Integration (Daraja API - STK Push)

This project integrates M-Pesa using **Safaricom Daraja Sandbox** to simulate the STK Push payment process.

### 🧪 Test Credentials

| Field              | Value                                                                 |
|-------------------|-----------------------------------------------------------------------|
| Shortcode          | `174379` (Safaricom test Paybill)                                     |
| Passkey            | `bfb279f9aa9bdbcf15e97dd71a467cd2c2c09fbd63bd2a8fddc49c1b1f84c5c8`     |
| Test Phone Number  | `254708374149`                                                        |
| Transaction Type   | `CustomerPayBillOnline`                                               |
| Callback URL       | `/api/mpesa/callback`                                                 |

### 🔐 Consumer Key and Secret

These are obtained from [https://developer.safaricom.co.ke/](https://developer.safaricom.co.ke/) by creating a test app:

1. Log into your Daraja account.
2. Create a new app (select **Lipa Na M-Pesa** API).
3. Visit the **Test Credentials** tab.
4. Copy your `Consumer Key` and `Consumer Secret`.

---