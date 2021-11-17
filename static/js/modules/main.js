import { api } from "./api.js"
;(() => {
  const svg = d3.select("svg").attr("width", 1160).attr("height", 500)
  const g = svg.append("g").attr("id", "group1")
  svg.append("g").attr("id", "group2")
  const g3 = svg.append("g").attr("id", "group3")

  g.append("rect")
    .attr("width", "960")
    .attr("y", "-250")
    .attr("height", "1000")
    .style("fill", "steelblue")

  g3.append("rect")
    .attr("width", "200")
    .attr("height", "500")
    .attr("x", "960")
    .style("fill", "white")
    .style("opacity", "0.75")

  d3.json("data/topo.json").then(topology => {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr(
        "d",
        d3.geoPath().projection(d3.geoMercator().center([0, 5]).scale(150))
      )
      .style("fill", "green")
      .style("stroke", "black")
  })
})()

window.setInterval(api.fetch, 1200)
