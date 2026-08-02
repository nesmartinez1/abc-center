import type { ComponentType, SVGProps } from 'react';
import { AcademicCapIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

type Feature = {
  name: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
};

const features: Feature[] = [
  {
    name: 'Servicios Académicos',
    description: 'Atención individualizada adaptada al ritmo de cada niño',
    icon: AcademicCapIcon,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Servicios Psicológicos',
    description: 'Herramientas psicológicas para ayudar tu proceso de crianza para que sea uno eficiente.',
    icon: BookOpenIcon,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    name: 'Talleres Gratuitos',
    description: 'Conoce nuestros talleres gratuitos de crianza saludable con recursos profesionales para impactar tu crianza.',
    icon: UserGroupIcon,
    color: 'bg-red-100 text-red-600'
  },
  ]

export default function HeroSection() {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/brilliant-brains/servicios')
    window.scrollTo(0, 0)
  }

  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-24 h-24 bg-red-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-32 left-12 w-20 h-20 bg-yellow-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 bg-red-300 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-16">
        
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          
          {/* Logo */}
          <img 
            src="/brilliant-brains/images/abc_logo.png" 
            alt="ABC Brilliant Brains Logo" 
            className="w-32 h-32 mx-auto mb-6 animate-bounce mix-blend-multiply"
          />
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
              ABC Brilliant Brains
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-700 font-medium mb-4 max-w-3xl mx-auto">
            Tutorías personalizadas que transforman el aprendizaje en una aventura emocionante
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Conectamos con cada estudiante de manera única, creando experiencias educativas que despiertan la curiosidad y construyen confianza.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all cursor-pointer" onClick={handleNavigation}>
              Ver Servicios
            </button>
          </div>
        </div>
        

        {/* Quick Stats
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { number: '500+', label: 'Estudiantes', color: 'text-red-500' },
            { number: '98%', label: 'Satisfacción', color: 'text-blue-500' },
            { number: '5,000+', label: 'Clases', color: 'text-yellow-500' },
            { number: '8+', label: 'Años', color: 'text-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl text-center border-t-4 border-blue-200">
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-t-4"
              style={{
                borderTopColor: index === 0 ? '#3B82F6' : index === 1 ? '#EAB308' : '#EF4444'
              }}
            >
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${feature.color} shadow-lg`}>
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">{feature.name}</h3>
              <p className="mt-3 text-base text-gray-600 font-medium">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para ver a tu hijo brillar?
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}