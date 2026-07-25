import {  FILE_ENCODING } from "@/constants";

export const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error('No file provided'));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(e.target.result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (e) => reject(e.target.error);
    reader.readAsArrayBuffer(file);
  });
};

export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error('No file provided'));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const base64 = e.target.result.split(',')[1];
        resolve(base64);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (e) => reject(e.target.error);
    reader.readAsDataURL(file);
  });
};


export const readFileAsBinaryString = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error('No file provided'));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(e.target.result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (e) => reject(e.target.error);
    reader.readAsBinaryString(file);
  });
};

export const serializeFileForRedux = async (file, encoding = FILE_ENCODING.ARRAY_BUFFER) => {
  if (!file) throw new Error('No file provided');
  if (!(file instanceof File) && !(file instanceof Blob)) {
    throw new Error('Provided object is not a File or Blob');
  }

  let fileData;
  switch (encoding) {
    case FILE_ENCODING.BASE64:
      fileData = await readFileAsBase64(file);
      break;
    case FILE_ENCODING.BINARY:
      fileData = await readFileAsBinaryString(file);
      break;
    case FILE_ENCODING.ARRAY_BUFFER:
    default:
      fileData = await readFileAsArrayBuffer(file);
      fileData = Array.from(new Uint8Array(fileData));
      break;
  }

  return {
    name: file.name,
    size: file.size,
    type: file.type || 'application/octet-stream',
    lastModified: file.lastModified || Date.now(),
    data: fileData,
    encoding: encoding,
    rows: null, 
  };
};


export const reconstructFileFromRedux = (serializedFile) => {
  if (!serializedFile) throw new Error('No serialized file data provided');
  if (!serializedFile.data) throw new Error('No file data found in serialized object');
  if (!serializedFile.name) throw new Error('No file name found in serialized object');

  let fileData;

  switch (serializedFile.encoding) {
    case 'base64':
      const binaryString = atob(serializedFile.data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      fileData = bytes;
      break;
      
    case 'binary':
      const bytes2 = new Uint8Array(serializedFile.data.length);
      for (let i = 0; i < serializedFile.data.length; i++) {
        bytes2[i] = serializedFile.data.charCodeAt(i);
      }
      fileData = bytes2;
      break;
      
    case 'arraybuffer':
    default:
      fileData = new Uint8Array(serializedFile.data);
      break;
  }

  return new File(
    [fileData],
    serializedFile.name,
    {
      type: serializedFile.type || 'application/octet-stream',
      lastModified: serializedFile.lastModified || Date.now(),
    }
  );
};

export const prepareFileForRedux = async (file, rowCount = null, encoding = 'arraybuffer') => {
  const serialized = await serializeFileForRedux(file, encoding);
  if (rowCount !== null) {
    serialized.rows = rowCount;
  }
  return serialized;
};


export const needsReconstruction = (fileData) => {
  if (!fileData) return false;
  return !!(fileData.data && fileData.encoding);
};


export const getFileFromRedux = (fileData) => {
  if (!fileData) return null;
  
  if (fileData instanceof File || fileData instanceof Blob) {
    return fileData;
  }
  
  if (needsReconstruction(fileData)) {
    try {
      return reconstructFileFromRedux(fileData);
    } catch (error) {
      console.error('Failed to reconstruct file:', error);
      return null;
    }
  }
  
  return null;
};