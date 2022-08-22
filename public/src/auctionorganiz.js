$(document).ready(function () {
    // $('head').append('<link rel="stylesheet" href="public/styles/auctionorganiz.css" type="text/css" />');
    const rawdata_all = [
        { "order": "1", "itemimg": "img/mail.png", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "กระเป๋าเป้สีเหลือง", "ownermae": "กันทิตา บุญรักษานะ" },
        { "order": "2", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รถยนต์สีแดง", "ownermae": "นิชา อรุณรักษา" },
        { "order": "3", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "จอมินิเตอร์ ขนาด 32 นิ้ว", "ownermae": "ลักขณา รักนะจุ๊บจุ๊บ" },
        { "order": "4", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รักน้ำ รักป่า รักน้องช้างด้วยน๊าา", "ownermae": "รุ่งนภา คำแพง" },
        { "order": "5", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "คุณปู่ คุณย่า เหง๊าเหงา มาหาเค้าหน่อย", "ownermae": "ก้อง บ่มีอิหยังมาพังทลาย" },
        { "order": "6", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "พรุ่งนี้จะรักกันก็ยังไม่สาย แต่ถ้าน้องแมวไม่มีข้าวกินน้องจะไม่รอด", "ownermae": "รักเธอ แล้วใจก็มีเสียงเพลง" },
        { "order": "7", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รักกันอย่าบังคับ อย่าบังคับ พรุ่งนี้นะครับมาช่วยเค้าหน่อย", "ownermae": "รักสวย รักงานเป็นจิตใจ" },
        { "order": "8", "itemimg": "img/watch.jpg", "name_auction": "นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "ownermae": "อย่าให้ พรุ่งนี้มาทำร้ายเรา" },
    ];

    const rawdata_delivery = [
        { "order": "1", "itemimg": "img/mail.png", "name_auction": "นาฬิกา 16 px", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "name_bider": "yaya", "deli_status": "กำลังเตรียมจัดส่ง" },
        { "order": "2", "itemimg": "img/mail.png", "name_auction": "นาฬิกา 16 px", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "name_bider": "Maya", "deli_status": "ส่งมอบสินค้าสำเร็จ" },
        { "order": "3", "itemimg": "img/mail.png", "name_auction": "นาฬิกา 16 px", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "name_bider": "Uya", "deli_status": "จัดส่งสำเร็จแล้ว" },
        { "order": "4", "itemimg": "img/mail.png", "name_auction": "นาฬิกา 16 px", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "name_bider": "Connor", "deli_status": "กำลังเตรียมจัดส่ง" },
    ]


    //open this page----------------

    $('.content-container').html(' <div class="row" id="list-openauction"><div id="btnallauction" ><button style="border-radius: 0em;" class="btn"><img src="img/Box.png" class="img"><p>ทั้งหมด</p></button> </div><div id="btndelivery"><button style="border-radius: 0em;" class="btn"><img src="img/Delivery Truck.png" class="img"><p>ที่ต้องจัดส่ง</p></button> </div></div> <div id="content-table">  </div>');


    $('#content-table').html('<table id="alllist_auction" class="table table-hover" style="width: 100%; text-align: center;"></table>');

    $('#alllist_auction').DataTable({
        responsive: true,
        deferRender: true,
        data: rawdata_all,
        columns: [
            { title: 'รหัส', data: 'order' },
            { title: 'สินค้า' },
            { title: 'ชื่อสินค้า', data: 'name_auction' },
            { title: 'โครงการ', data: 'projectname' },
            { title: 'เหลือเวลา', data: 'timer' },
            { title: 'ราคาล่าสุด', data: 'lastprice' },
            { title: 'ผู้ประมูลล่าสุด', data: 'ownermae' },
        ],
        columnDefs:
            [{
                "targets": 1,
                "data": 'itemimg',
                "render": function (data, type, row, meta) {
                    return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                }
            },
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

        $('#alllist_auction').DataTable({
            responsive: true,
            deferRender: true,
            data: rawdata_all,
            columns: [
                { title: 'รหัส', data: 'order' },
                { title: 'สินค้า' },
                { title: 'ชื่อสินค้า', data: 'name_auction' },
                { title: 'โครงการ', data: 'projectname' },
                { title: 'เหลือเวลา', data: 'timer' },
                { title: 'ราคาล่าสุด', data: 'lastprice' },
                { title: 'ผู้ประมูลล่าสุด', data: 'ownermae' },
            ],
            columnDefs:
                [{
                    "targets": 1,
                    "data": 'itemimg',
                    "render": function (data, type, row, meta) {
                        return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                    }
                },
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

            $('#alllist_auction').DataTable({
                responsive: true,
                deferRender: true,
                data: rawdata_all,
                columns: [
                    { title: 'รหัส', data: 'order' },
                    { title: 'สินค้า' },
                    { title: 'ชื่อสินค้า', data: 'name_auction' },
                    { title: 'โครงการ', data: 'projectname' },
                    { title: 'เหลือเวลา', data: 'timer' },
                    { title: 'ราคาล่าสุด', data: 'lastprice' },
                    { title: 'ผู้ประมูลล่าสุด', data: 'ownermae' },
                ],
                columnDefs:
                    [{
                        "targets": 1,
                        "data": 'itemimg',
                        "render": function (data, type, row, meta) {
                            return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                        }
                    },
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

            $('#delivery_auction').DataTable({
                responsive: true,
                deferRender: true,
                data: rawdata_delivery,
                columns: [
                    { title: 'รหัส', data: 'order' },
                    { title: 'สินค้า' },
                    { title: 'ชื่อสินค้า', data: 'name_auction' },
                    { title: 'โครงการ', data: 'projectname' },
                    { title: 'ชื่อผู้รับสินค้า', data: 'name_bider' },
                    { title: 'สถานะการขนส่ง', data: 'deli_status' },
                    { title: 'รายละเอียด', defaultContent: "<input type = 'button' id='seemore' class = 'btn btn-primary' value='เพิ่มเติม' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" },
                ],
                columnDefs:
                    [{
                        "targets": 1,
                        "data": 'itemimg',
                        "render": function (data, type, row, meta) {
                            return '<img src="' + data + '" alt="' + data + '"  height="90" width="70"    style="object-fit: cover"/>';
                        }
                    },
                    ],
            });

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
                    allproject += "<input type='radio' name='project' value="+ dataproject[i].donate_id +" class='card-input-element'>"
                    allproject += "<div class='panel panel-default card-input'>"
                    allproject += "<div class='card'>"
                    allproject += "<div class='row no-gutters'>"
                    allproject += "<div class='col-md-4 p-2' >"
                    allproject += "<img src='img/พิการ.jpg' class='card-img' >"
                    allproject += "</div>"
                    allproject += "<div class='col-md-8'>"
                    allproject += "<div class='card-body'>"
                    allproject += "<h5 class='card-title'>"+ dataproject[i].donate_name +" </h5>"
                    allproject += "<li>"+dataproject[i].donate_area+"</li>"
                    allproject += "<li><i class='fa fa-clock-o' aria-hidden='true'>เหลืออีก "+ dataproject[i].timeout +" วัน</i></li>"
                    allproject += "<li><img src='img/icons/dollar-icon.png' width='7%'>  "+ dataproject[i].donate_pricedurring +" bath.</li>"
                    allproject += "<div class='progress mt-3'>"
                    allproject += "<div class='progress-bar bg-warning' role='progressbar' style='width: 75%' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'> "+ dataproject[i].percen+" %</div>"
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
        _formData.append('auctionendprice' , auctionpriecstart)
        _formData.append('auctiondeliveryprice', auctionpricedelivery)
        _formData.append('auctiondescript', auctionitemdetail)
        _formData.append('auctionsize', auctionitemsize)
        _formData.append('auctionweight', auctionitemweight)
        _formData.append('auction_status' , auctionstatus);

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
                    data: {donateid : donateid},
                    success: function(data) {
                        alert('Update Complete')
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


