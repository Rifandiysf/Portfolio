import Html5 from "../assets/html5.svg"
import Css from "../assets/css.svg"
import Javascript from "../assets/javascript.svg"
import Tailwindcss from "../assets/tailwindcss.svg"
import Bootstrap from "../assets/bootstrap.svg"
import React from "../assets/React.svg"
import Mysql from "../assets/mysql.svg"
import Git from "../assets/git.svg"
import Figma from "../assets/figma.svg"

export default function InfiniteScroll() {
    // Data logo teknologi
    const techLogos = [
    {
        name: "HTML5",
        icon: Html5,
    },    {
        name: "CSS",
        icon: Css,
    },    {
        name: "JavaScript",
        icon: Javascript,
    },    {
        name: "Tailwindcss",
        icon: Tailwindcss,
    },    {
        name: "Bootstrap",
        icon: Bootstrap,
    },    {
        name: "React",
        icon: React,
    },    {
        name: "Mysql",
        icon: Mysql,
    },    {
        name: "Git",
        icon: Git,
    },    {
        name: "Figma",
        icon: Figma,
    },
    ];
    
    const duplicatedLogos = [...techLogos, ...techLogos, ...techLogos];;
  
    return (
      <div className="w-full mask-image">
        <div className="w-full overflow-hidden">
            <div className="inline-flex items-center whitespace-nowrap animate-infiniteScroll">
                {duplicatedLogos.map((logo, index) => (
                    <div key={index} className="inline-flex items-center mx-12 py-4 gap-3">
                        <div className="w-12 h-12 mb-2 flex items-center justify-center">
                            <img src={logo.icon} alt={`${logo.name} logo`} className="w-12 h-12"/>
                        </div>
                        <span className="font-semibold">{logo.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}