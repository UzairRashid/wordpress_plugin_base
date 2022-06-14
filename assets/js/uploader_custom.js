var $ = jQuery;
let admin_params = {
    security: frontend_ajax_object.file_nonce,
    ajaxurl: frontend_ajax_object.ajaxurl,
};
let output = $("#output_msg");

function delete_attachment(attachmentId,submitButton) {
    let formData = new FormData();
    formData.append('_ajax_nonce', admin_params.security);
    formData.append('action','delete_attachment');
    formData.append('id', attachmentId);
    $.ajax({
        url: admin_params.ajaxurl,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function () {
            output.append("<li style='color:red'>deleting file...</li>");
        },
        success: function (data) {
            if (data) {
                console.log(data);
                if (data.status == "success") {

                    output.append(`<li style='color:red'>${data.message}</li>`);

                }
                else if (data.status == "error") {
                    output.append(`<li style='color:red'>${data.message}<li>`);
                }
                submitButton.removeAttr('disabled');
            }
        },
        error: function (data) {
            submitButton.removeAttr('disabled');

            console.log(data);
            output.append(`<li style='color:red'>${data}<li>`);
        }
    });
}


function start_migration(attachmentId,submitButton) {
    let formData = new FormData();
    formData.append('_ajax_nonce', admin_params.security);
    formData.append('action','start_migration');
    formData.append('id', attachmentId);
    $.ajax({
        url: admin_params.ajaxurl,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function () {
            output.append("<li style='color:green'>Migration started...</li>");
        },
        success: function (data) {
            if (data) {
                console.log(data);
                if (data.status == "success") {
                    output.append(`<li style="color:green">${data.message}</li>`);
                    // output.append("<li style='color:green'>file Deleted...</li>");
                }
                else if (data.status == "error") {
                    submitButton.removeAttr('disabled');
                    output.append(`<li style='color:red'>${data.message}<li>`);
                }
                delete_attachment(attachmentId,submitButton);
            }
        },
        error: function (data) {
            submitButton.removeAttr('disabled');
            console.log(data);
            output.append(`<li style='color:red'>${data}<li>`);
            delete_attachment(attachmentId,submitButton);
        }
    });
}






$(document).on('submit', '#uploadEtsFile', function (e) {
    e.preventDefault();
    let formData = new FormData(this);

    let submitButton = $(this).find("input[type='submit']");
    formData.append('action', 'file_uploader');
    formData.append('_ajax_nonce', admin_params.security);
    submitButton.attr('disabled', 'disabled');

    $.ajax({
        url: admin_params.ajaxurl,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function () {
            output.append("<li style='color:green'>Uploading File...</li>");
        },
        success: async function (data) {
            if (data) {
                console.log(data);
                if (data.status == "success") {
                    let ouputHtml = `
                        <li style='color:green'>
                            <ul>
                                <li>File Uploaded</li>
                                <li>ID: ${data.id}</li>
                                <li>TITLE: ${data.title}</li>
                                <li>URL: <a href='${data.url}' target='_blank'/>${data.url}</a></li>
                            </ul>
                        </li>
                    `;
                    output.append(`${ouputHtml}`);
                    //code for migration
                    start_migration(data.id,submitButton);

                   
                }
                else if (data.status == "error") {
                    output.append(`<li style='color:red'>${data.message}<li>`);
                    submitButton.removeAttr('disabled');
                }
                // submitButton.removeAttr('disabled');
            }
        },
        error: function (data) {
            submitButton.removeAttr('disabled');
            console.log(data);
            output.append(`<li style='color:red'>${data}<li>`);
        }
    });

})


















/*

$('.dropify').on('change',function(){
    console.log("in side onchange");
    var thatFile, fileData, fileName, formData, thatProp;
    var epwcf_params = {
      security:frontend_ajax_object.file_nonce,
      ajaxurl:frontend_ajax_object.ajaxurl,  
    };
    thatFile = $(this);
    // thatFile.css("display","none");
    fileName = thatFile.attr('name') ? thatFile.attr('name') : '';
    thatProp = thatFile.prop('files') ? thatFile.prop('files') : [];
    fileData = thatProp[0] ? thatProp[0] : '';
    formData = new FormData();
    console.log(formData);
    if(thatProp.length > 0){
        // formData.append(fileName, fileData);
        formData.append('action', 'file_uploader');
        formData.append('_ajax_nonce', epwcf_params.security);
        formData.append('file_name', fileName);
        $.ajax({
            url : epwcf_params.ajaxurl,
            type : 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success : function( data ){
                if( data ) {
                    // var upData = JSON.parse(data);
                    
                    // if( upData && upData.status && ( 'error' == upData.status ) ){
                    //     alert(epwcf_params.file_msgs.error_msg);
                    //     drEvent = drEvent.data('dropify');
                    //     drEvent.resetPreview();
                    // }

                    console.log(data);

                }
            },
            error : function( data ){
                console.log("error");
                console.log(data);
            }
        });
    }
});

*/