import React from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import DeleteButton from "./Button/DeleteButton";
import { CiImageOn } from "react-icons/ci";

type FormFieldProps = {
  fieldName: string;
  maxNumber: number;
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

const ImagesInput = ({
  fieldName,
  maxNumber,
  images,
  setImages,
}: FormFieldProps) => {
  // const [images, setImages] = React.useState([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <div className="App">
      <div className="label">
        <span className="label-text font-semibold">{fieldName}</span>
        <span className="label-text-alt">
          {images.length}/{maxNumber}
        </span>
      </div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="w-full">
            <div
              className={
                "flex items-center border w-full h-48 gap-3 p-3 rounded-lg border-black overflow-x-auto transition-colors " +
                (isDragging && "bg-indigo-100")
              }
              {...dragProps}
            >
              {imageList.length == 0 && (
                <div className="flex flex-col w-full justify-center items-center text-center text-slate-700">
                  <CiImageOn className="w-8 h-8 text-slate-700"/>
                  Click on the button or drop images here to upload
                </div>
              )}
              <div className="flex flex-nowarp gap-4">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col flex-none w-fit gap-2"
                  >
                    <img
                      src={image.dataURL}
                      alt=""
                      className="object-cover w-32 h-32"
                    />
                    <div className="image-item__btn-wrapper">
                      {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                      <DeleteButton onClick={() => onImageRemove(index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-3 flex justify-center gap-5">
              <button
                type="button"
                className="primary-button"
                onClick={onImageUpload}
              >
                Add image
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={onImageRemoveAll}
              >
                Remove all images
              </button>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagesInput;
