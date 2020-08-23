import React, { FunctionComponent, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorAlert, LoadingBar } from "../../components/";
import "./AddNewPointForm.scss";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useHistory } from "react-router";

type SubmittedData = { [s: string]: string | string[] };
export const flagTypes = ["red", "blue", "yellow", "green"];
export const directionTypes = ["top", "left", "right", "bottom"];

export const AddNewPointForm: FunctionComponent = (): ReactElement => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [newPointId, setNewPointId] = useState<string | null>(null);

  const data: SubmittedData = watch();
  const history = useHistory();
  const { isLoading, error, sendRequest } = useHttpClient();

  const recordNewPoint = async (
    address: string,
    direction: string,
    flag: string[]
  ): Promise<void> => {
    try {
      const responseData = await sendRequest(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/addPoint`,
        "POST",
        JSON.stringify({
          address,
          direction,
          flag,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setNewPointId(responseData.pointId);
    } catch (err) {
      console.warn(`cannot add new point, `, err.message);
    }
  };
  const onSubmit = (data: SubmittedData): void => {
    const { street, postCode, city, flag, direction } = data;
    const address = `${street}, ${postCode}, ${city}`;
    if (Array.isArray(flag) && typeof direction === "string") {
      recordNewPoint(address, direction, flag);
    }
  };

  if (newPointId) {
    history.push({ pathname: newPointId });
  }
  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Add address</h2>
      {error && <ErrorAlert errorMessage={error} />}
      <div className="form--item">
        <label className="label">street</label>
        <input
          type="text"
          name="street"
          ref={register({ required: true, minLength: 3 })}
          className="form--input"
        />
        {errors.street && <ErrorAlert errorMessage="Street is required" />}
      </div>
      <div className="form--item">
        <label className="label">city</label>
        <input
          type="text"
          name="city"
          ref={register({ required: true, minLength: 3 })}
          className="form--input"
        />
        {errors.city && <ErrorAlert errorMessage="City is required" />}
      </div>
      <div className="form--item">
        <label className="label">post code</label>
        <input
          type="text"
          name="postCode"
          ref={register({ required: true, minLength: 3 })}
          className="form--input"
        />
        {errors.postCode && <ErrorAlert errorMessage="Post code is required" />}
      </div>
      <h2>Add flag and direction</h2>

      <div className="form--el">
        <label className="label">flag color</label>
        {flagTypes.map((flagColor) => (
          <div className="form--select">
            <span>{flagColor}</span>
            <input
              name="flag"
              type="checkbox"
              value={flagColor}
              ref={register({ required: true })}
            />
          </div>
        ))}
      </div>
      {errors.flag && <ErrorAlert errorMessage="Add at least one flag" />}

      <div className="form--el">
        <label className="label">direction</label>
        {directionTypes.map((direction) => (
          <div className="form--radio">
            <span>{direction}</span>
            <input
              name="direction"
              type="radio"
              value={direction}
              ref={register({ required: true })}
            />
          </div>
        ))}
      </div>
      {errors.direction && <ErrorAlert errorMessage="Select direction" />}

      {Object.values(data).length > 0 && (
        <>
          <button type="submit" className="btn">
            Submit
          </button>
        </>
      )}
    </form>
  );
};
