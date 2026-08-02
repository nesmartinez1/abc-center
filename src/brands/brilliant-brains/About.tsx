  import styles from './css/about.module.css'
  import { useNavigate } from "react-router-dom";
  import { AcademicCapIcon, HeartIcon, StarIcon, LightBulbIcon, UsersIcon, TrophyIcon } from '@heroicons/react/24/outline'

  const values = [
    {
      name: 'Aprendizaje Personalizado',
      description: 'Cada niño es único y merece una educación adaptada a su ritmo y estilo de aprendizaje.',
      icon: AcademicCapIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Pasión por Enseñar',
      description: 'Amamos lo que hacemos y esa pasión se refleja en cada clase que impartimos.',
      icon: HeartIcon,
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'Excelencia Educativa',
      description: 'Nos esforzamos por brindar la mejor calidad educativa para el éxito de nuestros estudiantes.',
      icon: StarIcon,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      name: 'Innovación Constante',
      description: 'Utilizamos métodos creativos y tecnología para hacer el aprendizaje más divertido.',
      icon: LightBulbIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Comunidad Educativa',
      description: 'Creamos un ambiente donde estudiantes, padres y tutores trabajamos juntos.',
      icon: UsersIcon,
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'Logros Celebrados',
      description: 'Cada pequeño progreso es motivo de celebración y reconocimiento.',
      icon: TrophyIcon,
      color: 'bg-yellow-100 text-yellow-600'
    },
  ]

  export default function About() {
    
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate('/brilliant-brains/contacto')
      window.scrollTo(0, 0)
    }
    
    return (
      <div className="bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        {/* Colorful background shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-28 h-28 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-red-300 rounded-full opacity-25"></div>
        </div>

        <main className="isolate">
          <div className={styles.custom}>
            <div>
              <h1 className={styles.title}>Sobre ABC Brilliant Brains</h1>
            </div>
          </div>

          <section className="mx-auto max-w-7xl px-6 lg:px-8 py-8 pt-24">
            <div className="text-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent mb-6">
                  ¿Quienes somos?
                </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">ABC Brilliant Brains es una empresa dedicada a ofrecer tutorías virtuales de alta calidad para estudiantes de todas las edades. Nuestro equipo de educadores especializados brinda apoyo personalizado en diversas materias para potenciar el aprendizaje y el éxito académico. Con un enfoque interactivo y flexible, ayudamos a los estudiantes a desarrollar confianza y alcanzar su máximo potencial.</p>
            </div>
          </section>

          {/* Mission and Vision */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="bg-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 border-t-4 border-blue-400">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent text-center mb-6">
                  Nuestra Misión
                </h2>
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  Transformar la educación online haciendo que el aprendizaje sea una aventura emocionante y personalizada. Creemos que cada niño tiene un genio interior esperando ser descubierto.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 border-t-4 border-red-400">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
                  <StarIcon className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent text-center mb-6">
                  Nuestra Visión
                </h2>
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  Ser la plataforma educativa líder que inspire a miles de niños a alcanzar su máximo potencial académico, creando una generación de estudiantes seguros y exitosos.
                </p>
              </div>
            </div>
          </div>

          {/* Values section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
                Nuestros Valores
              </h2>
              <p className="mt-4 text-lg text-gray-600 font-medium">
                Los principios que guían cada una de nuestras acciones
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <div 
                  key={value.name} 
                  className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-t-4"
                  style={{
                    borderTopColor: index % 3 === 0 ? '#3B82F6' : index % 3 === 1 ? '#EF4444' : '#EAB308'
                  }}
                >
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${value.color} shadow-lg mb-6`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.name}</h3>
                  <p className="text-base text-gray-600 font-medium leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 rounded-3xl p-8 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Listo para comenzar esta increíble aventura educativa?
              </h2>
              <p className="text-xl text-white mb-8 opacity-90">
                Únete a nuestra familia de estudiantes brillantes y descubre todo lo que puedes lograr.
              </p>
              <button className="bg-white text-gray-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={handleNavigation}
              >
                Solicitar Información
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }