var img_value = $("#style-select option");
//console.log(img_value[1].value);
//
//$('#style-select option').each(function() {
//    if($(this).is(':selected')){
//        console.log($("#style-select").val());
//    }
//        
//});

$("#style-select").change(function () {
    var cur_value = $('option:selected', this).text();
    console.log(cur_value);
    var image_src = "./image/" + cur_value + ".jpg";
    
    console.log(image_src);
    $("#style-img").attr("src", image_src);
});
