import './generator.css';
import def_image from '../../images/default_image.jpg'
import { useRef, useState } from 'react';

function ImageGenerator() {
    const api_key = process.env.REACT_APP_OPENAI_API_KEY;
    const [image_url, setImageUrl] = useState("/")
    const [loading, setLoading] = useState(false)

    let inputRef = useRef(null)

    const GeneratImage = async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true)
        try{
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                        Authorization:
                        `Bearer ${api_key}`,
                        "User-Agent":"Chrome",
                    },
                    body:JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n:1,
                        size:"512x512",
                    }),
                }
            )
            let data = await response.json();
            let data_array = data.data;
            setImageUrl(data_array[0].url)
            setLoading(false)
        }catch (error){
            setLoading(false)
            alert("Please no funny business")
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
              } else {
                console.log(error.message);
              }
        }
    }

  return(
    <div className='container'>
      <h1 className='title'>Ai image <span>Generator</span></h1>
      <div className='sub-container'> 
        <div className='image'>
          <img src={image_url==="/"?def_image:image_url} alt='default image'/>
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
        </div>
        <div className='input-container'>
            <div className='sub-input-container'>
                <input type="text" ref={inputRef} className='input'/>
                <button onClick={()=>{GeneratImage()}}>Generat</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator;