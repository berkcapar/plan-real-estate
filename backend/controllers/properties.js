const propertiesRouter = require("express").Router();
const Properties = require("../models/properties");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { uuid } = require("uuidv4");
const airportService = require("../services/airport");
const locationService = require("../services/location");

const DIR = "./public";

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, DIR);
  },
  filename: (request, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + filename);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

// helper for filtering out empty keys
// obj                  => { option: 'For Sale', city: '' }
// Object.entries(obj)  => [ ['option', 'For Sale'], ['city', ''] ]
const filterEmptyKeys = (obj) => {
  // yeni bir obje olusturuyoruz
  const result = {};

  // objenin [key-value] pairlari uzerinde for ile gezip
  Object.entries(obj).forEach(([key, value]) => {
    // eger value FALSY bir seyse yeni objeye eklemiyoruz
    if (!!value) {
      result[key] = value;
    }
  });

  return result;
};

// [GET] properties
propertiesRouter.get("/", async (request, response) => {
  const properties = await Properties.find();

  response.json({
    properties: properties.map((property) => ({
      ...property.toJSON(),
      location: locationService.getLocationForCity(property.city),
    })),
  });
});

// [GET] properties/search
propertiesRouter.get("/search", async (request, response) => {
  const { minpriceoption, maxpriceoption, ...exactParams } = filterEmptyKeys(
    request.query || {}
  );

  const query = { ...exactParams };

  if (minpriceoption) {
    query.price = query.price || {};
    query.price = { ...query.price, $gte: parseInt(minpriceoption, 10) };
  }

  if (maxpriceoption) {
    query.price = query.price || {};
    query.price = { ...query.price, $lte: parseInt(maxpriceoption, 10) };
  }

  const filteredProperties = await Properties.find(query);
  console.log(query);

  response.json({
    properties: filteredProperties.map((p) => ({
      ...p.toJSON(),
      location: locationService.getLocationForCity(property.city),
    })),
  });
});

propertiesRouter.get("/cities", async (_, response) => {
  const properties = await Properties.find();

  response.json({
    cities: properties.map((property) => property.city),
  });
});

// [POST] properties
propertiesRouter.post(
  "/",
  upload.array("photos"),
  async (request, response) => {
    const url = request.protocol + "://" + request.get("host");
    const body = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const admin = await Admin.findById(decodedToken.id);

    const property = new Properties({
      option: body.option,
      propertyType: body.propertyType,
      title: body.title,
      city: body.city,
      adres: body.adres,
      price: body.price,
      m2: body.m2,
      liveablem2: body.liveablem2,
      roomnumber: body.roomnumber,
      livingroomnumber: body.livingroomnumber,
      bathnumber: body.bathnumber,
      year: body.year,
      detailed: body.detailed,
      photos: request.files.map((file) => url + "/public/" + file.filename),
      admin: admin._id,
    });

    const savedProperty = await property.save();
    admin.properties = admin.properties.concat(savedProperty._id);
    await admin.save();

    response.json({
      property: savedProperty.toJSON(),
    }); // burdaki return, dispatch'le aynı olmalı
  }
);

// [GET] properties/:propertyId
// missing

// [DELETE] properties/:propertyId
propertiesRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const admin = await Admin.findById(decodedToken.id);
  const property = await Properties.findById(request.params.id);
  await property.remove();
  admin.properties = admin.properties.filter(
    (property) => property.id.toString() !== request.params.id.toString()
  );
  await admin.save();
  // https://httpstatuses.com/204
  response.status(204).json({ success: "delete successful" }).end(); // success mesajı neden postmande görünmüyor && sona end() koymanın ne faydası var.
});

// [GET] properties/:propertyId/airports
// --> find property from database by its ID (respond with 404 if property is not present in DB)
// --> get the location data of the property by its city, using the location service
// --> search airports for location (lng, lat), using the airportService
// --> respond with JSON -> { airports: [] }
propertiesRouter.get("/:id/airports", async (request, response) => {
  try {
    const property = await Properties.findById(request.params.id);

    if (!property) {
      return response.status(404).json({ error: "Property not found" });
    }

    const location = locationService.getLocationForCity(property.city);
    const airports = await airportService.fetchClosestAirports(location);

    response.send({ airports });
  } catch (error) {
    response.status(500).send({ message: "An error occurred", details: error });
  }
});

module.exports = propertiesRouter;
