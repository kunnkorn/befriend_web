$(document).ready(function () {

    const rawdata_pay = [
        { "order": "1", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "350", "win_bidder": "somchai", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "2", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "480", "win_bidder": "sompong", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "3", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "500", "win_bidder": "somsmai", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
        { "order": "4", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "1520", "win_bidder": "somsri", "owner_item": "pornchai", "status": "กำลังจัดส่ง" },
    ];

    $('#content-table').html('<table id="status_pay-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');

    $('#status_pay-table').DataTable({
        responsive: true,
        deferRender: true,
        data: rawdata_pay,
        columns: [
            { title: 'รหัส', data: 'order' },
            { title: 'สินค้า' },
            { title: 'ชื่อสินค้า', data: 'name_item' },
            { title: 'โครงการ', data: 'project_name' },
            { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
            { title: 'ผู้ชนะการประมูล', data: 'win_bidder' },
            { title: 'สถานะการจ่ายเงิน', defaultContent: "<input data-toggle='modal' data-target='#modelId' type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
        ],
        columnDefs:
            [{
                "targets": 1,
                "data": 'img',
                "render": function (data, type, row, meta) {
                    return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
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

        $('#status_pay-table').DataTable({
            responsive: true,
            deferRender: true,
            data: rawdata_pay,
            columns: [
                { title: 'รหัส', data: 'order' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'name_item' },
                { title: 'โครงการ', data: 'project_name' },
                { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
                { title: 'ผู้ชนะการประมูล', data: 'win_bidder' },
                { title: 'สถานะการจ่ายเงิน', defaultContent: "<input type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
            ],
            columnDefs:
                [{
                    "targets": 1,
                    "data": 'img',
                    "render": function (data, type, row, meta) {
                        return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
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

        $('#status_pay-table').DataTable({
            responsive: true,
            deferRender: true,
            data: rawdata_pay,
            columns: [
                { title: 'รหัส', data: 'order' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'name_item' },
                { title: 'โครงการ', data: 'project_name' },
                { title: 'ผู้ชนะการประมูล', data: 'win_bidder' },
                { title: 'เจ้าของการประมูล', data: 'owner_item' },

                { title: 'สถานะการขนส่ง', data: 'status' },
            ],
            columnDefs:
                [{
                    "targets": 1,
                    "data": 'img',
                    "render": function (data, type, row, meta) {
                        return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                    }
                },
                ],
        });
    });
});