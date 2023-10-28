import Footer from "../Components/Footer";
import Navigasi from "../Components/Navigasi";
import Slide from "../Components/Slide";

export default function Home(){
    return(
        <div className=" bg-white min-h-screen">
            <div>
                <Navigasi/>
            </div>
            <div className=" grid justify-center items-center">
                <h1 className=" text-7xl font-bold text-green-500 mt-10">Cari Barang Yang kamu</h1>
                <h1 className=" text-center text-4xl font-bold mt-3">Inginkan Disini</h1>
            </div>
            <Slide/>
            
            
            <Footer/>
        </div>
    )
}