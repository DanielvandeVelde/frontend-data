import { data } from "./data.js"

export let api = {
  fetch: async () => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then(response => response.json())
      .then(rawData => {
        data.cleanData(rawData)
      })
  },
}
