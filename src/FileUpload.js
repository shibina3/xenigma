import React from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ onFileUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '*',
    onDrop: (acceptedFiles) => {
      onFileUpload(acceptedFiles[0]);
    }
  });

  return (
    <div {...getRootProps()} className="dropzone file-wrapper">
      <input {...getInputProps()} />
      <div id="dropArea" className="drop-area">
        <p>Drop your files here</p>
      </div>
      <div>----- OR -----</div>
      <div><button type='button' className="btn">Choose File</button></div>
    </div>
  );
}

export default FileUpload;