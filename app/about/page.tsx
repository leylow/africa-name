import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { AfricanProverb } from "@/components/african-proverb"

const sayings = [
  {
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    title: "Naming is a spiritual ritual",
    description: "Naming transcends a simple label; it is a foundational spiritual rite —an invocation that calls forth divine blessings and establishes the very destiny the child is meant to fulfill.",
  },
  {
    image: "https://media.istockphoto.com/id/2238119821/photo/portrait-of-young-adult-black-man-smiling-during-kwanzaa-celebration.webp?a=1&b=1&s=612x612&w=0&k=20&c=j4ZfvBJJCuvO0iuCb3rVU19gzds4D7F7fSSchvTWxUk=",
    title: "A name says something about your character",
    description: "It is a powerful declaration that transcends mere personality; a name encapsulates the very essence of one's being, declaring the virtues one must uphold and the highest aspirations set forth for their life."
},
  
  {
    image: "https://media.istockphoto.com/id/146871249/photo/african-mask.webp?a=1&b=1&s=612x612&w=0&k=20&c=CK5ZcHj3PacslIyn5h1WeSCzkNlM5VCWvkGWymF1xas=",
    title: "Our names connect us to our ancestors",
    description: "Our names serve as an enduring bridge across generations, ensuring that every individual remains inherently linked to the historical wisdom and identity forged by those who came before."

  },
]

const influences = [
  {
    image: "https://media.istockphoto.com/id/1715000985/photo/ornamental-desk-calendar.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y13R4Lj10GEs-l_BQ4IchFOEcUR-mvtrnAMME7ODpRk=",
    title: "Born in what order?",
    description: "A child's position among siblings can determine their name. The naming of the order in which children are born can continue until, for example, the twelfth child.",
  },
  {
    image: "https://images.unsplash.com/photo-1703883635837-932563331641?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEFmcmljYW4lMjB0cmFkaXRpb25hbCUyMGltcG9ydGFudCUyMGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Important events",
    description: "Names can commemorate significant family or community events. What happened in society, family or Community? What consequences do those events have? Is it worth repeating?",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "The calendar",
    description: "Naming can be based on the day, season, or specific festivals. What day of the week were you born? That is your day name. A name can also say something about the weather on your birthday.",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1721861982222-c228ccbd2adb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEFmcmljYW4lMjB0cmFkaXRpb25hbCUyMGVtb3Rpb25zfGVufDB8fDB8fHww",
    title: "Emotions",
    description: "Parental feelings or aspirations are reflected in the name. How was the pregnancy? What is the character that the child shows? But also, what qualities do you wish for the child?",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1408] text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section - responsive text */}
        <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-10">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#c9a227] mb-4 sm:mb-6">
            About the Power of a Name
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg">
            Discover the deep cultural significance and rich traditions behind African naming practices.
          </p>
        </div>

        <div className="mx-auto max-w-3xl mb-10 sm:mb-16">
          <AfricanProverb variant="dark" />
        </div>

        {/* Sayings Section - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
          {sayings.map((saying, index) => (
            <div key={index} className="group">
              <div className="relative h-40 sm:h-48 lg:h-56 w-full overflow-hidden rounded-lg mb-3 sm:mb-4">
                <Image
                  src={saying.image || "/placeholder.svg"}
                  alt={saying.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-white text-base sm:text-lg mb-1 sm:mb-2">{saying.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{saying.description}</p>
            </div>
          ))}
        </div>

        {/* What Influences Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">What Influences Giving a Name</h2>
          <div className="h-px bg-gray-700 w-full mb-6 sm:mb-10"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {influences.map((influence, index) => (
              <div key={index} className="group">
                <div className="relative h-28 sm:h-32 lg:h-40 w-full overflow-hidden rounded-lg mb-2 sm:mb-4 bg-gray-800">
                  <Image
                    src={influence.image || "/placeholder.svg"}
                    alt={influence.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-[#c9a227] text-sm sm:text-base mb-1 sm:mb-2">{influence.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{influence.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Custom Footer for dark theme - responsive */}
      <footer className="border-t border-gray-800 py-6 sm:py-10 mt-8 sm:mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#c9a227]">
                <span className="text-base sm:text-lg font-bold text-[#1a1408]">A</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">African Names</span>
            </Link>

            <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>

            <p className="text-gray-500 text-xs sm:text-sm">© 2025 African Names. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
