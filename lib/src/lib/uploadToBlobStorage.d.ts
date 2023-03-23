/// <reference types="node" />
declare function uploadToBlobStorage(containerName: string, fileName: string, blob: Buffer): Promise<any>;
export default uploadToBlobStorage;
