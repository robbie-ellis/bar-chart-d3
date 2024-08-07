document.addEventListener('DOMContentLoaded', () => {
  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(response => {
      const dataSet = response.data;
      
      let dates = [];
      let values = [];

      dataSet.forEach((el) => {
        dates.push(el[0]);
        values.push(el[1]);
      });

      d3.select('body').selectAll('div')
        .data(dataSet)
        .enter()
        .append('div')
        .attr("class", "bar");
      
    });
    
    
});


