const express = require('express');
const path = require('path');
const getOrders = require('../orders.get');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { User, Cart } = require('../models');
const { verifyToken } = require('../jwt');

const admin = express.Router();

function getTotal() {
  return Cart.aggregate([
    {
      $lookup: {
        from: 'orders',
        let: { orderIds: '$orderIds' },
        as: 'cartCount',
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$_id', '$$orderIds'] },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: '$count' },
            },
          },
        ],
      },
    },
    { $unwind: { path: '$cartCount', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: null,
        totalCount: { $sum: '$cartCount.count' },
        totalPrice: { $sum: '$price' },
      },
    },
  ]).then((query) => query[0]);
}

function getCarts() {
  return Cart.aggregate([
    {
      $lookup: {
        from: 'orders',
        let: { orderIds: '$orderIds' },
        as: 'lastUpdateAggregate',
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $in: ['$_id', '$$orderIds'] }],
              },
            },
          },
          {
            $group: {
              _id: null,
              lastOrderDate: { $max: '$time' },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { userId: '$userId' },
        as: 'user',
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$userId', '$_id'],
              },
            },
          },
        ],
      },
    },
    { $unwind: { path: '$lastUpdateAggregate', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        lastUpdate: '$lastUpdateAggregate.lastOrderDate',
        username: '$user.email',
      },
    },
    { $project: { lastUpdateAggregate: 0, user: 0 } },
  ]);
}

admin.get('/', (request, response) => {
  const { token } = request.cookies;
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isActive || !decoded.isAdmin) {
    return response.sendStatus(403);
  }
  return getTotal().then((result) => response.json(result));
});

admin.get('/users', (request, response) => {
  const { token } = request.cookies;
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isActive || !decoded.isAdmin) {
    return response.sendStatus(403);
  }
  return User.find({ _id: { $ne: decoded._id } }, { password: 0 }).then((result) =>
    response.json(result)
  );
});

admin.get('/carts', (request, response) => {
  const { token } = request.cookies;
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isActive || !decoded.isAdmin) {
    return response.sendStatus(403);
  }
  return getCarts().then((result) => response.json(result));
});

admin.get('/carts/:id', (request, response) => {
  const { token } = request.cookies;
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isActive || !decoded.isAdmin) {
    return response.sendStatus(403);
  }
  return getOrders(request.params.id).then((result) => response.json(result));
});

admin.patch('/users', (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }
  const { token } = request.cookies;
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isActive || !decoded.isAdmin) {
    return response.sendStatus(403);
  }
  return Promise.allSettled(
    request.body.changes
      // forbade admin to change himself to prevent paradoxes
      // (for example when no one is admin and admin dashboard never can be used)
      .filter((elem) => elem._id !== decoded._id)
      .map((elem) =>
        User.updateOne({ _id: elem._id }, { isActive: elem.isActive, isAdmin: elem.isAdmin })
      )
  ).then(() =>
    User.find({ _id: { $ne: decoded._id } }, { password: 0 }).then((result) =>
      response.json(result)
    )
  );
});

module.exports = admin;
