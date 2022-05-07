import React, { useState } from "react";
import useAnimationFrame from "./utils/useAnimationFrame";
import "./App.css";
import Card from "./components/Card";
import mockData from "./mockData.json";

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const formatData = (data: any) => {
  const dataRankByScoreHighToLow = data
    .slice()
    .sort((a: any, b: any) => {
      return b.score - a.score;
    })
    .map((e: any) => e.userID);
  const result = data.map((e: any) => {
    const newRank = dataRankByScoreHighToLow.indexOf(e.userID);
    return {
      ...e,
      rank: newRank,
    };
  });
  return result;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(formatData(mockData));

  useAnimationFrame(() => {
    const randomIdx = getRandomInt(0, data.length);
    const newData = data.map((e: any, i: number) => {
      if (i === randomIdx) {
        return {
          ...e,
          score: e.score + getRandomInt(1, 500),
        };
      } else {
        return {
          ...e,
        };
      }
    });
    const formattedData = formatData(newData);
    setData(formattedData);
    setCount(count + 1);
  }, true);

  return (
    <div className="App">
      <Card data={data} />
    </div>
  );
};

export default App;
