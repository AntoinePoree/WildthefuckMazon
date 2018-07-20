import * as mongoose from 'mongoose';

const addProduitSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  description: String,
});

const addProduitModel = mongoose.model('addProduit', addProduitSchema);

export default addProduitModel;
