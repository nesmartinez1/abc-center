import { useState } from 'react'
import { HashLink } from './HashLink'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { AcademicCapIcon, UserGroupIcon, HomeIcon, GiftIcon } from '@heroicons/react/24/solid'
import styles from './css/services_carousel.module.css'

const services = [
  {
    id: 1,
    title: 'Tutorías Individualizadas',
    subtitle: 'Servicio Virtual',
    description: 'Ofrecemos tutorías personalizadas en matemáticas, ciencias, inglés y español para estudiantes de todos los niveles. ¡Aprendizaje adaptado especialmente para ti!',
    icon: AcademicCapIcon,
    features: ['⏰ Horarios súper flexibles', '👨‍🏫 Atención personalizada', '💰 Ahorro de tiempo y dinero', '🏠 Ambiente cómodo y seguro', '🎓 Enseñanza adaptiva'],
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    accent: 'text-blue-600',
    bgColor: 'bg-blue-100',
    image: '/brilliant-brains/images/abc_individual.png'
  },
  {
    id: 2,
    title: 'Programa Grupal',
    subtitle: 'Servicio Virtual',
    description: 'El programa grupal de ABC Brilliant Brains ofrece clases dos veces a la semana, donde los estudiantes de la misma edad trabajan juntos. ¡Aprender en equipo es súper divertido!',
    icon: UserGroupIcon,
    features: ['🤝 Fomenta la colaboración y el aprendizaje en grupo', '📚 Refuerzo de habilidades en diversas materias', '💭 Promueve la interacción y ayuda mutua entre estudiantes', '💵 Costo accesible de $10 por hora', '🎉 Enfoque social y dinámico en la educación'],
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    accent: 'text-red-600',
    bgColor: 'bg-red-100',
    image: '/brilliant-brains/images/abc_grupal.png'
  },
  {
    id: 3,
    title: 'Asistencia Homeschooling',
    subtitle: 'Servicio Virtual',
    description: '¡Educación en casa como nunca antes! Programas completos diseñados especialmente para el aprendizaje desde la comodidad de tu hogar.',
    icon: HomeIcon,
    features: ['📖 Currículo personalizado', '👨‍👩‍👧‍👦 Participación familiar', '🎯 Enfoque individualizado', '📊 Seguimiento detallado del progreso'],
    color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    accent: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    image: '/brilliant-brains/images/abc_homeschooling.png'
  },
  {
    id: 4,
    title: 'Extracurriculares',
    subtitle: 'Servicio Virtual',
    description: '¡Actividades súper divertidas que complementan tu educación! Descubre nuevos talentos y pasiones mientras aprendes.',
    icon: GiftIcon,
    features: ['📚 Book Club (de 3º a 5º grado)', '🎨 Clases de dibujo', '🔬 Club de ciencia (experimentos y descubrimientos)', '✍️ Talleres de escritura creativa', '🌍 Clases de idiomas (inglés, francés o lenguaje de señas)'],
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    accent: 'text-purple-600',
    bgColor: 'bg-purple-100',
    image: '/brilliant-brains/images/abc_extracurricular.png'
  }
]


export default function ServicesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // Autoplay was scaffolded in the standalone site but never wired up — the
  // flag is written by the hover handlers below and read by nobody, so the
  // carousel has always advanced only on click. Kept (minus the unread value,
  // which strict TS rejects) so the intent survives for whoever finishes it.
  const [, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-red-50 py-20 sm:py-24">
      {/* Colorful background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 bg-yellow-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-60 left-10 w-28 h-28 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent sm:text-5xl">
            Nuestros Servicios
          </h2>
        </div>

        <div 
          className={styles.carouselContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Content */}
          <div className={styles.carouselContent}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`${styles.slide} ${
                  index === currentSlide 
                    ? styles.slideActive
                    : index < currentSlide 
                      ? styles.slidePrev
                      : styles.slideNext
                }`}
              >
                <div className={styles.slideInner}>
                  {/* Content Side */}
                  <div className={styles.contentSide}>
                    <div className={`inline-flex items-center rounded-full ${service.color} px-4 py-2 text-sm font-bold text-white w-fit shadow-lg`}>
                      <service.icon className="mr-2 h-5 w-5" />
                      {service.subtitle}
                    </div>
                    
                    <h3 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {service.title}
                    </h3>
                    
                    <p className="mt-4 text-lg text-gray-700 leading-7 font-medium">
                      {service.description}
                    </p>

                    <ul className={`${styles.featureList} mt-6 space-y-3`}>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className={`mr-3 h-3 w-3 rounded-full ${service.color} shadow-sm`} />
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <HashLink
                        to={`/brilliant-brains/servicios#${{
                          1: "tutorias-individualizadas",
                          2: "programa-grupal",
                          3: "asistencia-homeschooling",
                          4: "extracurriculares"
                        }[service.id]}`}
                        smooth
                        className={`${styles.ctaButton} inline-block text-center rounded-full px-16 py-4 text-base font-bold text-white shadow-lg hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${service.color} transition-all duration-200 cursor-pointer`}
                      >
                        Ver más información
                      </HashLink>
                    </div>
                  </div>

                  {/* Visual/Icon Side */}
                  <div className={styles.imageSide}>
                    <div className={`absolute inset-0 ${service.bgColor} rounded-3xl transform rotate-3 opacity-20`}></div>
                    <img 
                      src={service.image} 
                      alt={`${service.title} - ABC Brilliant Brains`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            <span className="sr-only">Previous slide</span>
          </button>

          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            <span className="sr-only">Next slide</span>
          </button>

          {/* Colorful Dots Indicator */}
          <div className={styles.dotsContainer}>
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${
                  index === currentSlide
                    ? `${service.color} scale-125 ring-2 ring-white`
                    : styles.dotInactive
                }`}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Preview */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => goToSlide(index)}
              className={`rounded-3xl border-2 p-6 text-left transition-all hover:shadow-xl transform hover:scale-105 cursor-pointer duration-300 ${
                index === currentSlide
                  ? `border-transparent ${service.bgColor} shadow-lg scale-105`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${service.bgColor} shadow-lg`}>
                <service.icon className={`h-6 w-6 ${service.accent}`} />
              </div>
              <h4 className="mt-4 font-bold text-gray-900 text-lg">{service.title}</h4>
              <p className="mt-2 text-sm text-gray-600 font-medium">{service.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}