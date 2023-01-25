# Digital Asset Provenance 
The script uses a hash of an image, including non-visual information, and uploading the image and its metadata to prove authenticity of a digital asset also referred to as Digital Asset Provenance.

It is a method of tracking and validating the ownership and authenticity of digital assets such as images, videos, audio, and documents.
It typically involves creating a unique digital fingerprint or hash of the asset, and storing it on a decentralized, tamper-proof ledger such as a blockchain. This allows for the asset's ownership and authenticity to be verified at any point in its lifecycle.

Digital Asset Provenance can be used in various industries such as art, music, film, and photography to protect the rights of creators and owners.
It can also be used in other industries where digital assets are important such as in supply chain management and logistics to track the authenticity and origin of goods.

## Script Details
The purpose of this script is to create a hash of an image, including non-visual information, and uploading the image and its metadata to IPFS to prove the authenticity of the image.

By creating a unique digital fingerprint, or hash, of the image, and storing it on a decentralized, tamper-proof ledger, it allows for the image's authenticity to be verified at any point in its lifecycle. This is particularly useful in industries such as art, photography, and media, where the authenticity and ownership of digital assets are important.

Additionally, by including non-visual information, such as the last save time, in the final hash, it allows for even more detailed tracking and validation of the image.

Furthermore, by uploading the image and its metadata to IPFS, a decentralized file storage system, it ensures that the image and its authenticity information are stored in a secure and tamper-proof way.

Overall, this script is useful for protecting the rights of creators and owners of digital assets, and for ensuring the authenticity of digital assets in various industries.

## Overview of Hashing and Crypto library.
The script uses the crypto library to create a SHA-256 hash of the image file. SHA-256 is a cryptographic hash function that takes an input (or 'message') and returns a fixed-size string of characters, which is a unique 'fingerprint' of that input. In this script, the input is the image file, and the output is a unique hash of that image.

This hashing process is important for ensuring the authenticity of the image. The hash of an image is unique to that specific image, and even a small change to the image will result in a completely different hash. By storing the hash of an image on a decentralized ledger, such as IPFS, it allows for the image's authenticity to be verified at any point in its lifecycle by comparing the hash stored on the ledger with the hash of the current image. This process is important for tracking the image's authenticity, because it can be used to prove that the image has not been tampered with or altered in any way since it was originally hashed. This is particularly important in industries where the authenticity of digital assets is crucial, such as art, photography, and media.

The use of a cryptographic hash function like SHA-256 ensures that the hash is secure, and it's not possible to reverse engineer the image from the hash, making it difficult for anyone to tamper with the image and its authenticity information.

## Non Visual Info
The script creates a JSON file containing non-visual information (such as the last save time) by creating an object with the required information, then use the JSON.stringify() method to convert the object into a string. This JSON string can contain any kind of non-visual information related to the image, such as the last save time, the original creator, location taken, etc.

The script then uses the crypto library to create a hash of this JSON file, in the same way, it creates a hash of the image file.

After that, the script concatenates the two hashes (image hash and JSON hash) to create a combined hash. This combined hash now includes the visual information of the image and the non-visual information in the JSON file.

This step is important because it allows for more detailed tracking and validation of the image. By including non-visual information, such as the last save time, in the final hash, it allows for even more detailed tracking and validation of the image. For example, if the image has been modified or tampered with after a specific date, it would be possible to detect it by comparing the last save time in the JSON file with the current time.

Additionally, by including this non-visual information in the final hash, it adds an extra layer of security, as it makes it more difficult for someone to tamper with the image or its authenticity information without also altering the non-visual information.

## IPFS Overview
IPFS (InterPlanetary File System) is a decentralized, peer-to-peer file storage and sharing system. It allows for the storage and sharing of files in a decentralized way, rather than relying on centralized servers. IPFS uses a distributed hash table (DHT) to store and retrieve files, and it allows for efficient content-based addressing and retrieval of files.

When a file is added to IPFS, it is assigned a unique hash, called the CID (Content Identifier), based on its content. This CID can be used to retrieve the file from any node in the IPFS network that has a copy of the file, making it possible to retrieve the file even if the original node is down. This also allows for efficient content-based addressing and retrieval of files, as the CID is based on the file's content, not its location.

In this script, IPFS is used to store and share the image and its metadata. The image, the JSON file, and the final combined hash are added to IPFS using the ipfs.files.add method. This allows for the image and its metadata to be stored in a decentralized, tamper-proof way.

By using IPFS, it ensures that the image and its metadata can be retrieved from any node in the IPFS network that has a copy of the file, even if the original node is down, which makes it more reliable and resilient to failures.

IPFS is used in this script to store and share the image and its metadata in a decentralized, tamper-proof way, and to ensure efficient content-based addressing and retrieval of the files.

## Fallback Mechanism
The script uses a fallback mechanism to ensure that the image and its metadata are stored on IPFS even if there is an issue connecting to the primary node. This is accomplished by connecting to multiple public IPFS nodes, rather than relying on a single node.

The script uses the library ipfs-http-client which allows to connect to different IPFS nodes, it will try to connect to the primary node first, if the connection is not successful it will try to connect to the next node in the list. This process is repeated until a successful connection is made or until all nodes have been tried.

This fallback mechanism ensures that even if the primary node is down or unavailable, the image and its metadata will still be able to be stored on IPFS via one of the other nodes in the list. This makes the script more resilient to failures and ensures that the image and its metadata are stored on IPFS in a reliable way.

It is important to note that for this fallback mechanism to work, the nodes used should be different and independent, if not you will be facing the same problem with different nodes, it's also important to have a list of updated and active nodes to ensure the best results.

Overall, the fallback mechanism in this script ensures that the image and its metadata are stored on IPFS even if there is an issue connecting to the primary node, which makes the script more reliable and resilient to failures.

## Delay
The script includes an optional delay variable for delaying the IPFS add operation. This variable, passed as a parameter to the function, allows for a delay to be added between each IPFS add operation. This can be useful if you want to add multiple files to the IPFS network in a short period of time, to avoid overloading the IPFS node.

When adding multiple files to IPFS at once, it can put a lot of strain on the IPFS node, causing it to become slow or unresponsive. By adding a delay between each add operation, it can help to spread out the load on the IPFS node and prevent it from becoming overloaded.

The delay variable is an optional parameter passed to the function, so it can be set to any value or not passed at all, depending on the use case. The script will check if the delay variable is passed and if so it uses the setTimeout function to wait for the specified time before proceeding to the next IPFS add operation.

It's important to note that the delay value should be reasonable and not too high, as it will increase the time required to upload all files, but it should also not be too low, as it can still cause an overload on the IPFS node.

Overall, the delay variable in the script allows for a delay to be added between each IPFS add operation, which can be useful if you want to add multiple files and avoid overloading the IPFS node. It makes the script more versatile and adaptable to different use cases.

## How is this different from Steganography?
Steganography and Digital Asset Provenance are related but different technologies.

Steganography is the practice of hiding one piece of information within another. It is often used to conceal sensitive information, such as text, images, or audio, within a seemingly innocent carrier file, such as a digital image or audio file. The goal of steganography is to conceal the existence of the hidden information, and it is often used for malicious purposes such as data exfiltration or covert communication.

On the other hand, Digital Asset Provenance is the process of tracking and validating the ownership and authenticity of digital assets such as images, videos, audio, and documents. The goal of Digital Asset Provenance is to prove the authenticity of the asset, and it is often used for legitimate purposes such as protecting the rights of creators and owners.

In summary, steganography is the technique of hiding data within other data, while Digital Asset Provenance is the technique of proving the authenticity of a digital asset.
