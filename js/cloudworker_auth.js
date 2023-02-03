// This code creates two functions, getResponseType() and getStatusCode(), to get the type of response and the status code for a request. 
// The code also creates two async functions, encrypt() and decrypt(), for encrypting and decrypting data using the crypto module. 
// Lastly, the code creates the handleRequest() function to handle the request, which checks the request's method. If it is a POST request, 
// the function will grab the body of the request, encrypt the data, and then decrypt the data before returning a response. If the request is not a POST request, 
// an error response is returned. The code also creates an event listener to call the handleRequest() function when a fetch event is triggered.

// Cloudflare Workers is a serverless platform for running JavaScript code on Cloudflare’s edge network. It allows developers to set up and deploy code to the edge of Cloudflare’s global network in seconds without the need for a server. The code is run in isolation and can be used to modify incoming requests, route requests to different endpoints, and modify responses before they reach the origin server. Cloudflare Workers is a great solution for quickly implementing features such as A/B testing, API response caching, and custom authentication.
// sample curl
// curl -X POST \
// -H 'Content-Type: application/json' \
// -H 'X-Auth-Email: <cloudflare_user>' \
// -H 'X-Auth-Key: <key>' \
// -d '{ "user": "user", "password": "password123", "secret": "supersecret" }' \ 
// https://example.com/encrypt

const crypto = require('crypto');

// get response type, if the response is json or plain text
function getResponseType(request) {
  const acceptHeader = request.headers.get('Accept');
  if (acceptHeader.includes('application/json')) {
    return 'application/json';
  }
  return 'text/plain';
}

// get status code, if the response is 200 or 400
function getStatusCode(request) {
  return '200';
}

// encrypt function
async function encrypt(user, password, secret) {
  let textToEncrypt = user + password + secret;
  let cipher = crypto.createCipher('aes-256-cbc', secret);
  let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

//decrypt function
async function decrypt(encryptedText, secret) {
  let decipher = crypto.createDecipher('aes-256-cbc', secret);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// handle request
async function handleRequest(request) {
  if (request.method === 'POST') {
    let body = await request.json();
    let encrypted = await encrypt(body.user, body.password, body.secret);
    let decrypted = await decrypt(encrypted, body.secret);
    return new Response(decrypted);
  } else {
    return new Response("Only POST requests are accepted.", {
      status: 400
    });
  }
}

// add event listener
addEventListener('fetch', event => {
event.respondWith(handleRequest(event.request));
});

// handle request
async function handleRequest(request) {
  const responseType = getResponseType(request);
  const url = new URL(request.url);
  const user = url.searchParams.get("user");
  let password = url.searchParams.get("password");
  let secret = url.searchParams.get("secret");
  const deleteKey = url.searchParams.get("delete");
  const accountId = "272d4270396295921a521f9b416d183e";
  const namespaceId = "85d9439314e64570a77471f707c17db4";
  const apiKey = "57f1e44256e2079ea4c86e8b7485bdfab1c8f";
  let response;

  // Ensure that user is not null or empty
  if (!user || !user.length) {
    return new Response("Error: user parameter is required", { status: 400 });
  }

  // Encrypt the password if password is provided
  if (password && password.length) {
    const encryptedPassword = await encrypt(user, password, secret);

    response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
        'X-Auth-Email': 'ruv@ruv.net',
        'X-Auth-Key': apiKey
      },
      body: encryptedPassword
    });
  } else if (deleteKey) {
    response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${user}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain',
        'X-Auth-Email': 'ruv@ruv.net',
        'X-Auth-Key': apiKey
      }
    });
  }

  if (!response.ok) {
    return new Response(`Error writing to Key-Value store: ${await response.text()}`);
  }

  const responseBody = JSON.stringify({
    user: user,
    responseType: responseType,
    statusCode: getStatusCode(request)
  });

  return new Response(responseBody, {
    headers: {
      'Content-Type': responseType
    }
  });
}

// add event listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
