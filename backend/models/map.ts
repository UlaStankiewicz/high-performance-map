import { model, Schema } from 'mongoose';

const schema = new Schema({
  address: {
    type: String,
    required: true,
  },
  cords: {
    lat: Number,
    lng: Number,
  },
  direction: {
    type: String,
    required: true,
  },
  flag: [
    {
      type: String,
      required: true,
    },
  ],
});

export default model('Map', schema);
