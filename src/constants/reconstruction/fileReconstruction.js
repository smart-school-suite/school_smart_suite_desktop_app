export const FILE_ENCODING = Object.freeze({
  ARRAY_BUFFER: "arraybuffer",
  BASE64: "base64",
  BINARY: "binary",
});

export const FILE_ENCODING_LABEL = Object.freeze({
  [FILE_ENCODING.ARRAY_BUFFER]: "Array Buffer",
  [FILE_ENCODING.BASE64]: "Base64",
  [FILE_ENCODING.BINARY]: "Binary",
});

export const FILE_ENCODING_META = Object.freeze({
  [FILE_ENCODING.ARRAY_BUFFER]: {
    label: FILE_ENCODING_LABEL[FILE_ENCODING.ARRAY_BUFFER],
    description: "Best for binary data, recommended for most use cases",
    useCase: "General purpose file storage in Redux",
  },
  [FILE_ENCODING.BASE64]: {
    label: FILE_ENCODING_LABEL[FILE_ENCODING.BASE64],
    description: "Text-safe encoding, larger file size",
    useCase: "When you need to embed in JSON or send via API",
  },
  [FILE_ENCODING.BINARY]: {
    label: FILE_ENCODING_LABEL[FILE_ENCODING.BINARY],
    description: "Binary string representation, legacy support",
    useCase: "Legacy browser compatibility",
  },
});

export const DEFAULT_FILE_ENCODING = FILE_ENCODING.ARRAY_BUFFER;
