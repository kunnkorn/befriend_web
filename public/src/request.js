

$(document).ready(function () {
    const dataset = [
        {"id": "1" , "project_name" : "แบ่งปันความสุขให้น้องๆเนื่องในวันเด็ก" , "owner_name" : "กันทิตา บุญรักษานะ" , "date" : "22/01/2565"},
        {"id": "2" , "project_name" : "ช่วยกันคนละนิด ช่วยสุนัขจรจัดมีข้าวกิน" , "owner_name" : "นิชา อรุณรักษา" , "date" : "23/01/2565"},
        {"id": "3" , "project_name" : "เด็กดอยน่ารัก แต่น้องหน๊าวหนาว" , "owner_name" : "ลักขณา รักนะจุ๊บจุ๊บ" , "date" : "24/01/2565"},
        {"id": "4" , "project_name" : "รักน้ำ รักป่า รักน้องช้างด้วยน๊าา" , "owner_name" : "รุ่งนภา คำแพง" , "date" : "25/01/2565"},
        {"id": "5" , "project_name" : "คุณปู่ คุณย่า เหง๊าเหงา มาหาเค้าหน่อย" , "owner_name" : "ก้อง บ่มีอิหยังมาพังทลาย" , "date" : "26/01/2565"},
        {"id": "6" , "project_name" : "พรุ่งนี้จะรักกันก็ยังไม่สาย แต่ถ้าน้องแมวไม่มีข้าวกินน้องจะไม่รอด" , "owner_name" : "รักเธอ แล้วใจก็มีเสียงเพลง" , "date" : "27/01/2565"},
        {"id": "7" , "project_name" : "รักกันอย่าบังคับ อย่าบังคับ พรุ่งนี้นะครับมาช่วยเค้าหน่อย" , "owner_name" : "รักสวย รักงานเป็นจิตใจ" , "date" : "28/01/2565"},
        {"id": "8" , "project_name" : "แมว หมา อาหาร น้องต้องการความช่วยเหลือ" , "owner_name" : "อย่าให้ พรุ่งนี้มาทำร้ายเรา" , "date" : "29/01/2565"},
    ]


    var table = $("#detailrequesttable").DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        data: dataset,
        columns: [
            { data: "id", title: "ลำดับที่" },
            { data: "project_name", title: "ชื่อโครงการ" },
            { data: "owner_name", title: "ชื่อเจ้าของโครงการ" },
            { data: "date", title: "วันที่ส่งเรื่องในการขอเปิดโครงการ" },
            { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" }
        ]
    })

    $(".btn-detail").on("click" , function() {
        window.location = "./admin_detailrequest.html"
    })
});