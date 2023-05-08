const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  nomcategorie: { type: String, required: true, unique: true },
  imagecategorie: { type: String, required: false }
});

categorieSchema.statics.findbynom = async function(nomcategorie) {
  const cat = await this.findOne({ nomcategorie: nomcategorie });
  return cat;
}

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
