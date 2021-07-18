const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: Product
  });
  res.send(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Category.findAll({
    where: {
      id: req.params.id
    },
    include: Product
  });
  res.send(categories);
});

router.post('/', async (req, res) => {
  // create a new category
  const category = Category.build(req.body);
  await category.save();
  res.send(category);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      returning: true,
      where: {
        id: req.params.id
      }
    }
  );
  res.send(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const result = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(result + "");
});

module.exports = router;
