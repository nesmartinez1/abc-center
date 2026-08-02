import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import styles from './css/contact.module.css';

type ContactForm = {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

const emptyForm: ContactForm = { nombre: '', email: '', telefono: '', asunto: '', mensaje: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('enviando');

    try {
      // make POST request to serverless function
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // tells server we are sending JSON
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      console.log(`response from server: ${JSON.stringify(data)}`)

      if (response.ok) {
        setStatus('enviado')
        setForm(emptyForm)
      } else {
        setStatus('Error')
        console.error(`Error: ${data.error}`)
      }

    } catch (error) {
      setStatus('Error')
      console.error(`Error: ${error}`)
    }
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Decorative shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-10 w-28 h-28 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-24 w-24 h-24 bg-blue-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-40 left-24 w-32 h-32 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-16 right-10 w-20 h-20 bg-red-300 rounded-full opacity-25"></div>
      </div>

      {/* Hero cover (image via CSS module) */}
      <div className={styles.custom}>
        <h1 className={styles.title}>Contáctenos</h1>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Estamos aquí para ayudarte
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-medium">
            ¿Tienes preguntas sobre nuestras tutorías, programas grupales o actividades? Escríbenos y te responderemos muy pronto.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-400 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                    <input
                      required
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="w-full rounded-s border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-s border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                    <input
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      className="w-full rounded-s border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="555-123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto *</label>
                    <input
                      required
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      className="w-full rounded-s border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Tema"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                  <textarea
                    required
                    rows={6}
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    className="w-full rounded-s border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'enviando'}
                    className="rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'enviando' ? 'Enviando...' : status === 'enviado' ? '¡Enviado!' : 'Enviar Mensaje'}
                  </button>
                  {status === 'enviado' && (
                    <span className="text-sm font-semibold text-green-600">Gracias, te contactaremos pronto.</span>
                  )}
                </div>
              </form>
            </div>

          {/* Info / cards */}
          <div className="space-y-8"> 
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-red-400">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <EnvelopeIcon className="h-6 w-6 text-red-500" /> Escríbenos
              </h3>
              <p className="text-gray-600 font-medium">abcbrilliantbrains@gmail.com</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-yellow-400">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-yellow-500" /> Llámanos
              </h3>
              <p className="text-gray-600 font-medium">939-493-3430</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// todo
// add padding for input boxes. text is tightly fit to the left