import $ from 'jquery';
$(() => {
  $("#get").on('click', () => {
    let namespace = $("#namespace").val();
    let key = $("#key").val();

    if (namespace && key) {
      $.get(`/${namespace}/${key}`, (value) => {
        $("#value").val(value);
      });
    }
  });

  $("#put").on('click', () => {
    let namespace = $("#namespace").val();
    let key = $("#key").val();
    let value = $("#value").val();


    if (namespace && key) {
      $.ajax({
        url: `/${namespace}/${key}`, 
        method: "PUT",
        processData: false,
        data: value,
        contentType: "text/plain"
      });
    }
  });

  $(".inputs").on('change', () => {
    let namespace = $("#namespace").val();
    let key = $("#key").val();
    if (namespace && key) {
      $("#link").prop("href", `/${namespace}/${key}`).enable();
    } else {
      $("#link").prop("href", "#").disable();
    }
  });
  
});
