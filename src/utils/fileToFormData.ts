import { UploadFile } from 'antd';

const fileToFormData = (file: UploadFile, key: string = 'files') => {
  // Extract the native File object if needed
  const fileObject = file.originFileObj as File;
  // Create FormData and append the file
  const formData = new FormData();
  formData.append(key, fileObject); // The key 'file' should match the server-side requirement
  return formData;
};

export default fileToFormData;
