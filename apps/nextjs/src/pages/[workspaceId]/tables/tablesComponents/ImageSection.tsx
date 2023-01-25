import React, { useState } from 'react';
import { Button } from '@mantine/core';

const handleFilePicker = () => {
    document.getElementById('file-input')?.click()
}

const ImageSection = () => {
  const [imageBase64, setImageBase64] = useState('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string)
    };
    reader.readAsDataURL(file)
  }
  

  return (
    <div className='flex flex-col items-center'>
    {imageBase64 ? <img src={imageBase64} alt="kategori_resmi" className='w-8/12 aspect-video bg-contain'/> :(<Button color="teal" radius="xl" size="lg" onClick={()=>handleFilePicker()}>
      Resim Eklemek için Tıkla
    </Button>)}
      <input id='file-input' type="file" onChange={handleFileSelect} className='hidden' accept='.png, .jpg, .jpeg'/>
    </div>
  );
}

export default ImageSection;
