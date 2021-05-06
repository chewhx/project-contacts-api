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
  res.status(201).json({ success: true, data: contact });
});

// @desc      Put a new contact by id
// @route     PUT /api/v1/contacts/:id
// @access    Public
module.exports.put_ContactById = asyncHandler(async (req, res, next) => {
  let contact;
  // if there is an address update, execute geocoding
  if (req.body.address) {
    contact = await Contact.findById(req.params.id);
    if (!contact) throw Error;
    contact.address = req.body.address;
    delete req.body.address;
    contact.save();
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedContact) throw Error;
  res.status(201).json({ success: true, data: updatedContact });
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
