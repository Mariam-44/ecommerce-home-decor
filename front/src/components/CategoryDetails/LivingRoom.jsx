import Living from "../../assets/images/living.jpg"
import Bed from "../../assets/images/bedroom.jpg"

export default function LivingRoom() {
  return (
    <>
     <h2 className="relative  w-fit mx-auto p-1 text-center font-bold text-xl mt-10 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full  after:h-[1px] after:bg-slate-300">
     Livingroom Essentials</h2>
    <div className="relative">    
       <img src={Living} alt="" className="relative w-screen h-[600px] object-cover"/>
       <div className="card1 font-bold absolute top-20 left-36 bg-slate-200 bg-opacity-40 text-white  w-52 text-center rounded py-3 mx-10">
          <h2>Lamp premium modern</h2>
          <h3>1,500 LE</h3>
       </div>
       <div className="card2 absolute font-bold top-40 left-96 bg-slate-200 bg-opacity-40 text-white  w-52 text-center rounded py-3 mx-5">
          <h2>Sofa premium Nuxe</h2>
          <h3>5,000 LE</h3>
       </div>
       <div className="card3  font-bold absolute bottom-64 right-14 bg-slate-200 bg-opacity-45 text-white  w-52 text-center rounded py-3 mx-5">
          <h2>Round coffe table</h2>
          <h3>2,500 LE</h3>
       </div>
       <div className="absolute bottom-14 p-2 rounded-sm font-extrabold bg-slate-50 bg-opacity-10  text-3xl  start-10">
             <p className="text-white w-96 capitalize">Explore our premium furniture collection! Click on any item you like to view details and make it yours.</p>
          </div>
    </div>
    <h2 className="relative  w-fit mx-auto p-1  text-center font-bold text-xl mt-16 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full  after:h-[1px] after:bg-slate-300">
    Bedroom Essentials</h2>
    <div className="relative mt-5">
      
       <img src={Bed} alt="" className="relative w-screen h-[600px] object-cover"/>
        <div className="card1 font-bold absolute top-40 left-12 bg-yellow-900 bg-opacity-40 text-white  w-52 text-center rounded py-3 mx-10">
          <h2>Modern Accent Chair</h2>
          <h3>3,500 LE</h3>
       </div>

       <div className="card3  font-bold absolute ml-16 top-32 left-96 bg-yellow-900 bg-opacity-40 text-white  w-52 text-center rounded py-3 mx-5">
          <h2>Wooden Storage Unit</h2>
          <h3>2,000 LE</h3>
       </div>
       <div className="card3  font-bold absolute top-24 right-16 bg-yellow-900 bg-opacity-40 text-white  w-56 text-center rounded py-3 px-1 mx-5">
          <h2>Premium King Bed</h2>
          <h3>16,000 LE</h3>
       </div>

       
    </div>
    
    
    
    </>
  )
}

