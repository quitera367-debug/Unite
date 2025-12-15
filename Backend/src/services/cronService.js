const cron = require('node-cron');
const emailjs = require('@emailjs/nodejs'); // Import EmailJS
const Room = require('../models/roomModel');
const User = require('../models/userModel'); // Import User Model (NEEDED to get email)

// initialize EmailJS credentials
const EMAIL_SERVICE_ID = process.env.EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.EMAIL_PUBLIC_KEY;
const EMAIL_PRIVATE_KEY = process.env.EMAIL_PRIVATE_KEY; // NEW: Add this to your .env

const startDailyPicker = () => {
  // Currently set to run every minute for testing
  cron.schedule('0 0 * * *', async () => {
    console.log('⏰ Running Daily Random Picker...');

    try {
      const rooms = await Room.find({ "members.0": { $exists: true } });
      // console.log(rooms);
      

      for (const room of rooms) {
        const memberList = room.members;
      // console.log(memberList);


        if (memberList && memberList.length > 0) {
          // 1. Pick Random User ID
          const randomIndex = Math.floor(Math.random() * memberList.length);
          const selectedUserId = memberList[randomIndex].member;

          // 2. FETCH USER DETAILS (Crucial Step)
          const user = await User.findById(selectedUserId);

          if (user) {
            // console.log(`Room ${room.uid}: Picked ${user.name} (${user.email})`);

            // 3. Update Room in DB
            await Room.updateOne(
              { _id: room._id }, 
              { 
                $set: { 
                  'taskComplete': false,
                  'todaysPick.user': selectedUserId,
                  'todaysPick.pickedAt': new Date()
                } 
              }
            );

            // 4. SEND EMAIL via EmailJS
            // try {
            //   const response = await emailjs.send(
            //     EMAIL_SERVICE_ID,
            //     EMAIL_TEMPLATE_ID,
            //     {
            //       name: user.name,      // Variable in your template
            //       email: user.email,        // Variable in your template
            //       title: room.uid,         // Variable in your template
            //       message: "It's your turn to upload a vlog today!",
            //     },
            //     {
            //       publicKey: EMAIL_PUBLIC_KEY,
            //       privateKey: EMAIL_PRIVATE_KEY, // Required for Backend
            //     }
            //   );
            //   console.log('Email sent successfully!', response.status, response.text);
            // } catch (emailError) {
            //   console.error('Failed to send email:', emailError);
            // }
          }
        }
      }
      console.log('Daily picks and emails completed.');

    } catch (error) {
      console.error(' Error in daily picker:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
};

module.exports = startDailyPicker;