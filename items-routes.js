const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./express-error');

router.get('/', (req, res) => {
  res.json(items);
})

router.post('/', (req, res, next) => {
  try {
    const name = req.body.name;
    const price = +req.body.price;
    if (isNaN(price)) {
      throw new ExpressError('Price must be a valid number without a dollar sign!', 400);
    }
    if (!name || !price) {
      throw new ExpressError(`Please include name and price information in your request!`, 400);
    }
    if (req.body.length > 2) {
      throw new ExpressError('Please only include name and/or price information your request. Please try again!', 400);
    }
    if (items.find((item) => item.name === name)) {
      throw new ExpressError(`${name} is already the name of an item in the database.`, 400);
    }
    items.push({name, price});
    res.status(201).json({added: items[items.length - 1]});
  }
  catch(err) {
    next(err);
  }
})

router.get('/:name', (req, res, next) => {
  try {
    const name = req.params.name;
    const item = items.find(item => item.name === name);
    if (!item) {
      throw new ExpressError(`Can't find item ${name}. Please try again!`, 400);
    }
    res.json(item);
  }
  catch(err) {
    next(err);
  }
})

router.patch('/:name', (req, res, next) => {
  try {
    const currentName = req.params.name;
    const indexOfItem = items.findIndex(item => item.name === currentName);
    if (indexOfItem === -1) {
      throw new ExpressError(`Can't find item ${currentName}. Please try again!`, 400);
    }
    const bodyObj = req.body;
    const arrayOfKeys = Object.keys(bodyObj);
    if (bodyObj.price && isNaN(+bodyObj.price)) {
      throw new ExpressError('Price must be a valid number without a dollar sign!', 400);
    }
    if (arrayOfKeys.length === 2 && !(arrayOfKeys.includes('name') && arrayOfKeys.includes('price'))) {
      throw new ExpressError('Please only include name and/or price information your request. Please try again!', 400);
    }
    if (arrayOfKeys.length === 1 && !(arrayOfKeys.includes('name') || arrayOfKeys.includes('price'))) {
      throw new ExpressError('Please only include name and/or price information in your request. Please try again!', 400);
    } 
    if (arrayOfKeys.length === 0) {
      throw new ExpressError('Please include name and/or price information in your request. Please try again!', 400);
    } 
    if (arrayOfKeys.length > 2) {
      throw new ExpressError('Please only include name and/or price information in your request. Please try again!', 400);
    } 
    for (const key in bodyObj) {
      items[indexOfItem][key] = bodyObj[key];
    }
    res.json({updated: items[indexOfItem]});
  }
  catch(err) {
    next(err);
  }
})

router.delete('/:name', (req, res, next) => {
  try {
    const name = req.params.name;
    const indexOfItem = items.findIndex(item => item.name === name);
    if (indexOfItem === -1) {
      throw new ExpressError(`Can't find item ${name}. Please try again!`, 400);
    }
    items.splice(indexOfItem, 1);
    res.json({message: 'Deleted'});
  }
  catch(err) {
    next(err);
  }
})

module.exports = router;