const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// DONE: GET ALL CATEGORIES
router.get('/', (req, res) => {
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
    }
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DONE: GET SINGLE CATEGORY BY `ID`
router.get('/:id', (req, res) => {
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Error: No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DONE: CREATE NEW CATEGORY
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DONE: UPDATE A CATEGORY BY `ID`
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Error: No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// DONE: DELETE A CATEGORY BY `ID`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;