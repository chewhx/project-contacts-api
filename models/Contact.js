const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const contactSchema = new mongoose.Schema(
  {
    salutation: {
      type: String,
      enum: ["Mr", "Ms", "Mrs", "Mdm", "Prof", "Dr", "Sir", "Mx", "Ind"],
    },
    name: {
      firstName: String,
      lastName: String,
      alias: String,
    },
    organisation: String,
    position: String,
    address: String,
    activateGeocode: { type: Boolean, required: true, default: false },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
    contact: {
      telephone: {
        type: String,
        maxLength: [20, "Telephone can not be longer than 20 characters"],
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      mobile: {
        type: String,
        maxLength: [20, "Mobile can not be longer than 20 characters"],
      },
    },
    notes: String,
  },
  { timestamps: true }
);

// Geocode location from address
// contactSchema.pre("save", async function (next) {
//   // execute geocoding
//   const res = await geocoder.geocode(this.address);
//   // destructure results for required variables - results returned in an array of object, so get the first object res[0]
//   const {
//     longitude,
//     latitude,
//     formattedAddress,
//     streetName: street,
//     city,
//     zipcode,
//     country,
//   } = res[0];
//   // set this.address to undefined, so it will not be saved to db
//   console.log(`Google geocoding ran`.red);
//   this.address = undefined;
//   // save geocoding info as location in db
//   this.location = {
//     longitude,
//     latitude,
//     formattedAddress,
//     street,
//     city,
//     zipcode,
//     country,
//   };
//   next();
// });

contactSchema.methods.geocode = async function () {
  // return if the address is not modified
  console.log("this.isModified(address)", this.isModified("address"));
  console.log("this.isNew ", this.isNew);
  if (this.isNew || this.isModified("address")) {
    // execute geocoding
    const res = await geocoder.geocode(this.address);
    // destructure results for required variables - results returned in an array of object, so get the first object res[0]
    const {
      longitude,
      latitude,
      formattedAddress,
      streetName: street,
      city,
      zipcode,
      country,
    } = res[0];
    // set this.address to undefined, so it will not be saved to db
    console.log(`Google geocoding ran`.red);
    this.address = undefined;
    // save geocoding info as location in db
    this.location = {
      longitude,
      latitude,
      formattedAddress,
      street,
      city,
      zipcode,
      country,
    };
    this.save();
    return this;
  }
};

module.exports = new mongoose.model("contact", contactSchema);
