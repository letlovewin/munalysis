let no_name_warning = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="no-name-alert">
<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:" xmlns="http://www.w3.org/2000/svg" fill="currentColor"viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
You didn't input a name for your item!
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

let apikey = "18d5825806bbf02d24f4b6628923affb"
function modelLoaded() {
    console.log('Model Loaded!');
}
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

let getEbayDOM = async function(term,item_tag,item_nums){
    let active_link = `https://api.scraperapi.com/?api_key=${apikey}&url=https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m560.l1313&_nkw=${encodeURIComponent(term)}`
    if (item_tag=="sold"){
        active_link = active_link+`&LH_Complete=1`
    }
    if (item_nums=="1"){
        active_link = active_link+`&_ipg=60`
    }
    else if (item_nums=="2"){
        active_link = active_link+`&_ipg=120`
    }
    else{
        active_link = active_link+`&_ipg=240`
    }
    let response = await fetch(active_link)
    let html = await response.text()
    let n_html = $.parseHTML(html)
    let price_dataset = []
    $(n_html).find('.s-item__price').each(function(i,obj){
        let price = $(this).text().trim();
        if (!isNaN(parseFloat(price.slice(1)))){ //Some issues with unsold item listings showing up as NaN.
            price_dataset.push(parseFloat(price.slice(1)))
        }
    }) 
    return price_dataset
}

$("#summary-plot-btn").on("click touchstart",async(e)=>{
    e.preventDefault();
    let item_name = $("#item-name").val();
    let item_tag = $("#item-tags").find(":selected").val();
    let listing_date = $("#listing-sums").find(":selected").val();
    if (!item_name) { //Check if we have an item name
        if(!$("#no-name-alert").length){ //Without this check there'd be infinite warnings and that isn't good
            $("#input-area").append(no_name_warning);
        }
        return;
    }
    $("#plot-area").empty()
    $("#plot-area").append(`
    <img class="img-fluid mx-auto" src="images/load.gif" id="loading-img">
    `)
    let product_data = await getEbayDOM(item_name,item_tag,listing_date)
    let xbar = mean(product_data)
    let m = median(product_data)
    let stdev = sampleStandardDeviation(product_data)
    // Declare the chart dimensions and margins.
    const plot = await Plot.rectY(
        {length: 10000}, 
        Plot.binX({y: "count"}, 
        {x: 
            product_data,
            thresholds:12
        })).plot()
    $("#plot-area").empty()
    $("#plot-area").append(plot)
    $("#plot-area").append(`
    <div class="row">
        <div class="col col-12 col-sm-4">
            <p><strong>x̄</strong>=$${xbar.toFixed(2)}</p>
        </div>
        <div class="col col-12 col-sm-4">
            <p><strong>x ~</strong>=$${m.toFixed(2)}</p>
        </div>
        <div class="col col-12 col-sm-4">
            <p><strong>Sₓ</strong>=$${stdev.toFixed(2)}</p>
        </div>
    </div>`)
})