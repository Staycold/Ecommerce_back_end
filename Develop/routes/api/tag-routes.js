const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
  const allTags = await Tag.findAll({
     include: [{model: Product, through:ProductTag}]});
     if(!allTags) {
      res.status(404).json({message: 'No Tag matches your search!'});
     
    }   
    res.status(200).json(allTags);    
  }catch (err) {
    res.status(500).json(err);
  }
     // include: [{model: Product}]});
    // {Product,{through: ProductTag}}
    // res.json(allTags)
});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tagData) {
      res.status(404).json({message: 'No Tag matches your search!'});
      
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      category_name: req.body.category_name,
      
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
