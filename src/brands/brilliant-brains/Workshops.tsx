import { useState } from 'react';

const posts = [
    // {
    //     id: 8,
    //     title: 'Manejo del estrés familiar y redes de apoyo',
    //     href: '#',
    //     description:
    //         'Este taller busca brindar herramientas prácticas para identificar, comprender y manejar el estrés dentro del entorno familiar. A través de actividades participativas se abordarán estrategias para mejorar la comunicación, fortalecer los vínculos familiares y fomentar un ambiente emocional saludable. Además, se promoverá la importancia de las redes de apoyo, familiares, sociales y comunitarias como recursos fundamentales para afrontar situaciones difíciles y mantener el bienestar integral de todos los miembros del hogar.',
    //     imageUrl:
    //         'src/assets/images/workshops/taller-nov.jpeg',
    //     date: '19 de noviembre, 2025 | <a>Regístrate ahora</a> use this button =>',
    //     datetime: '2020-03-16',
    //     category: { title: 'Marketing', href: '#' },
    //     author: {
    //         name: 'Keyra Couevertier',
    //         role: 'Someone lol',
    //         href: '#',
    //     },
    // },
    {
        id: 7,
        title: 'Creciendo entre juegos y sueños: la importancia de estar activo y dormir',
        href: '#',
        description:
            'En este taller exploraremos cómo el juego activo fortalece el cuerpo y la mente de los niños, y cómo un buen descanso potencia su aprendizaje y bienestar. Descubrirás estrategias sencillas para equilibrar la actividad física y el sueño saludable en la rutina diaria.',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-oct.jpeg',
        date: '28 de octubre, 2025',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Dra. Wiscovich',
            role: 'Pediatra',
            href: '#',
        },
    },
    {
        id: 6,
        title: 'Crianza y educación: un mismo camino',
        href: '#',
        description:
            'Este taller busca acompañar a las familias en la hermosa tarea de formar a sus hijos, reconociendo que la crianza en el hogar y la educación en la escuela no son procesos separados, sino caminos que se entrelazan y se fortalecen mutuamente. El objetivo es crear un espacio de apoyo y confianza donde familias y educadores se conviertan en aliados, construyendo juntos una base sólida para el desarrollo integral de los niños.',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-sep.jpeg',
        date: '24 de septiembre, 2025',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Inarah Agueda',
            role: 'Educadora',
            href: '#',
        },
    },
    {
        id: 5,
        title: 'Crianza consciente: hijos seguros',
        href: '#',
        description:
            'Crianza consciente: hijos seguros con la especialista Melanie Centeno te brinda herramientas prácticas para criar con amor, conexión y límites sanos. Aprende a fortalecer el vínculo con tus hijos y guiarlos con seguridad emocional. ¡Cambia la forma en que crías, desde el corazón y la conciencia!',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-aug.jpeg',
        date: '26 de agosto, 2025',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Melanie Centeno',
            role: 'Especialista',
            href: '#',
        },
    },
    {
        id: 4,
        title: 'Técnicas de expresión creativa para promover la comunicación efectiva con mi hijo/a',
        href: '#',
        description:
            '¿Te gustaría fortalecer el lazo con tu hijo/a de una forma creativa y divertida? Este taller es para tí. Vamos a compartir ideas y actividades de arte súper prácticas que te ayudarán a mejorar la comunicación y a crear momentos especiales en familia.',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-jul.jpeg',
        date: '23 de julio, 2025',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Urania Dominguez',
            role: 'Art Therapist / Child Life Specialist',
            href: '#',
        },
    },
    {
        id: 3,
        title: 'Mi hijo no me entiende... ¿o soy yo?',
        href: '#',
        description:
            'Aprende a comunicarte mejor con tu hijo ajustando tu habla. Descubre cómo apoyar su desarrollo en el habla-lenguaje y el vínculo familiar, fortaleciendo tus herramientas de comunicación.',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-may.jpeg',
        date: '29 de mayo, 2025',
        datetime: '2020-02-12',
        category: { title: 'Business', href: '#' },
        author: {
            name: 'Bianca Rodríguez',
            role: 'Patóloga del Habla-Lenguaje y Alimentación',
            href: '#',
        },
    },
    {
        id: 2,
        title: 'La relación con la comida y su impacto en el desarrollo',
        href: '#',
        description:
            'Descubre cómo la alimentación influye en el crecimiento y bienestar en esta charla con la nutricionista Nicole Cruz, experta en trastornos alimentarios.',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-apr.jpeg',
        date: '28 de abril, 2025',
        datetime: '2020-03-10',
        category: { title: 'Sales', href: '#' },
        author: {
            name: 'Nicole Cruz',
            role: 'Nutricionista',
            href: '#',
        },
    },
    {
        id: 1,
        title: 'Crianza saludable',
        href: '#',
        description:
            'En este taller aprenderás herramientas prácticas para una crianza consciente desde la comodidad de tu hogar. ¡Un espacio dinámico y educativo para construir una comunidad sólida en la crianza de tus pequeños!',
        imageUrl:
            '/brilliant-brains/images/workshops/taller-mar.jpeg',
        date: '17 de marzo, 2025',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Natalia Rivera',
            role: 'Trabajadora Social de Desertores Escolares',
            href: '#',
        },
    },
]

export default function Workshops() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openLightbox = (imageURL: string) => {
    setSelectedImage(imageURL)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent text-center sm:text-6xl">Talleres de ABC Brilliant Brains</h2>
          {/* <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> */}
          <div className="mt-16 space-y-20 lg:mt-20">
            {posts.map((post) => (
              <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div 
                  className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => openLightbox(post.imageUrl)}
                >
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-contain"
                  />
                  <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                      {post.category.title}
                    </span>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="mt-5 text-sm/6 text-gray-600">{post.description}</p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                          {post.author.name}
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-50/95 via-white/95 to-blue-50/95 p-4 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-gray-800 text-4xl font-bold hover:text-gray-600 transition-colors z-10 cursor-pointer"
                onClick={closeLightbox}
              >
                &times;
              </button>
              <img 
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}