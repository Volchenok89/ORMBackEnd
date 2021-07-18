const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: Product
  });
  res.send(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    where: {
      id: req.params.id
    },
    include: Product
  });
  res.send(tags);
});

router.post('/', async (req, res) => {
  // create a new tag
  const tag = Tag.build(req.body);
  await tag.save();
  res.send(tag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      returning: true,
      where: {
        id: req.params.id
      }
    }
  );
  res.send(updatedTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const result = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(result + "");
});

module.exports = router;
