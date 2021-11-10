const projection = d3.geoMercator().center([0, 5]).scale(150)
const path = d3.geoPath().projection(projection)
const svg = d3.select("svg").attr("width", 1160).attr("height", 500)
const g = svg.append("g")
const g2 = svg.append("g")
const g3 = svg.append("g")
let dataArray = []
let angle = {
  angle: 0,
  long: 0,
  lat: 0,
}
let transform = {
  x: 0,
  y: 0,
  k: 1,
}

//Make this a nice little function?
g3.append("rect")
  .attr("width", "200")
  .attr("height", "500")
  .attr("fill", "white")
  .attr("opacity", "0.75")
  .attr("x", "960")

g.append("rect")
  .attr("width", "960")
  .attr("y", "-250")
  .attr("height", "1000")
  .attr("fill", "steelblue")
  .attr("opacity", "1")

d3.json("topo.json").then(function (topology) {
  g.selectAll("path")
    .data(topojson.feature(topology, topology.objects.countries).features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "green")
    .style("stroke", "black")
    .style("stroke-width", "1")
})

const getData = () => {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(response => response.json())
    .then(data => {
      dataArray.push(data)
      dataArray.length >= 3 ? dataArray.shift() : null
      if (dataArray.length >= 2) {
        angle = {
          lat: projection([dataArray[1].longitude, dataArray[1].latitude])[0],
          long: projection([dataArray[1].longitude, dataArray[1].latitude])[1],
          angle: getAngleDegrees(
            projection([dataArray[0].longitude, dataArray[0].latitude])[0],
            projection([dataArray[0].longitude, dataArray[0].latitude])[1],
            projection([dataArray[1].longitude, dataArray[1].latitude])[0],
            projection([dataArray[1].longitude, dataArray[1].latitude])[1]
          ),
        }

        updateRocket({ dataArray, angle: angle.angle })
        updateInformation(dataArray[1])
      }
    })
}

const updateRocket = data => {
  const rocket = g2
    .selectAll("text")
    .data(data.dataArray)
    .join(
      enter =>
        enter
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .text("🚀")
          .on("mouseover", function () {
            d3.select(this).text("🐱")
          })
          .on("mouseout", function () {
            d3.select(this).text("🚀")
          }),
      update => update,
      exit => {
        exit.remove()
      }
    )

  rocket
    .attr("x", d => projection([d.longitude, d.latitude])[0])
    .attr("y", d => projection([d.longitude, d.latitude])[1])
    .attr("transform", d => {
      return `translate(${transform.x},${transform.y}) scale(${
        transform.k
      }) rotate(${data.angle} ${projection([d.longitude, d.latitude])[0]} ${
        projection([d.longitude, d.latitude])[1]
      })`
    })
}

const updateInformation = data => {
  //Datacleaning needs its own function, maybe
  var arr = Object.keys(data).map(key => ({ [key]: data[key] }))

  const information = g3
    .selectAll("text")
    .data(arr)
    .join(
      enter =>
        enter
          .append("text")
          .attr("x", "965")
          .attr("y", (d, i) => i * 25 + 25)
          .text(d => `${Object.keys(d)[0]}: ${d[Object.keys(d)[0]]}`),
      update => update,
      exit => {
        exit.remove()
      }
    )

  information.text(d => `${Object.keys(d)[0]}: ${d[Object.keys(d)[0]]}`)
}

const zoom = d3
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", event => {
    transform = event.transform
    g.attr("transform", transform)
    g2.selectAll("text").attr(
      "transform",
      `translate(${transform.x},${transform.y}) scale(${transform.k}) rotate(${angle.angle} ${angle.lat} ${angle.long})`
    )
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
  let emojiDegrees = degrees - 45 //offset for 45 degree rocket emoji tilt

  return emojiDegrees
}

svg.call(zoom)
const interval = window.setInterval(getData, 1200) //API allows 1 call every 1000ms
