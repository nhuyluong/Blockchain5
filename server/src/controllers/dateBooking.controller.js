const dateBookingModel = require("../models/dateBooking.model");

//get all user list
exports.getDateBookingList = (req, res) => {
  // console.log('here all user list');
  dateBookingModel.getAllBooking((err, realEstate) => {
    console.log("Date Booking are here");
    if (err) res.send(err);
    console.log("Booking: ", realEstate);
    res.send(realEstate);
  });
};

// get realestate
exports.getDateBookingByID = (req, res) => {
  // console.log('get user by id');
  dateBookingModel.getBookingTableByID(req.params.id, (err, realEstate) => {
    if (err) res.send(err);
    console.log("Single booking data: ", realEstate);
    res.send(realEstate);
  });
};

//create new user
exports.createNewDateBooking = (req, res) => {
  const dateBoookingReqData = new dateBookingModel(req.body);
  console.log("dateBoookingReqData ", dateBoookingReqData);
  //check null
  if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    dateBookingModel.createBookingTable(
      dateBoookingReqData,
      (err, realEstate) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "DateBooking Created Successfully",
          data: realEstate.insertId,
        });
      }
    );
  }
};

//update realestate
// exports.updateRealEstate = (req, res) => {
//     const realEstateReqData = new RealEstateModel(req.body);
//     console.log('realestateReqData update', realEstateReqData);
//     //check null
//     if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
//         res.send(400).send({ success: false, message: 'Please fill all fields' });
//     } else {
//         RealEstateModel.updateRealEstate(req.params.id, realEstateReqData, (err, realEstate) => {
//             if (err)
//                 res.send(err);
//             res.json({ status: true, message: 'RealEstate updated Successfully' })

//         })
//     }
// }
// //delete user
// exports.deleteRealEstate = (req, res) => {
//     RealEstateModel.deleteRealEstate(req.params.id, (err, realEstate) => {
//         if (err)
//         res.send(err);
//         res.json({success:true, message:'RealEstate deleted successfully!'});
//     })
// }
