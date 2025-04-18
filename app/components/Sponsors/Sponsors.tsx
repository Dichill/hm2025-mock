import { useState } from "react";


const Sponsors = () => {
  const [displayType, setDisplayType] = useState("white_div");

  return (
    <>
      <form>
        <select onChange={(e) => setDisplayType(e.target.value)} name="sponsors" defaultValue={"white_div"} id="pet-select" className="m-10">
          <option value="no_white_div">no white div</option>
          <option value="white_div">white div</option>
        </select>
      </form>
      <div className="flex justify-center">

        <div className={`${displayType == "white_div" ? "bg-white w-[70%] rounded-3xl p-12" : ""}`} style={{ boxShadow: `${displayType == "white_div" ? "inset 2px 4px 10px 10px rgba(0, 0, 0, 0.4)" : ""}` }} >
          <img src="/combined_dt.webp" alt="all of the sponsors" style={{ width: "100%", height: "auto" }} />
        </div>
      </div>

    </>

  )
}

export default Sponsors;