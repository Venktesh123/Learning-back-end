const nodemailer=require('../config/nodemailer');
//this is a another way exporting a method
exports.newComment=(comment) =>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log('inside newcomment mailer');
    nodemailer.transporter.sendMail({
        from:'8303531530venktesh@gmail.com',
        to: comment.user.email,
        subject:'New Comment Published !',
        html:htmlString
    },(err,info) =>{
        if(err)
        {
            console.log('Error in sending email',err);
            return;
        }
        console.log('Message sent',info);
        return;
    

     } );

}
