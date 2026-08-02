import nodemailer from "nodemailer"

export default async function handler(req, res) {
    if (req.method != "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { name, email, phone, service, grade, message } = req.body; // var names may have to be changed to spanish. corroborate with frontend

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: `"ABC Brilliant Brains" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Nueva solicitud de servicio: ${service}`,
            html: `
                <h2>Nueva Solicitud de Servicio</h2>
                <p><strong>Servicio:</strong> ${service}</p>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Nivel/Grado:</strong> ${grade}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            `
        })

        return res.status(200).json({ success: true })
    
    } catch(error) {
        console.log(`Error submitting service request: ${error}`)
        return res.status(500).json({ error: "Error submitting service request" })
    }
}