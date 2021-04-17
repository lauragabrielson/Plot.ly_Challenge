// from Dom's instructional video

console.log("app.js loaded");

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
            // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size: sample_values
        }
    };
      
        var bubbles = [bubbleData];
      
        var bubLayout = {
            title: 'Bacteria by Sample',
            showlegend: false,
            margin: {t: 30, l: 150},
            height: 400,
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

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                // demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
                demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });

    //     var resultArray = samples.filter(s => s.id == sampleId);
    //     var result = resultArray[0];
    //     var key = result.key
    //     var pair = result.pair
        
        

    //     var values = [key, pair]
      
    //     var data = [{
    //         type: 'table',
    //         header: {
    //         values: values,
    //         align: "center",
    //         // line: {width: 1, color: 'black'},
    //         // fill: {color: "grey"},
    //         // font: {family: "Arial", size: 12, color: "white"}
    //     },
    //     cells: {
    //       values: values,
    //       align: "center",
    //     //   line: {color: "black", width: 1},
    //     //   font: {family: "Arial", size: 11, color: ["black"]}
    //     }
    //   }];
      
    //   Plotly.newPlot('sample-metadata', data);
    // });
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
            title: { text: "Washes per Week" },
            type: "indicator",
            mode: "gauge+number"
        }
        ];
    
        var gaugeLayout = { 
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 } 
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




// fetch and read JSON file
// bind data
// function init() {
//     d3.json("./samples.json").then(function(data){

    
//         d3.select("#selDataset")
//             .selectAll("option")
//             .data(data.names)
//             .enter()
//             .append("option")
//             .html(function (d) {
//                 return '<option>${d}</option>';
                       
//         });
//     });
    
// };

// console.log(data) 



// init()
