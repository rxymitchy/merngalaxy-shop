
const express = require('express');
const Order = require('../models/orderModel');

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order to paid
router.put('/:id/pay', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    // You can add payment result data here if needed

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order to paid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order to delivered
router.put('/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order to delivered:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
