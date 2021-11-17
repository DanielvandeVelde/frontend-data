import { update } from "./updateMap.js"
const dataArray = []

export let data = {
  cleanData: rawData => {
    const projection = d3.geoMercator().center([0, 5]).scale(150)

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

      const informationData = Object.keys(dataArray[1]).map(key => ({
        [key]: data[key],
      }))

      update.rocket({ dataArray, angle: angle.angle })
      update.information(informationData)
    }
  },
  getAngleDegrees: (fromX, fromY, toX, toY, force360 = true) => {
    let deltaX = fromX - toX
    let deltaY = fromY - toY
    let radians = Math.atan2(deltaY, deltaX)
    let degrees = (radians * 180) / Math.PI - 90 // rotate
    if (force360) {
      degrees = (degrees + 360) % 360
    }
    let emojiDegrees = degrees - 45 //offset for 45 degree rocket emoji tilt

    return emojiDegrees
  },
}
