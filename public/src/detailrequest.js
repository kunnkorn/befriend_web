$(document).ready(function () {

    function carousel(data) {
        let picall = "";
        for (let i = 0; i < datapic.length; i++) {
            picall += "<div class = 'carousel slide' id = 'carouselExampleIndicators' data-ride = 'carousel'>"
            picall += "<div class = 'carousel-inner'>"
            picall += "<div class = 'carousel-item active'>"
            picall += `<img src= "upload/${data[0].picdonate_name}" width: 100%; " >`
            picall += "</div>"
            picall += "<div class = 'carousel-item'>"
            picall += `<img src= "upload/${data[i].picdonate_name}" width: 100%>`
            picall += "</div></div>"
            picall += "<a class='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>"
            picall += "<span class='carousel-control-prev-icon' aria-hidden='true'></span></a>"
            picall += "<a class='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>"
            picall += "<span class='carousel-control-next-icon' aria-hidden='true'></span></a></div>"

        }
        return picall;
    }

    // Pic All Request
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
    })

    // Detail of Request
    $.ajax({
        type: 'POST',
        url: '/detailrequestproject',
        data: { requestid: sessionStorage.request },
        success: function (data) {
            // Cut only Date(Start Date)
            let d = new Date(data[0].donate_startdate)
            let start_year = d.getFullYear();
            let start_month = d.getMonth() + 1;
            let start_date = d.getDate();

            // Cut Only Date(End Date)
            let e = new Date(data[0].donate_enddate)
            let end_year = e.getFullYear();
            let end_month = e.getMonth() + 1;
            let end_date = e.getDate();

            if (data[0].donate_agent == 1) {
                data[0].donate_agent = 'บุคคลทั่วไป'
            }
            else if (data[0].donate_agent == 2) {
                data[0].donate_agent = 'ตัวแทนมูลนิธิ'
            }
            else if (data[0].donate_agent == 3) {
                data[0].donate_agent = 'ตัวแทนบริษัท'
            }

            $('#headertext').text(data[0].donate_name);
            $('#daterequest').text(start_date + '/' + start_month + '/' + start_year);
            $('#type_project').text(data[0].type_name);
            $('#donate_description').text(data[0].donate_descrict);
            $('#donate_area').text(data[0].donate_area);
            $('#startdate').text(start_date + '/' + start_month + '/' + start_year);
            $('#enddate').text(end_date + '/' + end_month + '/' + end_year);
            $('#donate_reason').text(data[0].donate_reason);
            $('#donate_owner').text(data[0].donate_responperson);
            $('#donate_response').text(data[0].donate_agent);
            $('#donate_address').text(data[0].donate_personaddress);
            $('#donate_phone').text(data[0].donate_personphone);
            $('#donate_email').text(data[0].donate_personemail);
            $('#money_project').text(data[0].donate_incomeproject)
            $('#money_company').text(data[0].donate_incomecompany)
            $('#money_allproject').text(data[0].donate_startprice)
            $('#personalcardimage').prop('src', 'uploadaccount/' + data[0].donate_personcard);
            $('#bankaccountimage').prop('src', 'uploadaccount/' + data[0].donate_bankaccount);
            $('#showpersonalcard').prop('href', 'uploadaccount/' + data[0].donate_personcard)
            $('#showbankaccount').prop('href', 'uploadaccount/' + data[0].donate_bankaccount)

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    })


    var table
    let number = 1;

    table = $("#requesttable").DataTable({
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
    });


    $('#btnapprove').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/approveproject',
            data: { requestid: sessionStorage.request },
            success: function (data) {
                alert('อนุมัติโครงการเสร็จสิ้น')
                sessionStorage.clear();
                window.location.replace(data);

            }, error: (xhr) => {
                alert(xhr.responseText);
            }
        })
    })

    $("#btnnonapprove").on("click", function () {
        $("#modalreason").modal("show")
    });

    $('#unapproveproject').on('click', function () {
        var reasonunapprove = $('#reasonunapprove').val();

        $.ajax({
            type: 'POST',
            url: '/unapproveproject',
            data: { reason: reasonunapprove, requestid: sessionStorage.request },
            success: function (data) {
                $('#modalreason').modal('hide');
                sessionStorage.clear();
                window.location.replace(data);
            }, error: (xhr) => {
                alert(xhr.responseText);
            }
        })
    })
});