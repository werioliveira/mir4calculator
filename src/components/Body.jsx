import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { calculateExp } from "../functions";

export default function Body() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);
  let [responseCalc, setResponseCalc] = useState(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    setResponseCalc(calculateExp(formData, timer));
  };

  return (
    <div className="min-w-full min-h-full bg-slate-100 overflow-hidden flex md:text-left md:flex-row  justify-center items-center">
      <div className="w-screen md:w-2/3 justify-center items-center">
        <div className="justify-center text-center p-10">
          <div className="flex flex-row justify-evenly mt-10">
          </div>
          <div className="min-w-96 m-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-2 ">
                <div className="flex flex-col gap-2 flex-3 mt-2">
                <p className="h-10 font-medium">Level</p>
                <p className="h-10 font-medium ">Exp Initial</p>
                <p className="h-10 font-medium">Exp Final</p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                <input
                  {...register("startLevel")}
                  className="contactInputs h-10  p-5"
                  placeholder="Level"
                  type="number"
                  id="level"
                  required={true}
                />
                <InputMask
                  {...register("expInitial")}
                  className="contactInputs h-10  p-5"
                  placeholder="Experiencia Inicial"
                  mask="99.9999"
                  required={true}
                />
                <InputMask
                  {...register("expFinal")}
                  className="contactInputs h-10 p-5"
                  placeholder="Experiencia Final"
                  mask="99.9999"
                  required={true}
                />
                </div>
              <div className="flex-2 text-left">
                <p className="font-medium">Exp Percent Total Farmed: {responseCalc?.totalPercent}</p>
                <p className="font-medium">1 Min Exp Percent Farmed: {responseCalc?.timePercent}</p>
                <p className="font-medium">Total Exp Farmed: {responseCalc?.expFarmed}</p>
                <p className="font-medium">1 Min Exp Farmed: {responseCalc?.expFarmedMin}</p>
                <p className="font-medium">8H Exp Will Farmed: {responseCalc?.exp8h}</p>
              </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <button
                  disabled={timer < 60}
                  className="bg-gray-800 py-5 px-10 rounded-sm text-white font-bold text-lg btn"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="flex justify-center">
            <div className="flex flex-col stopwatch-card w-60 mt-4 h-60 items-center justify-center rounded-full bg-gray-800">
            <div className="bg-white rounded-xl">
              <p className="text-black text-center m-2">{formatTime()}</p>
            </div>
              <div className="buttons">
                {!isActive && !isPaused ? (
                  <button onClick={handleStart} className="bg-slate-500 w-20 rounded-lg text-white m-3">Start</button>
                ) : isPaused ? (
                  <button onClick={handlePause} className="bg-slate-500 w-20 rounded-lg text-white m-3">Pause</button>
                ) : (
                  <button onClick={handleResume} className="bg-slate-500 w-20 rounded-lg text-white m-3">Resume</button>
                )}
                <button onClick={handleReset} className="bg-slate-500 w-20 rounded-lg text-white m-3" disabled={!isActive}>
                  Reset
                </button>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
