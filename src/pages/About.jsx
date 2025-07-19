// Importing common components
// Importing assets
import birdLogo from "../assets/logos/birdLogo.png";
import womanShelf from "../assets/Photos/womanShelf.jpg";
import ticketLogo from "../assets/Assets/ticket-logo.png";
import logo from "../assets/logos/logo2.png";

/**
 * The About page.
 * @returns {React.ReactElement} About component.
 */
function About() {
  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* HERO SECTION */}
      <section className="w-full bg-rayonblue relative overflow-hidden px-4 sm:px-8 md:px-0 pt-12 pb-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
            Les banques alimentaires,<br />
            premier <span className="text-rayonorange">réseau</span> de distribution<br />
            d’aide alimentaire en <span className="text-rayonorange">France</span>
          </h1>
          <div className="mt-4 max-w-3xl">
            <p className="font-semibold text-white text-base md:text-lg">
              <span className="font-bold text-white">Le Rayon 22</span> est une épicerie sociale et solidaire dont l’objectif est d’accompagner les personnes en difficulté financière en leur donnant accès à une alimentation à petits prix sur tout le territoire des Côtes d’Armor.
            </p>
            <p className="mt-2 text-white text-base md:text-lg">
              <span className="font-bold text-white">Le Rayon 22</span> permet aussi de donner accès à l’aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.
            </p>
            <p className="mt-2 text-white text-base md:text-lg">
              Pour accéder à notre <span className="font-bold text-white">épicerie en ligne</span> en point relais, il faut vous connecter à un compte.
            </p>
          </div>
        </div>
      </section>
      
      {/* TICKET LOGO OVERLAPPING */}
      <img src={ticketLogo} alt="ticket logo" className="absolute top-[400px] right-8 w-32 md:w-48 rotate-6 drop-shadow-2xl z-50" />

      {/* MAIN IMAGE WITH OVERLAPPING CARDS */}
      <div className="w-full relative">
        <div className="w-full h-[621px] overflow-hidden">
          <img src={womanShelf} alt="Woman at shelf" className="w-[210%] h-[210%] object-cover origin-top-left object-left-top transform -translate-y-[15%]"/>
        </div>
        
        {/* INFO CARDS STARTING AT IMAGE MIDPOINT */}
        <div className="absolute top-[310px] left-0 right-0 flex justify-center px-2 sm:px-8 md:px-0">
          <div className="flex flex-col md:flex-row gap-[25%] w-full max-w-5xl">
          {/* LEFT CARD */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#F3F4F6]">
            <div className="flex items-center justify-center mb-4">
              <img src={birdLogo} alt="Banque Alimentaire logo" className="w-32 h-32 object-contain" />
            </div>
            <h2 className="text-[#3435FF] font-bold text-2xl mb-3 text-center">La banque alimentaire des côtes d’Armor</h2>
            <p className="text-center text-base text-[#3435FF] mb-2">
              La banque alimentaire des côtes d’Armor a été créée le 16 octobre 1984, elle est une des toutes première en France !
            </p>
            <p className="text-center text-base text-[#3435FF] mb-2">
              Avec le <span className="font-bold">RAYON 22 Epicerie en ligne</span>, la Banque Alimentaire des Côtes d’Armor innove dans le domaine de la distribution alimentaire.
            </p>
            <p className="text-center text-base text-[#3435FF] mb-4">
              Vous voulez en savoir plus sur l’organisation de la banque alimentaire ?
            </p>
            <a href="https://www.banquealimentaire.org/" className="mt-2 bg-[#FF8200] text-white px-8 py-3 rounded-lg font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all">site national BA →</a>
          </div>
          {/* RIGHT CARD */}
          <div className="flex-1 bg-[#F3F4FF] rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#F3F4F6]">
            <div className="flex items-center justify-center w-40 h-40 bg-[#F3F4FF] rounded-full mb-4">
              <img src={logo} alt="RAYON logo" className="w-28 h-28 object-contain" />
            </div>
            <h2 className="text-[#3435FF] font-bold text-2xl mb-3 text-center">Le réseau le RAYON</h2>
            <p className="text-center text-base text-[#3435FF] mb-2">
              C’est un réseau des <span className="font-bold">Banques Alimentaires</span> dédié à la distribution directe via des épiceries sociales, des camions itinérants et des initiatives spécifiquement pensées pour les jeunes et les étudiants. Il offre une aide diversifiée et de qualité aux personnes vulnérables, là où elles en ont le plus besoin.
            </p>
            <p className="text-center text-base text-[#3435FF] mb-4">
              À l’heure actuelle, six <span className="font-bold">épiceries solidaires</span> sont réparties à travers la France.
            </p>
            <a href="#" className="mt-2 bg-[#3435FF] text-white px-8 py-3 rounded-lg font-mono text-base font-semibold shadow hover:bg-[#5253ff] transition-all">site national le RAYON →</a>
          </div>
          </div>
        </div>
      </div>
      
      {/* SPACER TO ACCOUNT FOR CARD OVERFLOW */}
      <div className="h-80"></div>
    </div>
  )
}

export default About