# SDWC
## A simple Discord Webhook Client

<br>

## Examples:

<br>

### Authorization

```javascript
const Client = require("sdwc");

//Using url
new Client({url: "https://discord.com/api/webhooks/webhook_id/webhook_token"})

//Using id and token
new Client({id: "webhook id", token: "webhook token"})
```

### Getting your webhook's name

```javascript
const client = require("sdwc")({id: "webhook id", token: "webhook token"});

console.log(client.name) // undefined

// client.f == client.fetch

client.fetch().then(res => {
    console.log(res.name); // webhook_name
})

console.log(client.name) // webhook_name
```

### Sending a message (JSON)

```javascript
const client = require("sdwc")({id: "webhook id", token: "webhook token"});

// client.e == client.execute

client.execute({content: "Hello world"})
```

### Sending a message (multipart/form-data)

```javascript
const FormData = require("form-data");
const fs = require("fs");
const client = require("sdwc")({id: "webhook id", token: "webhook token"});

const data = new FormData();

const buffer = fs.readFileSync("./image.PNG")

data.append("content", "Hello world")

// data.append("payload_json", JSON.stringify({ content: "Hello world" }));

data.append('files', buffer, {
    contentType: 'image/png',
    name: 'file',
    filename: 'myimage.png',
});

client.execute(data, false, true, data.getHeaders())
```

## client.execute()


```javascript
client.execute(data, wait, mfd, mfd_headers, thread_id)

// wait

client.execute({content: "Hello"}, false).then(msg => {
    console.log(msg?.id) // undefined
})

client.execute({content: "Hello"}, true).then(msg => {
    console.log(msg?.id) // 123456789012345678
})


// mfd (boolean):
// false - JSON data
// true - multipart/form-data

```