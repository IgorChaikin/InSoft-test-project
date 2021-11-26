const { Types } = require('mongoose');
const { Order } = require('./models');

const { ObjectId } = Types;

const getOrderWithPrice = (orderId) => {
  return Order.aggregate([
    { $match: { $expr: { $eq: ['$_id', ObjectId(orderId)] } } },
    {
      $lookup: {
        from: 'items',
        localField: 'itemId',
        foreignField: '_id',
        as: 'item',
      },
    },
    { $unwind: { path: '$item', preserveNullAndEmptyArrays: true } },
  ]).then((query) => query[0]);
};

const withAddressTemplate = [
  {
    $lookup: {
      from: 'addresses',
      foreignField: '_id',
      localField: 'addressId',
      as: 'address',
    },
  },
  { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
];

const withCityAndStreetTemplate = [
  {
    $lookup: {
      from: 'cities',
      localField: 'address.cityId',
      foreignField: '_id',
      as: 'address.city',
    },
  },
  {
    $lookup: {
      from: 'streets',
      localField: 'address.streetId',
      foreignField: '_id',
      as: 'address.street',
    },
  },
  { $unwind: { path: '$address.city', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$address.street', preserveNullAndEmptyArrays: true } },
];

const withItemAndSortTemplate = [
  {
    $lookup: {
      from: 'items',
      localField: 'itemId',
      foreignField: '_id',
      as: 'item',
    },
  },
  { $unwind: { path: '$item', preserveNullAndEmptyArrays: true } },
  { $sort: { time: -1 } },
];

const secureCardTemplate = [
  {
    $addFields: {
      secureNumber: { $concat: ['****-****-****-', { $substr: ['$number', 12, -1] }] },
    },
  },
  { $project: { number: 0, name: 0, date: 0, cvv: 0, userId: 0 } },
];

module.exports = {
  getOrderWithPrice,
  withAddressTemplate,
  withCityAndStreetTemplate,
  withItemAndSortTemplate,
  secureCardTemplate,
};
