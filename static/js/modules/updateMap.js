const svg = d3.select("svg")
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

export let update = {
  rocket: data => {
    const g2 = d3.select("#group2")
    const projection = d3.geoMercator().center([0, 5]).scale(150)

    //Do I really want to save the angle?
    //And does it really sort of work?
    angle = {
      angle: data.angle,
      long: projection([
        data.dataArray[1].longitude,
        data.dataArray[1].latitude,
      ])[0],
      lat: projection([
        data.dataArray[1].longitude,
        data.dataArray[1].latitude,
      ])[1],
    }

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
  },
  information: data => {
    const dataArray = Object.keys(data).map(key => ({ [key]: data[key] }))
    const g3 = d3.select("#group3")

    const information = g3
      .selectAll("text")
      .data(dataArray)
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
  },
  zoom: () =>
    d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", event => {
        transform = event.transform
        d3.select("#group1").attr("transform", transform)
        d3.select("#group2")
          .selectAll("text")
          .attr(
            "transform",
            `translate(${transform.x},${transform.y}) scale(${transform.k}) rotate(0 0 0)`
          )
      }),
}

svg.call(update.zoom())
