

$(document).ready(function () {

    var table;
    let number = 1;
    let numberauction = 1;

    // First Impress
    table = $("#detailrequesttable").DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        deferRender: true,
        ajax: {
            url: '/getdonate',
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let d = new Date(data[i].donatestart);
                    let year = d.getFullYear();
                    let month = d.getMonth();
                    let date = d.getDate();
                    data[i].donatestart = date + '/' + month + '/' + year;
                }
                return data
            }
        },
        columns: [
            { title: "ลำดับที่", defaultContent: '' },
            { data: "donate_name", title: "ชื่อโครงการ" },
            { data: "donate_responperson", title: "ชื่อเจ้าของโครงการ" },
            { data: "donatestart", title: "วันที่ส่งเรื่องในการขอเปิดโครงการ" },
            { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" }
        ],
        'columnDefs': [{
            'targets': 0,
            'createdCell': function (td, cellData, rowData, row, col) {
                $(td).text(number)
                number++;
            }
        }]
    })

    // Get Auction Data
    $('#btnauction').on("click", function () {
        table.clear();
        $('#detailrequesttable').dataTable().fnDestroy();
        $('#detailrequesttable').empty();
        numberauction = 1;
        table = $('#detailrequesttable').DataTable({
            "dom": '<"pull-right"f><"pull-left"l>tip',
            responsive: true,
            deferRender: true,
            ajax: {
                url: '/getallauctionrequest',
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        let d = new Date(data[i].auction_senddate);
                        let year = d.getFullYear();
                        let month = d.getMonth();
                        let date = d.getDate();
                        data[i].auction_senddate = date + '/' + month + '/' + year;
                    }
                    return data
                }
            },
            columns: [
                { title: "ลำดับที่", defaultContent: '' },
                { data: "auction_name", title: "ชื่อสินค้า" },
                { data: "users_name", title: "ชื่อเจ้าของสินค้า" },
                { data: "auction_senddate", title: "วันที่ที่ส่งเรื่องในการประมูล" },
                { title: "รายละเอียดสินค้า", defaultContent: "<input type = 'button' class = 'btn btn-auction' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" }
            ],
            'columnDefs': [{
                'targets': 0,
                'createdCell': function (td, cellData, rowData, row, col) {
                    $(td).text(numberauction)
                    numberauction++;
                }
            }]
        })

        $("#detailrequesttable tbody").on("click", '.btn-auction', function () {
            const currentRow = $(this).parents('tr');
            const data = table.row(currentRow).data();
            const auction_id = data.auction_id
            sessionStorage.auction_id = auction_id;
            console.log(sessionStorage.auction_id);
            window.location.replace('/detailrequest_auction')
        })
    })

    // Get Project Data
    $('#btnproject').on('click', function () {
        table.clear();
        $('#detailrequesttable').dataTable().fnDestroy();
        $('#detailrequesttable').empty();
        number = 1;
        table = $("#detailrequesttable").DataTable({
            "dom": '<"pull-right"f><"pull-left"l>tip',
            responsive: true,
            deferRender: true,
            ajax: {
                url: '/getdonate',
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        let d = new Date(data[i].donatestart);
                        let year = d.getFullYear();
                        let month = d.getMonth();
                        let date = d.getDate();
                        data[i].donatestart = date + '/' + month + '/' + year;
                    }
                    return data
                }
            },
            columns: [
                { title: "ลำดับที่", defaultContent: '' },
                { data: "donate_name", title: "ชื่อโครงการ" },
                { data: "donate_responperson", title: "ชื่อเจ้าของโครงการ" },
                { data: "donatestart", title: "วันที่ส่งเรื่องในการขอเปิดโครงการ" },
                { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" }
            ],
            'columnDefs': [{
                'targets': 0,
                'createdCell': function (td, cellData, rowData, row, col) {
                    $(td).text(number)
                    number++;
                }
            }]
        })
        $("#detailrequesttable tbody").on("click", '.btn-detail', function () {
            // Get Requestid
            const currentRow = $(this).parents('tr');
            const data = table.row(currentRow).data();
            const request_id = data.donate_id
            sessionStorage.request = request_id;
            console.log(sessionStorage.request);
            window.location.replace('/detailrequest');

        })
    })


    $("#detailrequesttable tbody").on("click", '.btn-detail', function () {
        // Get Requestid
        const currentRow = $(this).parents('tr');
        const data = table.row(currentRow).data();
        const request_id = data.donate_id
        sessionStorage.request = request_id;
        console.log(sessionStorage.request);
        window.location.replace('/detailrequest');
    })




});