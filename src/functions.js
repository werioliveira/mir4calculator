import expBase from "./exp.json";
export function calculateExp(data, timer) {
  const expLevel = expBase[data.startLevel];

  const minutes = `${Math.floor(timer / 60)}`;
  const seconds = `0${timer % 60}`.slice(-2);
  let totalPercent = data.expFinal - data.expInitial;

  let timeMin = `${minutes}` + "." + `${seconds}`;

  let timePercent = totalPercent / timeMin;
  let startExp = data.expInitial / 100;
  let finalExp = data.expFinal / 100;

  let newStartExp = startExp * expLevel;
  let newFinalExp = finalExp * expLevel;
  newStartExp = newStartExp.toFixed(0);
  newFinalExp = newFinalExp.toFixed(0);
  let expFarmed = newFinalExp - newStartExp;

  let expFarmedMin = expFarmed / timeMin;

  let exp8H = expFarmed / timeMin * 480
  

  let response = {
    expFarmed: new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(expFarmed),
    expFarmedMin:new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(expFarmedMin.toFixed(0)),
    totalPercent: totalPercent.toFixed(4),
    timePercent: timePercent.toFixed(4),
    exp8h: new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(exp8H.toFixed(0)),
  };
  return response;
}
