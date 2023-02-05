const uuid = require('uuid');

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let response;
    // only POST requests are supported
    if (request.method === 'POST') {
        // get the payload from the request
        const payload = await request.json();
        // get the payload values
        const {
            foregrounds,
            backgrounds,
            middles,
            numForegrounds
        } = payload || 3;
        const minCombinations = payload.minCombinations || 2;
        const maxCombinations = payload.maxCombinations || 20;
        const tierLimit = payload.tierLimit || 10;
        const tiersize = payload.tiersize || 3;
        // create an array to hold the combinations
        let combinations = [];
        // create an array to hold the tiers
        let tiers = [
            []
        ];
        // create a variable to hold the tier number
        let tier = 1;
        // create a variable to hold the item number
        let id = 1;
        // create a variable to hold the group id
        let groupid = 1;
        // loop through the combinations until the tier limit is reached or the max combinations is reached
        while (combinations.length < tierLimit && combinations.length < maxCombinations) {
            // get the number of combinations for this group
            const numCombinations = numForegrounds || Math.floor(Math.random() * (backgrounds.length - minCombinations + 1) + minCombinations);
            // create an array to hold the foregrounds for this group
            let foregroundsGroup = [];
            // loop through the number of combinations for this group
            for (let i = 0; i < numCombinations; i++) {
                // get a random foreground
                const foreground = foregrounds[Math.floor(Math.random() * foregrounds.length)];
                // add the foreground to the foregrounds group
                foregroundsGroup.push(foreground);
            }
            // get a random background
            const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            // get a random middle
            const middle = middles[Math.floor(Math.random() * middles.length)];
            // create a combination object
            const combination = {
                item: id++,
                uid: uuid.v4(),
                foregrounds: foregroundsGroup,
                background: background,
                middle: middle
            };
            // add the combination to the combinations array
            combinations.push(combination);
            // if the number of combinations is divisible by the tier size
            if (combinations.length % tiersize === 0) {
                // increment the tier
                tier++;
                // add a new tier to the tiers array
                tiers.push([]);
            }
            // add the combination to the tier
            tiers[tier - 1].push(combination);
        }
        // create the response object
        response = {
            combinations: tiers,
            summary: {
                tiers: tier,
                finalGeneratedImages: combinations.length
            }
        };

        // create an error response
    } else {}
    // return the response
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
