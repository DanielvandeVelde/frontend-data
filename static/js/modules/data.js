import { update } from "./updateMap.js"
let dataArray = []
const projection = d3.geoMercator().center([0, 5]).scale(150)

export let data = {
  cleanData: rawData => {
    dataArray.push(rawData)
    dataArray.length >= 3 ? dataArray.shift() : null
    if (dataArray.length >= 2) {
      const angle = {
        lat: projection([dataArray[1].longitude, dataArray[1].latitude])[0],
        long: projection([dataArray[1].longitude, dataArray[1].latitude])[1],
        angle: data.getAngleDegrees(
          projection([dataArray[0].longitude, dataArray[0].latitude])[0],
          projection([dataArray[0].longitude, dataArray[0].latitude])[1],
          projection([dataArray[1].longitude, dataArray[1].latitude])[0],
          projection([dataArray[1].longitude, dataArray[1].latitude])[1]
        ),
      }

      update.rocket({ dataArray, angle: angle.angle })
      update.information(dataArray[1])
    }
  },
  getAngleDegrees: (fromX, fromY, toX, toY, force360 = true) => {
    let deltaX = fromX - toX
    let deltaY = fromY - toY // reverse
    let radians = Math.atan2(deltaY, deltaX)
    let degrees = (radians * 180) / Math.PI - 90 // rotate
    if (force360) {
      while (degrees >= 360) degrees -= 360
      while (degrees < 0) degrees += 360
    }
    let emojiDegrees = degrees - 45 //offset for 45 degree rocket emoji tilt

    return emojiDegrees
  },
}
