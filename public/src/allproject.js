$(document).ready(function () {
    const rawdata = [
        {"order": "1" , "projectname" : "แบ่งปันความสุขให้น้องๆเนื่องในวันเด็ก" , "ownermae" : "กันทิตา บุญรักษานะ" , "statusproject": "91%" , "payment" : "โอนแล้ว"},
        {"order": "2" , "projectname" : "ช่วยกันคนละนิด ช่วยสุนัขจรจัดมีข้าวกิน" , "ownermae" : "นิชา อรุณรักษา" , "statusproject": "100%" , "payment" : "ยังไม่โอน"},
        {"order": "3" , "projectname" : "เด็กดอยน่ารัก แต่น้องหน๊าวหนาว" , "ownermae" : "ลักขณา รักนะจุ๊บจุ๊บ" , "statusproject": "83%" , "payment" : "โอนแล้ว"},
        {"order": "4" , "projectname" : "รักน้ำ รักป่า รักน้องช้างด้วยน๊าา" , "ownermae" : "รุ่งนภา คำแพง" , "statusproject": "100%" , "payment" : "โอนแล้ว"},
        {"order": "5" , "projectname" : "คุณปู่ คุณย่า เหง๊าเหงา มาหาเค้าหน่อย" , "ownermae" : "ก้อง บ่มีอิหยังมาพังทลาย" , "statusproject": "100%" , "payment" : "โอนแล้ว"},
        {"order": "6" , "projectname" : "พรุ่งนี้จะรักกันก็ยังไม่สาย แต่ถ้าน้องแมวไม่มีข้าวกินน้องจะไม่รอด" , "ownermae" : "รักเธอ แล้วใจก็มีเสียงเพลง" , "statusproject": "100" , "payment" : "โอนแล้ว"},
        {"order": "7" , "projectname" : "รักกันอย่าบังคับ อย่าบังคับ พรุ่งนี้นะครับมาช่วยเค้าหน่อย" , "ownermae" : "รักสวย รักงานเป็นจิตใจ" , "statusproject": "72%" , "payment" : "ยังไม่โอน"},
        {"order": "8" , "projectname" : "แมว หมา อาหาร น้องต้องการความช่วยเหลือ" , "ownermae" : "อย่าให้ พรุ่งนี้มาทำร้ายเรา" , "statusproject": "100%" , "payment" : "โอนแล้ว"},
    ];

    var table = $("#tableallproject").DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        data: rawdata,
        columns:[
            {data: "order" , title: "ลำดับ"},
            {data: "projectname" , title: "ชื่อโครงการ"},
            {data: "ownermae" , title: "ชื่อเจ้าของโครงการ"},
            {data: "statusproject" , title: "สถานะโครงการ"},
            {data: "payment" , title: "สถานะการโอนเงิน"},
            {title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >"},
            {title: "อัพเดทโครงการ" , defaultContent: "<input type = 'button' class = 'btn btn-update' value='อัพเดทโครงการ' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>"}
        ]
    });

    $(".btn-detail").on("click" , function() {
        window.location = "./admin_detailproject.html"
    })
});