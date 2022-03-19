import express from 'express';
import Category from '../models/categoryModel.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find().sort(
    { name: 1 }
  );
  console.log(categories)
  res.send(categories);
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  if (category) {
    category.name = req.body.name;
    category.description = req.body.description;
    const updatedCategory = await category.save();
    if (updatedCategory) {
      return res
        .status(200)
        .send({ message: 'Category Updated', data: updatedCategory });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Category.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedCategory = await Category.findById(req.params.id);
  if (deletedCategory) {
    await deletedCategory.remove();
    res.send({ message: 'Category Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  const newCategory = await category.save();
  if (newCategory) {
    return res
      .status(201)
      .send({ message: 'New Category Created', data: newCategory });
  }
  return res.status(500).send({ message: ' Error in Creating Category.' });
});

export default router;
