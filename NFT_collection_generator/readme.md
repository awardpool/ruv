## Introduction:
The Image Generator API is designed to create unique combinations of images to build large dynamic NFT & digital collectible collections. This API takes a series of images and combines them into new variations based on user input. The API is built using Cloudflare workers in javascript.

## API Details:
The API takes a POST request that includes a JSON payload. The JSON payload includes the URLs of the foregrounds, backgrounds, and middles images. It also includes parameters such as the number of foregrounds to be used, the minimum and maximum number of combinations to be generated, the number of tiers to be created, the size of each tier, and the tier limit.

## Example of usage:
To use the API, send a POST request to the API endpoint with a JSON payload that includes the URLs of the foregrounds, backgrounds, and middles images, along with the desired parameters. The API will then generate the combinations of images based on the parameters and return a JSON response.

## JSON Output:
The API returns a JSON response that includes two objects. The first object, 'combinations', is an array of tiers, each of which contains a group of image combinations. The second object, 'summary', contains information about the total number of tiers generated and the final number of image combinations generated.

Each image combination includes the following parameters:

item: a unique identifier for each image combination
uid: a unique identifier for each image combination using UUID
foregrounds: an array of URLs for the foreground images used in the combination
background: a URL for the background image used in the combination
middle: a URL for the middle image used in the combination

## Conclusion:
The Image Generator API provides a way to create unique combinations of images to build NFT & digital collectible collections. The API takes a series of images and generates new combinations based on user input, providing a dynamic and scalable solution for generating image collections. The API is built using Cloudflare workers in javascript and provides a JSON response with information about each image combination generated.

## API POST Outline:
Endpoint: https://api.example.com/images/generate
Method: POST
Request Body (JSON):


```
{
    "foregrounds": [
        "https://example.com/foreground1.png",
        "https://example.com/foreground2.png",
        "https://example.com/foreground3.png"
    ],
    "backgrounds": [
        "https://example.com/background1.jpg",
        "https://example.com/background2.jpg",
        "https://example.com/background3.jpg"
    ],
    "middles": [
        "https://example.com/middle1.gif",
        "https://example.com/middle2.gif",
        "https://example.com/middle3.gif"
    ],
    "id": "1",
    "tier": 200,
    "tierLimit": 200,
    "maxCombinations": 100,
    "numForegrounds" : 3,
    "tiersize" : 20,
    "minCombinations": 52
}
```

### Response Body (JSON):

````
```
(
{
  "combinations": [
    [
      {
        "item": 1,
        "uid": "a9aeea40-c21a-11ea-b3de-0242ac130002",
        "foregrounds": [
          "https://example.com/foreground2.png",
          "https://example.com/foreground3.png",
          "https://example.com/foreground1.png"
        ],
        "background": "https://example.com/background2.jpg",
        "middle": "https://example.com/middle3.gif"
      },
      ...
    ],
    ...
  ],
  "summary": {
    "tiers": 10,
    "finalGeneratedImages": 200
  }
}

```
````
