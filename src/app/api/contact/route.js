import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, message } = req.body;

    if (!name || !email) {
      return Response.json(
        { error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to yourself
      replyTo: email,
      subject: `New Contact — ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
