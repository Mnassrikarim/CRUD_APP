const auth = require( "../middleware/auth.js"); 
const express = require('express');
const router = express.Router();
const Categorie = require("../models/categorie")

// afficher la liste des categories.
router.get('/',auth, async (req, res) => {
  try {
    const categories = await Categorie.find().populate("nomcategorie");;
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// créer un nouvelle catégorie
router.post('/', async (req, res) => { console.log(req.body)
  const { nomcategorie, imagecategorie} = req.body;
  const newCategorie = new Categorie({nomcategorie:nomcategorie,
  imagecategorie:imagecategorie})
  try {
  await newCategorie.save();
  res.status(200).json(newCategorie );
  } catch (error) {
    res.status(404).json({ message: error.message });
}
});
    //chercher une catégorie by id
 router.get('/:categorieId',async(req, res)=>{
  try {
  const cat = await Categorie.findById(req.params.categorieId);
 
  res.status(200).json(cat);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
 }); 
//chercher une catégorie by nom
router.get('/by-name/:nomcategorie', async (req, res) => {
  try {
    const cat = await Categorie.findOne({ nomcategorie: req.params.nomcategorie });
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

 

// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
  const { nomcategorie, imagecategorie} = req.body;
  const id = req.params.categorieId;
  try {
 
  const cat1 = {
 nomcategorie:nomcategorie,imagecategorie:imagecategorie, _id:id };
 console.log(cat1)
  await Categorie.findByIdAndUpdate(id, cat1);
  res.json(cat1);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
 }); 

// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
  const id = req.params.categorieId;
  await Categorie.findByIdAndDelete(id);
 11
  res.json({ message: "categorie deleted successfully." });
 }); 

module.exports = router;
