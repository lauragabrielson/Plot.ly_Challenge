// with help from Dom's instructional video

function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(); //TBD

        var barData = {
            x: sample_values.slice(0.10).reverse, //TBD
            y: yticks,
            type: "bar",
            marker: {
                // color: 'rgb(158,202,225)',
                color: 'rgb(189, 209, 250',
                // opacity: 0.6,
                line: {
                  color: 'rgb(28, 50, 92)',
                  width: 1.5
                },
            },
            text: otu_labels.slice(0,10).reverse, //TBD
            orientation: "h"
        }

        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacterial Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function drawBubblechart(sampleId) {
    console.log(`drawBubblechart(${sampleId})`);
    d3.json("samples.json").then(function(data) {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids, 
                size: sample_values,
                colorscale: [[0, "rgb(189, 209, 250)"], [1, "rgb(59, 102, 182)"]],
            }
        }
    
      
        var bubbles = [bubbleData];
      
        var bubLayout = {
            title: 'Microbial Species by OTU ID',
            showlegend: false,
            margin: {t: 30, l: 150},
            height: 500,
            width: 1100
        }
      
      Plotly.newPlot('bubble', bubbles, bubLayout);
    });
}

function showMetadata(sampleId) {
    console.log(`showMetadata(${sampleId})`);
    d3.json("samples.json").then(function(data) {
        
        var metadata = data.metadata;

        var result = metadata.filter(m => m.id.toString() === sampleId)[0];

        // select demographic panel 
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}


function drawGauge(sampleId) {
    d3.json("samples.json").then(function(data) {

        var samples = data.metadata;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        var wfreq = result.wfreq;

        var gaugeData = [
         {
            domain: { x: [0, 9], y: [0, 9] },
            value: wfreq,
            title: { text: 'Belly Button Washing Frequency <br> (Scrubs per Week)'},
            type: "indicator",
            mode: "gauge+number",
            // delta: { reference: 9, increasing: { color: "green" } },
            gauge: {
                type: "shape",
                axis: { range: [null, 9] },
                bar: {color: "rgb(28, 50, 92)"},
               

                steps: [
                    { range: [0, 1], color: "rgb(189, 209, 250)", text: "0-1" },
                    { range: [1, 2], color: "rgb(189, 209, 250)" },
                    { range: [2, 3], color: "rgb(189, 209, 250", text: "0-1" },
                    { range: [3, 4], color: "rgb(95, 132, 204)" },
                    { range: [4, 5], color: "rgb(95, 132, 204)", text: "0-1" },
                    { range: [5, 6], color: "rgb(95, 132, 204)" },
                    { range: [6, 7], color: "rgb(59, 102, 182)", text: "0-1" },
                    { range: [7, 8], color: "rgb(59, 102, 182)" },
                    { range: [8, 9], color: "rgb(59, 102, 182)", text: "0-1" }

                ],
            
            
                threshold: {
                    line: { color: "rgb(28, 50, 92)", width: 4 },
                    thickness: 0.75,
                    value: 9
                }
            }
         }]
    

    
        var gaugeLayout = { 
            width: 600, 
            height: 500, 
            margin: { t: 25, b: 25} 
        };
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    });
}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBargraph(newSampleId);
    drawBubblechart(newSampleId);
    showMetadata(newSampleId);
    drawGauge(newSampleId);
}


function initDashboard() {
    console.log("initDashboard()");

    // populate the dropdown
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach(sampleId => {
            selector.append("option").text(sampleId).property("value", sampleId)
        });
        var id = sampleNames[0]; 

        // draw graphs and the metadata
        drawBargraph(id);
        drawBubblechart(id);
        showMetadata(id);
        drawGauge(id);
    });
   
}

initDashboard();

