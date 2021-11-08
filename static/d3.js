d3.csv("wikipedia_color_names.csv").then(data => {
  var svg = d3.select("body").append("svg")

  var circles = svg.selectAll("circle").data(data).enter().append("circle")
  circles
    .attr("cx", 15)
    .attr("cy", (d, i) => {
      return i * 25 + 15
    })
    .attr("r", 10)
    .attr("fill", d => {
      return d.hex
    })

  var texts = svg.selectAll("text").data(data).enter().append("text")
  texts
    .attr("y", (d, i) => {
      return i * 25 + 20
    })
    .attr("x", 30)
    .attr("fill", d => {
      return d.hex
    })
    .text(d => {
      return d.name
    })
})
