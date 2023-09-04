let no_name_warning = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="no-name-alert">
<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:" xmlns="http://www.w3.org/2000/svg" fill="currentColor"viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
You didn't input a name for your item!
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

$("#summary-plot-btn").on("click touchstart",()=>{
    let item_name = $("#item-name").val();
    let item_tag = $("#item-tags").val();
    let listing_date = $("#listing-sums").val();
    if (!item_name) { //Check if we have an item name
        if(!$("#no-name-alert").length){ //Without this check there'd be infinite warnings and that isn't good
            $("#input-area").append(no_name_warning);
        }
        return;
    }
    console.log($("#item-name").val());
    console.log($("#item-tags").val());
    console.log($("#listing-sums").val());
    if($("#listing-sums").val()=="five"){

    } else if($("#listing-sums").val()=="ten"){

    } else if($("#listing-sums").val()=="twentyfive"){

    } else if($("#listing-sums").val()=="fifty"){

    } else if($("#listing-sums").val()=="hundred"){
        //Nothing here atm
    }
    // Declare the chart dimensions and margins.
    $("#plot-area").empty()
    const width = window.innerWidth;
    const height = 400;
    const marginTop = 20;
    const marginRight = 60;
    const marginBottom = 30;
    const marginLeft = 20;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleLinear()
        .domain([0, 1000])
        .range([marginLeft, (width - marginRight)*.8]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));

    // Add the y-axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));

    // Append the SVG element.
    $("#plot-area").append(svg.node());
})