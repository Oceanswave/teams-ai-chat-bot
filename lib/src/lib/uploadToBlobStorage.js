"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identity_1 = require("@azure/identity");
const storage_blob_1 = require("@azure/storage-blob");
const accountName = 'stgptchatbot';
async function uploadToBlobStorage(containerName, fileName, blob) {
    // Create the BlobServiceClient instance
    let blobServiceClient;
    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
        blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    }
    else {
        const defaultAzureCredential = new identity_1.DefaultAzureCredential();
        blobServiceClient = new storage_blob_1.BlobServiceClient(`https://${accountName}.blob.core.windows.net`, defaultAzureCredential);
    }
    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Check if the container exists
    const containerExists = await containerClient.exists();
    // Create the container if it doesn't exist
    if (!containerExists) {
        console.log(`Creating container: ${containerName}`);
        await containerClient.create();
        await containerClient.setAccessPolicy('blob');
    }
    // Get a reference to the blob
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    // Upload the file
    await blockBlobClient.uploadData(blob);
    return blockBlobClient.url;
}
exports.default = uploadToBlobStorage;
//# sourceMappingURL=uploadToBlobStorage.js.map