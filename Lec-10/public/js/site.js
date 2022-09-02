$(document).ready(() => {
    alert('Application is loaded');
    $("#ddlTest").on('change', function(e)  {
        console.log('changed item', e);
    })
    $("#btnTest").on('click', e => {
        $.get('/accounts/read-file', null, response => {
            $("#div1").html(response);
        });
    })
});
