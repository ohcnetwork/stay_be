export const nestMailer = {
    transport: {
        secureConnection : false,
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: '465',
        auth: {
            user: process.env.SES_USER,
            pass: process.env.SES_PASS
        },
    },
};

export const jwtConstants = {
    secret: process.env.JWT
};
