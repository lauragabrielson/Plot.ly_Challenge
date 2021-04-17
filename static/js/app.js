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
}

function showMetadata(sampleId) {
    console.log(`showMetadata(${sampleId})`);
}

// function drawGauge(sampleId) {}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBargraph(newSampleId);
    drawBubblechart(newSampleId);
    showMetadata(newSampleId);
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
        // drawGauge(id);
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
