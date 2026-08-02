import nodemailer from "nodemailer"

export default async function handler(req, res) {
    if (req.method != "POST") {
        return res.status(405).json({ error: "" })
    }

    const { nombre, email, telefono, asunto, mensaje } = req.body

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"ABC Brilliant Brains" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Nuevo asunto: ${asunto}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Asunto:</strong> ${asunto}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
        })

        return res.status(200).json({ success: true })
    
    } catch(error) {
        console.log(`Error submitting contact form ${error}`)
        return res.status(500).json({ error: "Email failed" })
    }
}