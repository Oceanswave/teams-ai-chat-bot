import { DefaultAzureCredential }  from '@azure/identity';
import { BlobServiceClient, PublicAccessType } from '@azure/storage-blob';

const accountName = 'stgptchatbot';


async function uploadToBlobStorage(containerName: string, fileName: string, blob: Buffer) {
    // Create the BlobServiceClient instance
    let blobServiceClient;
    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
      blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    } else {
      const defaultAzureCredential = new DefaultAzureCredential();
      blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        defaultAzureCredential
      );
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

export default uploadToBlobStorage;