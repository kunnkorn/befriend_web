$(document).ready(function () {
    $('head').append('<link rel="stylesheet" href="public/styles/auctionorganiz.css" type="text/css" />');
    const rawdata = [
        { "order": "1", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "กระเป๋าเป้สีเหลือง", "ownermae": "กันทิตา บุญรักษานะ" },
        { "order": "2", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รถยนต์สีแดง", "ownermae": "นิชา อรุณรักษา" },
        { "order": "3", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "จอมินิเตอร์ ขนาด 32 นิ้ว", "ownermae": "ลักขณา รักนะจุ๊บจุ๊บ" },
        { "order": "4", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รักน้ำ รักป่า รักน้องช้างด้วยน๊าา", "ownermae": "รุ่งนภา คำแพง" },
        { "order": "5", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "คุณปู่ คุณย่า เหง๊าเหงา มาหาเค้าหน่อย", "ownermae": "ก้อง บ่มีอิหยังมาพังทลาย" },
        { "order": "6", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "พรุ่งนี้จะรักกันก็ยังไม่สาย แต่ถ้าน้องแมวไม่มีข้าวกินน้องจะไม่รอด", "ownermae": "รักเธอ แล้วใจก็มีเสียงเพลง" },
        { "order": "7", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "รักกันอย่าบังคับ อย่าบังคับ พรุ่งนี้นะครับมาช่วยเค้าหน่อย", "ownermae": "รักสวย รักงานเป็นจิตใจ" },
        { "order": "8", "itemimg": "public/img/watch.jpg","name_auction":"นาฬิกา 16 px", "lastprice": "10 บาท", "bidder": "deo up1", "timer": "22 mins.", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "ownermae": "อย่าให้ พรุ่งนี้มาทำร้ายเรา" },
    ];
     
    // var table;
    // let number = 1;

    //  $('#alllist-auction').DataTable({
    //     data: rawdata,
    //     columns:[
    //         { title: 'รหัส' ,data:'order'},
    //         { title: 'สินค้า' ,data:'itemimg'},
    //         { title: 'ชื่อสินค้า' ,data:'name_auction'},
    //         { title: 'โครงการ.' ,data:'projectname'},
    //         { title: 'เหลือเวลา' ,data:'timer'},
    //         { title: 'ราคาล่าสุด',data:'lastprice' },
    //         { title: 'ผู้ประมูลล่าสุด',data:'ownermae' },
    //     ]
    // });



    $('#btnlistauction').toggleClass('active');
    $('#btnlistauction').click(function () {
        // e.preventDefault();
        // $('.content-container').empty();
        // $('.content-container').attr('<div class="containers"><div id="btnallauction" class="d-flex flex-column"><button style="border-radius: 0em;" class="btn"><img src="img/Box.png" class="img"><p>ทั้งหมด</p></button> </div><div id="btndelivery" class="d-flex flex-column"><button style="border-radius: 0em;" class="btn"><img src="img/Delivery Truck.png" class="img"><p>ที่ต้องจัดส่ง</p> </button> </div></div>')
        if ($('#btnlistauction').hasClass('active')) {

        } else {
            $('#btnlistauction').toggleClass('active');
            $('#btnopenauction').toggleClass('active');
        }
        $('.content-container').html('<div class="containers"><div id="btnallauction" class="d-flex flex-column"><button style="border-radius: 0em;" class="btn"><img src="Box.png" class="img"><p>ทั้งหมด</p></button> </div><div id="btndelivery" class="d-flex flex-column"><button style="border-radius: 0em;" class="btn"><img src="img/Delivery Truck.png" class="img"><p>ที่ต้องจัดส่ง</p> </button> </div></div>');
        
    });

    $('#btnopenauction').click(function () {
        console.log('2');
        if ($('#btnopenauction').hasClass('active')) {

        } else {
            $('#btnlistauction').toggleClass('active');
            $('#btnopenauction').toggleClass('active');
        }
        $('#content-container').html('<div class="row"><div class="col-lg"><div id="open_auction"><span id="head-auction">กรอกข้อมูลรายละเอียดสินค้า</span><div class="open-auction mt-4"><div class="name-form"><label for="itemname">ชื่อสินค้า</label><input type="text" id="itemname" class="form-control mb-4 "></div><div class="price-form"><label for="">ราคาเริ่มต้น</label><input type="number" id="pricestart" class="form-control mb-4" min="0"></div><div class="pricedelivery-form"><label for="pricedelivery">ราคาการขนส่งสินค้า</label><input type="number" id="pricedelivery" class="form-control mb-4" min="0"></div><div class="pricedelivery-form"><label for="itemdetail">รายละเอียด</label><div class="d-flex flex-column"><input type="text" id="itemdetail" placeholder="แสดงรายละอียดสินค้า" class="form-control mb-3"><input type="text" id="itemsize" placeholder="ขนาด ex.กว้าง*ยาว*สูง" class="form-control mb-3"><input type="text" id="itemweight" placeholder="น้ำหนัก" class="form-control mb-2"></div></div><p id="uploadtxt">อัพโหลดรูป</p><input type="file" multiple onchange="previewMultiple(event)" id="adicionafoto"><div id="galeria"></div></div></div></div><div class="col col-lg-5" id="col2"><span id="txtchooseproject">เลือกโครงการ</span><input type="text" placeholder="ค้นหาโครงการ" class="form-control mt-3"><label class="mt-4"><input type="radio" name="project" class="card-input-element"><div class="panel panel-default card-input"><div class="card"><div class="row no-gutters"><div class="col-md-4 p-2" ><img src="img/พิการ.jpg" class="card-img" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">บ้านพักพิงเพื่อสุนัขและแมวจรจัด โดย หมากระสอบ </h5><li>จ. เพชรบูรณ์</li><li><i class="fa fa-clock-o" aria-hidden="true">     เหลืออีก 5 วัน</i></li><li><img src="img/icons/dollar-icon.png" width="7%">  100000 bath.</li><div class="progress mt-3"><div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div></div></div></div></div></div></div></label><label><input type="radio" name="project" class="card-input-element"><div class="panel panel-default card-input"><div class="card"><div class="row no-gutters"><div class="col-md-4 p-2" ><img src="img/พิการ.jpg" class="card-img" ></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">บ้านพักพิงเพื่อสุนัขและแมวจรจัด โดย หมากระสอบ </h5><li>จ. เพชรบูรณ์</li><li><i class="fa fa-clock-o" aria-hidden="true">เหลืออีก 5 วัน</i></li><li><img src="img/icons/dollar-icon.png" width="7%">  100000 bath.</li><div class="progress mt-3"><div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div></div></div></div></div></div></div></label><button type="submit" class="btn btn-warning " style="width: 40%" id="open-auction_btn">เปิดประมูล</button></div></div>');
                              
    });
    

});

function previewMultiple(event) {
    var saida = document.getElementById("adicionafoto");
    var quantos = saida.files.length;
    for (i = 0; i < quantos; i++) {
        var urls = URL.createObjectURL(event.target.files[i]);
        document.getElementById("galeria").innerHTML += '<img src="' + urls + '">';
    }
}


