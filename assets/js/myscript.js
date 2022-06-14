
jQuery(document).ready(function ($) {

  let objSubmit = $("#form_individualpaperproposal .frm_submit button");
  objSubmit.attr('disabled', 'disabled'); //disable


  $('#field_7b9ue').keyup(function () {

    var s = this.value;
    s = s.replace(/(^s*)|(s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/n /, "n");
    let count_words = parseInt(s.split(' ').length);

    let objCountshow = $("#show_ch_count");

    let html = "";
    if (count_words > 500) {
      objCountshow.css("color", "red");
      html += "You need to delete some words. ";
      objSubmit.attr('disabled', 'disabled'); //disable
    }
    else if (count_words == 500) {
      objCountshow.css("color", "green");
      html += "Perfect. ";
      objSubmit.removeAttr('disabled'); //disable
    }
    else if (count_words < 500 && count_words > 450) {

      objCountshow.css("color", "#ff6666");
      html += "Warning please don't go above 500 words. ";
      objSubmit.removeAttr('disabled');
    }
    else {
      objCountshow.css("color", "green");
      objSubmit.removeAttr('disabled');
    }
    html += " word count(" + count_words + "/500)";
    objCountshow.html(html);
  });

  $(document).on('click', '#my-paper-links li', function (e) {
    e.preventDefault();
    let id = $(this).data("id");
    $('#my-paper-links li.active').removeClass('active');
    $(this).addClass('active');
    $(".paper-content").css("display", "none");
    $(".paper-content[data-id='" + id + "']").removeAttr("style");

  });





});




/* 
  code gets called after the formidible form gets submitted successsfully

*/
jQuery(document).ready(function ($) {
console.log(frontend_ajax_object.baseurl);
  $(document).on('frmFormComplete', function (event, form, response) {
    var formID = $(form).find('input[name="form_id"]').val();
    // console.log(formID);
    if (formID == 42) {
      
      var title = $(form).find('input[name="item_meta[243]"]').val();
      var abstract = $(form).find('#field_7b9ue').val();
      // var abstract = document.getElementById("field_7b9ue");
      // console.log($(form));
      // console.log(title);
      // console.log(abstract);
      let count = $('.badge.badge-dark.ml-1').html();
      let lenabs = abstract.length;
      var url = frontend_ajax_object.baseurl+"paper_submissions/"+title.replaceAll(" ", '-');
      let date = new Date();
      let longMonth = date.toLocaleString('en-us', { month: 'long' });
      if (count === undefined) {
        let output = ` <nav class="navbar navbar-expand-xl navbar-light bg-white p-xl-0 greedy navbar-expand"><div class="w-100 justify-content-center"><ul class="navbar-nav flex-wrap m-0 being-greedy w-100"><li class="nav-item"><span class="nav-link pr-0 pl-0"><span class="badge badge-white text-muted pl-0">Paper Submission<span class="badge badge-dark ml-1">1</span></span></span></li>
          <li class="nav-item list-unstyled ml-auto greedy-btn d-none dropdown" style=""><a href="javascript:void(0)" data-toggle="dropdown" class="nav-link"><i class="fas fa-ellipsis-h"></i> <span class="greedy-count badge badge-dark badge-pill">0</span></a><ul class="greedy-links dropdown-menu  dropdown-menu-right "></ul></li></ul></div></nav>`;
        $(".card-body.mt-xl-0.pt-0 .row.justify-content-center .col-12.col-xl-6.text-xl-left.pt-xl-1.text-center ").append(output);
        
        
        
        output = `<div class="elementor-element elementor-element-c4ddc6f elementor-grid-1 elementor-posts--thumbnail-none elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-card-shadow-yes elementor-posts__hover-gradient elementor-widget elementor-widget-posts" data-id="c4ddc6f" data-element_type="widget" data-settings="{&quot;cards_columns&quot;:&quot;1&quot;,&quot;cards_columns_tablet&quot;:&quot;2&quot;,&quot;cards_columns_mobile&quot;:&quot;1&quot;,&quot;cards_row_gap_widescreen&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;cards_row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:35,&quot;sizes&quot;:[]},&quot;cards_row_gap_laptop&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;cards_row_gap_tablet_extra&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;cards_row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;cards_row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="posts.cards">
      <div class="elementor-widget-container">
        <div class="elementor-posts-container elementor-posts elementor-posts--skin-cards elementor-grid">
        <article class="elementor-post elementor-grid-item post-31926 paper_submissions type-paper_submissions status-publish hentry paper_category-holiness-church-history paper_category-theme-sessions pmpro-has-access">
        <div class="elementor-post__card">
          <div class="elementor-post__text">
          <h3 class="elementor-post__title">
        <a href="${url}/" target="&quot;_blank&quot;">
          	${title}		</a>
      </h3>
          <div class="elementor-post__excerpt">
        <p>${abstract.substring(0, 150)}  ${(lenabs > 150) ? "..." : ''} </p>
      </div>
          </div>
          <div class="elementor-post__meta-data">
            <span class="elementor-post-date">
        ${longMonth} ${date.getDate()}, ${date.getFullYear()}		</span>
          </div>
            </div>
      </article>
      </div>
      </div>
      </div>`;
        $("section[data-id='0582331'] .elementor-widget-wrap").html(output);
      }
      else {
        count = 1 + parseInt(count);
        $('.badge.badge-dark.ml-1').html(count);
        let output = `<article class="elementor-post elementor-grid-item post-31926 paper_submissions type-paper_submissions status-publish hentry paper_category-holiness-church-history paper_category-theme-sessions pmpro-has-access">
        <div class="elementor-post__card">
          <div class="elementor-post__text">
          <h3 class="elementor-post__title">
        <a href="${url}/" target="&quot;_blank&quot;">
          	${title}		</a>
      </h3>
          <div class="elementor-post__excerpt">
        <p>${abstract.substring(0, 150)} ${(lenabs > 150) ? "..." : ''}</p>
      </div>
          </div>
          <div class="elementor-post__meta-data">
            <span class="elementor-post-date">
        ${longMonth} ${date.getDate()}, ${date.getFullYear()}		</span>
          </div>
            </div>
      </article>`;
        $("#elementor-tab-content-2424 .elementor-posts-container.elementor-posts.elementor-posts--skin-cards.elementor-grid ").prepend(output);

      }
    }
  });
});

/*
*
* code for formidable form on submit paper praposal form
*
* */
// jQuery(document).ready(function($) {

//   $(document).on('submit','#form_individualpaperproposal', function (e) {
//     e.preventDefault();
//     var form = $(this);
//     var title = $(form).find('#field_f2v4r').val();
//     console.log(title);
    // var firstname = $(form).find('#field_t96oi').val();
    // var lastname = $(form).find('#field_3rgdx').val();
    // var affiliation = $(form).find('#field_3ysck').val();
    // var phd_advisor = $(form).find('#field_x2z07').val();
    // var phd_status = $(form).find('#field_i5awk').val();
    // var institution = $(form).find('#field_2a07j').val();
    // var user_id = $(form).find('#field_44ce9').val();
    // var abstract = $(form).find('#field_7b9ue').val();
    // var cat_radio = $(form).find("input[name='item_meta[285]']:checked").val();
    // var sub_cat = $(form).find("#field_hy1zf :selected").val();

    // console.log("categroy="+cat_radio);
    // console.log("subcategory="+sub_cat);
    // //getting the url for ajax call
    // let url = frontend_ajax_object.ajaxurl;
    // let paper_nonce = frontend_ajax_object.paper_nonce;
    // let data = {
    //   action:'store_data_paper_post',
    //   title:title,
    //   first_name: firstname,
    //   last_name: lastname,
    //   affiliation: affiliation,
    //   phd_advisor: phd_advisor,
    //   phd_status: phd_status,
    //   user_id: user_id,
    //   institution: institution,
    //   abstract:abstract,
    //   paper_category:cat_radio,
    //   paper_subcategory:sub_cat,
    //   _ajax_nonce:paper_nonce
    // };

    // $.ajax({
    //   url:url,
    //   type: 'POST',
    //   data:data,
    //   success: function( response,data ) {
    //     console.log(data);
    //     console.log(response);
    //   },
    // });//ajax closes



  // });//event closes
// });


