const HttpError = require('../models/http-error');
import Map from '../models/map';
import getCoordsForAddress from '../utils/getCoordsForAddress';
import { Request, Response } from 'express';

interface LatLng {
  lat: Number;
  lng: Number;
}
interface PointsProps {
  cords: LatLng;
  flag: string[];
  address: string;
  direction: string;
}

interface RecordPoint {
  address: string;
  direction: string;
  flag: string[];
}

interface ReadPoint extends Response {
  cords: LatLng;
  flag: string[];
  address: string;
  direction: string;
  _id: string;
}

export const getPoints = async (
  _req: Request,
  res: ReadPoint,
  next: (arg0: string) => string
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
  console.log(points, 'points');
  if (points.length === 0) {
    const error = new HttpError('No data found, please try again later.');
    return next(error);
  }

  res.json({ points });
};
