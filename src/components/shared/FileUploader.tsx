import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col cursor-pointer flex-center rounded-xl bg-dark-3"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex justify-center flex-1 w-full p-5 lg:p-10">
            <img src={fileUrl} alt="imagepost" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drage photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="mt-6 mb-2 base-medium text-light-2">
            Drop the files here ...
          </h3>
          <p className="mb-6 text-light-4 small-regular">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
