# watermark
Plugin to watermark images

## usage

Visit [lenna.app](https://lenna.app).

Open the Burger-Menu and paste the url

```code
https://lenna.app/lenna-plugins-extra/watermark/remoteEntry.js
```

into the input and press 'add plugin'.

## payment

This plugin works only when your current ethereum address in metamask has sent
a transaction in the past.

If not, you will get an offer to pay.
After payment, you do not need to pay anymore.

## development

First build the wasm package,
then run the node app.

```bash
wasm-pack build
npm run start
```

Now you can visit [lenna.app](https://lenna.app)
and paste the url

```code
http://localhost:3002/remoteEntry.js
```

into the input behind the Burger-Menu and press 'add plugin'.
