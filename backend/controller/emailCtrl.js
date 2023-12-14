const nodemailer = require('nodemailer');
const asynsHandler = require('express-async-handler');


const sendEmail = asynsHandler(async(data, req, res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MP,
        },
        
      });
      
      async function main() {
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"Hey 👻" <abc@gmail.com>`, // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    }
});

module.exports = sendEmail;


// const nodemailer = require('nodemailer');
// const asynsHandler = require('express-async-handler');

// const sendEmail = asynsHandler(async (data, req, res) => {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: false,
//         auth: {
//             user: process.env.MAIL_ID,
//             pass: process.env.MP,
//         },
//     });

//     async function main() {
//       try {
//           // send mail with defined transport object
//           let info = await transporter.sendMail({
//               from: '"Hey 👻" <abc@gmail.com>', // sender address
//               to: data.to, // list of receivers
//               subject: data.subject, // Subject line
//               text: data.text, // plain text body
//               html: data.htm, // html body
//           });
  
//           console.log("Message sent: %s", info.messageId);
//           console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//       } catch (error) {
//           console.error("Error sending email:", error); // Log the error
//           // Handle the error or perform any necessary actions
//       }
//   }  

//     // Call the main function to send the email
//     await main();
// });

// module.exports = sendEmail;