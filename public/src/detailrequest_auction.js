

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/detailauctionrequest",
        data: { auctionid: sessionStorage.auction_id },
        success: function (response) {
            let d = new Date(response[0].auction_senddate)
            let send_year = d.getFullYear();
            let send_month = d.getMonth() + 1;
            let send_date = d.getDate();

            if (response[0].donate_agent == 1) {
                response[0].donate_agent = 'บุคคลทั่วไป'
            }
            else if (response[0].donate_agent == 2) {
                response[0].donate_agent = 'ตัวแทนมูลนิธิ'
            }
            else if (response[0].donate_agent == 3) {
                response[0].donate_agent == 'ตัวแทนบริษัท'
            }

            $('#name_item').text(response[0].auction_name);
            $('#datetime').text(send_date + '/' + send_month + '/' + send_year);
            $('#code_item').text(response[0].auction_id);
            $('#name_item_descript').text(response[0].auction_name);
            $('#detail_item').text(response[0].auction_descript);
            $('#text_price').text(response[0].auction_startprice);
            $('#projectname').text(response[0].donate_name);
            $('#projectarea').text(response[0].donate_area);
            $('#projectprice').text(response[0].donate_pricedurring);
            $('#projectdeadline').text(response[0].timeday);
            $('#projectpercen').text(response[0].percen + ' %')
            $('#ownername').text(response[0].users_name);
            $('#type_owner').text(response[0].donate_agent);
            $('#address').text(response[0].users_address);
            $('#phonenumber').text(response[0].users_phonenumber);
            $('#emailowner').text(response[0].users_email);

            let detailauction = ""
            //Carousel Wrapper
            detailauction += "<div id='multi-item-example' class='carousel slide carousel-multi-item mb-5' data-ride='carousel'>"
            // Control

            // Indicator
            if (response.length < 4) {

                detailauction += "<div class='carousel-inner' role='listbox'>"
                detailauction += "<div class='carousel-item active'>"
                detailauction += "<div class='row'>"
                for (let i = 0; i < response.length; i++) {
                    detailauction += "<div class='col-md-4'>"
                    detailauction += " <div class='card mb-2'>"
                    detailauction += "<img class='card-img-top'"
                    detailauction += "src='upload/" + response[i].picaution_name + "'"
                    detailauction += "alt='Card image cap'>"
                    detailauction += "</div>"
                    detailauction += "</div>"
                }
                detailauction += "</div>"
                detailauction += "</div>"
                detailauction += "</div>"
            }
            else if (response.length > 4) {
                detailauction += "<div class='controls-top'>"
                detailauction += "<a class='btn-floating' href='#multi-item-example' data-slide='prev'><i class='fa fa-chevron-left'></i></a>"
                detailauction += "<a class='btn-floating' href='#multi-item-example' data-slide='next'><i class='fa fa-chevron-right'></i></a>"
                detailauction += "</div>"

                detailauction += "<div class='carousel-inner' role='listbox'>"

                detailauction += "<div class='carousel-item active'>"
                detailauction += "<div class='row'>"

                detailauction += "<div class='col-md-4'>"
                detailauction += " <div class='card mb-2'>"
                detailauction += "<img class='card-img-top'"
                detailauction += "src='upload/" + response[0].picaution_name + "'"
                detailauction += "alt='Card image cap'>"
                detailauction += "</div>"
                detailauction += "</div>"

                detailauction += "<div class='col-md-4'>"
                detailauction += " <div class='card mb-2'>"
                detailauction += "<img class='card-img-top'"
                detailauction += "src='upload/" + response[1].picaution_name + "'"
                detailauction += "alt='Card image cap'>"
                detailauction += "</div>"
                detailauction += "</div>"

                detailauction += "<div class='col-md-4'>"
                detailauction += " <div class='card mb-2'>"
                detailauction += "<img class='card-img-top'"
                detailauction += "src='upload/" + response[2].picaution_name + "'"
                detailauction += "alt='Card image cap'>"
                detailauction += "</div>"
                detailauction += "</div>"

                detailauction += "</div>"
                detailauction += "</div>"

                detailauction += "<div class='carousel-item '>"
                detailauction += "<div class='row'>"
                for (let u = 3; u < response.length; u++) {
                    detailauction += "<div class='col-md-4'>"
                    detailauction += "<div class='card mb-2'>"
                    detailauction += "<img class='card-img-top'"
                    detailauction += "src='upload/" + response[u].picaution_name + "'"
                    detailauction += "alt='Card image cap'>"
                    detailauction += "</div>"
                    detailauction += "</div>"
                }
                detailauction += "</div>"
                detailauction += "</div>"
                detailauction += "</div>"
            }
            detailauction += "</div>"

            $('#alldetailauction').html(detailauction);

        },
        error: function (xhr) {
            console.log(xhr.responseText)
        }
    });

    $('#approve_item').on('click', function () {
        $.ajax({
            type: "POST",
            url: "/approveauction",
            data: { auctionid: sessionStorage.auction_id },
            success: function (response) {
                alert('อนุมัติโครงการเสร็จสิ้น')
                sessionStorage.clear();
                window.location.replace(response);
            },
            error: function (xhr) {
                console.log('Approve Unsuccess')
            }
        });
    })

    $('#notapprove_item').on('click' , function() {
        $.ajax({
            type: "POST",
            url: "/nonapproveauction",
            data: { auctionid: sessionStorage.auction_id },
            success: (response) => {
                alert('ไม่อนุมัติการประมูลเสร็จสิ้น')
                sessionStorage.clear();
                window.location.replace(response);
            },
            error: (xhr) => {
                console.log('Nonapprove Unsuccess')
            }
        });
    })


});