$(document).on('turbolinks:load', function(){ 
  console.log('aaaaa');
  function buildMessage(message){
    var insertImage = message.image ? `<img src="${message.image}">` : ''
    var html = `<div class="message"data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__text">
                    ${message.content}
                    </p>
                    ${insertImage}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
 


  .done(function(message){
    console.log(message)
    var html = buildMessage(message);
    $('.messages').append(html)
    $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight},500);
    $('#new_message')[0].reset()
    $('.submit-btn').prop('disabled',false)
  })

  .fail(function(){
    alert('エラーが起こりました')
  })

  .always(function(message){
      $('.form__submit').prop('disabled', false);
  })
})
})