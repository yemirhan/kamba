// import React from "react";
// import { useEffect } from "react";
// import { useMenu } from "providers/useMenu";

// const handleFilePicker = () => {
//   document.getElementById("file-inputt")?.click();
// };

// export const SetItemImage = ({
//   setItemImage
// }: {
//   setItemImage:  React.Dispatch<React.SetStateAction<string>>
// }) => {
//   const ItemImageState = {
//     editItemImage: useMenu((state) => state.editItemImage),
//     SetEditItemImage: useMenu((state) => state.SetEditItemImage),
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setItemImage(reader.result as string)
//       ItemImageState.SetEditItemImage();
//     };
//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (ItemImageState.editItemImage) {
//       handleFilePicker();
//     }
//   }, [ItemImageState.editItemImage]);

//   return (
//     <input
//       id="file-inputt"
//       type="file"
//       onChange={handleFileSelect}
//       className="hidden"
//       accept=".png, .jpg, .jpeg"
//     />
//   );
// };
