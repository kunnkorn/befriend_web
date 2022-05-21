$(document).ready(function () {
    const rawdata = [
        { "order": "1", "projectname": "แบ่งปันความสุขให้น้องๆเนื่องในวันเด็ก", "ownermae": "กันทิตา บุญรักษานะ", "statusproject": "91%", "payment": "โอนแล้ว" },
        { "order": "2", "projectname": "ช่วยกันคนละนิด ช่วยสุนัขจรจัดมีข้าวกิน", "ownermae": "นิชา อรุณรักษา", "statusproject": "100%", "payment": "ยังไม่โอน" },
        { "order": "3", "projectname": "เด็กดอยน่ารัก แต่น้องหน๊าวหนาว", "ownermae": "ลักขณา รักนะจุ๊บจุ๊บ", "statusproject": "83%", "payment": "โอนแล้ว" },
        { "order": "4", "projectname": "รักน้ำ รักป่า รักน้องช้างด้วยน๊าา", "ownermae": "รุ่งนภา คำแพง", "statusproject": "100%", "payment": "โอนแล้ว" },
        { "order": "5", "projectname": "คุณปู่ คุณย่า เหง๊าเหงา มาหาเค้าหน่อย", "ownermae": "ก้อง บ่มีอิหยังมาพังทลาย", "statusproject": "100%", "payment": "โอนแล้ว" },
        { "order": "6", "projectname": "พรุ่งนี้จะรักกันก็ยังไม่สาย แต่ถ้าน้องแมวไม่มีข้าวกินน้องจะไม่รอด", "ownermae": "รักเธอ แล้วใจก็มีเสียงเพลง", "statusproject": "100", "payment": "โอนแล้ว" },
        { "order": "7", "projectname": "รักกันอย่าบังคับ อย่าบังคับ พรุ่งนี้นะครับมาช่วยเค้าหน่อย", "ownermae": "รักสวย รักงานเป็นจิตใจ", "statusproject": "72%", "payment": "ยังไม่โอน" },
        { "order": "8", "projectname": "แมว หมา อาหาร น้องต้องการความช่วยเหลือ", "ownermae": "อย่าให้ พรุ่งนี้มาทำร้ายเรา", "statusproject": "100%", "payment": "โอนแล้ว" },
    ];

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

                    data[i].donate_percen = data[i].donate_percen + '%'
                }
                return data;
            }
        },
        columns: [
            { title: "ลำดับ", defaultContent: '' },
            { data: "donate_name", title: "ชื่อโครงการ" },
            { data: "donate_responperson", title: "ชื่อเจ้าของโครงการ" },
            { data: "donate_percen", title: "สถานะโครงการ" },
            { data: "donate_payment_status", title: "สถานะการโอนเงิน" },
            { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" },
            { title: "อัพเดทโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-update' value='อัพเดทโครงการ' style='width: 90%; border-radius: 8px; background-color: #009DFA; color: #FFFFFF;'>" }
        ],
        'columnDefs': [{
            'target': 0,
            'createdCell': function (td, cellData, rowData, row, col) {
                $(td).text(number)
                number++;
            }
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
        success: function(data) {
            if (data[0].projectsuccess == null || data[0].projectsuccess == undefined || data[0].projectsuccess == "") {
                data[0].projectsuccess = '0'
            }

            $('#successproject').text(data[0].projectsuccess);
        }
    })

});