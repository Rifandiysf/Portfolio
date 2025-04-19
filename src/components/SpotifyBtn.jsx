import { useState } from "react"
import Spotify from "../assets/spotify.svg"

const SpotifyBtn = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='fixed bottom-10 right-10 bg-black rounded-full p-3 max-sm:bottom-5 max-sm:right-5'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex justify-center items-center'>
            <img src={Spotify} alt="Spotify Logo" className='w-11 h-11'/>
        </button>
        {isOpen && 
        <div className='absolute bottom-[5px] right-[70px] w-[800px] max-sm:w-[280px]'>
            <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/04B4JCFd1rJTeKztyCjBFG?utm_source=generator&theme=0" className='w-full h-[152px]' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>}
    </div>
  )
}

export default SpotifyBtn