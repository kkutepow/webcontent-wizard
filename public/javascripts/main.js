window.onload = () => {
};

let getContent = function () {
    let url = $("#url").val();
    $.ajax({
        type: "GET",
        url: url,
        success: (res)=>{
            $("#response").val("res");
        }
    });
};