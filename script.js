// Lấy dữ liệu điểm danh từ LocalStorage khi tải trang
window.onload = function() {
    loadAttendance();
}

// Thêm người dùng vào danh sách điểm danh
function addAttendance() {
    let name = document.getElementById('nameInput').value;
    let area = document.getElementById('areaSelect').value;

    if (name.trim() !== "" && area !== "") {
        let attendanceList = getAttendanceList();
        
        // Kiểm tra xem người này đã điểm danh chưa
        if (attendanceList.some(entry => entry.name === name)) {
            alert("Người này đã điểm danh rồi.");
            return;
        }

        attendanceList.push({ name, area });
        localStorage.setItem('attendance', JSON.stringify(attendanceList));
        displayAttendance();
        document.getElementById('nameInput').value = '';
        document.getElementById('areaSelect').value = '';
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
    }
}

// Hiển thị danh sách điểm danh
function displayAttendance() {
    let attendanceList = getAttendanceList();
    let listElement = document.getElementById('attendanceList');
    listElement.innerHTML = '';
    attendanceList.forEach((entry, index) => {
        listElement.innerHTML += `<li>${index + 1}. ${entry.name} - ${entry.area}</li>`;
    });
}

// Lấy danh sách điểm danh từ LocalStorage
function getAttendanceList() {
    let attendance = localStorage.getItem('attendance');
    return attendance ? JSON.parse(attendance) : [];
}

// Tải danh sách điểm danh từ LocalStorage khi tải trang
function loadAttendance() {
    displayAttendance();
}

// Xuất danh sách điểm danh dưới dạng file CSV
function exportAttendance() {
    let attendanceList = getAttendanceList();
    let csvContent = "data:text/csv;charset=utf-8,";
    attendanceList.forEach((entry, index) => {
        csvContent += `${index + 1},${entry.name},${entry.area}
`;
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
}
