import { UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';

import axios from '@/lib/axios';

const downloadFile = async (url: string) => {
  try {
    const res = await axios.get(url);
    if (res?.data) {
      const fileUrl = res.data;
      const path = new URL(fileUrl).pathname; // Get the path portion of the URL
      const fileName = path.substring(path.lastIndexOf('/') + 1); // Extract the file name

      const response = await axios.post(
        '/api/download-file',
        { url: fileUrl },
        { responseType: 'blob' }, // Ensure Axios receives a Blob
      );
      const fileBlob = response.data;

      // Create a download link
      const url = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'file.txt';
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error('[downloadFile] err==', err);
    throw err;
  }
};

export default downloadFile;

export const copyFile = async (url: string, fileName: string): Promise<UploadFile | undefined> => {
  try {
    const res = await axios.get(url);
    if (res?.data) {
      const fileUrl = res.data;

      // Fetch the file
      const response = await axios.post(
        '/api/download-file',
        { url: fileUrl },
        { responseType: 'blob' }, // Ensure Axios receives a Blob
      );
      const fileBlob = response.data;

      // Create a new File object to be compatible with Ant Design Upload
      const file = new File([fileBlob], fileName, { type: 'text/tab-separated-values' });

      // Cast the File to an RcFile
      const rcFile = file as RcFile;

      const fileUploadType: UploadFile = {
        ...file,
        uid: file.name,
        name: file.name,
        fileName: file.name,
        status: 'done',
        lastModifiedDate: new Date(file.lastModified),
        originFileObj: rcFile,
      };

      return fileUploadType;
    }
  } catch (err) {
    console.error('[downloadFile] err==', err);
    throw err;
  }
};
