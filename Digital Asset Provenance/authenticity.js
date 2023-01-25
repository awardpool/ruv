  // 	    Token Gating ERC20
  //      AWARD POOL - Create Amazing
  //        /\__/\   - js by @rUv
  //       ( o.o  )  - v1.0.0
  //         >^<     - https://github.com/awardpool/


const crypto = require('crypto');
const fs = require('fs');
const ipfsAPI = require('ipfs-api');

let ipfs = null;
let nodes = [
    { host: 'https://ipfs.infura.io', port: '5001', protocol: 'https' },
    { host: 'https://ipfs.cloudflare.com', port: '443', protocol: 'https' },
    { host: 'https://ipfs.eternum.io', port: '443', protocol: 'https' },
];

for (let i = 0; i < nodes.length; i++) {
    try {
        ipfs = ipfsAPI(nodes[i].host, nodes[i].port, { protocol: nodes[i].protocol });
        break;
    } catch (e) {
        console.error(`Error connecting to ${nodes[i].host}: ${e.message}`);
        if (i === nodes.length - 1) {
            throw new Error("All fallback IPFS nodes failed to connect");
        }
    }
}

function createHashAndUploadToIpfs(imageFile, delay) {
    // Create a hash of the image file
    const imageHash = crypto.createHash('sha256').update(fs.readFileSync(imageFile)).digest('hex');
    console.log(`Image Hash: ${imageHash}`);

    // Create a JSON file with non-visual information
    const nonVisualData = {
        lastSaveTime: new Date().toISOString()
    };
    const jsonFile = JSON.stringify(nonVisualData);
    console.log(`JSON File: ${jsonFile}`);

    // Create a hash of the JSON file
    const jsonHash = crypto.createHash('sha256').update(jsonFile).digest('hex');
    console.log(`JSON Hash: ${jsonHash}`);

    // Concatenate the two hashes
    const combinedHash = imageHash + jsonHash;
    console.log(`Combined Hash: ${combinedHash}`);

    // Add the image file and the JSON file to IPFS
    const files = [{
        path: 'image.jpg',
        content: fs.readFileSync(imageFile)
    },{
        path: 'data.json',
        content: Buffer.from(jsonFile)
    }];

    setTimeout(()=>{
      ipfs.files.add(files, (err, files) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(`Added to IPFS: ${files[0].hash}`);
      });
    }, delay)
}

// You can use the Buffer class to read the content of the file, and pass it as a parameter to the function.

// const image = fs.readFileSync("./images/image.jpg");

// createHashAndUploadToIpfs(image, 0);

createHashAndUploadToIpfs('path/to/image.jpg', 0);


