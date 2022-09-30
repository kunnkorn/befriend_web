$(document).ready(function () {

    $.ajax({
        type: 'POST',
        url: '/detailallproject',
        data: { requestid: sessionStorage.request },
        success: function (data) {
            // Cut Only Date(Start Date)
            let d = new Date(data[0].donate_startdate)
            let start_year = d.getFullYear();
            let start_month = d.getMonth() + 1;
            let start_date = d.getDate();

            // Cut Only Date(End Date)
            let e = new Date(data[0].donate_enddate)
            let end_year = e.getFullYear();
            let end_month = e.getMonth() + 1;
            let end_date = e.getDate();

            if(data[0].auctionnumber == null) {
                data[0].auctionnumber = '0'
            }

            if(data[0].allpriceauction == null) {
                data[0].allpriceauction = '0'
            }

            $('#ownername').text(data[0].donate_responperson);
            $('#dateofproject').text(data[0].timeout + ' วัน');
            $('#progressproject').text(data[0].percen + '%');
            $('#donatemoney').text('$' + data[0].donate_startprice);
            $('#headertext').text(data[0].donate_name);
            $('#date').text(start_date + '/' + start_month + '/' + start_year);
            $('#typename').text(data[0].type_name);
            $('#projectdescript').text(data[0].donate_descrict);
            $('#projectarea').text(data[0].donate_area);
            $('#datestart').text(start_date + '/' + start_month + '/' + start_year);
            $('#dateend').text(end_date + '/' + end_month + '/' + end_year);
            $('#projectreason').text(data[0].donate_reason);
            $('#allincome').text(data[0].donate_startprice)
            $('#companyincome').text(data[0].donate_incomecompany);
            $('#projectincome').text(data[0].donate_incomeproject);
            $('#pricedonatedurring').text(data[0].donate_pricedurring)
            $('#numberauction').text(data[0].auctionnumber)
            $('#priceallauction').text(data[0].allpriceauction)
        }
    });

    var table;
    let number = 1;

    table = $('#allprojecttable').DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        deferRender: true,
        ajax: {
            type: 'POST',
            url: '/detailtablerequestproject',
            data: { requestid: sessionStorage.request },
            dataSrc: function (data) {
                return data
            }
        },
        columns: [
            { title: "ลำดับ", defaultContent: '' },
            { data: "charge_name", title: "รายการ" },
            { data: "charge_amount", title: "จำนวน" },
            { data: "charge_money", title: "จำนวนเงิน" }
        ],
        'columnDefs': [{
            'targets': 0,
            'createdCell': function (td, cellData, rowData, row, col) {
                $(td).text(number)
                number++;
            }
        }]
    })

    // Pic From Request
    $.ajax({
        type: 'POST',
        url: '/picfromrequest',
        data: { requestid: sessionStorage.request },
        success: function (data) {
            const datapic = data;

            let picall = "";
            picall += "<div class = 'carousel slide' id = 'carouselExampleIndicators' data-ride = 'carousel'>"
            picall += "<div class = 'carousel-inner'>"
            picall += "<div class = 'carousel-item active'>"
            picall += "<img src= 'upload/" + datapic[0].picdonate_name + "' width='100%'; height='530px' >"
            picall += "</div>"
            for (let i = 1; i < datapic.length; i++) {
                picall += "<div class='carousel-item'>"
                picall += "<img src= 'upload/" + datapic[i].picdonate_name + "' width='100%'; height='530px'>"
                picall += "</div>"
            }
            picall += "</div>"
            picall += "<a class='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>"
            picall += "<span class='carousel-control-prev-icon' aria-hidden='true'></span></a>"
            picall += "<a class='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>"
            picall += "<span class='carousel-control-next-icon' aria-hidden='true'></span></a></div>"

            $('#picarea').html(picall);
        },
        error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    $("#btnpay").on('click' , function() {
        $.ajax({
            type: "POST",
            url: "/updatestatusdonatepayment",
            data: {donate_id: sessionStorage.request},
            success: function (response) {
                alert("โอนเงินสำเร็จแล้ว");
                window.location.replace('/allproject');
            }, error: (xhr) => {
                alert(xhr.responseText);
            }
        });
    })
});