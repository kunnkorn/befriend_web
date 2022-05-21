

$(document).ready(function () {

    var table;
    let number = 1;
    table = $("#detailrequesttable").DataTable({
        "dom": '<"pull-right"f><"pull-left"l>tip',
        responsive: true,
        deferRender: true,
        ajax: {
            url: '/getdonate',
            dataSrc: function (data) {
                for(let i =0; i< data.length; i++) {
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
            { title: "ลำดับที่" , defaultContent: '' },
            { data: "donate_name", title: "ชื่อโครงการ" },
            { data: "donate_responperson", title: "ชื่อเจ้าของโครงการ" },
            { data: "donatestart", title: "วันที่ส่งเรื่องในการขอเปิดโครงการ" },
            { title: "รายละเอียดโครงการ", defaultContent: "<input type = 'button' class = 'btn btn-detail' value='รายละเอียด' style = 'width: 90%; border-radius: 8px; background-color: #7360ED; color: #FFFFFF;' >" }
        ],
        'columnDefs': [{
            'targets': 0,
            'createdCell': function(td , cellData, rowData, row, col) {
                $(td).text(number)
                number++;
            }
        }]
    })

    $("#detailrequesttable tbody").on("click", '.btn-detail' , function() {
        // Get Requestid
        const currentRow = $(this).parents('tr');
        const data = table.row(currentRow).data();
        const request_id = data.donate_id
        sessionStorage.request = request_id;
        console.log(sessionStorage.request);
        window.location.replace('/detailrequest');
    })
});