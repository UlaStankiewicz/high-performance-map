const HttpError = require('../models/http-error');
import Map from '../models/map';
import getCoordsForAddress from '../utils/getCoordsForAddress';


export const getPoints = async (
  _req: any,
  res: any,
  next: (arg0: any) => any
) => {
  let points;
  try {
    points = await Map.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching points failed, please try again later.',
      500
    );
    return next(error);
  }
  if (points.length === 0) {
    const error = new HttpError('No data found, please try again later.');
    return next(error);
  }

  res.json({ points });
};

export const addPoint = async (req: any, res:any , next: (arg0: any) => any) => {
  const {
    address,
    direction,
    flag
  } = req.body

  let cords;
  try {
    cords = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdMapPint = new Map({
    address,
    cords,
    direction,
    flag
  });


  try {
    await createdMapPint.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({
    pointId: createdMapPint.id
  });
};

export const getPointById = async (req: { params: { pointID: string; }; }, res: { json: (arg0: { point: any; }) => void; }, next: (arg0: any) => any) => {
  const pointId = req.params.pointID;

  let point;
  try {
    point = await Map.findOne({
      _id: pointId
    })
  } catch (err) {
    const error = new HttpError('Fetching point failed, please try again later.', 500);
    return next(error);
  }


  if (!point) {
    return next(new HttpError('Cant find the point', 404));
  }



  res.json({point});
};
