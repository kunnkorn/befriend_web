
$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: "/getdetailendauctionopenbyadmin",
        data: { auctionid: sessionStorage.aucionid },
        success: function (data) {
            console.log(data);

            if (data[0].auction_nametransport == null) {
                data[0].auction_nametransport = ''
            }
            if (data[0].auction_numbertransport == null) {
                data[0].auction_numbertransport = 'ยังไม่ได้จัดส่งพัสดุ'
            }
            if (data[0].auction_transprot != 1) {
                $('#update_tracking').prop('disabled' , true)
            }


            // Show Auction Picture 
            let showpicauction = '';
            showpicauction += '<img src= "upload/' + data[0].namepic + '" class="card-img" width="50px" height="150px" style="object-fit: cover">'
            $('#picauction').html(showpicauction);


            // All ID
            // auctionname
            $('#auctionname').text(data[0].auction_name)
            // donatename
            $('#donatename').text(data[0].donate_name)
            // auctionprice
            $('#auctionprice').text(data[0].auction_endprice)
            // nametracking
            $('#nametracking').text(data[0].auction_nametransport + ' ')
            // tracknumber
            $('#tracknumber').text(data[0].auction_numbertransport)
            // usersname
            $('#usersname').text(data[0].users_name)
            // address
            $('#address').text(data[0].users_address)
            // userdistrict
            $('#userdistrict').text(data[0].users_district)
            // userssubdistrict
            $('#usersubdistrict').text(data[0].users_subdistrict)
            // userprovince
            $('#userprovince').text(data[0].users_province)
            // postcode
            $('#postcode').text(data[0].users_postcode)
            // phonenum
            $('#phonenum').text * (data[0].users_phonenumber)
            // delivery_price
            $('#delivery_price').text(data[0].auction_deliveryprice)
            // total_price
            $('#total_price').text(data[0].allprice)

        }, err: function (xhr) {
            console.log(xhr.responseText)
        }
    });

    $('#btn-update').on('click', function () {

        var nametransport = $('#company_delivery option:selected').text();
        var numbertransport = $('#txttracking').val();

        $.ajax({
            type: "POST",
            url: "/updatetracktransport",
            data: { auctionid: sessionStorage.aucionid, nameoftran: nametransport, numberoftran: numbertransport },
            success: function (data) {
                alert(data.responseText)
            }, error: function (xhr) {
                alert(xhr.responseText)
            }
        });

    })
});