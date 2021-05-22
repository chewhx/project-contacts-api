const Contact = require("../models/Contact");
const Error = require("../utils/errorClass");
const asyncHandler = require("../middlewares/async");

// @desc      Get all contacts
// @route     GET /api/v1/contacts
// @access    Public
module.exports.get_AllContacts = asyncHandler(async (req, res, next) => {
  let queryString = Contact.find();

  // Handle select query ?select=name,telephone
  let selectArray;
  if (req.query.select) {
    selectArray = req.query.select.split(",");
    queryString = queryString.select(selectArray);
  }

  // Handle pagination
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Contact.countDocuments();
  const pages = Math.ceil(total / limit);
  queryString = queryString.limit(limit).skip(startIndex);

  // Handle sort query ?sort=-name
  if (req.query.sort) {
    queryString = queryString.sort(req.query.sort);
  } else {
    queryString = queryString.sort("-updatedAt");
  }

  // Pagination results
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  const contacts = await queryString;
  res.status(200).json({
    success: true,
    count: contacts.length,
    pages,
    pagination,
    data: contacts,
  });
});

// @desc      Get contact by id
// @route     GET /api/v1/contacts/:id
// @access    Public
module.exports.get_ContactById = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact)
    throw new Error(400, `Contact with id ${req.params.id} not found`);
  res.status(200).json({ success: true, data: contact });
});

// @desc      Create a new contact
// @route     POST /api/v1/contacts
// @access    Public
module.exports.post_Contact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body);
  if (req.body.activateGeocode) {
    await contact.geocode();
  }
  res.status(201).json({ success: true, data: contact });
});

// @desc      Put a new contact by id
// @route     PUT /api/v1/contacts/:id
// @access    Public
module.exports.put_ContactById = asyncHandler(async (req, res, next) => {
  // let contact;
  // // if there is an address update, execute geocoding
  // if (req.body.address) {
  //   contact = await Contact.findById(req.params.id);
  //   if (!contact) throw Error;
  //   contact.address = req.body.address;
  //   delete req.body.address;
  //   contact.save();
  // }
  // const updatedContact = await Contact.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );
  let foundContact = await Contact.findById(req.params.id);

  if (!foundContact) throw Error(`No contact found with id ${req.params.id}`);

  const { addressTouched, address } = req.body;
  console.log(req.body);
  console.log(foundContact);

  // If address from req.body and current address are different AND geocoding is activated
  let updatedContact;
  if (addressTouched && req.body.activateGeocode) {
    console.log("address difference");
    // delete address from req.body
    delete req.body.address;
    // update contact with the rest of req.body
    await foundContact.updateOne(req.body);
    // set new address
    foundContact.address = address;
    // initiate geocode on new address
    updatedContact = await foundContact.geocode();
  }

  // If address from req.body and current address is similar
  if (!addressTouched) {
    console.log("address same");
    // update current contact
    await foundContact.updateOne(req.body);
    await foundContact.save();
    // no geocoding
  }

  res.status(200).json({ success: true, data: foundContact || updatedContact });
});

// @desc      Delete a contact by id
// @route     DELETE /api/v1/contacts/:id
// @access    Public
module.exports.delete_ContactById = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw Error;
  contact.remove();
  res.status(200).json({ success: true, data: {} });
});
