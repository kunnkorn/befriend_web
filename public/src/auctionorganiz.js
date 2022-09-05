$(document).ready(function () {

    // Get Data From token
    var userid;
    $.ajax({
        type: "POST",
        url: "/jwtdecode",
        headers: { 'authorization': 'Bearer ' + window.sessionStorage.token },
        success: function (data) {
            // console.log(data);
            userid = data.user_id
            console.log(userid)
        },
        error: function (xhr) {
            console.log(xhr.responseText)
        }
    });

    //open this page----------------

    $('.content-container').html(' <div class="row" id="list-openauction"><div id="btnallauction" ><button style="border-radius: 0em;" class="btn"><img src="img/Box.png" class="img"><p>ทั้งหมด</p></button> </div><div id="btndelivery"><button style="border-radius: 0em;" class="btn"><img src="img/Delivery Truck.png" class="img"><p>ที่ต้องจัดส่ง</p></button> </div></div> <div id="content-table">  </div>');


    $('#content-table').html('<table id="alllist_auction" class="table table-hover" style="width: 100%; text-align: center;"></table>');


    let number = 1;
    $('#alllist_auction').DataTable({
        responsive: true,
        deferRender: true,
        ajax: ({
            url: "/dataaucationforopenbyadmin",
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].winner == null) {
                        data[i].winner = 'ยังไม่มีคนประมูล'
                    }
                }
                return data
            }
        }),
        // data: rawdata_all,
        columns: [
            { title: 'รหัส', defaultContent: '' },
            { title: 'สินค้า' },
            { title: 'ชื่อสินค้า', data: 'auction_name' },
            { title: 'โครงการ', data: 'donate_name' },
            { title: 'เหลือเวลา', data: 'Timeout' },
            { title: 'ราคาล่าสุด', data: 'auction_endprice' },
            { title: 'ผู้ประมูลล่าสุด', data: 'winner' },
        ],
        columnDefs:
            [{

                'targets': 0,
                'createdCell': function (td, cellData, rowData, row, col) {
                    $(td).text(number)
                    number++;
                },
            },

            {
                "targets": 1,
                "data": 'picname',
                "render": function (data, type, row, meta) {
                    return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                }

            }
            ],
    });


    $('#btnlistauction').toggleClass('active');
    $('#btnlistauction').click(function () {
        if ($('#btnlistauction').hasClass('active')) {


        } else {
            $('#btnlistauction').toggleClass('active');
            $('#btnopenauction').removeClass('active');
        }
        $('.content-container').html(' <div class="row" id="list-openauction"><div id="btnallauction" ><button style="border-radius: 0em;" class="btn"><img src="img/Box.png" class="img"><p>ทั้งหมด</p></button> </div><div id="btndelivery"><button style="border-radius: 0em;" class="btn"><img src="img/Delivery Truck.png" class="img"><p>ที่ต้องจัดส่ง</p></button> </div></div> <div id="content-table">  </div>');


        $('#content-table').html('<table id="alllist_auction" class="table table-hover" style="width: 100%; text-align: center;"></table>');

        let countallnumber = 1
        $('#alllist_auction').DataTable({
            responsive: true,
            deferRender: true,
            ajax: ({
                url: "/dataaucationforopenbyadmin",
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].winner == null) {
                            data[i].winner = 'ยังไม่มีคนประมูล'
                        }
                    }
                    return data
                }
            }),
            // data: rawdata_all,
            columns: [
                { title: 'รหัส', defaultContent: '' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'auction_name' },
                { title: 'โครงการ', data: 'donate_name' },
                { title: 'เหลือเวลา', data: 'Timeout' },
                { title: 'ราคาล่าสุด', data: 'auction_endprice' },
                { title: 'ผู้ประมูลล่าสุด', data: 'winner' },
            ],
            columnDefs:
                [{

                    'targets': 0,
                    'createdCell': function (td, cellData, rowData, row, col) {
                        $(td).text(countallnumber)
                        countallnumber++;
                    },
                },

                {
                    "targets": 1,
                    "data": 'picname',
                    "render": function (data, type, row, meta) {
                        return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                    }

                }
                ],
        });




        //********** all list auction************** */
        $('#btnallauction').toggleClass('active');
        $('#btnallauction').click(function () {

            if ($('#btnallauction').hasClass('active')) {


            } else {
                $('#btnallauction').toggleClass('active');
                $('#btndelivery').removeClass('active');
            }
            $('#content-table').html('<table id="alllist_auction" class="table table-hover" style="width: 100%; text-align: center;"></table>');

            let countallnumber = 1
            $('#alllist_auction').DataTable({
                responsive: true,
                deferRender: true,
                ajax: ({
                    url: "/dataaucationforopenbyadmin",
                    dataSrc: function (data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].winner == null) {
                                data[i].winner = 'ยังไม่มีคนประมูล'
                            }
                        }
                        return data
                    }
                }),
                // data: rawdata_all,
                columns: [
                    { title: 'รหัส', defaultContent: '' },
                    { title: 'สินค้า' },
                    { title: 'ชื่อสินค้า', data: 'auction_name' },
                    { title: 'โครงการ', data: 'donate_name' },
                    { title: 'เหลือเวลา', data: 'Timeout' },
                    { title: 'ราคาล่าสุด', data: 'auction_endprice' },
                    { title: 'ผู้ประมูลล่าสุด', data: 'winner' },
                ],
                columnDefs:
                    [{
                        'targets': 0,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).text(countallnumber)
                            countallnumber++;
                        },
                    },

                    {
                        "targets": 1,
                        "data": 'picname',
                        "render": function (data, type, row, meta) {
                            return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                        }

                    }
                    ],
            });

        });



        //  ===================button delivery =============

        $('#btndelivery').click(function () {
            if ($('#btndelivery').hasClass('active')) {

            } else {
                $('#btnallauction').removeClass('active');
                $('#btndelivery').toggleClass('active');
            }
            $('#content-table').html('<table id="delivery_auction" class="table table-hover" style="width: 100%; text-align: center;"></table>');

            var endnum = 1;
            table = $('#delivery_auction').DataTable({
                responsive: true,
                deferRender: true,
                ajax: {
                    url: '/admindataendauction',
                    dataSrc: function (data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].auction_transprot == 1) {
                                data[i].auction_transprot = 'กำลังเตรียมจัดส่ง'
                            }
                            else if (data[i].auction_transprot == 2) {
                                data[i].auction_transprot = 'จัดส่งสำเร็จ'

                            }
                            else if (data[i].auction_transprot == 3) {
                                data[i].auction_transprot = 'ส่งมอบสินค้าสำเร็จ'
                        
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
                    { title: 'ชื่อผู้รับสินค้า', data: 'winner' },
                    { title: 'สถานะการขนส่ง', data: 'auction_transprot' },
                    { title: 'รายละเอียด', defaultContent: "<input type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
                ],
                columnDefs:
                    [
                        {
                            'targets': 0,
                            'createdCell': function (td, cellData, rowData, row, col) {
                                $(td).text(endnum)
                                endnum++;
                            },
                        },

                        {
                            "targets": 1,
                            "data": 'picname',
                            "render": function (data, type, row, meta) {
                                return '<img src="upload/' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                            }
                        },
                    ],
            });

            $("#delivery_auction tbody").on("click", '.btn-primary', function () {
                // Get Requestid
                const currentRow = $(this).parents('tr');
                const data = table.row(currentRow).data();
                const request_id = data.auction_id
                sessionStorage.aucionid = request_id;
                // console.log(sessionStorage.request);
                window.location.replace('/detailDelivery_auction');
                // alert('OK')
    
            })

        });
    });




    $('#btnopenauction').click(function () {
        console.log('2');
        if ($('#btnopenauction').hasClass('active')) {

        } else {
            $('#btnlistauction').removeClass('active');
            $('#btnopenauction').toggleClass('active');
        }
        // $('#content-container').html('<form><div class="row"><div class="col-lg"><div id="open_auction"><span id="head-auction">กรอกข้อมูลรายละเอียดสินค้า</span><div class="open-auction mt-4"><div class="name-form"><label for="itemname">ชื่อสินค้า</label><input type="text" id="itemname" class="form-control mb-4 "></div><div class="price-form"><label for="">ราคาเริ่มต้น</label><input type="number" id="pricestart" class="form-control mb-4" min="0"></div><div class="pricedelivery-form"><label for="pricedelivery">ราคาการขนส่งสินค้า</label><input type="number" id="pricedelivery" class="form-control mb-4" min="0"></div><div class="pricedelivery-form"><label for="itemdetail">รายละเอียด</label><div class="d-flex flex-column"><input type="text" id="itemdetail" placeholder="แสดงรายละอียดสินค้า" class="form-control mb-3"><input type="text" id="itemsize" placeholder="ขนาด ex.กว้าง*ยาว*สูง" class="form-control mb-3"><input type="text" id="itemweight" placeholder="น้ำหนัก" class="form-control mb-2"></div></div><p id="uploadtxt">อัพโหลดรูป</p><input type="file" name="fileuploadpic" accept="image/*" multiple onchange="previewMultiple(event)" id="adicionafoto"><div id="galeria"></div></div></div></div><div class="col col-lg-5" id="col2"><span id="txtchooseproject">เลือกโครงการ</span><label class="mt-4"><input type="radio" name="project" class="card-input-element"><div class="panel panel-default card-input"><div class="card"><div class="row no-gutters"><div class="col-md-4 p-2" ><img src="img/พิการ.jpg" class="card-img" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">บ้านพักพิงเพื่อสุนัขและแมวจรจัด โดย หมากระสอบ </h5><li>จ. เพชรบูรณ์</li><li><i class="fa fa-clock-o" aria-hidden="true">     เหลืออีก 5 วัน</i></li><li><img src="img/icons/dollar-icon.png" width="7%">  100000 bath.</li><div class="progress mt-3"><div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div></div></div></div></div></div></div></label><label><input type="radio" name="project" class="card-input-element"><div class="panel panel-default card-input"><div class="card"><div class="row no-gutters"><div class="col-md-4 p-2" ><img src="img/พิการ.jpg" class="card-img" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">บ้านพักพิงเพื่อสุนัขและแมวจรจัด โดย หมากระสอบ </h5><li>จ. เพชรบูรณ์</li><li><i class="fa fa-clock-o" aria-hidden="true">เหลืออีก 5 วัน</i></li><li><img src="img/icons/dollar-icon.png" width="7%">  100000 bath.</li><div class="progress mt-3"><div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div></div></div></div></div></div></div></label><button type="button" class="btn btn-warning " style="width: 40%" id="open-auction_btn">เปิดประมูล</button></div></div></form>');

        $.ajax({
            typr: "GET",
            url: "/projectforauction",
            success: function (data) {
                const dataproject = data;

                let allproject = ""
                allproject += "<form>"
                allproject += "<div class='row'>"
                allproject += "<div class='col-lg'>"
                allproject += "<div id='open_auction'>"
                allproject += "<span id='head-auction'>กรอกข้อมูลรายละเอียดสินค้า</span>"
                allproject += "<div class='open-auction mt-4'>"
                allproject += "<div class='name-form'>"
                allproject += "<label for='itemname'>ชื่อสินค้า</label>"
                allproject += "<input type='text' id='itemname' class='form-control mb-4 '>"
                allproject += "</div>"
                allproject += "<div class='price-form'>"
                allproject += "<label for=''>ราคาเริ่มต้น</label>"
                allproject += "<input type='number' id='pricestart' class='form-control mb-4' min='0'>"
                allproject += "</div>"
                allproject += "<div class='pricedelivery-form'>"
                allproject += "<label for='pricedelivery'>ราคาการขนส่งสินค้า</label>"
                allproject += "<input type='number' id='pricedelivery' class='form-control mb-4' min='0'>"
                allproject += "</div>"
                allproject += "<div class='pricedelivery-form'>"
                allproject += "<label for='itemdetail'>รายละเอียด</label>"
                allproject += "<div class='d-flex flex-column'>"
                allproject += "<input type='text' id='itemdetail' placeholder='แสดงรายละอียดสินค้า'"
                allproject += "class='form-control mb-3'>"
                allproject += "<input type='text' id='itemsize' placeholder='ขนาด ex.กว้าง*ยาว*สูง' class='form-control mb-3'>"
                allproject += "<input type='text' id='itemweight' placeholder='น้ำหนัก' class='form-control mb-2'>"
                allproject += "</div>"
                allproject += "</div>"
                allproject += "<p id='uploadtxt'>อัพโหลดรูป</p>"
                allproject += "<input type='file' multiple onchange='previewMultiple(event)' id='adicionafoto'>"
                allproject += "<div id='galeria'>"
                allproject += "</div>"
                allproject += "</div>"
                allproject += "</div>"
                allproject += "</div>"

                allproject += "<div class='col col-lg-5' id='col2'>"
                allproject += "<span id='txtchooseproject'>เลือกโครงการ</span>"
                for (let i = 0; i < dataproject.length; i++) {
                    allproject += "<label class='mt-4'>"
                    allproject += "<input type='radio' name='project' value=" + dataproject[i].donate_id + " class='card-input-element'>"
                    allproject += "<div class='panel panel-default card-input'>"
                    allproject += "<div class='card'>"
                    allproject += "<div class='row no-gutters'>"
                    allproject += "<div class='col-md-4 p-2' >"
                    allproject += "<img src='upload/"+ dataproject[i].picname +"' class='card-img' >"
                    allproject += "</div>"
                    allproject += "<div class='col-md-8'>"
                    allproject += "<div class='card-body'>"
                    allproject += "<h5 class='card-title'>" + dataproject[i].donate_name + " </h5>"
                    allproject += "<li>" + dataproject[i].donate_area + "</li>"
                    allproject += "<li><i class='fa fa-clock-o' aria-hidden='true'>เหลืออีก " + dataproject[i].timeout + " วัน</i></li>"
                    allproject += "<li><img src='img/icons/dollar-icon.png' width='7%'>  " + dataproject[i].donate_pricedurring + " bath.</li>"
                    allproject += "<div class='progress mt-3'>"
                    allproject += "<div class='progress-bar bg-warning' role='progressbar' style='width: 75%' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'> " + dataproject[i].percen + " %</div>"
                    allproject += "</div>"
                    allproject += "</div>"
                    allproject += "</div>"
                    allproject += "</div>"
                    allproject += "</div>"
                    allproject += "</div>"
                    allproject += "</label>"
                }
                allproject += "<button type='button' class='btn btn-warning' style='width: 40%' id='open-auction_btn'>เปิดประมูล</button>"
                allproject += "</div>"
                allproject += "</div>"
                allproject += "</form>"

                $('#content-container').html(allproject);
            },
            error: (xhr) => {
                alert(xhr.responseText)
            }
        })

    });



    $('#content-container').on('click', '#open-auction_btn', function (event) {
        event.preventDefault();

        let auctionname = $('#itemname').val();
        let auctionpriecstart = $('#pricestart').val();
        let auctionpricedelivery = $('#pricedelivery').val();
        let auctionitemdetail = $('#itemdetail').val();
        let auctionitemsize = $('#itemsize').val();
        let auctionitemweight = $('#itemweight').val();
        let donateid = $('input[name="project"]:checked').val();
        let auctionstatus = 2;

        var fileElement = document.getElementById("adicionafoto");
        var fileLength = fileElement.files.length;
        // console.log(fileElement.files);
        var _formData = new FormData();
        $.each($(fileElement)[0].files, function (i, file) {
            _formData.append('fileuploadpic', file)
        })

        _formData.append('auctionname', auctionname)
        _formData.append('auctionstartprice', auctionpriecstart)
        _formData.append('auctionendprice', auctionpriecstart)
        _formData.append('auctiondeliveryprice', auctionpricedelivery)
        _formData.append('userid', userid)
        _formData.append('auctiondescript', auctionitemdetail)
        _formData.append('auctionsize', auctionitemsize)
        _formData.append('auctionweight', auctionitemweight)
        _formData.append('auction_status', auctionstatus);

        $.ajax({
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            url: "/sendauction",
            data: _formData,
            dataType: "",
            success: function (response) {
                $.ajax({
                    type: "POST",
                    url: "/updatedonateidforauctionid",
                    data: { donateid: donateid },
                    success: function (data) {
                        alert('เปิดการประมูลขององค์กรเสร็จสิ้น')
                        location.reload(true);
                    }, error: function (xhr) {
                        alert(xhr.responseText)
                    }
                })
            },
            error: function (xhr) {
                console.log(xhr.responseText)
            }
        });
    });
});



//function upload image
function previewMultiple(event) {
    var saida = document.getElementById("adicionafoto");
    var quantos = saida.files.length;
    for (i = 0; i < quantos; i++) {
        var urls = URL.createObjectURL(event.target.files[i]);
        document.getElementById("galeria").innerHTML += '<img src="' + urls + '">';
    }
}


