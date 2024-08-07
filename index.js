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
      
      const w = 500;
      const h = 100;

      const svg = d3.select('body')
                    .append('svg')
                    .attr('height', h)
                    .attr('width', w);

      svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 25)
        .attr('height', 100);
        
      
      
    });
    
    
});


