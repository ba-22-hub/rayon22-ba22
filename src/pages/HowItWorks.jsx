// Importing common components
import PageButton from "@common/PageButton"
import ShapeNumber from "@common/ShapeNumber"

// Importing assets
import mosaique from "@assets/Photos/mosaique.png"
import bigRoundLogo from "@assets/logos/bigRoundLogo.png"
import holdingApple from "@assets/Photos/holdingApple.jpg"
import beams from "@assets/Assets/Rayons-traits bleus.png"

/**
 * The How It Works page.
 * @returns {React.ReactElement} HowItWorks component.
 */
function HowItWorks() {
    return (
        <>
            {/* Hero section with blue background */}
            <div className="text-white bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] box-border pl-[6vw] lg:pl-20 flex">
                <div>
                    <h1 className="lg:w-[44.81vw] mt-8 lg:mt-20 mb-8 text-5xl lg:text-7xl font-semibold">Faites vos <span className="text-rayonorange">courses</span> à petit prix en ligne et recevez-les près de <span className="text-rayonorange">chez vous !</span></h1>
                    <p className="text-xl lg:text-2xl max-w-[84vw] lg:max-w-none">
                        <strong>Je commande</strong> par internet quand je veux à mon épicerie solidaire et je me fais livrer où je veux en <strong>point relais</strong> près de chez moi ou de mon lieu d'étude.
                        <span className="block mt-4"></span>
                    </p>
                    <p className="text-2xl lg:text-3xl mt-0 mb-0 max-w-[88vw] lg:max-w-none">
                        <strong><span className="text-rayonorange">Un accès équitable</span> à l'essentiel : Payez moins et choisissez mieux.</strong>
                    </p>
                    <p className="text-xl lg:text-2xl max-w-[88vw] lg:max-w-none">
                        <span className="block mt-4"></span>
                        Les prix sont encadrés entre <strong>10% et 30%</strong> de leur valeur en magasin. J'ai le choix de produits variés en alimentaire (produit secs) ou d'hygiène et d'entretien avec toutefois une <strong>limitation mensuelle</strong>.            
                        Une contribution aux frais d’envoi de 1,35€ soit <strong>le prix d’un timbre.</strong>
                        <span className="block mt-4"></span>
                        <strong>L'inscription est indispensable</strong> car l'accès à l'épicerie en ligne est sous conditions de ressources.
                    </p>
                    <div className="mt-12 mb-9">
                        <PageButton buttonText={'Se Connecter ➜'} page={'/login'} className="bg-rayonorange w-80 h-10" />
                    </div>
                </div>
                <img src={mosaique} className="hidden lg:flex w-[555px] h-[469px] mr-32 mt-20" alt="Mosaique" />
            </div>

            {/* Info livraison section */}
            <div className="py-16 bg-white">
                <h2 className="text-center text-[#3435FF] text-4xl font-bold mb-12">Infos livraison</h2>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-8">
                    {/* Image */}
                    <div className="flex-1 flex justify-center mb-8 md:mb-0 md:justify-start md:pl-16">
                        <img src={holdingApple} className="w-[400px] h-[320px] object-cover rounded-lg transform -rotate-[5.83deg]" alt="Holding Apple" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pl-0 md:pl-12 space-y-6">
                        {/* Step 01 */}
                        <div className="flex items-center">
                            <div className="mr-4 flex-shrink-0">
                                <ShapeNumber nb={"01"} />
                            </div>
                            <div>
                                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">Confirmation et Notification</h3>
                                <p className="text-[#3435FF] text-base">
                                    Une fois la commande effectuée, je suis notifié(e) par e-mail de la disponibilité de mon colis au relais Pickup (il y <span className="font-bold">sera disponible pendant 9 jours</span>).
                                </p>
                            </div>
                        </div>

                        {/* Step 02 */}
                        <div className="flex items-center">
                            <div className="mr-4 flex-shrink-0">
                                <ShapeNumber nb={"02"} />
                            </div>
                            <div>
                                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">Retrait sans contact</h3>
                                <p className="text-[#3435FF] text-base">
                                    Un QR code m'est transmis dans cette notification e-mail pour effectuer un retrait sans contact auprès de mon commerçant.
                                </p>
                            </div>
                        </div>

                        {/* Step 03 */}
                        <div className="flex items-center">
                            <div className="mr-4 flex-shrink-0">
                                <ShapeNumber nb={"03"} />
                            </div>
                            <div>
                                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">Relance en cas d'oubli</h3>
                                <p className="text-[#3435FF] text-base">
                                    Je suis relancé(e) à J+3 par SMS et e-mail si je n'ai pas encore retiré mon colis au relais Pickup.
                                </p>
                            </div>
                        </div>

                        {/* Step 04 */}
                        <div className="flex items-center">
                            <div className="mr-4 flex-shrink-0">
                                <ShapeNumber nb={"04"} />
                            </div>
                            <div>
                                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">Retrait du colis</h3>
                                <p className="text-[#3435FF] text-base">
                                    Je récupère mon colis au relais Pickup choisi grâce au QR code. Je présente également ma pièce d'identité.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact and more info section */}
            <div className="pb-16 lg:pt-16 bg-white">
                <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center">
                    {/* Left content */}
                    <div className="flex-1 lg:pr-16">
                        {/* Un contact si besoin */}
                        <div className="mb-16">
                            <h2 className="text-[#3435FF] text-4xl font-bold mb-6">Un contact si besoin</h2>
                            <p className="text-[#3435FF] text-lg leading-relaxed mb-6 max-w-[515px]">
                                Lors de l'inscription, je serai rappelé pour formaliser mon dossier.
                            </p>
                            <p className="text-[#3435FF] text-lg leading-relaxed mb-6 max-w-[515px]">
                                Si nécessaire un rendez vous avec une assistante sociale de proximité sera pris.
                            </p>
                            <p className="text-[#3435FF] text-lg leading-relaxed mb-8 max-w-[515px]">
                                A tout moment, je peux contacter la Banque Alimentaire par mail pour un problème de fonctionnement ou concernant ma situation personnelle. Nous vous répondrons en fonction de nos horaires d'ouverture
                            </p>
                            <a href="/contact" className="inline-block bg-[#FF8200] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#ff9800] transition-all">
                                Contactez nous {'>'}
                            </a>
                        </div>

                        {/* Et beaucoup plus */}
                        <div>
                            {/* Title with beams next to it */}
                            <div className="flex items-center">
                                <h2 className="text-[#3435FF] text-4xl font-bold mr-4">Et beaucoup plus...</h2>
                                <img src={beams} className="w-[120px] h-[120px] object-contain opacity-40" alt="Background beams" />
                            </div>
                            <p className="text-[#3435FF] text-lg leading-relaxed mb-8 max-w-[387px]">
                                Nous mettons à votre disposition des recettes de cuisine, des informations pratiques, des promos, des animations...
                            </p>
                            <a href="/more" className="inline-block bg-[#FF8200] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#ff9800] transition-all">
                                Toujours plus {'>'}
                            </a>
                        </div>
                    </div>

                    {/* Right logo */}
                    <div className="hidden flex-1 lg:flex justify-center lg:justify-end mt-12 lg:mt-0">
                        <img src={bigRoundLogo} className="w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] object-contain" alt="RAYON 22 en ligne logo" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowItWorks