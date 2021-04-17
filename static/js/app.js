
console.log("app.js loaded");

// from Dom's instructional 
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
    });
    // update the bargraph
    // update the bubblechart
    // update the demographic info
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
