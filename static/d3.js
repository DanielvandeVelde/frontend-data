const width = 960,
  height = 500

const projection = d3.geoMercator().center([0, 5]).scale(150)
const svg = d3.select("svg").attr("width", width).attr("height", height)
const path = d3.geoPath().projection(projection)
const g = svg.append("g")
const g2 = svg.append("g")
let dataArray = []

d3.json("topo.json").then(function (topology) {
  g.selectAll("path")
    .data(topojson.feature(topology, topology.objects.countries).features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "green")
})

const getData = () => {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(response => response.json())
    .then(data => {
      //console.log("Information from:" + new Date(data.timestamp * 1000))
      dataArray.push(data)
      dataArray.length >= 3 ? dataArray.shift() : null
      let angle = 0
      if (dataArray.length >= 2) {
        angle = getAngleDegrees(
          projection([dataArray[0].longitude, dataArray[0].latitude])[0],
          projection([dataArray[0].longitude, dataArray[0].latitude])[1],
          projection([dataArray[1].longitude, dataArray[1].latitude])[0],
          projection([dataArray[1].longitude, dataArray[1].latitude])[1]
        )
        update({ dataArray, angle })
      } else {
        update({ dataArray, angle })
      }
    })
}

const update = data => {
  const text = g2
    .selectAll("text")
    .data(data.dataArray)
    .join(
      enter =>
        enter
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("x", d => projection([d.longitude, d.latitude])[0])
          .attr("y", d => projection([d.longitude, d.latitude])[1])
          .text("🚀"),
      update => update,
      exit => {
        exit.remove()
      }
    )

  text
    .attr("x", d => projection([d.longitude, d.latitude])[0])
    .attr("y", d => projection([d.longitude, d.latitude])[1])
    .attr("transform", d => {
      return `rotate(${data.angle} ${projection([
        d.longitude,
        d.latitude,
      ])[0].toFixed(0)} ${projection([d.longitude, d.latitude])[1].toFixed(0)})`
    })
}

const zoom = d3
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", function (event) {
    g.selectAll("path").attr("transform", event.transform)
    g2.selectAll("text").attr("transform", event.transform)
  })

const getAngleDegrees = (fromX, fromY, toX, toY, force360 = true) => {
  let deltaX = fromX - toX
  let deltaY = fromY - toY // reverse
  let radians = Math.atan2(deltaY, deltaX)
  let degrees = (radians * 180) / Math.PI - 90 // rotate
  if (force360) {
    while (degrees >= 360) degrees -= 360
    while (degrees < 0) degrees += 360
  }
  let emojiDegrees = degrees - 45 //offset for 45 degree emoji tilt
  degreeNumber = emojiDegrees.toFixed(2)

  return degreeNumber
}

svg.call(zoom)
const interval = window.setInterval(getData, 1500)
