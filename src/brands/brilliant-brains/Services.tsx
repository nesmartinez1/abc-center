import { useState } from 'react';
import type { ComponentType, FormEvent, SVGProps } from 'react';
import styles from './css/services.module.css'
import { AcademicCapIcon, UserGroupIcon, HomeIcon, SparklesIcon } from '@heroicons/react/24/outline';

/** A card entry. Academic offerings use `course`, after-school ones `activity`. */
type ServiceItem = {
    course?: string;
    activity?: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    link: string;
    description: string;
};

const courses: ServiceItem[] = [
    { course: "Inglés", icon: AcademicCapIcon, link: "link", description: "Aprende inglés de manera divertida y efectiva con métodos interactivos adaptados a tu nivel." },
    { course: "Español", icon: AcademicCapIcon, link: "link", description: "Fortalece tus habilidades en español con clases personalizadas de gramática, lectura y escritura." },
    { course: "Matemáticas", icon: AcademicCapIcon, link: "link", description: "Domina las matemáticas desde conceptos básicos hasta temas avanzados con explicaciones claras." },
    { course: "Ciencias", icon: AcademicCapIcon, link: "link", description: "Descubre el mundo de las ciencias con experimentos virtuales y explicaciones fascinantes." },
    { course: "Asistencia Asignaciones", icon: AcademicCapIcon, link: "link", description: "Completando cada tarea que se le envía para que cuando llegue al hogar sea tiempo en familia." },
    { course: "Preparación de Exámenes", icon: AcademicCapIcon, link: "link", description: "Prepárate para tus exámenes más importantes con estrategias y práctica intensiva." },
]

const programaGrupal: ServiceItem[] = [
    { course: "Matemáticas Grupales", icon: UserGroupIcon, link: "link", description: "Clases grupales de matemáticas para estudiantes del mismo nivel, fomentando el aprendizaje colaborativo." },
    { course: "Inglés Conversacional", icon: UserGroupIcon, link: "link", description: "Practica inglés en grupos pequeños con actividades interactivas y conversaciones dinámicas." },
    { course: "Club de Lectura", icon: UserGroupIcon, link: "link", description: "Desarrolla el amor por la lectura compartiendo libros y discusiones en grupo." },
]

const homeschooling: ServiceItem[] = [
    { course: "Servicios K-6to", icon: HomeIcon, link: "link", description: "Currículo estructurado en todas las materias, con guías, actividades y evaluaciones." },
    { course: "Planificación y Diseño de Currículo Personalizado", icon: HomeIcon, link: "link", description: "Planes adaptados a los intereses, metas y ritmo de aprendizaje de cada estudiante." },
    { course: "Homeschooling por Materias", icon: HomeIcon, link: "link", description: "Opciones de inscripción solo en áreas específicas (ej. Matemáticas, Lectura, Ciencias)." },
    { course: "Evaluaciones y Progreso Académico", icon: HomeIcon, link: "link", description: "Pruebas, rúbricas y reportes para que los padres tengan evidencia del avance de sus hijos." },
    { course: "Acompañamiento para Padres", icon: HomeIcon, link: "link", description: "Orientación, talleres y recursos para que los padres se sientan seguros llevando la educación en casa." },
    { course: "Portafolio Escolar y Documentación", icon: HomeIcon, link: "link", description: "Apoyo en la creación de portafolios académicos para cumplir con requisitos educativos." },
]

type ServiceRequestForm = {
    name: string;
    email: string;
    phone: string;
    grade: string;
    message: string;
};

const afterSchool: ServiceItem[] = [
    { activity: "Dibujo y Arte", icon: SparklesIcon, link: "link", description: "Desarrolla tu creatividad con técnicas de dibujo, pintura y expresión artística." },
    { activity: "Idiomas Adicionales", icon: SparklesIcon, link: "link", description: "Aprende francés, alemán u otros idiomas con métodos divertidos y efectivos." },
    { activity: "Book Club", icon: SparklesIcon, link: "link", description: "Únete a nuestro club de lectura para estudiantes de 3º a 5º grado." },
    { activity: "Club de Ciencia", icon: SparklesIcon, link: "link", description: "Experimenta y descubre el mundo científico con actividades hands-on virtuales." },
    { activity: "Talleres de Escritura Creativa", icon: SparklesIcon, link: "link", description: "Desarrolla tus habilidades de escritura y creatividad con proyectos emocionantes." },
    { activity: "Talleres de Finanzas", icon: SparklesIcon, link: "link", description: "Introducción al manejo de dinero para niños. Así creando conciencia sobre su importancia." }, // emprendimiento
    // { activity: "Coding para Niños", icon: SparklesIcon, link: "link", description: "Introducción a la programación con juegos y proyectos adaptados para jóvenes." },
]

const colorStyles = {
    blue:   { border: 'border-blue-400',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   btnFrom: 'from-blue-500',   btnTo: 'to-blue-600',   btnHoverFrom: 'hover:from-blue-600',   btnHoverTo: 'hover:to-blue-700' },
    red:    { border: 'border-red-400',    iconBg: 'bg-red-100',    iconColor: 'text-red-600',    btnFrom: 'from-red-500',    btnTo: 'to-red-600',    btnHoverFrom: 'hover:from-red-600',    btnHoverTo: 'hover:to-red-700' },
    yellow: { border: 'border-yellow-400', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', btnFrom: 'from-yellow-500', btnTo: 'to-yellow-600', btnHoverFrom: 'hover:from-yellow-600', btnHoverTo: 'hover:to-yellow-700' },
    purple: { border: 'border-purple-400', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', btnFrom: 'from-purple-500', btnTo: 'to-purple-600', btnHoverFrom: 'hover:from-purple-600', btnHoverTo: 'hover:to-purple-700' },
};

type ServiceColor = keyof typeof colorStyles;

/**
 * ServiceCard and ServiceRequestModal were nested inside Services() in the
 * standalone site. That re-creates them on every render, so React tears down
 * and rebuilds the subtree — which for the modal meant its form state was
 * discarded whenever Services re-rendered. They are hoisted to module scope
 * here (the state they touched is now passed in as props); the markup is
 * unchanged.
 */
function ServiceCard({ item, color, onRequest }: { item: ServiceItem; color: ServiceColor; onRequest: (service: string) => void }) {
        const cfg = colorStyles[color]
        const Icon = item.icon
        return (
            <div className={`bg-white p-6 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-t-4 ${cfg.border} hover:shadow-2xl`}>
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${cfg.iconBg} shadow-lg mb-4`}>
                    <Icon className={`h-8 w-8 ${cfg.iconColor}`} />
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>{item.course || item.activity}</h3>
                <p className='text-sm text-gray-600 font-medium mb-6 leading-relaxed'>{item.description}</p>
                <button
                    onClick={() => onRequest(item.course ?? item.activity ?? '')}
                    className={`w-full rounded-full bg-gradient-to-r ${cfg.btnFrom} ${cfg.btnTo} px-6 py-3 text-sm font-bold text-white shadow-lg ${cfg.btnHoverFrom} ${cfg.btnHoverTo} transform hover:scale-105 transition-all duration-200 cursor-pointer`}
                >
                    Solicitar Servicio
                </button>
            </div>
        );
}

function ServiceRequestModal({ selectedService, onClose }: { selectedService: string; onClose: () => void }) {
        // state for form fields
        const [form, setForm] = useState<ServiceRequestForm>({
            name: '',
            email: '',
            phone: '',
            grade: '',
            message: ''
        })

        // state for submission status
        const [status, setStatus] = useState<string | null>(null)

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setStatus("Sent")

            try {
                const response = await fetch('/api/service-request', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    // include the selected service as part of the form fields to send
                    body: JSON.stringify({ ...form, service: selectedService })
                })

                if (response.ok) {
                    setStatus('Sent')
                    // auto close modal
                    setTimeout(() => {
                        onClose()
                        setStatus(null)
                        setForm({ name: '', email: '', phone: '', grade: '', message: '' })
                    }, 2000)
                } else {
                    setStatus('error')
                } 
            } catch (error) {
                setStatus('error')
                console.error(`Error with service request: ${error}`)
            }
        }

        return (
            <div className="fixed inset-0 bg-gradient-to-br from-yellow-50/80 via-white/80 to-blue-50/80 backdrop-blur-md flex items-center justify-center z-50">
                {/* Modal content box */}
                <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">
                        Solicitar: {selectedService}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name field - required */}
                        <input 
                            required
                            placeholder="Nombre *"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg border p-3" 
                        />

                        {/* Email field - requried */}
                        <input
                            required
                            type="email"
                            placeholder='Email *'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-lg border p-3"
                        />

                        {/* Phone field - optional */}
                        <input 
                            placeholder='Teléfono'
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-lg border p-3"
                        />

                        {/* Grade level field - optional */}
                        <input 
                            placeholder='Nivel/Grado del estudiante'
                            value={form.grade}
                            onChange={(e) => setForm({ ...form, grade: e.target.value })}
                            className="w-full rounded-lg border p-3"
                        />

                        {/* Message field - optional */}
                        {/* NOTE: carried over from the standalone site, this was
                            written as an <input> with rows={4}. Browsers ignore
                            `rows` on an input, so it has always rendered as a
                            single line; the attribute is dropped here because TS
                            rejects it. Switching to a <textarea> would change the
                            layout, so that's left as a content decision. */}
                        <input
                            placeholder='Mensaje adicional'
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {/* Action buttons */}
                        <div className='flex gap-4'>
                            {/* Submit button */}
                            <button
                                type='submit'
                                disabled={status === 'Sent'}
                                className='flex-1 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50 cursor-pointer'
                            >
                                {status === "Sent" ? "Enviando..." : status === "Sent" ? "¡Enviado!" : "Enviar"}
                            </button>

                            {/* Cancel button */}
                            <button
                                type='button'
                                onClick={onClose}
                                className='px-6 py-3 border rounded-full font-bold hover:bg-gray-100 cursor-pointer'
                            >
                                Cancelar
                            </button>
                        </div>

                        {/* Error message */}
                        {status === 'error' && (
                            <p className='ext-red-600 text-sm text-center'>
                                Error al enviar. Por favor intenta de nuevo.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        )
}

export default function Services() {
    const [showModal, setShowModal] = useState(false)
    const [selectedService, setSelectedService] = useState('')

    const handleRequest = (service: string) => {
        setSelectedService(service)
        setShowModal(true)
    }

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-0">
            <div className={styles.custom}>
                <h1 className={styles.title}>Nuestros Servicios Educativos</h1>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-2">
                {/* Main Header */}
                <div className='text-center mb-16'>
                </div>

                {/* Tutorías Individualizadas */}
                <div className="mb-20">
                    <div className='text-center mb-12 flex flex-col items-center' id='tutorias-individualizadas'>
                        <AcademicCapIcon className="h-10 w-10 text-blue-500 mb-2" />
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent'>
                            Tutorías Individualizadas
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {courses.map((item, index) => (
                            <ServiceCard key={index} item={item} color="blue" onRequest={handleRequest} />
                        ))}
                    </div>
                </div>

                {/* Programa Grupal */}
                <div className="mb-20">
                    <div className='text-center mb-12 flex flex-col items-center' id='programa-grupal'>
                        <UserGroupIcon className="h-10 w-10 text-red-500 mb-2" />
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent'>
                            Programa Grupal
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {programaGrupal.map((item, index) => (
                            <ServiceCard key={index} item={item} color="red" onRequest={handleRequest} />
                        ))}
                    </div>
                </div>

                {/* Homeschooling */}
                <div className="mb-20">
                    <div className='text-center mb-12 flex flex-col items-center' id='asistencia-homeschooling'>
                        <HomeIcon className="h-10 w-10 text-yellow-500 mb-2" />
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent'>
                            Asistencia Homeschooling
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {homeschooling.map((item, index) => (
                            <ServiceCard key={index} item={item} color="yellow" onRequest={handleRequest} />
                        ))}
                    </div>
                </div>

                {/* Extracurriculares */}
                <div className="mb-12">
                    <div className='text-center mb-12 flex flex-col items-center' id='extracurriculares'>
                        <SparklesIcon className="h-10 w-10 text-purple-500 mb-2" />
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent'>
                            Actividades Extracurriculares
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {afterSchool.map((item, index) => (
                            <ServiceCard key={index} item={item} color="purple" onRequest={handleRequest} />
                        ))}
                    </div>
                </div>
            </div>
            {showModal && <ServiceRequestModal selectedService={selectedService} onClose={() => setShowModal(false)} />}
        </div>
    )
}