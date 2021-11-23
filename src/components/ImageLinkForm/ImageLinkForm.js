import React from "react";
import './image.css'

const ImageLinkForm = ({ onChangeEvent,onButtonChange }) => {
  return (
    <div >
      <p className="f3 center">
       { 'Hey this brain will detect number of faces in the picture given to it free of cost ofcourse'}
      </p>
      <div className='center'>
           <div className=' form pa4 br3 '>
           <input className='f4 pa2 w-60 ' type={Text}
                  onChange={onChangeEvent}
           />
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonChange}
          >Detect</button>
            </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
