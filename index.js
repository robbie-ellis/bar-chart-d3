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
      
      const w = 850;
      const h = 400;

      const svg = d3.select('body')
                    .append('svg')
                    .attr('height', h)
                    .attr('width', w);

      svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('id', (d, i) => i)
        .attr('class', 'bar')
        .attr('x', (d, i) => i * 3)
        .attr('y', (d) => h - d * 0.02)
        .attr('width', 3)
        .attr('height', (d) => d * 0.02)
        .attr('fill', 'purple')
        .attr('data-gdp', (d) => d)
        .data(dates)
        .attr('data-date', (d) => d);
        
      /* For testing  
      const el = document.getElementsByClassName('bar')[0];
      const output = el.getAttribute('data-gdp');
      console.log(output);
      */
      const showToolTip = (e) => {
        console.log("made it this far");
        /*
        d3.select('#tool-tip')
        .data(dates);
        */
      }

      const bars = document.getElementsByClassName('bar');
      console.log(bars.length);
      for (let i = 0; i < bars.length; i++) {
        bars[i].addEventListener('mouseover', showToolTip);
      };
    });
    
    
});


