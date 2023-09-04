let no_name_warning = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="no-name-alert">
<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:" xmlns="http://www.w3.org/2000/svg" fill="currentColor"viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
You didn't input a name for your item!
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

$("#summary-plot-btn").on("click touchstart",()=>{
    let item_name = $("#item-name").val();
    let item_tag = $("#item-tags").val()
    if (!item_name) { //Check if we have an item name
        if(!$("#no-name-alert").length){ //Without this check there'd be infinite warnings and that isn't good
            $("#input-area").append(no_name_warning)
        }
        return
    }
    console.log($("#item-name").val())
    console.log($("#item-tags").val())
})