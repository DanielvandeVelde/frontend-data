let angle = {
  angle: 0,
  long: 0,
  lat: 0,
}
//saving angle and transform here as globals
//could also grab this from the elements themselves?
//don't know whats better
let transform = {
  x: 0,
  y: 0,
  k: 1,
}

export let update = {
  rocket: data => {
    const projection = d3.geoMercator().center([0, 5]).scale(150)

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

    d3.select("#group2")
      .selectAll("text")
      .data([data.dataArray[1]])
      .join(
        enter =>
          enter
            .append("text")
            .text("🚀")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .on("mouseover", function () {
              d3.select(this).text("🐱")
            })
            .on("mouseout", function () {
              d3.select(this).text("🚀")
            }),
        update =>
          update
            .transition()
            .duration(1200)
            .attr("y", d => projection([d.longitude, d.latitude])[1])
            .attr("x", d => projection([d.longitude, d.latitude])[0])
            .attr("transform", d => {
              return `translate(${transform.x},${transform.y}) scale(${
                transform.k
              }) rotate(${data.angle} ${
                projection([d.longitude, d.latitude])[0]
              } ${projection([d.longitude, d.latitude])[1]})`
            }),
        exit => exit.remove()
      )
  },
  information: data => {
    d3.select("#group3")
      .selectAll(".keys")
      .data(data)
      .join(enter =>
        enter
          .append("text")
          .attr("text-anchor", "end")
          .attr("class", "keys")
          .attr("x", "1050")
          .attr("y", (d, i) => i * 38 + 24)
          .text(d => Object.keys(d)[0] + ":")
      )

    d3.select("#group3")
      .selectAll(".values")
      .data(data)
      .join(
        enter =>
          enter
            .append("text")
            .text(d =>
              isNaN(d[Object.keys(d)[0]])
                ? d[Object.keys(d)[0]]
                : d3.format(".2~f")(d[Object.keys(d)[0]])
            )
            .attr("class", "values")
            .attr("x", "1060")
            .attr("y", (d, i) => i * 38 + 24),
        update =>
          update
            .text(d =>
              isNaN(d[Object.keys(d)[0]])
                ? d[Object.keys(d)[0]]
                : d3.format(".2~f")(d[Object.keys(d)[0]])
            )
            .attr("opacity", 0.75)
            .transition()
            .duration(200)
            .attr("opacity", 1),
        exit => exit.remove()
      )
  },
  zoom: () =>
    d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", event => {
        transform = event.transform
        d3.select("#group1").attr("transform", transform)
        d3.select("#group2")
          .transition()
          .duration(0)
          .selectAll("text")
          .attr(
            "transform",
            `translate(${transform.x},${transform.y}) 
            scale(${transform.k}) 
            rotate(${angle.angle} ${angle.long} ${angle.lat})`
          )
      }),
}

d3.select("svg").call(update.zoom())
