const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
//Item Model
const Item = require('../../models/Item');

// @route GET api/item
// @desc Get all items
// @access Private
router.get('/api/items', (req, res) => {
  Item.find()
  .sort({date: -1})
  .then(items => res.json(items))
})

router.get('/api/items/:id', (req, res)=> {
  Item.findById(req.params.id)
  .then(item => res.json(item))
});

router.post('/api/items', auth, (req, res)=> {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
})

//PRive
router.delete('/api/items/:id', auth, (req, res)=> {
  Item.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({success: true})))
});

module.exports = router;