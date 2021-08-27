import React from "react"

const Qualitie = ({ quality }) => {
  let style = ["badge", "m-1", "bg-" + quality.color].join(" ")
  return <span className={style}>{quality.name}</span>
}

export default Qualitie
