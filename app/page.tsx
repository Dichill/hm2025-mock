"use client";



import CountdownTimer from "./components/CountdownTimer/CountdownTimer"

import NavBar from "./components/NavBar/NavBar"

import HeroHeader from "./components/HeroHeader/HeroHeader";


function App() {
  // const {/* height */ width } = useWindowSize();

  return (
    <>
      {/* {width + " " + height} */}

      {/* <NavBar /> */}

      <HeroHeader />

      <CountdownTimer />
     
    </>
  )
}

export default App;
