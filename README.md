# Code Assessment for Dalia

## Parts:

1. A couple of fake websites
2. Client JS lib for client websites
3. Rails: Admin Area and API endpoint

### Fake websites

Fake websites grabbed from somewhere in the Internet. Only client code is added by your humble servant.
I used them mostly as a playground to test my code in real-like environment.

### Client

The lib made with webpack and support different kind of imports:

```
// browser
window.daliaClient = new DaliaClient.default();

// another webpack project
import DaliaClient from 'dalia-client';
const daliaClientInstance = new DaliaClient();
```

It accepts the following configuration options:

```js
{
  // Required. You can find it in Rails Admin Area
  "apiKey": "...",

  // Optional. Flag for static websites which want to add script for just one page and immediately enable it there.
  "currentPage": false,

  // Optional. Configuration option for localStorage key, which handles check
  // for the form to not being shown again after submission
  "localStorageKey": "dalia-email-sent",

  // Optional. The form we show to a user has it's own ID. If you have the same ID on your website,
  // you can specify here a different ID.
  "formId": "dalia-form",

  // Optional. The email input we show to a user has it's own ID. If you have the same ID on your website,
  // you can specify here a different ID.
  "formEmail": "dalia-email",

  // Optional. Here you can specify the page you want to show the popup.
  // Supports exact string comparison, ex: "jobs.html" === "yourdomain.com/jobs.html"
  // as well as regexp (no need to create RegExp, just use string),
  //   ex: "jobs.*" inlucdes "yourdomain.com/jobs.html" and "yourdomain.com/jobs.php"
  // Default value is all "careers" pages: "/careers", "/careers.html", "/careers.php"
  "page": ".*/careers.*",

  // Optional. If you have multiple pages to show our popup, you can specify it with this key via an array.
  // For more information please reference "page" option above
  "pages": [],

  // We create RegExp from string on fly. If you want to tune RegExp (for example, make it case sensitive),
  // you can set RegExp options here. They will be applied as a second argument to RegExp contructor.
  // Ex.: new RegExp(pattern, regexpKeys)
  "regexpKeys": "gi"
}
```

For now it's hosted on my VPS, but in production I would push it to npm and host it on real CDN.

#### What I add if I would have more time

- automation
- eslint
- push state control (for SPA)
- subclient for most famous frameworks, like React, Angular and Vue

### Rails App

Contains landing (if we can name it like this), admin area and API for subscriptions. 

On first page you need to sign up. As soon as you finish up with that, you will be redirected to your dashboard.
There you can add websites you want the client script to support. As soon as you add them, you will see code snippet
for adding client on your website.

#### What I add if I would have more time

- automation
- rubocop
