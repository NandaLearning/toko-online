export default function Footer(){
    return(
        <footer className=" footer p-10 bg-white text-black mt-10">
            <aside>
                <h1 className=" text-xl font-bold text-green-400">WhatShop.</h1>
                <p>PT Whatshop Cari Barang Bagus? Jangan di Sini</p>
            </aside>
            <nav>
                <header className=" footer-title">
                    <h1>WhatShop</h1>
                </header>
                <li><a href="">Tentang Kami</a></li>
            </nav>
            <nav>
                <header className=" footer-title">
                    <h1>Service</h1>
                </header>
                    <nav>
                    <li><a href="">Fashion</a></li>
                    <li><a href="">Elektronik</a></li>
                    <li><a href="">Mainan</a></li>
                    </nav>
            </nav>
        </footer>
    )
}