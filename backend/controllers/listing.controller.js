import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        console.log('Create listing request received');
        console.log('Files:', req.files);
        console.log('Body:', req.body);
        console.log('User:', req.user);

        // Get image URLs from uploaded files (if any) - with full URL
        const imageUrls = req.files ? req.files.map(file => `http://localhost:3000/backend/uploads/listings/${file.filename}`) : [];
        console.log('Generated image URLs:', imageUrls);
        
        // Create listing with form data and image URLs
        const listingData = {
            ...req.body,
            imageUrls: imageUrls,
            userRef: req.user.id
        };

        console.log('Listing data to save:', listingData);

        const listing = await Listing.create(listingData);
        console.log('Listing created successfully:', listing._id);
        
        return res.status(201).json(listing);
    } catch (error) {
        console.error('Create listing error:', error);
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};


export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    // Get new image URLs from uploaded files (if any)
    const newImageUrls = req.files ? req.files.map(file => `/backend/uploads/listings/${file.filename}`) : [];
    
    // If new images are uploaded, use them; otherwise keep existing ones
    const imageUrls = newImageUrls.length > 0 ? newImageUrls : listing.imageUrls;
    
    const updatedData = {
      ...req.body,
      imageUrls: imageUrls
    };

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};