// Importing dependencies
import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';

// Importing common components
import PageButton from "@common/PageButton"
import ShapeNumber from "@common/ShapeNumber"
import ProductCarousel from "@common/ProductCarouselHome"

// Importing assets
import orangeWoman from "@assets/Photos/giletorange2.png"
import instagram from "@assets/logos/instagram.png"
import dpd from "@assets/logos/dpd.png"
import mondialRelay from "@assets/logos/mondialRelay.png"
import pickup from "@assets/logos/pickup.png"
import avatar from "@assets/Assets/avatar.png"
import file from "@assets/Assets/file.png"
import cart from "@assets/Assets/cart.png"
import phoneApp from "@assets/Photos/phoneApp.png"
import pasta from "@assets/Photos/Tortis.png"
import rice from "@assets/Photos/Riz.png"
import lentil from "@assets/Photos/Lentilles.png"
import bean from "@assets/Photos/Haricot.png"
import tuna from "@assets/Photos/Thon.png"
import sponges from "@assets/Photos/Eponges.png"

{/* Data product carousel */ }

/**
 * The Home page.
 * @returns {React.ReactElement} Home component.
 */

function Home() {
    const [products, setProducts] = useState([])
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
            if (error) {
                displayNotification("Erreur lors du téléchargement des produits", error.message, "danger")
            } else {
                const productsWithImages = await Promise.all(
                    data.map(async product => {
                        const { data: imgData, error: imgError } = await supabase
                            .storage
                            .from("images")
                            .download(product.image_name);

                        if (imgError) {
                            displayNotification("Erreur lors du téléchargement de l'image " + product.image_name, imgError.message, "warning")
                        } else {
                            product.imageUrl = URL.createObjectURL(imgData);
                        }
                        return product;
                    })
                );

                setProducts(productsWithImages)
            }
        };
        fetchProducts();
    }, [update]);

    return (
        <>
            {/* Hero section with blue background */}
            <div className="text-white bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] box-border pb-12">
                <h1 className="w-[47vw] pt-8 pl-20 text-7xl font-semibold mb-8">Pour <span className="text-rayonorange">accéder</span> à notre épicerie en ligne </h1>
                <div className="flex">
                    <p className="ml-20 mt-4 w-[39.31vw] text-xl">
                        Le <strong>Rayon 22</strong> est une épicerie sociale et solidaire dont l'objectif est d'accompagner les personnes pour qui une aide alimentaire représente un soutien non négligeable pour leurs quotidiens, en leur donnant accès à des produits alimentaires à petits prix, partout sur le territoire des Côtes-d'Armor.
                        <span className="block mt-4"></span>
                        Le <strong>Rayon 22</strong>  permet aussi de donner accès à l'aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.
                        <span className="block mt-4"></span>
                        Afin de pouvoir commander des produits, il vous faut vous connecter à un compte.
                    </p>
                    <img src={orangeWoman} className="ml-40 w-[600px] h-[452px]" alt="Woman in orange" />
                </div>
                <div className="ml-20 mb-8">
                    <PageButton buttonText={'Se Connecter ➜'} page={'/login'} className={'text-white bg-rayonorange rounded-tight w-[20rem] h-[2em]'} />
                </div>
            </div>

            {/* Instagram and Partners sections */}
            <div className="flex justify-center">
                {/* Instagram Section */}
                <div className="w-1/2 h-52 border border-rayonblue box-border bg-white flex flex-col items-center justify-center">
                    <img src={instagram} alt="Instagram" className="w-20 h-20 mb-4" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/banque.alimentaire22/" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        Suivez-nous sur Instagram
                    </a>
                </div>

                {/* Partners Section */}
                <div className="w-1/2 h-52 border border-rayonblue box-border bg-gray-50 flex flex-col items-center justify-between py-4">
                    <div className="flex items-center">
                        <h3 className="text-[#3435FF] font-semibold text-[32px] mr-4">Nos partenaires</h3>
                        <div className="flex text-[#3435FF]">
                            <span className="text-2xl">★★★★★</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-8 w-full">
                        <img src={dpd} alt="DPD" className="h-28 object-contain" />
                        <img src={mondialRelay} alt="Mondial Relay" className="h-28 object-contain" />
                        <img src={pickup} alt="Pickup" className="h-28 object-contain" />
                    </div>
                </div>
            </div>

            {/* Comment commander section */}
            <div className="py-16 bg-gray-50">
                <h2 className="text-center text-[#3435FF] text-4xl font-bold mb-12">Comment commander ?</h2>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center px-8">
                    {/* Column 1 - Inscription */}
                    <div className="flex-1 text-center px-8">
                        <div className="flex justify-center mb-4">
                            <ShapeNumber nb={"01"} />
                        </div>
                        <h3 className="text-[#3435FF] text-xl font-semibold mb-4">Inscription</h3>
                        <div className="flex justify-center my-6">
                            <img src={avatar} alt="Avatar" className="w-30 h-20 object-contain" />
                        </div>
                        <p className="text-[#3435FF] text-base leading-relaxed">
                            Crée ton espace et remplis le formulaire d'inscription.
                        </p>
                    </div>

                    {/* Vertical Line 1 */}
                    <div className="hidden md:block w-px bg-[#3435FF] h-80 mx-4"></div>

                    {/* Column 2 - Étude de dossier */}
                    <div className="flex-1 text-center px-8">
                        <div className="flex justify-center mb-4">
                            <ShapeNumber nb={"02"} />
                        </div>
                        <h3 className="text-[#3435FF] text-xl font-semibold mb-4">Étude de dossier</h3>
                        <div className="flex justify-center my-6">
                            <img src={file} alt="File" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="text-[#3435FF] text-base leading-relaxed">
                            Une fois ton dossier envoyé, il est étudié par notre équipe. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tout les cas, une validation des conditions de ressources sera réalisée. Tu peux suivre l'évolution de ton dossier à tout moment.
                        </p>
                    </div>

                    {/* Vertical Line 2 */}
                    <div className="hidden md:block w-px bg-[#3435FF] h-80 mx-4"></div>

                    {/* Column 3 - À vos courses */}
                    <div className="flex-1 text-center px-8">
                        <div className="flex justify-center mb-4">
                            <ShapeNumber nb={"03"} />
                        </div>
                        <h3 className="text-[#3435FF] text-xl font-semibold mb-4">À vos courses !</h3>
                        <div className="flex justify-center my-6">
                            <img src={cart} alt="Cart" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="text-[#3435FF] text-base leading-relaxed">
                            Si ton dossier est admis, tu pourras commander et faire tes courses à petit prix !
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center mt-12">
                    <PageButton buttonText={'Je m\'inscris ➔'} page={'/register'} className={'text-white bg-rayonorange rounded-tight w-[20rem] h-[2em]'} />
                </div>
            </div>

            {/* Nos Produits */}
            <h2 className="text-center text-[#3435FF] text-4xl font-bold mb-12">Nos produits</h2>
            <ProductCarousel data={products} />

            {/* Chiffres clés à retenir section */}
            <div className="py-16 bg-white">
                <h2 className="text-center text-[#3435FF] text-4xl font-bold mb-12">Chiffres clés à retenir</h2>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-8">
                    {/* Stat 1 - CCAS */}
                    <div className="flex-1 text-center px-8">
                        <div className="text-6xl font-bold text-black mb-2">69</div>
                        <div className="text-xl font-semibold text-black">CCAS*</div>
                    </div>

                    {/* Stat 2 - Repas */}
                    <div className="flex-1 text-center px-8">
                        <div className="text-6xl font-bold text-black mb-2">1 100 000</div>
                        <div className="text-xl font-semibold text-black">Repas/an distribués</div>
                    </div>

                    {/* Stat 3 - Épiceries */}
                    <div className="flex-1 text-center px-8">
                        <div className="text-6xl font-bold text-black mb-2">4</div>
                        <div className="text-xl font-semibold text-black">Épiceries solidaires</div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">*CCAS : Centre Communal d'Action Sociale</p>
                </div>
            </div>

            {/* Le rayon initiative section */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-8">
                    {/* Phone Image */}
                    <div className="flex-1 flex justify-center mb-8 md:mb-0">
                        <div className="relative">
                            <img src={phoneApp} alt="Phone App" className="object-contain" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pl-0 md:pl-12">
                        <h2 className="text-3xl font-bold mb-6">
                            <span className="text-[#3435FF]">Le rayon est une initiative des </span>
                            <span className="text-[#FF8200]">banque alimentaires.</span>
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <span className="text-[#3435FF] text-3xl mr-3 font-bold">→</span>
                                <p className="text-lg">
                                    <span className="text-[#FF8200] font-semibold text-3xl">85%</span>
                                    <span className="text-[#3435FF] font-semibold text-3xl"> vivent avec moins de 200€ par mois.</span>
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="text-[#3435FF] text-3xl mr-3 font-bold">→</span>
                                <p className="text-lg">
                                    <span className="text-[#3435FF] font-semibold text-3xl">1 sur 5</span>
                                    <span className="text-[#3435FF] font-semibold text-3xl"> est en insécurité alimentaire.</span>
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="text-[#3435FF] text-3xl mr-3 font-bold">→</span>
                                <p className="text-lg">
                                    <span className="text-[#FF8200] font-semibold text-3xl">47%</span>
                                    <span className="text-[#3435FF] font-semibold text-3xl"> ont dû renoncer à des soins de santé.</span>
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm italic text-[#3435FF]">Source : La fage</p>
                        </div>

                        <div>
                            <PageButton buttonText={'Toujours plus ➔'} page={'/more'} className={'text-white bg-rayonorange rounded-tight w-[70%] h-[2em]'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home