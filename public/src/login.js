
$(document).ready(function () {
    $("#btnlogin").on("click", function () {
        const username = $('#txtusername').val();
        const password = $('#txtpassword').val();

        $.ajax({
            type: 'POST',
            url: '/loginadmin',
            data: { username: username, password: password },
        }).done(function (data, state, xhr) {
            // Keep token to local storage
            window.sessionStorage.token = data.token;
            window.location.replace(data.url)
        }).fail(function (xhr, state) {
            console.log(xhr)
        })
    })
});