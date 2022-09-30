$(document).ready(function () {

    var table;
    let number = 1;

    table = $("#tableallproject").DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        deferRender: true,
        ajax: {
            url: '/allprojecttable',
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].donate_payment_status == 1) {
                        data[i].donate_payment_status = 'ยังไม่โอน'
                    }
                    else if (data[i].donate_payment_status == 2) {
                        data[i].donate_payment_status = 'โอนแล้ว'
                    }

                    if(data[i].timeout <= 0 || data[i].donate_status == 4) {
                        data[i].timeout = 'สิ้นสุดโครงการ'
                    } 

                    data[i].donate_percen = data[i].donate_percen + '%'
                }
                return data;
            }
        },
        columns: [
            { title: "ลำดับ", defaultContent: '' },
            { data: "donate_name", title: "ชื่อโครงการ" },
            { data: "donate_responperson", title: "ชื่อเจ้าของโครงการ" },
            { data: "percen", title: "สถานะโครงการ" },
            { data: "timeout" , title: "เวลาของโครงการ"},
            { data: "donate_payment_status", title: "สถานะการโอนเงิน" },
            { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" },
        ],
        columnDefs: [{
            'targets': 0,
            'createdCell': function (td, cellData, rowData, row, col) {
                $(td).text(number)
                number++;
            },
        }]
    });


    $("#tableallproject tbody").on("click", '.btn-detail', function () {

        const currentRow = $(this).parents('tr');
        const data = table.row(currentRow).data();
        const request_id = data.donate_id
        sessionStorage.request = request_id;
        console.log(sessionStorage.request);
        window.location.replace('/detailproject');

    })

    // โครงการทั้งหมด
    $.ajax({
        type: 'GET',
        url: '/numberallproject',
        success: function (data) {
            if (data[0].allproject == null || data[0].allproject == undefined || data[0].allproject == "") {
                data[0].allproject = '0'
            }

            $('#allproject').text(data[0].allproject);
        }
    })

    // โครงการที่กำลังดำเนินอยู่
    $.ajax({
        type: 'GET',
        url: '/numberprojectcoming',
        success: function (data) {
            if (data[0].projectcoming == null || data[0].projectcoming == undefined || data[0].projectcoming == "") {
                data[0].projectcoming = '0'
            }

            $('#makingproject').text(data[0].projectcoming)
        }
    })

    // โครงการที่สำเร็จไปแล้วแต่ยอดไม่ครบ  
    $.ajax({
        type: 'GET',
        url: '/numberprojectnotmoney',
        success: function (data) {
            if (data[0].projectnomoney == null || data[0].projectnomoney == undefined || data[0].projectnomoney == "") {
                data[0].projectnomoney = '0'
            }

            $('#nomoneyproject').text(data[0].projectnomoney)
        }
    })


    // โครงการที่สำเร็จทุกอย่าง
    $.ajax({
        type: 'GET',
        url: '/numberprojectsuccess',
        success: function (data) {
            if (data[0].projectsuccess == null || data[0].projectsuccess == undefined || data[0].projectsuccess == "") {
                data[0].projectsuccess = '0'
            }

            $('#successproject').text(data[0].projectsuccess);
        }
    })


});