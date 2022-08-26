$(document).ready(function () {

    const rawdata_pay = [
        { "order": "1", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "350", "win_bidder": "somchai", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "2", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "480", "win_bidder": "sompong", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "3", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "500", "win_bidder": "somsmai", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "4", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "1520", "win_bidder": "somsri", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
    ];

    $('#content-table').html('<table id="status_pay-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');
    let number = 1;
    $('#status_pay-table').DataTable({
        responsive: true,
        deferRender: true,
        ajax: {
            url: '/auctionlistpaymentanddelivery',
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].auction_payment == 1) {
                        data[i].auction_payment = 'ยังไม่จ่ายเงิน'
                    } else {
                        data[i].auction_payment = 'จ่ายเงินแล้ว'
                    }
                }
                return data

            }
        },
        columns: [
            { title: 'รหัส', defaultContent: '' },
            { title: 'สินค้า' },
            { title: 'ชื่อสินค้า', data: 'auction_name' },
            { title: 'โครงการ', data: 'donate_name' },
            { title: 'ราคาประมูลล่าสุด', data: 'auction_endprice' },
            { title: 'ผู้ชนะการประมูล', data: 'winner' },
            { title: 'สถานะการจ่ายเงิน', data: 'auction_payment' }
            // { title: 'สถานะการจ่ายเงิน', defaultContent: "<input data-toggle='modal' data-target='#modelId' type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
        ],
        columnDefs:
            [
                {

                    'targets': 0,
                    'createdCell': function (td, cellData, rowData, row, col) {
                        $(td).text(number)
                        number++;
                    },

                }
                ,
                {
                    "targets": 1,
                    "data": 'picname',
                    "render": function (data, type, row, meta) {
                        return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                    }
                },
            ],
    });

    $("#status_pay-table tbody").on("click", '#seemore', function () {

        $('#modelId').modal();

    })

    $('#btnstatus_pay').toggleClass('active');
    $('#btnstatus_pay').click(function () {
        if ($('#btnstatus_pay').hasClass('active')) {

        }
        else {
            $('#btnstatus_pay').toggleClass('active');
            $('#btnstatus_delivery').removeClass('active');
        }
        $('#content-table').html('<table id="status_pay-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');
        let number = 1;
        $('#status_pay-table').DataTable({
            responsive: true,
            deferRender: true,
            ajax: {
                url: '/auctionlistpaymentanddelivery',
                dataSrc: function (data) {

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].auction_payment == 1) {
                            data[i].auction_payment = 'ยังไม่จ่ายเงิน'
                        } else {
                            data[i].auction_payment = 'จ่ายเงินแล้ว'
                        }
                    }
                    return data

                }
            },
            columns: [
                { title: 'รหัส', defaultContent: '' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'auction_name' },
                { title: 'โครงการ', data: 'donate_name' },
                { title: 'ราคาประมูลล่าสุด', data: 'auction_endprice' },
                { title: 'ผู้ชนะการประมูล', data: 'winner' },
                { title: 'สถานะการจ่ายเงิน', data: 'auction_payment' }

                // { title: 'สถานะการจ่ายเงิน', defaultContent: "<input data-toggle='modal' data-target='#modelId' type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
            ],
            columnDefs:
                [
                    {

                        'targets': 0,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).text(number)
                            number++;
                        },

                    }
                    ,
                    {
                        "targets": 1,
                        "data": 'picname',
                        "render": function (data, type, row, meta) {
                            return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                        }
                    },
                ],
        });

        $("#status_pay-table tbody").on("click", '#seemore', function () {
            $('#modelId').modal();
        })


    });

    $('#btnstatus_delivery').click(function () {
        if ($('#btnstatus_delivery').hasClass('active')) {

        }
        else {
            $('#btnstatus_delivery').toggleClass('active');
            $('#btnstatus_pay').removeClass('active');
        }

        $('#content-table').html('<table id="status_pay-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');
        let number = 1;
        $('#status_pay-table').DataTable({
            responsive: true,
            deferRender: true,
            ajax: {
                url: '/auctionlistpaymentanddelivery',
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].auction_transprot == 1) {
                            data[i].auction_transprot = 'กำลังจัดส่ง'
                        } else if (data[i].auction_transprot == 2) {
                            data[i].auction_transprot = 'จัดส่งสำเร็จ'
                        } else if (data[i].auction_transprot == 3) {
                            data[i].auction_transprot = 'ส่งมอบสินค้าสำเร็จ'
                        }
                    }
                    return data
                }
            },
            // data: rawdata_pay,
            columns: [
                { title: 'รหัส', defaultContent: '' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'auction_name' },
                { title: 'โครงการ', data: 'donate_name' },
                { title: 'ผู้ชนะการประมูล', data: 'winner' },
                { title: 'เจ้าของการประมูล', data: 'owner' },
                { title: 'สถานะการขนส่ง', data: 'auction_transprot' },
            ],
            columnDefs:
                [
                    {
                        'targets': 0,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).text(number)
                            number++;
                        },
                    }
                    ,
                    {
                        "targets": 1,
                        "data": 'picname',
                        "render": function (data, type, row, meta) {
                            return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                        }
                    },
                ],
        });
    });
});