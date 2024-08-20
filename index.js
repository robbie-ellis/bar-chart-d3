document.addEventListener('DOMContentLoaded', () => {
  fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(response => {
      const dataSet = response.data;
      
      let dates = [];
      let values = [];
      const w = 900;
      const h = 600;
      const padding = 40;
      const toolTipHeight = 40;
      const toolTipWidth = 80;
      const textXOffset = 7; // Used for centering text horizontally in tooltip
      const textYOffset = 16; // Used for centering text vertically in tooltip

      dataSet.forEach((el) => {
        dates.push(el[0]);
        values.push(el[1]);
      });

      /*
      The following removes everything except the
      year from dates so that the min and max 
      functions in xScale work properly
      */
      let years = [];
      dates.forEach((el, i) => {
        years[i] = el.substring(0, 4); 
      });

      /* 
      Creates scales so rects and axes fit within 
      the svg and rect values match axis values
      */
      const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([padding, w - padding]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .range([h - padding, padding]);

      const rectXScale = d3.scaleLinear()
        .domain([0, (3 * values.length -3)])
        .range([padding, w - padding]);

      // Creates svg to which rectangles and axes will be added
      const svg = d3.select('#chart')
        .append('svg')
        .attr('height', h)
        .attr('width', w)
        .style('background', 'linear-gradient(blue, navy)')
        .style('border-radius', '10px')
        .style('box-shadow', '10px 10px 5px 0px rgba(0, 0, 0, 0.5)');

      // Generates rectangles   
      svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('id', (d, i) => i)
        .attr('class', 'bar')
        .attr('x', (d, i) => rectXScale(i * 3))
        .attr('y', (d) => yScale(d))
        .attr('width', 3)
        .style('height', (d) => h - padding - yScale(d))
        .attr('fill', 'purple')
        .attr('data-gdp', (d) => d)
        .data(dates)
        .attr('data-date', (d) => d);

      // Adds Axes  
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d'));
      const yAxis = d3.axisLeft(yScale);       

      svg.append('g')
        .attr('transform', 'translate(0, ' + (h - padding) + ')')
        .attr('id', 'x-axis')
        .call(xAxis)
        .attr('color', 'coral');

      svg.append('g')
        .attr('transform', 'translate(' + padding + ', 0)')
        .attr('id', 'y-axis')
        .call(yAxis)
        .attr('color', 'coral');

      // Adds tooltip functionality  
      //const toolTip = d3.select('#tooltip'); 
      let toolTip;
      let toolTipTextDate;
      let toolTipTextGDP;

      const showToolTip = function() {
        toolTip = svg.append('rect')
          .attr('id', 'tooltip')
          .attr('width', toolTipWidth)
          .attr('height', toolTipHeight)
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('fill', 'coral')
          .attr('data-date', d3.select(this).attr('data-date'));
        const dateFull = toolTip.attr('data-date'); //Needs to be associated with tooltip to pass test
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

        toolTip.style('opacity', 0.8)
        .attr('x', barX - toolTipWidth / 2)
        .attr('y', h / 2 - toolTipHeight);
        
        toolTipTextDate = svg.append('text')
          .text(`${date}$`)
          .attr('x', barX - toolTipWidth /  2 + textXOffset)
          .attr('y', h / 2 - toolTipHeight + textYOffset);
          
        toolTipTextGDP = svg.append('text')
          .text(`${gdp}B`)
          .attr('x', barX - toolTipWidth /  2 + textXOffset)
          .attr('y', h / 2 - toolTipHeight + textYOffset * 2);
      };
      
      // Removes tooltip on mouseout
      const hideToolTip = () => {
        toolTip.remove();
        toolTipTextDate.remove();
        toolTipTextGDP.remove();
      };

      // Sets up event listeners for tooltip functionality
      const bars = document.getElementsByClassName('bar');
      for (let i = 0; i < bars.length; i++) {
        bars[i].addEventListener('mouseover', showToolTip);
        bars[i].addEventListener('mouseout', hideToolTip);
      };
    });

    
    
    
});


