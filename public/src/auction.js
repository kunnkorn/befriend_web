$(document).ready(function () {
    const rawdata_bid = [
        { "order": "1", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "350", "win_bidder": "somchai", "last_bidder": "pornchai", "time_now": "20 mins" ,"time_mins":"0.5 mins","time_end":"จบแล้ว"},
        { "order": "2", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "480", "win_bidder": "sompong", "last_bidder": "pornchai", "time_now": "20 mins" ,"time_mins":"0.5 mins","time_end":"จบแล้ว"},
        { "order": "3", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "500", "win_bidder": "somsmai", "last_bidder": "pornchai", "time_now": "20 mins" ,"time_mins":"0.5 mins","time_end":"จบแล้ว"},
        { "order": "4", "img": 'img/watch.jpg', "name_item": "จอมินิเตอร์ ขนาด 32 นิ้ว", "project_name": "พี่พบน้อง ตามอัธยาศัยดีมั้๊ย", "last_bid": "1520", "win_bidder": "somsri", "last_bidder": "pornchai", "time_now": "20 mins" ,"time_mins":"0.5 mins","time_end":"จบแล้ว"},
    ];

    $('#content-table').html('<table id="bid-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');

    $('#bid-table').DataTable({
        responsive: true,
        deferRender: true,
        data: rawdata_bid,
        columns: [
            { title: 'รหัส', data: 'order' },
            { title: 'สินค้า' },
            { title: 'ชื่อสินค้า', data: 'name_item' },
            { title: 'โครงการ', data: 'project_name' },
            { title: 'เหลือเวลา', data: 'time_now' },
            { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
            { title: 'ผู้ประมูลล่าสุด', data: 'last_bidder' },

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

    // *************now****************
    $('#btnbid_now').toggleClass('active');
    $('#btnbid_now').click(function () {
        if ($('#btnbid_now').hasClass('active')) {

        }
        else {
            $('#btnbid_now').toggleClass('active');
            $('#btnbid_mins').removeClass('active');
            $('#btnstatus_end').removeClass('active');
        }

        $('#content-table').html('<table id="bid-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');

        $('#bid-table').DataTable({
            responsive: true,
            deferRender: true,
            data: rawdata_bid,
            columns: [
                { title: 'รหัส', data: 'order' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'name_item' },
                { title: 'โครงการ', data: 'project_name' },
                { title: 'เหลือเวลา', data: 'time_now' },
                { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
                { title: 'ผู้ประมูลล่าสุด', data: 'last_bidder' },

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


    // ***********1 mins left ***********
    $('#btnbid_mins').click(function () {
        if ($('#btnbid_mins').hasClass('active')) {

        }
        else {
            $('#btnbid_mins').toggleClass('active');
            $('#btnbid_now').removeClass('active');
            $('#btnstatus_end').removeClass('active');
        }

        $('#content-table').html('<table id="bid-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');

        $('#bid-table').DataTable({
            responsive: true,
            deferRender: true,
            data: rawdata_bid,
            columns: [
                { title: 'รหัส', data: 'order' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'name_item' },
                { title: 'โครงการ', data: 'project_name' },
                { title: 'เหลือเวลา', data: 'time_mins' },
                { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
                { title: 'ผู้ประมูลล่าสุด', data: 'last_bidder' },

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

        // ***********end bid ***********
        $('#btnstatus_end').click(function () {
            if ($('#btnstatus_end').hasClass('active')) {
    
            }
            else {
                $('#btnstatus_end').toggleClass('active');
                $('#btnbid_now').removeClass('active');
                $('#btnbid_mins').removeClass('active');
            }
    
            $('#content-table').html('<table id="bid-table" class="table table-hover" style="width: 100%; text-align: center;"></table>');
    
            $('#bid-table').DataTable({
                responsive: true,
                deferRender: true,
                data: rawdata_bid,
                columns: [
                    { title: 'รหัส', data: 'order' },
                    { title: 'สินค้า' },
                    { title: 'ชื่อสินค้า', data: 'name_item' },
                    { title: 'โครงการ', data: 'project_name' },
                    { title: 'เหลือเวลา', data: 'time_end' },
                    { title: 'ราคาประมูลล่าสุด', data: 'last_bid' },
                    { title: 'ผู้ชนะในการประมูล', data: 'win_bidder' },
    
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