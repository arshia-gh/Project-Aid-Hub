import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER,
	port: process.env.EMAIL_PORT,
	secure: false,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const sendCredentials = async (user, receiver) => {
	return transporter.sendMail({
		from: `"Project Aid Hub" ${process.env.USERNAME}`, // sender address
		to: receiver, // list of receivers
		subject: 'Project Aid Hub - account credentials', // Subject line
		html: `Greetings,<br>
        We are happy to announce your account was successfully registered into our system.<br>
        <br>
        Please use the below credentials when accessing our system:<br>
        <strong>Username</strong>: ${user.username}<br>
        <strong>Password</strong>: ${user.password}<br>
        <br>
        Best Regards,<br>
        Project Aid Hub<br>

        <br><br>
        <i>This is an automatically generated email - please do not reply to it.<br>
        If you have any queries please contact us through your respective organization</i>
        `, // html body
	});
};

// send mail with defined transport object
