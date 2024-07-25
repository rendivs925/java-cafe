import { type ReactElement } from "react";

export default function ImagePreview({
  imageSrc,
}: {
  imageSrc: string | ArrayBuffer | null;
}): ReactElement {
  return (
    <>
      {imageSrc && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={imageSrc as string}
            alt="Image Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "1000px",
            }}
          />
        </div>
      )}
    </>
  );
}
