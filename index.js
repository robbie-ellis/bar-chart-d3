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

      const svg = d3.select('#chart')
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

      const toolTip = d3.select('#tooltip'); 

      const showToolTip = function() {
        toolTip.attr('data-date', d3.select(this).attr('data-date'));
        const dateFull = toolTip.attr('data-date');
        console.log(dateFull);
        const gdp = d3.select(this).attr('data-gdp');
        const barX = parseInt(d3.select(this).attr('x'), 10);
        let date;

        const dateSplits = dateFull.split("-");
        switch (dateSplits[1]) {
          case "01":
            date = dateSplits[0] + " Q1";
            break;
          case "04":
            date = dateSplits[0] + " Q2";
            break;
          case "07":
            date = dateSplits[0] + " Q3";
            break;
          case "10":
            date = dateSplits[0] + " Q4";
            break;
          default:
            //Default should never occur
        };

        toolTip.style('opacity', 0.8);
        toolTip.style('left', (barX - 30) + 'px');
        toolTip.html(`${date}<br>$${gdp}B`);
      };

      const hideToolTip = () => {
        toolTip.style('opacity', 0);
      };

      const bars = document.getElementsByClassName('bar');
      console.log(bars.length);
      for (let i = 0; i < bars.length; i++) {
        bars[i].addEventListener('mouseover', showToolTip);
        bars[i].addEventListener('mouseout', hideToolTip);
      };
    });
    
    
});


